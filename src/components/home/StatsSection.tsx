import Reveal from "@/components/ui/Reveal";
import { GraduationCap, Clock3, BedDouble, CalendarCheck } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: "5", label: "Certificate Courses", sub: "One-Year Programmes" },
  { icon: Clock3, value: "1 Year", label: "Course Duration", sub: "Theory + Practical + Clinical" },
  { icon: BedDouble, value: "800+", label: "Bed Teaching Hospital", sub: "Hands-On Clinical Training" },
  { icon: CalendarCheck, value: "2026", label: "First Batch", sub: "Admissions Open Now" },
];

export default function StatsSection() {
  return (
    <section className="relative py-16 lg:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-[#f7fcfe] via-[#eef8fc] to-[#e2f3fa] border-y border-[#cfe7f1]">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.035] text-[#04415f]" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#61bee2]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#2086b8]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-white bg-white/85 p-5 sm:p-6 shadow-[0_12px_35px_rgba(4,65,95,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9ed8ec] hover:shadow-[0_18px_45px_rgba(4,65,95,0.13)]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f5fb] text-[#147eaa] ring-1 ring-[#bfe5f3] transition-colors group-hover:bg-[#2086b8] group-hover:text-white">
                <s.icon size={21} strokeWidth={1.8} />
              </div>
              <p className="font-display text-4xl sm:text-5xl font-semibold leading-none text-[#04415f] mb-3 tracking-tight">
                {s.value}
              </p>
              <p className="text-[#011e2c] font-semibold text-sm sm:text-base leading-snug">{s.label}</p>
              <p className="text-[#04415f]/55 text-xs sm:text-sm mt-1 leading-relaxed">{s.sub}</p>
              <div className="mt-5 h-1 w-10 rounded-full bg-[#8fd2e9] transition-all duration-300 group-hover:w-16 group-hover:bg-[#2086b8]" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
