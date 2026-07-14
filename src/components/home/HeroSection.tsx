import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Clock, Stethoscope, Download, ArrowRight, MessageCircleHeart } from "lucide-react";
import { getSettings } from "@/lib/db/settings";
import Reveal from "@/components/ui/Reveal";

export default async function HeroSection() {
  const s = await getSettings(["prospectus.pdfUrl"]);
  const prospectusUrl = s["prospectus.pdfUrl"];

  return (
    <section
      className="relative text-white py-24 lg:py-36 px-4 sm:px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #011e2c 0%, #04415f 55%, #065a82 100%)",
      }}
    >
      {/* decorative glow orbs */}
      <div className="pointer-events-none absolute -top-32 -right-24 w-[32rem] h-[32rem] rounded-full bg-[#2086b8]/25 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 -left-32 w-[26rem] h-[26rem] rounded-full bg-[#7dd3fc]/10 blur-[100px]" />
      <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <Reveal>
            <div className="eyebrow eyebrow-light mb-7">
              <span className="w-1.5 h-1.5 bg-[#7dd3fc] rounded-full animate-pulse" />
              Admissions Open — 2026 Batch
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.25rem] font-semibold leading-[1.05] mb-6 tracking-tight">
              <span className="text-white/80">Learn Skills.</span>
              <br />
              <span className="italic text-gradient-brand">Save Lives.</span>
              <br />
              <span className="text-white/80">Build Your Career.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-white/85 text-lg leading-relaxed mb-4 max-w-xl">
              Affordable one-year job-oriented paramedical courses with practical hospital training
              at the Paramedical Institute.
            </p>

            <p className="text-white/50 text-xs leading-relaxed mb-9 max-w-xl">
              Affiliated to National Council of Vocational Research &amp; Training, New Delhi
              (NCVRT) — Registered Number REG/NCVRT/MH/35074/VTC.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/admission"
                className="group flex items-center gap-2 bg-white text-[#04415f] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#e6edf0] transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact#inquiry"
                className="flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all"
              >
                <MessageCircleHeart size={16} /> Enquire Now
              </Link>
              {prospectusUrl && (
                <a
                  href={prospectusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-2 text-white/75 font-semibold px-3 py-3.5 hover:text-white transition-colors"
                >
                  <Download size={16} /> Download Prospectus
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Stethoscope, label: "Hospital-Based Training" },
                { icon: GraduationCap, label: "Experienced Medical Faculty" },
                { icon: Clock, label: "One-Year Certificate Courses" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs font-medium text-white/80 bg-white/8 border border-white/12 rounded-full px-3.5 py-2">
                  <Icon size={13} className="text-[#7dd3fc]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — hospital photo + floating info cards */}
        <Reveal delay={0.15} className="relative">
          <div className="relative rounded-[1.75rem] overflow-hidden shadow-2xl shadow-black/30 border border-white/15 aspect-[4/5] sm:aspect-video lg:aspect-[4/5]">
            <Image
              src="/images/hospital-hero.webp"
              alt="Inside Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011e2c]/60 via-transparent to-transparent" />
          </div>

          {/* Floating stat card */}
          <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-5 border border-white/40">
            <div>
              <p className="font-display text-3xl font-semibold text-[#04415f] leading-none">5</p>
              <p className="text-[#010608]/50 text-xs font-medium mt-1">Certificate Courses</p>
              <p className="text-[#010608]/35 text-[11px]">Launching 2026</p>
            </div>
          </div>
          <div className="hidden sm:flex absolute -top-5 -right-5 items-center gap-2 bg-[#2086b8] text-white rounded-2xl shadow-xl px-5 py-4">
            <div>
              <p className="font-display text-2xl font-semibold leading-none">1 Year</p>
              <p className="text-white/75 text-[11px] mt-1">Theory · Practical · Clinical</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
