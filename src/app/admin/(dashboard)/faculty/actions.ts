"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveFaculty(
  id: string | null,
  data: {
    name: string;
    designation: string;
    qualification: string;
    experience: string;
    specialization: string;
    department: string;
    bio: string;
    photoUrl: string;
    sortOrder: number;
    isActive: boolean;
  }
) {
  const payload = {
    name: data.name,
    designation: data.designation,
    qualification: data.qualification || null,
    experience: data.experience || null,
    specialization: data.specialization || null,
    department: data.department || null,
    bio: data.bio || null,
    photoUrl: data.photoUrl || null,
    sortOrder: data.sortOrder,
    isActive: data.isActive,
  };

  if (id) {
    await prisma.faculty.update({ where: { id }, data: payload });
  } else {
    await prisma.faculty.create({ data: payload });
  }
  revalidatePath("/admin/faculty");
  revalidatePath("/faculty");
}

export async function deleteFaculty(id: string) {
  await prisma.faculty.delete({ where: { id } });
  revalidatePath("/admin/faculty");
  revalidatePath("/faculty");
}

export async function toggleFacultyActive(id: string, isActive: boolean) {
  await prisma.faculty.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/faculty");
  revalidatePath("/faculty");
}
