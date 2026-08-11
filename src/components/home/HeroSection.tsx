import HeroCarousel from "@/components/home/HeroCarousel";
import { getSettings } from "@/lib/db/settings";

export default async function HeroSection() {
  const settings = await getSettings([
    "hero.notice.unit1Title",
    "hero.notice.unit1Text",
    "hero.notice.unit2Title",
    "hero.notice.unit2Text",
    "hero.notice.unit2Extra",
    "hero.notice.admission",
  ]);

  return (
    <HeroCarousel
      instituteNotice={{
        unit1Title: settings["hero.notice.unit1Title"] || "Skill Development Institute",
        unit1Text: settings["hero.notice.unit1Text"] || "Affiliated to Maharashtra State Board of Skill, Vocational Education and Training",
        unit2Title: settings["hero.notice.unit2Title"] || "Vocational Training Centre",
        unit2Text: settings["hero.notice.unit2Text"] || "Accredited by National Council of Vocational and Research Training, New Delhi",
        unit2Extra: settings["hero.notice.unit2Extra"] || "(Accreditation No - NCVRT/MH/35074/VTC)",
        admissionLine: settings["hero.notice.admission"] || "Admission is open for Vocational Training Centre for the Academic Year 2026-27",
      }}
    />
  );
}
