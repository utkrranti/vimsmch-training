import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";
import { getAllGalleryItems } from "@/lib/db/gallery";
import { FlaskConical, Monitor, BookOpenCheck, Stethoscope, ImageOff } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Facilities | VIMSMCH Paramedical Institute",
  description: "Labs, classrooms, and practical training equipment available to VIMSMCH Paramedical Institute students.",
};

const facilities = [
  { icon: Stethoscope, title: "Clinical Skill Labs", body: "Fully equipped simulation labs for hands-on practice in OT techniques, patient care, and lab procedures — supervised by experienced faculty." },
  { icon: FlaskConical, title: "Diagnostic & Pathology Labs", body: "Real diagnostic equipment used for practical training in medical laboratory technique programmes, mirroring hospital-grade instruments." },
  { icon: Monitor, title: "Smart Classrooms", body: "Projector-enabled classrooms for theory sessions, case discussions, and multimedia learning modules." },
  { icon: BookOpenCheck, title: "Reference Library", body: "A dedicated reading room with textbooks, journals, and reference material aligned to NSQF course curricula." },
];

export default async function FacilitiesPage() {
  const photos = await getAllGalleryItems("laboratories");

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-8 sm:py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-2">Home / Facilities</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-1">Facilities</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

        {/* Facility cards */}
        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-3">Learning by Doing</h2>
              <p className="text-[#010608]/60 text-sm max-w-xl mx-auto">
                Every programme includes hands-on practical training in fully equipped labs — not just classroom theory.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.06}>
                  <div className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6 h-full">
                    <div className="w-12 h-12 bg-[#04415f] rounded-xl flex items-center justify-center mb-4">
                      <f.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-[#011e2c] font-bold text-sm mb-2">{f.title}</h3>
                    <p className="text-[#010608]/60 text-xs leading-relaxed">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Photo grid */}
        <section className="bg-[#f1f5f7] py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">Inside Our Campus</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mx-auto" />
            </div>

            {photos.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#e6edf0]">
                <ImageOff size={32} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium text-sm">Facility photos will be published shortly.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {photos.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 8) * 0.05}>
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#e6edf0] shadow-sm group">
                      <Image
                        src={p.imageUrl}
                        alt={p.caption ?? "VIMSMCH facility"}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {p.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#011e2c]/80 to-transparent px-3 py-2.5">
                          <p className="text-white text-[11px] font-medium leading-snug line-clamp-2">{p.caption}</p>
                        </div>
                      )}
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
