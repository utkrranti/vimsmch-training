import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const IMAGES: Record<string, string> = {
  "operation-theatre-assistant": "/images/course-ot-assistant.webp",
  "ecg-technology": "/images/course-ecg.webp",
  "dialysis-technician": "/images/course-dialysis.webp",
  "medical-laboratory-technology": "/images/course-medical-lab.webp",
  "radiology-and-imaging-technology": "/images/course-radiology.webp",
};

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const results: Record<string, number> = {};
  for (const [slug, imageUrl] of Object.entries(IMAGES)) {
    const result = await prisma.course.updateMany({ where: { slug }, data: { imageUrl } });
    results[slug] = result.count;
  }
  return NextResponse.json({ success: true, results });
}
