import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Clock, Stethoscope, Download, ArrowRight } from "lucide-react";
import { getSettings } from "@/lib/db/settings";
import Reveal from "@/components/ui/Reveal";

export default async function HeroSection() {
  const s = await getSettings(["prospectus.pdfUrl"]);
  const prospectusUrl = s["prospectus.pdfUrl"];

  return (
    <section
      className="relative text-white py-16 lg:py-24 px-4 sm:px-6 overflow-hidden border-b border-[#69c4e5]"
      style={{ background: "linear-gradient(135deg, #1785b5 0%, #32a2d1 55%, #61bee2 100%)" }}
    >
      {/* subtle decorative accents */}
      <div className="pointer-events-none absolute -top-32 -right-24 w-[32rem] h-[32rem] rounded-full bg-white/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 -left-32 w-[26rem] h-[26rem] rounded-full bg-[#04415f]/15 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <Reveal delay={0.04}>
            <div className="eyebrow eyebrow-light mb-7">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Admissions Open — 2026 Batch
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] mb-6 tracking-tight text-white">
              Learn Skills.
              <br />
              <span className="italic text-white/90">Build Your Career.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-white/90 text-lg leading-relaxed mb-9 max-w-xl">
              Affordable one-year job-oriented paramedical courses with practical hospital training
              at the Paramedical Institute.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/admission"
                className="group flex items-center gap-2 bg-white text-[#04415f] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#eef9fd] transition-all shadow-lg shadow-[#04415f]/15 hover:shadow-xl hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              {prospectusUrl && (
                <a
                  href={prospectusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-2 text-white/80 font-semibold px-3 py-3.5 hover:text-white transition-colors"
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
                <div key={label} className="flex items-center gap-2 text-xs font-medium text-white/90 bg-white/10 border border-white/20 rounded-full px-3.5 py-2">
                  <Icon size={13} className="text-white" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — hospital building photo + floating info cards */}
        <Reveal delay={0.15} className="relative">
          <div className="relative rounded-[1.75rem] overflow-hidden shadow-xl shadow-[#04415f]/10 border border-[#e6edf0] aspect-[4/5] sm:aspect-video lg:aspect-[4/5]">
            <Image
              src="/images/hospital-building.webp"
              alt="Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital campus"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Floating stat card */}
          <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-4 bg-white shadow-xl rounded-2xl p-5 border border-[#e6edf0]">
            <div>
              <p className="font-display text-3xl font-semibold text-[#04415f] leading-none">5</p>
              <p className="text-[#010608]/50 text-xs font-medium mt-1">Certificate Courses</p>
              <p className="text-[#010608]/35 text-[11px]">Launching 2026</p>
            </div>
          </div>
          <div className="hidden sm:flex absolute -top-5 -right-5 items-center gap-2 bg-[#04415f] text-white rounded-2xl shadow-xl px-5 py-4">
            <div>
              <p className="font-display text-2xl font-semibold leading-none">1 Year Training</p>
              <p className="text-white/75 text-[11px] mt-1">Theory · Practical · Clinical</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
