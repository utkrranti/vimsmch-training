import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const certNo = req.nextUrl.searchParams.get("certNo")?.trim();

  if (!certNo) {
    return NextResponse.json({ error: "Certificate number is required." }, { status: 400 });
  }

  const cert = await prisma.certificate.findUnique({
    where: { certificateNo: certNo },
  });

  if (!cert) {
    return NextResponse.json({ found: false }, { status: 404 });
  }

  return NextResponse.json({
    found: true,
    certificateNo: cert.certificateNo,
    studentName: cert.studentName,
    courseName: cert.courseName,
    issuedAt: cert.issuedAt.toISOString(),
  });
}
