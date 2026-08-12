import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getAllPlacements } from "@/lib/db/placements";
import { getSettingsLocalized } from "@/lib/db/settings";
import { prisma } from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { pickLocale, type AppLocale } from "@/lib/i18n/pickLocale";
import { Quote, Briefcase, UserCircle2, HeartHandshake, GraduationCap } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Placements & Outcomes | VIMSMCH Paramedical Institute",
  description: "Where VIMSMCH Paramedical Institute graduates work today — employer partners, batch outcomes, and student testimonials.",
};

export default async function PlacementsPage() {
  const locale = (await getLocale()) as AppLocale;
  const [placements, s, t] = await Promise.all([
    getAllPlacements(),
    getSettingsLocalized(["placements.about", "placements.philosophy", "placements.assistance", "placements.careerSupport"], locale),
    getTranslations("placementsPage"),
  ]);
  const defaultAbout = `${t("defaultAboutPara1")}\n\n${t("defaultAboutPara2")}`;
  const about = (s["placements.about"] || defaultAbout).split("\n\n").filter(Boolean);
  const philosophy = s["placements.philosophy"] || t("defaultPhilosophy");
  const assistance = s["placements.assistance"] || t("defaultAssistance");
  const defaultCareerSupport = [
    t("careerSupport1"), t("careerSupport2"), t("careerSupport3"), t("careerSupport4"),
    t("careerSupport5"), t("careerSupport6"), t("careerSupport7"),
  ];
  const careerSupport = s["placements.careerSupport"]
    ? s["placements.careerSupport"].split("\n").map((l) => l.trim()).filter(Boolean)
    : defaultCareerSupport;
  const courseIds = [...new Set(placements.map((p) => p.courseId).filter((id): id is string => !!id))];
  const courses = courseIds.length
    ? await prisma.course.findMany({ where: { id: { in: courseIds } }, select: { id: true, title: true, titleMr: true } })
    : [];
  const courseTitle = (id: string | null) => {
    const course = courses.find((c) => c.id === id);
    return course ? pickLocale(locale, course.title, course.titleMr) : undefined;
  };

  const employers = [...new Set(placements.map((p) => p.employerName).filter((e): e is string => !!e))];

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div
          className="relative text-[#011e2c] py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(90deg, #d6ecfa 0%, #a9d8f2 50%, #d6ecfa 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.06] text-[#04415f]" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-[#04415f]/60 mb-3">{t("breadcrumb")}</p>
            <span className="eyebrow mb-4">{t("eyebrow")}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#011e2c]">{t("heading")}</h1>
          </div>
        </div>

        {/* Building Careers in Healthcare */}
        <section className="bg-white py-14 sm:py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="eyebrow mb-4">{t("careersEyebrow")}</span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#011e2c] tracking-tight">{t("careersHeading")}</h2>
            </div>
            <div className="space-y-4 mb-10">
              {about.map((p, i) => (
                <p key={i} className="text-[#010608]/70 text-sm leading-relaxed">{p}</p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6">
                <div className="w-11 h-11 bg-[#04415f] rounded-xl flex items-center justify-center mb-4">
                  <HeartHandshake size={18} className="text-white" />
                </div>
                <h3 className="text-[#011e2c] font-bold text-sm mb-2">{t("philosophyTitle")}</h3>
                <p className="text-[#010608]/65 text-sm leading-relaxed">{philosophy}</p>
              </div>
              <div className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6">
                <div className="w-11 h-11 bg-[#04415f] rounded-xl flex items-center justify-center mb-4">
                  <Briefcase size={18} className="text-white" />
                </div>
                <h3 className="text-[#011e2c] font-bold text-sm mb-2">{t("assistanceTitle")}</h3>
                <p className="text-[#010608]/65 text-sm leading-relaxed">{assistance}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Career Support Services */}
        <section className="bg-[#f1f5f7] py-14 sm:py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="eyebrow mb-4">{t("whatYouGetEyebrow")}</span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#011e2c] tracking-tight">{t("careerSupportHeading")}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {careerSupport.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white border border-[#e6edf0] rounded-xl p-4">
                  <GraduationCap size={16} className="text-[#04415f] mt-0.5 shrink-0" />
                  <p className="text-[#010608]/70 text-sm leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Employer strip */}
        {employers.length > 0 && (
          <section className="bg-[#04415f] py-6 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              <span className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-widest shrink-0">
                <Briefcase size={13} /> {t("graduatesWorkAt")}
              </span>
              {employers.map((e) => (
                <span key={e} className="text-white/85 text-sm font-medium">{e}</span>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section className="bg-[#f1f5f7] py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                {t("testimonialsEyebrow")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-3">{t("testimonialsHeading")}</h2>
              <p className="text-[#010608]/60 text-sm max-w-xl mx-auto">
                {t("testimonialsSub")}
              </p>
            </div>

            {placements.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#e6edf0]">
                <UserCircle2 size={32} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium text-sm">{t("empty")}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {placements.map((p, i) => {
                  const quote = p.quote ? pickLocale(locale, p.quote, p.quoteMr) : null;
                  return (
                  <Reveal key={p.id} delay={(i % 6) * 0.06}>
                    <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-6 h-full flex flex-col">
                      {quote && (
                        <>
                          <Quote size={22} className="text-[#04415f]/25 mb-3" />
                          <p className="text-[#010608]/70 text-sm leading-relaxed mb-5 flex-1">{quote}</p>
                        </>
                      )}
                      <div className="border-t border-[#e6edf0] pt-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#04415f]/10 flex items-center justify-center shrink-0">
                          <UserCircle2 size={20} className="text-[#04415f]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#011e2c] font-semibold text-sm truncate">{p.studentName}</p>
                          <p className="text-[#010608]/50 text-xs truncate">
                            {p.employerName || courseTitle(p.courseId) || t("vimsmchGraduate")}
                            {p.batchYear ? ` · ${p.batchYear}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
