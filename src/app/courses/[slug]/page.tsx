import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseInquiryForm from "@/components/courses/CourseInquiryForm";
import { getCourseBySlug, getAllSlugs } from "@/lib/db/courses";
import { getCourseImage } from "@/lib/course-images";
import { getLocale, getTranslations } from "next-intl/server";
import { pickLocale, pickLocaleArray, pickLocaleFeeBreakdown, pickLocaleSyllabus, type AppLocale } from "@/lib/i18n/pickLocale";
import { Clock, Users, IndianRupee, CheckCircle, CalendarDays, Award, Target, Stethoscope, Briefcase } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.title} | VIMSMCH Paramedical Institute`,
    description: course.shortDesc,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const [course, locale, t] = await Promise.all([
    getCourseBySlug(slug),
    getLocale() as Promise<AppLocale>,
    getTranslations("courseDetailPage"),
  ]);
  if (!course) notFound();

  const title = pickLocale(locale, course.title, course.titleMr);
  const fullDesc = pickLocale(locale, course.fullDesc, course.fullDescMr);
  const eligibility = pickLocale(locale, course.eligibility, course.eligibilityMr);
  const ageLimit = pickLocale(locale, course.ageLimit, course.ageLimitMr);
  const certBy = pickLocale(locale, course.certBy, course.certByMr);
  const assessmentScheme = pickLocale(locale, course.assessmentScheme, course.assessmentSchemeMr);
  const objectives = pickLocaleArray(locale, course.objectives, course.objectivesMr);
  const highlights = pickLocaleArray(locale, course.highlights, course.highlightsMr);
  const clinicalPostings = pickLocaleArray(locale, course.clinicalPostings, course.clinicalPostingsMr);
  const outcomes = pickLocaleArray(locale, course.outcomes, course.outcomesMr);
  const tags = pickLocaleArray(locale, course.tags, course.tagsMr);
  const feeBreakdown = pickLocaleFeeBreakdown(locale, course.feeBreakdown);
  const syllabus = pickLocaleSyllabus(locale, course.syllabus);
  const feeTotal = feeBreakdown.reduce((s, f) => s + f.amount, 0);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Page title */}
        <div
          className="relative text-white py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #206f9c 0%, #3fa0cc 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-white/50 mb-3">{t("breadcrumbPrefix")}{title}</p>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-[#7dd3fc] text-[#011e2c] text-xs font-bold px-3 py-1 rounded-full">
                {t("oneYearBadge")}
              </span>
              <span className="bg-white/10 border border-white/20 text-white text-xs px-3 py-1 rounded-full capitalize">
                {course.category}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-6 tracking-tight text-white">{title}</h1>
            <div className="flex flex-wrap gap-6">
              <QuickStat icon={Clock} label={t("durationLabel")} value={t("months", { count: course.durationMonths })} light />
              <QuickStat icon={Users} label={t("seatsLabel")} value={t("seatsPerBatch", { count: course.seats })} light />
              <QuickStat icon={Award} label={t("certifiedByLabel")} value={certBy} light />
              <QuickStat icon={CalendarDays} label={t("batchesLabel")} value={course.batchMonths.join(" · ")} light />
            </div>
          </div>
        </div>

        {/* Photo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-1">
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-sm mt-8">
            <Image src={course.imageUrl || getCourseImage(course.slug)} alt={title} fill sizes="100vw" className="object-cover" priority />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-10">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <Section title={t("overviewTitle")}>
              <p className="text-[#010608]/70 text-sm leading-relaxed">{fullDesc}</p>
            </Section>

            {/* Course Objectives */}
            <Section title={t("objectivesTitle")}>
              <div className="grid sm:grid-cols-2 gap-3">
                {objectives.map((o) => (
                  <div key={o} className="flex items-start gap-2.5 bg-white border border-[#e6edf0] rounded-xl p-4 shadow-sm">
                    <Target size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                    <p className="text-[#010608]/70 text-sm leading-snug">{o}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Eligibility */}
            <Section title={t("eligibilityTitle")}>
              <div className="grid sm:grid-cols-3 gap-4">
                <DetailBox label={t("minQualificationLabel")} value={eligibility} />
                <DetailBox label={t("ageLimitLabel")} value={ageLimit} />
                <DetailBox label={t("certifiedByLabel2")} value={certBy} />
              </div>
            </Section>

            {/* Fee breakdown */}
            <Section title={t("feeStructureTitle")}>
              <div className="bg-white rounded-2xl border border-[#e6edf0] overflow-hidden shadow-sm">
                <div className="px-5 py-3 bg-[#04415f]/5 border-b border-[#e6edf0]">
                  <p className="text-xs text-[#04415f] font-medium">
                    {t("feeNote")}
                  </p>
                </div>
                <table className="w-full">
                  <tbody>
                    {feeBreakdown.map((f, i) => (
                      <tr key={f.label} className={`border-b border-[#e6edf0] ${i % 2 === 0 ? "bg-white" : "bg-[#f1f5f7]"}`}>
                        <td className="px-5 py-3.5 text-sm text-[#010608]/70">{f.label}</td>
                        <td className="px-5 py-3.5 text-sm text-[#011e2c] font-medium text-right">
                          <span className="flex items-center justify-end gap-0.5">
                            <IndianRupee size={12} className="text-[#04415f]" />
                            {f.amount.toLocaleString("en-IN")}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-[#04415f] text-white">
                      <td className="px-5 py-4 font-bold text-sm">{t("totalCourseFee")}</td>
                      <td className="px-5 py-4 text-right">
                        <span className="flex items-center justify-end gap-0.5 font-bold text-lg">
                          <IndianRupee size={15} />
                          {feeTotal.toLocaleString("en-IN")}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Assessment */}
            <Section title={t("assessmentTitle")}>
              <div className="bg-white rounded-2xl border-l-4 border-[#04415f] p-6 shadow-sm">
                <p className="text-[#010608]/70 text-sm leading-relaxed">{assessmentScheme}</p>
              </div>
            </Section>

            {/* Course Highlights */}
            <Section title={t("highlightsTitle")}>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5 bg-white border border-[#e6edf0] rounded-xl p-4 shadow-sm">
                    <CheckCircle size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                    <p className="text-[#010608]/70 text-sm leading-snug">{h}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Skills You Will Learn */}
            <Section title={t("skillsLearnTitle")}>
              <div className="space-y-3">
                {syllabus.map((unit, i) => (
                  <details
                    key={unit.unit}
                    className="bg-white border border-[#e6edf0] rounded-xl overflow-hidden shadow-sm group"
                    open={syllabus.length === 1}
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-[#f1f5f7] transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-[#04415f] rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-[#011e2c] font-semibold text-sm">{unit.unit}</span>
                      </div>
                    </summary>
                    <div className="px-5 pb-5 border-t border-[#e6edf0] pt-4 bg-[#f1f5f7]">
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {unit.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2 text-sm text-[#010608]/65">
                            <CheckCircle size={13} className="text-[#04415f] mt-0.5 shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </Section>

            {/* Clinical Training */}
            <Section title={t("clinicalTrainingTitle")}>
              <p className="text-[#010608]/60 text-sm mb-4">{t("clinicalTrainingIntro")}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {clinicalPostings.map((c) => (
                  <div key={c} className="flex items-start gap-2.5 bg-white border border-[#e6edf0] rounded-xl p-4 shadow-sm">
                    <Stethoscope size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                    <p className="text-[#010608]/70 text-sm leading-snug">{c}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Career Opportunities */}
            <Section title={t("careerOpportunitiesTitle")}>
              <div className="grid sm:grid-cols-2 gap-4">
                {outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-3 bg-white border border-[#e6edf0] rounded-xl p-4 shadow-sm">
                    <Briefcase size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                    <p className="text-[#010608]/70 text-sm leading-snug">{o}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Fee card */}
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-6 sticky top-20">
              <div className="flex items-center gap-0.5 mb-1">
                <IndianRupee size={20} className="text-[#04415f]" />
                <span className="text-3xl font-bold text-[#011e2c]">
                  {course.fees.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[#010608]/40 text-xs mb-5">{t("perYearNote")}</p>
              <div className="space-y-2 text-xs text-[#010608]/60 mb-5 border-t border-[#e6edf0] pt-5">
                <p><span className="text-[#010608]/40">{t("sidebarDurationLabel")} </span>{t("months", { count: course.durationMonths })}</p>
                <p><span className="text-[#010608]/40">{t("sidebarCertifiedByLabel")} </span>{certBy}</p>
                <p><span className="text-[#010608]/40">{t("sidebarSeatsLabel")} </span>{t("seatsPerBatch", { count: course.seats })}</p>
                <p><span className="text-[#010608]/40">{t("sidebarEligibilityLabel")} </span>{eligibility}</p>
              </div>
              <Link
                href={`/enquire/${course.slug}`}
                className="block w-full bg-[#04415f] hover:bg-[#011e2c] text-white text-sm font-semibold py-3.5 rounded-lg text-center transition-colors shadow-md"
              >
                {t("enquireNow")}
              </Link>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-5">
              <p className="text-[#010608]/40 text-xs font-semibold uppercase tracking-wide mb-3">{t("skillsCoveredLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="text-xs bg-[#04415f]/8 border border-[#04415f]/20 text-[#04415f] px-2.5 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Batch months */}
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-5">
              <p className="text-[#010608]/40 text-xs font-semibold uppercase tracking-wide mb-3">{t("batchStartMonthsLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {course.batchMonths.map((m) => (
                  <span key={m} className="text-xs bg-[#f1f5f7] border border-[#cdd8de] text-[#010608]/60 px-2.5 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry form */}
        <div id="inquiry" className="bg-[#e6edf0] border-t border-[#cdd8de] py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#011e2c] mb-1">{t("inquiryHeading")}</h2>
            <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
            <p className="text-[#010608]/60 text-sm mb-8">
              {t("inquirySub")}
            </p>
            <CourseInquiryForm courseTitle={title} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#011e2c] mb-1">{title}</h2>
      <div className="w-10 h-0.5 bg-[#2086b8] mb-5" />
      {children}
    </div>
  );
}

function DetailBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-[#e6edf0] rounded-xl p-4 shadow-sm">
      <p className="text-[#010608]/40 text-xs mb-1">{label}</p>
      <p className="text-[#011e2c] text-sm font-semibold leading-snug">{value}</p>
    </div>
  );
}

function QuickStat({ icon: Icon, label, value, light }: { icon: React.ElementType; label: string; value: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className={light ? "text-[#7dd3fc] shrink-0" : "text-[#2086b8] shrink-0"} />
      <div>
        <p className={`text-[10px] uppercase tracking-wide leading-none mb-0.5 ${light ? "text-white/45" : "text-[#010608]/40"}`}>{label}</p>
        <p className={`text-xs font-semibold ${light ? "text-white" : "text-[#011e2c]"}`}>{value}</p>
      </div>
    </div>
  );
}
