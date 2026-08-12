import { GraduationCap, Clock3, BedDouble, CalendarCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

function StatItem({ icon: Icon, value, label, sub }: { icon: React.ElementType; value: string; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-2.5 shrink-0 px-8">
      <Icon size={16} className="text-white/85 shrink-0" />
      <span className="font-display text-lg font-semibold text-white">{value}</span>
      <span className="text-white/95 font-medium text-sm whitespace-nowrap">{label}</span>
      <span className="text-white/60 text-xs whitespace-nowrap">— {sub}</span>
      <span className="w-1 h-1 rounded-full bg-white/30 ml-6" />
    </div>
  );
}

export default async function StatsSection() {
  const t = await getTranslations("statsSection");
  const stats = [
    { icon: GraduationCap, value: t("coursesValue"), label: t("coursesLabel"), sub: t("coursesSub") },
    { icon: Clock3, value: t("durationValue"), label: t("durationLabel"), sub: t("durationSub") },
    { icon: BedDouble, value: t("bedsValue"), label: t("bedsLabel"), sub: t("bedsSub") },
    { icon: CalendarCheck, value: t("batchValue"), label: t("batchLabel"), sub: t("batchSub") },
  ];

  return (
    <section
      className="relative py-5 overflow-hidden"
      style={{ background: "linear-gradient(90deg, #04713f 0%, #059652 50%, #04713f 100%)" }}
    >
      <div className="flex w-max animate-marquee">
        <div className="flex items-center">
          {stats.map((s) => (
            <StatItem key={`a-${s.label}`} {...s} />
          ))}
        </div>
        <div className="flex items-center" aria-hidden="true">
          {stats.map((s) => (
            <StatItem key={`b-${s.label}`} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
