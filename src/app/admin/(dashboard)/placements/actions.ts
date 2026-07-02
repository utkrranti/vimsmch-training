"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePlacement(
  id: string | null,
  data: { studentName: string; employerName: string; courseId: string; quote: string; batchYear: string; sortOrder: number; isActive: boolean }
) {
  const payload = {
    studentName: data.studentName,
    employerName: data.employerName || null,
    courseId: data.courseId || null,
    quote: data.quote || null,
    batchYear: data.batchYear || null,
    sortOrder: data.sortOrder,
    isActive: data.isActive,
  };
  if (id) {
    await prisma.placement.update({ where: { id }, data: payload });
  } else {
    await prisma.placement.create({ data: payload });
  }
  revalidatePath("/admin/placements");
  revalidatePath("/placements");
}

export async function deletePlacement(id: string) {
  await prisma.placement.delete({ where: { id } });
  revalidatePath("/admin/placements");
  revalidatePath("/placements");
}

export async function togglePlacementActive(id: string, isActive: boolean) {
  await prisma.placement.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/placements");
  revalidatePath("/placements");
}
