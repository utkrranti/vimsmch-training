import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllFaculty } from "@/lib/db/faculty";
import { getLocale, getTranslations } from "next-intl/server";
import { pickLocale, type AppLocale } from "@/lib/i18n/pickLocale";
import { UserCircle2 } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Faculty | VIMSMCH Paramedical Institute",
  description:
    "Meet the qualified faculty and programme coordinators of VIMSMCH Paramedical Institute.",
};

export default async function FacultyPage() {
  const [faculty, locale, t] = await Promise.all([
    getAllFaculty(),
    getLocale() as Promise<AppLocale>,
    getTranslations("facultyPage"),
  ]);

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

        {/* Intro strip */}
        <div className="bg-[#04415f]/5 border-b border-[#04415f]/15 py-3 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-xs text-[#010608]/60">
            <span className="text-[#04415f] font-semibold">{t("qualifiedEducatorsLabel")} </span>
            {t("qualifiedEducatorsText")}
          </div>
        </div>

        {/* Faculty grid */}
        <section className="bg-[#f1f5f7] py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {faculty.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#e6edf0]">
                <UserCircle2 size={40} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium">{t("empty")}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {faculty.map((f) => {
                  const designation = pickLocale(locale, f.designation, f.designationMr);
                  const department = f.department ? pickLocale(locale, f.department, f.departmentMr) : null;
                  const qualification = f.qualification ? pickLocale(locale, f.qualification, f.qualificationMr) : null;
                  const specialization = f.specialization ? pickLocale(locale, f.specialization, f.specializationMr) : null;
                  const experience = f.experience ? pickLocale(locale, f.experience, f.experienceMr) : null;
                  const bio = f.bio ? pickLocale(locale, f.bio, f.bioMr) : null;
                  return (
                  <div
                    key={f.id}
                    className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Photo / Avatar */}
                    <div className="h-1 bg-[#04415f]" />
                    <div className="px-6 pt-6 pb-5 flex items-start gap-4">
                      {f.photoUrl ? (
                        <Image
                          src={f.photoUrl}
                          alt={f.name}
                          width={72}
                          height={72}
                          className="w-[72px] h-[72px] rounded-xl object-cover shrink-0 border-2 border-[#e6edf0]"
                        />
                      ) : (
                        <div className="w-[72px] h-[72px] rounded-xl bg-[#04415f]/8 border-2 border-[#e6edf0] flex items-center justify-center shrink-0">
                          <UserCircle2 size={36} className="text-[#04415f]/40" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-[#011e2c] font-bold text-sm leading-snug mb-1">{f.name}</h3>
                        <p className="text-[#04415f] text-xs font-medium leading-snug">{designation}</p>
                        {department && <p className="text-[#010608]/50 text-xs mt-0.5">{department}</p>}
                      </div>
                    </div>

                    {(qualification || experience || specialization) && (
                      <div className="px-6 pb-4 space-y-1.5 text-xs">
                        {qualification && (
                          <p><span className="text-[#010608]/40">{t("qualificationLabel")} </span><span className="text-[#010608]/70 font-medium">{qualification}</span></p>
                        )}
                        {specialization && (
                          <p><span className="text-[#010608]/40">{t("specializationLabel")} </span><span className="text-[#010608]/70 font-medium">{specialization}</span></p>
                        )}
                        {experience && (
                          <p><span className="text-[#010608]/40">{t("experienceLabel")} </span><span className="text-[#010608]/70 font-medium">{experience}</span></p>
                        )}
                      </div>
                    )}

                    {bio && (
                      <div className="px-6 pb-6 border-t border-[#e6edf0] pt-4">
                        <p className="text-[#010608]/60 text-xs leading-relaxed">{bio}</p>
                      </div>
                    )}
                  </div>
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
