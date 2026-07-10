import { prisma } from "@/lib/prisma";

export type PlacementRow = {
  id: string;
  studentName: string;
  employerName: string | null;
  courseId: string | null;
  quote: string | null;
  batchYear: string | null;
  sortOrder: number;
  isActive: boolean;
};

export async function getAllPlacements(): Promise<PlacementRow[]> {
  return prisma.placement.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}
