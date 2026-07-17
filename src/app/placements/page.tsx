import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getAllPlacements } from "@/lib/db/placements";
import { getSettings } from "@/lib/db/settings";
import { prisma } from "@/lib/prisma";
import { Quote, Briefcase, UserCircle2, HeartHandshake, GraduationCap } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Placements & Outcomes | VIMSMCH Paramedical Institute",
  description: "Where VIMSMCH Paramedical Institute graduates work today — employer partners, batch outcomes, and student testimonials.",
};

const DEFAULT_ABOUT = `At Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute, we believe that vocational education should lead directly to meaningful employment. Our one-year certificate programmes are designed to develop competent, confident and industry-ready paramedical professionals through a blend of classroom instruction, laboratory practice and extensive clinical training.

The Institute is closely associated with Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital, Ahilyanagar, a renowned multispecialty teaching hospital. This enables students to gain valuable hands-on experience in real clinical settings under the guidance of experienced doctors, nurses and allied healthcare professionals.`;

const DEFAULT_PHILOSOPHY = "Our objective is to ensure that every student completes the programme with the knowledge, practical skills and professional attitude required by modern healthcare institutions. We strive to enhance employability through continuous skill development, career guidance and practical exposure.";

const DEFAULT_ASSISTANCE = "Outstanding students demonstrating professional competence, discipline and satisfactory performance may be considered for suitable employment opportunities in Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital, subject to vacancies and institutional requirements.";

const DEFAULT_CAREER_SUPPORT = [
  "Career counselling and guidance",
  "Personality development programmes",
  "Communication and soft skills training",
  "Interview preparation and mock interviews",
  "Resume and curriculum vitae (CV) preparation",
  "Professional ethics and workplace behaviour",
  "Guidance on career opportunities in the healthcare sector",
];

export default async function PlacementsPage() {
  const placements = await getAllPlacements();
  const s = await getSettings(["placements.about", "placements.philosophy", "placements.assistance", "placements.careerSupport"]);
  const about = (s["placements.about"] || DEFAULT_ABOUT).split("\n\n").filter(Boolean);
  const philosophy = s["placements.philosophy"] || DEFAULT_PHILOSOPHY;
  const assistance = s["placements.assistance"] || DEFAULT_ASSISTANCE;
  const careerSupport = s["placements.careerSupport"]
    ? s["placements.careerSupport"].split("\n").map((l) => l.trim()).filter(Boolean)
    : DEFAULT_CAREER_SUPPORT;
  const courseIds = [...new Set(placements.map((p) => p.courseId).filter((id): id is string => !!id))];
  const courses = courseIds.length
    ? await prisma.course.findMany({ where: { id: { in: courseIds } }, select: { id: true, title: true } })
    : [];
  const courseTitle = (id: string | null) => courses.find((c) => c.id === id)?.title;

  const employers = [...new Set(placements.map((p) => p.employerName).filter((e): e is string => !!e))];

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div
          className="relative text-white py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #011e2c 0%, #04415f 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-white/50 mb-3">Home / Placements &amp; Outcomes</p>
            <span className="eyebrow eyebrow-light mb-4">Success Stories</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">Placements &amp; Outcomes</h1>
          </div>
        </div>

        {/* Building Careers in Healthcare */}
        <section className="bg-white py-14 sm:py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="eyebrow mb-4">Building Careers in Healthcare</span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#011e2c] tracking-tight">Your Career Begins Here</h2>
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
                <h3 className="text-[#011e2c] font-bold text-sm mb-2">Our Placement Philosophy</h3>
                <p className="text-[#010608]/65 text-sm leading-relaxed">{philosophy}</p>
              </div>
              <div className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6">
                <div className="w-11 h-11 bg-[#04415f] rounded-xl flex items-center justify-center mb-4">
                  <Briefcase size={18} className="text-white" />
                </div>
                <h3 className="text-[#011e2c] font-bold text-sm mb-2">Placement Assistance &amp; Career Opportunities</h3>
                <p className="text-[#010608]/65 text-sm leading-relaxed">{assistance}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Career Support Services */}
        <section className="bg-[#f1f5f7] py-14 sm:py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="eyebrow mb-4">What You Get</span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#011e2c] tracking-tight">Career Support Services</h2>
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
                <Briefcase size={13} /> Our Graduates Work At
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
                Success Stories
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-3">Where Our Students Went</h2>
              <p className="text-[#010608]/60 text-sm max-w-xl mx-auto">
                Real outcomes from real graduates of our vocational training programmes.
              </p>
            </div>

            {placements.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#e6edf0]">
                <UserCircle2 size={32} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium text-sm">Placement stories will be published shortly.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {placements.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 6) * 0.06}>
                    <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-6 h-full flex flex-col">
                      {p.quote && (
                        <>
                          <Quote size={22} className="text-[#04415f]/25 mb-3" />
                          <p className="text-[#010608]/70 text-sm leading-relaxed mb-5 flex-1">{p.quote}</p>
                        </>
                      )}
                      <div className="border-t border-[#e6edf0] pt-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#04415f]/10 flex items-center justify-center shrink-0">
                          <UserCircle2 size={20} className="text-[#04415f]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#011e2c] font-semibold text-sm truncate">{p.studentName}</p>
                          <p className="text-[#010608]/50 text-xs truncate">
                            {p.employerName || courseTitle(p.courseId) || "VIMSMCH Graduate"}
                            {p.batchYear ? ` · ${p.batchYear}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
