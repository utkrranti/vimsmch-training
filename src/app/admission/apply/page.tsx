import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdmissionWizard from "@/components/admission/AdmissionWizard";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/db/settings";
import { getLocale } from "next-intl/server";
import { pickLocale, type AppLocale } from "@/lib/i18n/pickLocale";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Apply for Admission | VIMSMCH Paramedical Institute" };

type PageProps = { searchParams: Promise<{ course?: string }> };

export default async function AdmissionApplyPage({ searchParams }: PageProps) {
  const { course: selectedCourseSlug } = await searchParams;
  const [locale, courses, settings] = await Promise.all([
    getLocale() as Promise<AppLocale>,
    prisma.course.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        titleMr: true,
        fees: true,
        eligibility: true,
        eligibilityMr: true,
        durationMonths: true,
        batches: {
          where: { isActive: true },
          orderBy: { startDate: "asc" },
          select: { id: true, label: true, labelMr: true, startDate: true, seats: true },
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
            id: course.id,
            slug: course.slug,
            title: pickLocale(locale, course.title, course.titleMr),
            fees: course.fees,
            eligibility: pickLocale(locale, course.eligibility, course.eligibilityMr),
            durationMonths: course.durationMonths,
            batches: course.batches.map((batch) => ({
              id: batch.id,
              label: pickLocale(locale, batch.label, batch.labelMr),
              startDate: batch.startDate.toISOString(),
              seats: batch.seats,
            })),
          }))}
          initialCourseId={courses.find((course) => course.slug === selectedCourseSlug)?.id}
          feeQrUrl={settings["admission.feeQrUrl"]}
        />
      </main>
      <Footer />
    </>
  );
}
