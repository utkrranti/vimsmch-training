"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveBatch(
  id: string | null,
  data: { courseId: string; label: string; startDate: string; endDate: string; seats: number; isActive: boolean }
) {
  const payload = {
    courseId: data.courseId,
    label: data.label,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    seats: data.seats,
    isActive: data.isActive,
  };
  if (id) {
    await prisma.batch.update({ where: { id }, data: payload });
  } else {
    await prisma.batch.create({ data: payload });
  }
  revalidatePath("/admin/batches");
}

export async function deleteBatch(id: string) {
  await prisma.batch.delete({ where: { id } });
  revalidatePath("/admin/batches");
}

export async function toggleBatchActive(id: string, isActive: boolean) {
  await prisma.batch.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/batches");
}

export async function assignEnrollmentBatch(enrollmentId: string, batchId: string | null) {
  await prisma.enrollment.update({ where: { id: enrollmentId }, data: { batchId } });
  revalidatePath("/admin/batches");
  revalidatePath("/admin/enrollments");
}
