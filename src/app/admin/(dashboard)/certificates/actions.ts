"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function issueCertificate(data: {
  enrollmentId: string;
  certificateNo: string;
  studentName: string;
  courseName: string;
}) {
  await prisma.certificate.create({ data });
  await prisma.enrollment.update({ where: { id: data.enrollmentId }, data: { status: "COMPLETED" } });
  revalidatePath("/admin/certificates");
  revalidatePath("/admin/enrollments");
}

export async function revokeCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/admin/certificates");
}
