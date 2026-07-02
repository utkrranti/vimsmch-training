"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveAnnouncement(
  id: string | null,
  data: { title: string; body: string; isActive: boolean }
) {
  if (id) {
    await prisma.announcement.update({ where: { id }, data });
  } else {
    await prisma.announcement.create({ data });
  }
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}

export async function deleteAnnouncement(id: string) {
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}

export async function toggleAnnouncementActive(id: string, isActive: boolean) {
  await prisma.announcement.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}
