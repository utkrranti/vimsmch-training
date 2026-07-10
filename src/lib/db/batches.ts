import { prisma } from "@/lib/prisma";

export type BatchRow = {
  id: string;
  courseId: string;
  label: string;
  startDate: Date;
  endDate: Date;
  seats: number;
  isActive: boolean;
};

export async function getBatchesForCourse(courseId: string): Promise<BatchRow[]> {
  return prisma.batch.findMany({
    where: { courseId, isActive: true },
    orderBy: { startDate: "asc" },
  });
}
