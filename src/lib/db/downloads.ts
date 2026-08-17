import { prisma } from "@/lib/prisma";

export type DownloadRow = {
  id: string;
  title: string;
  titleMr?: string | null;
  description: string | null;
  descriptionMr?: string | null;
  fileUrl: string;
  sortOrder: number;
  isActive: boolean;
};

export async function getActiveDownloads(): Promise<DownloadRow[]> {
  return prisma.downloadItem.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}
