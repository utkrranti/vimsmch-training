import { prisma } from "@/lib/prisma";

export type GalleryRow = {
  id: string;
  imageUrl: string;
  caption: string | null;
  category: string;
  courseId: string | null;
  sortOrder: number;
  isActive: boolean;
};

export async function getAllGalleryItems(category?: string): Promise<GalleryRow[]> {
  return prisma.galleryItem.findMany({
    where: { isActive: true, ...(category ? { category } : {}) },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}
