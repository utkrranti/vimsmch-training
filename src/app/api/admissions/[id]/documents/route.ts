import { NextResponse } from "next/server";
import { admissionDocuments, cleanText } from "@/lib/admissions";
import { prisma } from "@/lib/prisma";
import { validateAdmissionDocument } from "@/lib/document-ai";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const accessToken = request.headers.get("x-application-token");
    const application = accessToken
      ? await prisma.admissionApplication.findFirst({ where: { id, accessToken } })
      : null;
    if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });

    const body = await request.json();
    const type = cleanText(body.type, 60);
    const fileUrl = cleanText(body.fileUrl, 500);
    const fileName = cleanText(body.fileName, 180);
    const definition = admissionDocuments.find((document) => document.type === type);
    if (!definition || !fileUrl || !fileName) {
      return NextResponse.json({ error: "Invalid document upload." }, { status: 400 });
    }
    if (!fileUrl.includes(`/admissions/${id}/${definition.type.toLowerCase()}-`)) {
      return NextResponse.json({ error: "Document does not belong to this application." }, { status: 400 });
    }

    const document = await prisma.admissionDocument.upsert({
      where: { applicationId_type: { applicationId: id, type: definition.type } },
      update: { fileUrl, fileName, label: definition.label, status: "PENDING", adminRemark: null, aiStatus: "CHECKING", aiScore: null, aiVisibilityScore: null, aiAuthenticity: null, aiSummary: null, aiIssues: [], aiCheckedAt: null },
      create: { applicationId: id, type: definition.type, label: definition.label, fileUrl, fileName, aiStatus: "CHECKING", aiIssues: [] },
    });
    await prisma.admissionApplication.update({ where: { id }, data: { lastActivityAt: new Date() } });

    try {
      const ai = await validateAdmissionDocument(fileUrl, fileName, definition.label);
      const reviewed = await prisma.admissionDocument.update({
        where: { id: document.id },
        data: { aiStatus: ai.status, aiScore: ai.score, aiVisibilityScore: ai.visibilityScore, aiAuthenticity: ai.authenticity, aiSummary: ai.summary, aiIssues: ai.issues, aiCheckedAt: new Date() },
      });
      return NextResponse.json({ success: true, document: reviewed });
    } catch (error) {
      console.error("Admission document AI validation failed", error);
      const reviewed = await prisma.admissionDocument.update({
        where: { id: document.id },
        data: { aiStatus: "ERROR", aiSummary: "Automatic quality check was unavailable. Admissions staff will review this document.", aiIssues: [], aiCheckedAt: new Date() },
      });
      return NextResponse.json({ success: true, document: reviewed, validationWarning: "Automatic validation was unavailable; manual review will be used." });
    }
  } catch (error) {
    console.error("Unable to save admission document", error);
    return NextResponse.json({ error: "Unable to save the document." }, { status: 500 });
  }
}
