"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveGalleryItem(
  id: string | null,
  data: { imageUrl: string; caption: string; category: string; courseId: string; sortOrder: number; isActive: boolean }
) {
  const payload = {
    imageUrl: data.imageUrl,
    caption: data.caption || null,
    category: data.category,
    courseId: data.courseId || null,
    sortOrder: data.sortOrder,
    isActive: data.isActive,
  };
  if (id) {
    await prisma.galleryItem.update({ where: { id }, data: payload });
  } else {
    await prisma.galleryItem.create({ data: payload });
  }
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/facilities");
}

export async function deleteGalleryItem(id: string) {
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/facilities");
}

export async function toggleGalleryItemActive(id: string, isActive: boolean) {
  await prisma.galleryItem.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/facilities");
}
