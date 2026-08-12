import { Clock, Building2, GraduationCap, FlaskConical, IndianRupee, Users, Briefcase } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";

export default async function WhyChooseUs() {
  const t = await getTranslations("whyChooseUs");

  const reasons = [
    { icon: Clock, title: t("reason1Title"), desc: t("reason1Desc"), color: "#04415f" },
    { icon: Building2, title: t("reason2Title"), desc: t("reason2Desc"), color: "#059652" },
    { icon: GraduationCap, title: t("reason3Title"), desc: t("reason3Desc"), color: "#2086b8" },
    { icon: FlaskConical, title: t("reason4Title"), desc: t("reason4Desc"), color: "#7c3aed" },
    { icon: IndianRupee, title: t("reason5Title"), desc: t("reason5Desc"), color: "#ff9800" },
    { icon: Users, title: t("reason6Title"), desc: t("reason6Desc"), color: "#0d9488" },
    { icon: Briefcase, title: t("reason7Title"), desc: t("reason7Desc"), color: "#df1529" },
  ];

  return (
    <section className="bg-[#e6edf0] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-6">
            <span className="eyebrow mb-2">{t("eyebrow")}</span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#011e2c] mt-1 tracking-tight">
              {t("heading")}
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {reasons.map(({ icon: Icon, title, desc, color }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.06}>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 h-full shadow-sm hover:shadow-md transition-all duration-300 group border border-[#e6edf0]">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  <Icon size={16} className="text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[#011e2c] font-bold text-xs leading-snug mb-1">{title}</h3>
                  <p className="text-[#010608]/55 text-[11px] leading-snug">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
