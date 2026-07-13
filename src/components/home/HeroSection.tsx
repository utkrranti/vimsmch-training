import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Clock, Stethoscope } from "lucide-react";

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
            Learn Skills. Save Lives.
            <br />
            <span className="text-[#2086b8]">Build Your Career.</span>
          </h1>

          <p className="text-white/80 text-lg leading-relaxed mb-4 max-w-xl">
            Affordable one-year job-oriented paramedical courses with practical hospital training
            at the Paramedical Institute.
          </p>

          <p className="text-white/60 text-xs leading-relaxed mb-8 max-w-xl">
            Affiliated to National Council of Vocational Research &amp; Training, New Delhi
            (NCVRT) — Registered Number REG/NCVRT/MH/35074/VTC.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href="/admission"
              className="bg-white text-[#04415f] font-semibold px-7 py-3 rounded-lg hover:bg-[#e6edf0] transition-colors shadow-md"
            >
              Apply Now
            </Link>
            <Link
              href="/contact#inquiry"
              className="border-2 border-white/60 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Enquire Now
            </Link>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-5">
            {[
              { icon: Stethoscope, label: "Hospital-Based Training" },
              { icon: GraduationCap, label: "Experienced Medical Faculty" },
              { icon: Clock, label: "One-Year Certificate Courses" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/70">
                <Icon size={15} className="text-[#2086b8]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hospital photo + info cards */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 aspect-video">
            <Image
              src="/images/hospital-hero.webp"
              alt="Inside Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <HeroCard value="5" label="Certificate Courses" sub="Launching 2026" highlight />
            <HeroCard value="1 Year" label="Course Duration" sub="Theory + Practical + Clinical" />
          </div>
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
