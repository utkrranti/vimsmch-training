import { prisma } from "@/lib/prisma";

export type CourseRow = {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  nsqf: number;
  durationMonths: number;
  durationHours: number;
  fees: number;
  feeBreakdown: Array<{ label: string; amount: number }>;
  seats: number;
  eligibility: string;
  ageLimit: string;
  certBy: string;
  assessmentScheme: string;
  creditEquivalence: string;
  objectives: string[];
  highlights: string[];
  syllabus: Array<{ unit: string; topics: string[] }>;
  clinicalPostings: string[];
  outcomes: string[];
  tags: string[];
  category: string;
  batchMonths: string[];
  isActive: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function castCourse(row: any): CourseRow {
  return {
    ...row,
    feeBreakdown: row.feeBreakdown as Array<{ label: string; amount: number }>,
    objectives: (row.objectives as string[] | null) ?? [],
    highlights: (row.highlights as string[] | null) ?? [],
    syllabus: row.syllabus as Array<{ unit: string; topics: string[] }>,
    clinicalPostings: (row.clinicalPostings as string[] | null) ?? [],
    outcomes: row.outcomes as string[],
    tags: row.tags as string[],
    batchMonths: row.batchMonths as string[],
  };
}

export async function getAllCourses(): Promise<CourseRow[]> {
  const rows = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(castCourse);
}

export async function getFeaturedCourses(limit = 3): Promise<CourseRow[]> {
  const rows = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
    take: limit,
  });
  return rows.map(castCourse);
}

export async function getCourseBySlug(slug: string): Promise<CourseRow | null> {
  const row = await prisma.course.findUnique({ where: { slug } });
  if (!row) return null;
  return castCourse(row);
}

export async function getAllSlugs(): Promise<string[]> {
  const rows = await prisma.course.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}
