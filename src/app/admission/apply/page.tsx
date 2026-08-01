import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdmissionWizard from "@/components/admission/AdmissionWizard";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/db/settings";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Apply for Admission | VIMSMCH Paramedical Institute" };

type PageProps = { searchParams: Promise<{ course?: string }> };

export default async function AdmissionApplyPage({ searchParams }: PageProps) {
  const { course: selectedCourseSlug } = await searchParams;
  const [courses, settings] = await Promise.all([
    prisma.course.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        fees: true,
        eligibility: true,
        durationMonths: true,
        batches: {
          where: { isActive: true },
          orderBy: { startDate: "asc" },
          select: { id: true, label: true, startDate: true, seats: true },
        },
      },
    }),
    getSettings(["admission.feeQrUrl"]),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f1f5f7]">
        <AdmissionWizard
          courses={courses.map((course) => ({
            ...course,
            batches: course.batches.map((batch) => ({ ...batch, startDate: batch.startDate.toISOString() })),
          }))}
          initialCourseId={courses.find((course) => course.slug === selectedCourseSlug)?.id}
          feeQrUrl={settings["admission.feeQrUrl"]}
        />
      </main>
      <Footer />
    </>
  );
}
