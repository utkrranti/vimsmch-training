"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveAnnouncement(
  id: string | null,
  data: { title: string; body: string; attachmentUrl: string; isActive: boolean }
) {
  const payload = {
    title: data.title,
    body: data.body,
    attachmentUrl: data.attachmentUrl || null,
    isActive: data.isActive,
  };
  if (id) {
    await prisma.announcement.update({ where: { id }, data: payload });
  } else {
    await prisma.announcement.create({ data: payload });
  }
  revalidatePath("/admin/announcements");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function deleteAnnouncement(id: string) {
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/admin/announcements");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function toggleAnnouncementActive(id: string, isActive: boolean) {
  await prisma.announcement.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/announcements");
  revalidatePath("/news");
  revalidatePath("/");
}
