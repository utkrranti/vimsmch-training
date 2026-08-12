import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/db/courses";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseInquiryForm from "@/components/courses/CourseInquiryForm";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { pickLocale, type AppLocale } from "@/lib/i18n/pickLocale";
import { ChevronLeft, Clock, Users, IndianRupee, Award, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `Enquire about ${course.title} | VIMSMCH Paramedical Institute`,
    description: `Submit your enquiry for ${course.title}. Our counsellor will contact you within 1 working day.`,
  };
}

export default async function EnquirePage({ params }: Props) {
  const { slug } = await params;
  const [course, locale, t] = await Promise.all([
    getCourseBySlug(slug),
    getLocale() as Promise<AppLocale>,
    getTranslations("enquirePage"),
  ]);
  if (!course) notFound();

  const title = pickLocale(locale, course.title, course.titleMr);
  const shortDesc = pickLocale(locale, course.shortDesc, course.shortDescMr);
  const eligibility = pickLocale(locale, course.eligibility, course.eligibilityMr);
  const certBy = pickLocale(locale, course.certBy, course.certByMr);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f1f5f7] min-h-screen">

        {/* Page header */}
        <div className="bg-[#04415f] text-white py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium transition-colors mb-5"
            >
              <ChevronLeft size={14} /> {t("backToCourse")}
            </Link>

            {/* Course name — prominent, so student knows they selected the right course */}
            <div className="flex items-start gap-4">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-3 shrink-0 mt-1">
                <CheckCircle size={24} className="text-[#7dd3fc]" />
              </div>
              <div>
                <p className="text-white/55 text-xs uppercase tracking-widest font-semibold mb-2">{t("enquiringAbout")}</p>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3 text-white">{title}</h1>
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="bg-white/15 border border-white/20 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Clock size={11} /> {t("months", { count: course.durationMonths })}
                  </span>
                  <span className="bg-white/15 border border-white/20 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Users size={11} /> {t("seatsPerBatch", { count: course.seats })}
                  </span>
                  <span className="bg-white/15 border border-white/20 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Award size={11} /> {certBy}
                  </span>
                  <span className="bg-white/15 border border-white/20 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <IndianRupee size={11} /> {t("perYearProvisional", { fees: course.fees.toLocaleString("en-IN") })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-5 gap-10">

          {/* Form — takes up 3 cols */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-[#011e2c] mb-1">{t("submitYourEnquiry")}</h2>
            <div className="w-10 h-0.5 bg-[#2086b8] mb-6" />
            <p className="text-[#010608]/55 text-sm mb-7">
              {t("formIntro")} <strong className="text-[#011e2c]">{t("oneWorkingDay")}</strong>.
            </p>
            <CourseInquiryForm courseId={course.id} courseTitle={title} />
          </div>

          {/* Sidebar — course summary, 2 cols */}
          <div className="lg:col-span-2 space-y-5">

            {/* Course card */}
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
              <div className="h-1 bg-[#04415f]" />
              <div className="p-5">
                <p className="text-[10px] text-[#010608]/40 uppercase tracking-widest font-semibold mb-2">{t("selectedCourseLabel")}</p>
                <h3 className="text-[#011e2c] font-bold text-base leading-snug mb-4">{title}</h3>
                <p className="text-[#010608]/60 text-xs leading-relaxed mb-4">{shortDesc}</p>
                <div className="space-y-2.5 text-xs text-[#010608]/65 border-t border-[#e6edf0] pt-4">
                  <div className="flex justify-between">
                    <span className="text-[#010608]/40">{t("durationLabel")}</span>
                    <span className="font-medium text-[#011e2c]">{t("months", { count: course.durationMonths })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#010608]/40">{t("eligibilityLabel")}</span>
                    <span className="font-medium text-[#011e2c] text-right max-w-[55%] leading-snug">{eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#010608]/40">{t("certifiedByLabel")}</span>
                    <span className="font-medium text-[#011e2c]">{certBy}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#e6edf0]">
                    <span className="text-[#010608]/40">{t("feeProvisionalLabel")}</span>
                    <span className="font-bold text-[#04415f] text-sm">₹{course.fees.toLocaleString("en-IN")}{t("perYear")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Batch months */}
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-5">
              <p className="text-[10px] text-[#010608]/40 uppercase tracking-widest font-semibold mb-3">{t("batchStartMonthsLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {course.batchMonths.map((m) => (
                  <span key={m} className="text-xs bg-[#f1f5f7] border border-[#cdd8de] text-[#010608]/60 px-2.5 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* What to expect */}
            <div className="bg-[#04415f]/5 border border-[#04415f]/15 rounded-2xl p-5">
              <p className="text-[10px] text-[#04415f] uppercase tracking-widest font-semibold mb-3">{t("whatHappensNext")}</p>
              <ul className="space-y-2.5">
                {[
                  t("step1"),
                  t("step2"),
                  t("step3"),
                  t("step4"),
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#010608]/65">
                    <span className="w-4 h-4 rounded-full bg-[#04415f] text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not the right course? */}
            <div className="text-center">
              <p className="text-[#010608]/40 text-xs mb-2">{t("notRightCourse")}</p>
              <Link
                href="/courses"
                className="text-[#04415f] hover:text-[#2086b8] text-xs font-semibold transition-colors"
              >
                {t("browseAllCourses")}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
