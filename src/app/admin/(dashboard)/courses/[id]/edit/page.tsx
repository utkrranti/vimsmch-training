import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CourseForm from "../../CourseForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit Course | Admin" };

type PageProps = { params: Promise<{ id: string }> };

export default async function EditCoursePage({ params }: PageProps) {
  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) notFound();

  const initial = {
    slug: course.slug,
    title: course.title,
    titleMr: course.titleMr ?? "",
    shortDesc: course.shortDesc,
    shortDescMr: course.shortDescMr ?? "",
    fullDesc: course.fullDesc,
    fullDescMr: course.fullDescMr ?? "",
    nsqf: course.nsqf,
    durationMonths: course.durationMonths,
    durationHours: course.durationHours,
    fees: course.fees,
    feeBreakdown: course.feeBreakdown as { label: string; labelMr?: string; amount: number }[],
    seats: course.seats,
    eligibility: course.eligibility,
    eligibilityMr: course.eligibilityMr ?? "",
    ageLimit: course.ageLimit,
    ageLimitMr: course.ageLimitMr ?? "",
    certBy: course.certBy,
    certByMr: course.certByMr ?? "",
    assessmentScheme: course.assessmentScheme,
    assessmentSchemeMr: course.assessmentSchemeMr ?? "",
    creditEquivalence: course.creditEquivalence,
    creditEquivalenceMr: course.creditEquivalenceMr ?? "",
    objectives: (course.objectives as string[] | null) ?? [],
    objectivesMr: (course.objectivesMr as string[] | null) ?? [],
    highlights: (course.highlights as string[] | null) ?? [],
    highlightsMr: (course.highlightsMr as string[] | null) ?? [],
    syllabus: course.syllabus as { unit: string; unitMr?: string; topics: string[]; topicsMr?: string[] }[],
    clinicalPostings: (course.clinicalPostings as string[] | null) ?? [],
    clinicalPostingsMr: (course.clinicalPostingsMr as string[] | null) ?? [],
    outcomes: course.outcomes as string[],
    outcomesMr: (course.outcomesMr as string[] | null) ?? [],
    tags: course.tags as string[],
    tagsMr: (course.tagsMr as string[] | null) ?? [],
    category: course.category,
    batchMonths: course.batchMonths as string[],
    isActive: course.isActive,
    imageUrl: course.imageUrl ?? "",
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/courses" className="inline-flex items-center gap-1.5 text-xs text-[#010608]/45 hover:text-[#04415f] font-medium transition-colors mb-3">
          <ChevronLeft size={14} /> Back to Courses
        </Link>
        <h1 className="text-2xl font-bold text-[#011e2c]">Edit Course</h1>
        <p className="text-[#010608]/45 text-sm mt-1 font-medium text-[#04415f]">{course.title}</p>
      </div>
      <CourseForm id={id} initial={initial} />
    </div>
  );
}
