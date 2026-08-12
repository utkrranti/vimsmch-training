"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveFaculty(
  id: string | null,
  data: {
    name: string;
    designation: string;
    designationMr: string;
    qualification: string;
    qualificationMr: string;
    experience: string;
    experienceMr: string;
    specialization: string;
    specializationMr: string;
    department: string;
    departmentMr: string;
    bio: string;
    bioMr: string;
    photoUrl: string;
    sortOrder: number;
    isActive: boolean;
  }
) {
  const payload = {
    name: data.name,
    designation: data.designation,
    designationMr: data.designationMr || null,
    qualification: data.qualification || null,
    qualificationMr: data.qualificationMr || null,
    experience: data.experience || null,
    experienceMr: data.experienceMr || null,
    specialization: data.specialization || null,
    specializationMr: data.specializationMr || null,
    department: data.department || null,
    departmentMr: data.departmentMr || null,
    bio: data.bio || null,
    bioMr: data.bioMr || null,
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
