import { prisma } from "@/lib/prisma";

export type AnnouncementRow = {
  id: string;
  title: string;
  body: string;
  attachmentUrl: string | null;
  isActive: boolean;
  createdAt: Date;
};

export async function getActiveAnnouncements(): Promise<AnnouncementRow[]> {
  return prisma.announcement.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
}
