import { prisma } from "@/lib/prisma";

export type CourseRow = {
  id: string;
  slug: string;
  title: string;
  titleMr: string | null;
  shortDesc: string;
  shortDescMr: string | null;
  fullDesc: string;
  fullDescMr: string | null;
  nsqf: number;
  durationMonths: number;
  durationHours: number;
  fees: number;
  feeBreakdown: Array<{ label: string; labelMr?: string; amount: number }>;
  seats: number;
  eligibility: string;
  eligibilityMr: string | null;
  ageLimit: string;
  ageLimitMr: string | null;
  certBy: string;
  certByMr: string | null;
  assessmentScheme: string;
  assessmentSchemeMr: string | null;
  creditEquivalence: string;
  creditEquivalenceMr: string | null;
  objectives: string[];
  objectivesMr: string[];
  highlights: string[];
  highlightsMr: string[];
  syllabus: Array<{ unit: string; unitMr?: string; topics: string[]; topicsMr?: string[] }>;
  clinicalPostings: string[];
  clinicalPostingsMr: string[];
  outcomes: string[];
  outcomesMr: string[];
  tags: string[];
  tagsMr: string[];
  category: string;
  batchMonths: string[];
  isActive: boolean;
  imageUrl: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function castCourse(row: any): CourseRow {
  return {
    ...row,
    titleMr: row.titleMr ?? null,
    shortDescMr: row.shortDescMr ?? null,
    fullDescMr: row.fullDescMr ?? null,
    eligibilityMr: row.eligibilityMr ?? null,
    ageLimitMr: row.ageLimitMr ?? null,
    certByMr: row.certByMr ?? null,
    assessmentSchemeMr: row.assessmentSchemeMr ?? null,
    creditEquivalenceMr: row.creditEquivalenceMr ?? null,
    feeBreakdown: row.feeBreakdown as Array<{ label: string; labelMr?: string; amount: number }>,
    objectives: (row.objectives as string[] | null) ?? [],
    objectivesMr: (row.objectivesMr as string[] | null) ?? [],
    highlights: (row.highlights as string[] | null) ?? [],
    highlightsMr: (row.highlightsMr as string[] | null) ?? [],
    syllabus: row.syllabus as Array<{ unit: string; unitMr?: string; topics: string[]; topicsMr?: string[] }>,
    clinicalPostings: (row.clinicalPostings as string[] | null) ?? [],
    clinicalPostingsMr: (row.clinicalPostingsMr as string[] | null) ?? [],
    outcomes: row.outcomes as string[],
    outcomesMr: (row.outcomesMr as string[] | null) ?? [],
    tags: row.tags as string[],
    tagsMr: (row.tagsMr as string[] | null) ?? [],
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
