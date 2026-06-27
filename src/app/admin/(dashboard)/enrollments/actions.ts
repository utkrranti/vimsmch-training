"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateEnrollmentStatus(id: string, status: string) {
  await prisma.enrollment.update({ where: { id }, data: { status } });
  revalidatePath("/admin/enrollments");
}

export async function deleteEnrollment(id: string) {
  await prisma.enrollment.delete({ where: { id } });
  revalidatePath("/admin/enrollments");
}
