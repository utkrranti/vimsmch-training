"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveDownload(
  id: string | null,
  data: { title: string; titleMr: string; description: string; descriptionMr: string; fileUrl: string; sortOrder: number; isActive: boolean }
) {
  const payload = {
    title: data.title,
    titleMr: data.titleMr || null,
    description: data.description || null,
    descriptionMr: data.descriptionMr || null,
    fileUrl: data.fileUrl,
    sortOrder: data.sortOrder,
    isActive: data.isActive,
  };
  if (id) {
    await prisma.downloadItem.update({ where: { id }, data: payload });
  } else {
    await prisma.downloadItem.create({ data: payload });
  }
  revalidatePath("/admin/downloads");
  revalidatePath("/downloads");
}

export async function deleteDownload(id: string) {
  await prisma.downloadItem.delete({ where: { id } });
  revalidatePath("/admin/downloads");
  revalidatePath("/downloads");
}

export async function toggleDownloadActive(id: string, isActive: boolean) {
  await prisma.downloadItem.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/downloads");
  revalidatePath("/downloads");
}
