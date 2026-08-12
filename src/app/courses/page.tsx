import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseGrid from "@/components/courses/CourseGrid";
import Reveal from "@/components/ui/Reveal";
import { getAllCourses } from "@/lib/db/courses";
import { getTranslations } from "next-intl/server";
import { HeartPulse, BedDouble, GraduationCap, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate Courses | VIMSMCH Paramedical Institute",
  description:
    "Browse one-year paramedical certificate courses in healthcare and allied sciences at VIMSMCH's Paramedical Institute.",
};

export default async function CoursesPage() {
  const [courses, t] = await Promise.all([getAllCourses(), getTranslations("coursesPage")]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Page title breadcrumb */}
        <div
          className="relative text-white py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(90deg, #04415f 0%, #2086b8 50%, #04415f 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-white/50 mb-3">{t("breadcrumb")}</p>
            <span className="eyebrow eyebrow-light mb-4">{t("eyebrow")}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">{t("heading")}</h1>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white border-b border-[#e6edf0] py-14 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-stretch">
                <div className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-7 sm:p-9">
                  <span className="eyebrow mb-4">{t("aboutEyebrow")}</span>
                  <p className="text-[#010608]/70 text-sm leading-relaxed mb-4">
                    {t("aboutPara1")}
                  </p>
                  <p className="text-[#010608]/70 text-sm leading-relaxed">
                    {t("aboutPara2")}
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  {[
                    { icon: GraduationCap, value: "5", label: t("statCourses") },
                    { icon: BedDouble, value: "800+", label: t("statBeds") },
                    { icon: HeartPulse, value: "25+", label: t("statDepartments") },
                    { icon: ShieldCheck, value: t("durationValue"), label: t("statDuration") },
                  ].map((f) => (
                    <div key={f.label} className="bg-[#04415f] rounded-2xl p-5 text-white flex items-center gap-4">
                      <f.icon size={20} className="text-[#7dd3fc] shrink-0" />
                      <div>
                        <p className="font-display text-xl font-semibold leading-none">{f.value}</p>
                        <p className="text-white/60 text-[11px] mt-1 leading-snug">{f.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Fee disclosure */}
        <div className="bg-[#04415f]/5 border-b border-[#04415f]/15 py-3 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-x-8 gap-y-1 text-xs text-[#010608]/60">
            <span>
              <span className="text-[#04415f] font-semibold">{t("feeDisclosureLabel")} </span>
              {t("feeDisclosureText")}
            </span>
            <span>
              <span className="text-[#04415f] font-semibold">{t("certificatesLabel")} </span>
              {t("certificatesText")}
            </span>
          </div>
        </div>

        {/* Courses grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <CourseGrid courses={courses} />
        </div>
      </main>
      <Footer />
    </>
  );
}
