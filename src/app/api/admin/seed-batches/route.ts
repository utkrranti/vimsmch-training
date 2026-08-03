import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const courses = await prisma.course.findMany({ select: { id: true, slug: true, seats: true, durationMonths: true } });
  const results: Record<string, string[]> = {};

  for (const course of courses) {
    const existing = await prisma.batch.count({ where: { courseId: course.id } });
    if (existing > 0) {
      results[course.slug] = ["skipped — batches already exist"];
      continue;
    }
    const start1 = addMonths(new Date(), 1);
    const start2 = addMonths(new Date(), 3);
    const batchA = await prisma.batch.create({
      data: { courseId: course.id, label: "Batch A", startDate: start1, endDate: addMonths(start1, course.durationMonths), seats: course.seats, isActive: true },
    });
    const batchB = await prisma.batch.create({
      data: { courseId: course.id, label: "Batch B", startDate: start2, endDate: addMonths(start2, course.durationMonths), seats: course.seats, isActive: true },
    });
    results[course.slug] = [batchA.id, batchB.id];
  }

  return NextResponse.json({ success: true, results });
}
