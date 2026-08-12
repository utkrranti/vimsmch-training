"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveFaqItem(
  id: string | null,
  data: { question: string; questionMr: string; answer: string; answerMr: string; sortOrder: number; isActive: boolean }
) {
  const payload = {
    question: data.question,
    questionMr: data.questionMr || null,
    answer: data.answer || null,
    answerMr: data.answerMr || null,
    sortOrder: data.sortOrder,
    isActive: data.isActive,
  };
  if (id) {
    await prisma.faqItem.update({ where: { id }, data: payload });
  } else {
    await prisma.faqItem.create({ data: payload });
  }
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function deleteFaqItem(id: string) {
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function toggleFaqItemActive(id: string, isActive: boolean) {
  await prisma.faqItem.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}
