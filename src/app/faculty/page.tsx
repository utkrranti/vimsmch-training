import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllFaculty } from "@/lib/db/faculty";
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
  const faculty = await getAllFaculty();

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
            <p className="text-xs text-white/50 mb-3">Home / Faculty</p>
            <span className="eyebrow eyebrow-light mb-4">Meet the Team</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">Our Faculty</h1>
          </div>
        </div>

        {/* Intro strip */}
        <div className="bg-[#04415f]/5 border-b border-[#04415f]/15 py-3 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-xs text-[#010608]/60">
            <span className="text-[#04415f] font-semibold">Qualified Educators: </span>
            All programme coordinators are qualified medical professionals and subject-matter experts with clinical and teaching experience.
          </div>
        </div>

        {/* Faculty grid */}
        <section className="bg-[#f1f5f7] py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {faculty.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#e6edf0]">
                <UserCircle2 size={40} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium">Faculty details will be published shortly.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {faculty.map((f) => (
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
                        <p className="text-[#04415f] text-xs font-medium leading-snug">{f.designation}</p>
                        {f.department && <p className="text-[#010608]/50 text-xs mt-0.5">{f.department}</p>}
                      </div>
                    </div>

                    {(f.qualification || f.experience || f.specialization) && (
                      <div className="px-6 pb-4 space-y-1.5 text-xs">
                        {f.qualification && (
                          <p><span className="text-[#010608]/40">Qualification: </span><span className="text-[#010608]/70 font-medium">{f.qualification}</span></p>
                        )}
                        {f.specialization && (
                          <p><span className="text-[#010608]/40">Specialization: </span><span className="text-[#010608]/70 font-medium">{f.specialization}</span></p>
                        )}
                        {f.experience && (
                          <p><span className="text-[#010608]/40">Experience: </span><span className="text-[#010608]/70 font-medium">{f.experience}</span></p>
                        )}
                      </div>
                    )}

                    {f.bio && (
                      <div className="px-6 pb-6 border-t border-[#e6edf0] pt-4">
                        <p className="text-[#010608]/60 text-xs leading-relaxed">{f.bio}</p>
                      </div>
                    )}
                  </div>
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
