import { get } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { createAdmissionFormDocx } from "@/lib/admission-form-docx";
import { prisma } from "@/lib/prisma";
import { createZip } from "@/lib/zip";

const safeName = (value: string) => value.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100) || "file";

async function downloadPrivateBlob(url: string) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || !parsed.hostname.endsWith(".blob.vercel-storage.com")) throw new Error("Invalid admission file URL.");
  const token = process.env.ADMISSION_BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("Private admission storage is not configured.");
  const result = await get(url, { access: "private", token });
  if (!result?.stream) throw new Error("An admission file could not be found.");
  return new Uint8Array(await new Response(result.stream).arrayBuffer());
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const application = await prisma.admissionApplication.findUnique({ where: { id }, include: { course: { select: { title: true } }, batch: { select: { label: true } }, documents: { orderBy: { createdAt: "asc" } } } });
  if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });
  try {
    const entries = [{ name: `${safeName(application.applicationNo)}-admission-form.docx`, data: createAdmissionFormDocx(application), modifiedAt: new Date() }];
    const usedNames = new Set(entries.map(entry => entry.name.toLowerCase()));
    for (const document of application.documents) {
      const original = safeName(document.fileName); let name = `documents/${safeName(document.label)}-${original}`, suffix = 2;
      while (usedNames.has(name.toLowerCase())) name = `documents/${safeName(document.label)}-${suffix++}-${original}`;
      usedNames.add(name.toLowerCase());
      entries.push({ name, data: await downloadPrivateBlob(document.fileUrl), modifiedAt: document.updatedAt });
    }
    if (application.paymentProofUrl) {
      const extension = new URL(application.paymentProofUrl).pathname.match(/\.[a-zA-Z0-9]{1,8}$/)?.[0] ?? ".bin";
      entries.push({ name: `documents/payment-proof${extension}`, data: await downloadPrivateBlob(application.paymentProofUrl), modifiedAt: application.paymentDate ?? application.updatedAt });
    }
    const archive = createZip(entries), filename = `${safeName(application.applicationNo)}-${safeName(application.name)}.zip`;
    return new Response(archive, { headers: { "Content-Type": "application/zip", "Content-Disposition": `attachment; filename="${filename}"`, "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Unable to create admission archive", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create admission ZIP." }, { status: 500 });
  }
}
