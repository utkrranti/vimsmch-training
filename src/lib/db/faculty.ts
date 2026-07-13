import { prisma } from "@/lib/prisma";

export type FacultyRow = {
  id: string;
  name: string;
  designation: string;
  qualification: string | null;
  experience: string | null;
  specialization: string | null;
  department: string | null;
  bio: string | null;
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
