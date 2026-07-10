import UGCTopBar from "@/components/layout/UGCTopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getAllPlacements } from "@/lib/db/placements";
import { prisma } from "@/lib/prisma";
import { Quote, Briefcase, UserCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Placements & Outcomes | VIMSMCH Vocational Training",
  description: "Where VIMSMCH Vocational Training graduates work today — employer partners, batch outcomes, and student testimonials.",
};

export default async function PlacementsPage() {
  const placements = await getAllPlacements();
  const courseIds = [...new Set(placements.map((p) => p.courseId).filter((id): id is string => !!id))];
  const courses = courseIds.length
    ? await prisma.course.findMany({ where: { id: { in: courseIds } }, select: { id: true, title: true } })
    : [];
  const courseTitle = (id: string | null) => courses.find((c) => c.id === id)?.title;

  const employers = [...new Set(placements.map((p) => p.employerName).filter((e): e is string => !!e))];

  return (
    <>
      <UGCTopBar />
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-8 sm:py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-2">Home / Placements &amp; Outcomes</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-1">Placements &amp; Outcomes</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

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
