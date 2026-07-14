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
    <section
      className="relative py-14 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #011e2c 0%, #04415f 100%)" }}
    >
      <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
      <div className="relative max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div
              className={`text-center lg:text-left py-2 ${i < stats.length - 1 ? "lg:border-r lg:border-white/12 lg:pr-4" : ""}`}
            >
              <s.icon size={20} className="text-[#7dd3fc] mb-2 mx-auto lg:mx-0" />
              <p className="font-display text-4xl sm:text-5xl font-semibold text-white mb-1 tracking-tight">{s.value}</p>
              <p className="text-white/90 font-semibold text-sm">{s.label}</p>
              <p className="text-white/45 text-xs mt-0.5">{s.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
