import { GraduationCap, Clock3, BedDouble, CalendarCheck } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: "5", label: "Certificate Courses", sub: "One-Year Programmes" },
  { icon: Clock3, value: "1 Year", label: "Course Duration", sub: "Theory + Practical + Clinical" },
  { icon: BedDouble, value: "800+", label: "Bed Teaching Hospital", sub: "Hands-On Clinical Training" },
  { icon: CalendarCheck, value: "2026", label: "First Batch", sub: "Admissions Open Now" },
];

function StatItem({ s }: { s: (typeof stats)[number] }) {
  return (
    <div className="flex items-center gap-2.5 shrink-0 px-8">
      <s.icon size={16} className="text-white/85 shrink-0" />
      <span className="font-display text-lg font-semibold text-white">{s.value}</span>
      <span className="text-white/95 font-medium text-sm whitespace-nowrap">{s.label}</span>
      <span className="text-white/60 text-xs whitespace-nowrap">— {s.sub}</span>
      <span className="w-1 h-1 rounded-full bg-white/30 ml-6" />
    </div>
  );
}

export default function StatsSection() {
  return (
    <section
      className="relative py-5 overflow-hidden"
      style={{ background: "linear-gradient(90deg, #04713f 0%, #059652 50%, #04713f 100%)" }}
    >
      <div className="flex w-max animate-marquee">
        <div className="flex items-center">
          {stats.map((s) => (
            <StatItem key={`a-${s.label}`} s={s} />
          ))}
        </div>
        <div className="flex items-center" aria-hidden="true">
          {stats.map((s) => (
            <StatItem key={`b-${s.label}`} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
