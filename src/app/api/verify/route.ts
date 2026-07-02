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

  // Always 200 — a non-200 response for "not found" would let callers time/enumerate valid cert numbers.
  if (!cert) {
    return NextResponse.json({ valid: false }, { status: 200, headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json(
    {
      valid: true,
      certificateNo: cert.certificateNo,
      studentName: cert.studentName,
      courseName: cert.courseName,
      issuedAt: cert.issuedAt.toISOString(),
    },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
