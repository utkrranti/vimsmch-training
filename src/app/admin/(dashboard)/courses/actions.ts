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
    slug: string; title: string; titleMr: string; shortDesc: string; shortDescMr: string; fullDesc: string; fullDescMr: string;
    nsqf: number; durationMonths: number; durationHours: number;
    fees: number; feeBreakdown: { label: string; labelMr?: string; amount: number }[];
    seats: number; eligibility: string; eligibilityMr: string; ageLimit: string; ageLimitMr: string; certBy: string; certByMr: string;
    assessmentScheme: string; assessmentSchemeMr: string; creditEquivalence: string; creditEquivalenceMr: string;
    objectives: string[]; objectivesMr: string[]; highlights: string[]; highlightsMr: string[];
    syllabus: { unit: string; unitMr?: string; topics: string[]; topicsMr?: string[] }[];
    clinicalPostings: string[]; clinicalPostingsMr: string[];
    outcomes: string[]; outcomesMr: string[]; tags: string[]; tagsMr: string[]; category: string;
    batchMonths: string[]; isActive: boolean; imageUrl: string;
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
