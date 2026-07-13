import { prisma } from "@/lib/prisma";

export type FaqRow = {
  id: string;
  question: string;
  answer: string | null;
  sortOrder: number;
  isActive: boolean;
};

export async function getActiveFaqItems(): Promise<FaqRow[]> {
  return prisma.faqItem.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}
