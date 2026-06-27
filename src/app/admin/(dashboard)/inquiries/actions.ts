"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatus(id: string, status: string) {
  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: string) {
  await prisma.inquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
}
