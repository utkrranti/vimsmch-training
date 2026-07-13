"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleCourseActive(id: string, isActive: boolean) {
  await prisma.course.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function saveCourse(
  id: string | null,
  data: {
    slug: string; title: string; shortDesc: string; fullDesc: string;
    nsqf: number; durationMonths: number; durationHours: number;
    fees: number; feeBreakdown: { label: string; amount: number }[];
    seats: number; eligibility: string; ageLimit: string; certBy: string;
    assessmentScheme: string; creditEquivalence: string;
    objectives: string[]; highlights: string[];
    syllabus: { unit: string; topics: string[] }[];
    clinicalPostings: string[];
    outcomes: string[]; tags: string[]; category: string;
    batchMonths: string[]; isActive: boolean;
  }
) {
  if (id) {
    await prisma.course.update({ where: { id }, data });
  } else {
    await prisma.course.create({ data });
  }
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}
