import { prisma } from "@/lib/prisma";

export type FacultyRow = {
  id: string;
  name: string;
  designation: string;
  designationMr?: string | null;
  qualification: string | null;
  qualificationMr?: string | null;
  experience: string | null;
  experienceMr?: string | null;
  specialization: string | null;
  specializationMr?: string | null;
  department: string | null;
  departmentMr?: string | null;
  bio: string | null;
  bioMr?: string | null;
  photoUrl: string | null;
  isActive: boolean;
  sortOrder: number;
};

export async function getAllFaculty(): Promise<FacultyRow[]> {
  const rows = await prisma.faculty.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows;
}
