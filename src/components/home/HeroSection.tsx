import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award, BookOpen } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative text-white py-24 lg:py-32 px-4 sm:px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #04415f 0%, #065a82 100%)",
      }}
    >
      {/* subtle overlay pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div>
          {/* Admission badge */}
          <div className="inline-flex items-center gap-2 bg-[#2086b8]/20 border border-[#2086b8]/50 text-[#2086b8] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#2086b8] rounded-full animate-pulse" />
            Admissions Open — 2026 Batch
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Skill Up. Stand Out.
            <br />
            <span className="text-[#2086b8]">Get Certified.</span>
          </h1>

          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
            UGC recognised vocational training programmes at VIMSMCH — NSQF-aligned, taught by
            practising medical professionals, and ending in government-recognised certificates.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href="/courses"
              className="bg-white text-[#04415f] font-semibold px-7 py-3 rounded-lg hover:bg-[#e6edf0] transition-colors shadow-md"
            >
              Explore Courses
            </Link>
            <Link
              href="/contact#inquiry"
              className="border-2 border-white/60 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Inquire Now
            </Link>
          </div>

          {/* UGC compliance badges */}
          <div className="flex flex-wrap gap-5">
            {[
              { icon: ShieldCheck, label: "UGC Recognised" },
              { icon: Award, label: "NAAC Accredited" },
              { icon: BookOpen, label: "NSQF Aligned" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/70">
                <Icon size={15} className="text-[#2086b8]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — info cards */}
        <div className="grid grid-cols-2 gap-4">
          <HeroCard value="10+" label="Vocational Courses" sub="UGC Approved" highlight />
          <HeroCard value="500+" label="Students Trained" sub="Since Inception" />
          <HeroCard value="NSQF" label="Level 3 – 6" sub="Nationally Aligned" />
          <HeroCard value="100%" label="Govt. Recognised" sub="Certificates" highlight />
        </div>
      </div>
    </section>
  );
}

function HeroCard({
  value, label, sub, highlight,
}: {
  value: string; label: string; sub: string; highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 ${
        highlight
          ? "bg-[#2086b8]/20 border border-[#2086b8]/40"
          : "bg-white/10 border border-white/20"
      }`}
    >
      <p className={`text-3xl font-bold mb-1 ${highlight ? "text-[#2086b8]" : "text-white"}`}>
        {value}
      </p>
      <p className="text-white font-semibold text-sm">{label}</p>
      <p className="text-white/60 text-xs mt-0.5">{sub}</p>
    </div>
  );
}
