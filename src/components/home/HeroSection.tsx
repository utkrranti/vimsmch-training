import HeroCarousel from "@/components/home/HeroCarousel";
import { getSettings } from "@/lib/db/settings";

export default async function HeroSection() {
  const settings = await getSettings([
    "prospectus.pdfUrl",
    "hero.slide1.title",
    "hero.slide1.accent",
    "hero.slide1.action",
    "hero.slide1.href",
    "hero.slide2.title",
    "hero.slide2.accent",
    "hero.slide2.action",
    "hero.slide2.href",
    "hero.slide3.title",
    "hero.slide3.accent",
    "hero.slide3.action",
    "hero.slide3.href",
    "hero.notice.unit1Title",
    "hero.notice.unit1Text",
    "hero.notice.unit2Title",
    "hero.notice.unit2Text",
    "hero.notice.unit2Extra",
    "hero.notice.admission",
  ]);

  return (
    <HeroCarousel
      prospectusUrl={settings["prospectus.pdfUrl"]}
      carouselSlides={[
        {
          title: settings["hero.slide1.title"] || "Learn Skills. Save Lives.",
          accent: settings["hero.slide1.accent"] || "Build Your Career.",
          action: settings["hero.slide1.action"] || "Apply Now",
          href: settings["hero.slide1.href"] || "/admission/apply",
        },
        {
          title: settings["hero.slide2.title"] || "Train Where",
          accent: settings["hero.slide2.accent"] || "Healthcare Happens.",
          action: settings["hero.slide2.action"] || "Explore Courses",
          href: settings["hero.slide2.href"] || "/courses",
        },
        {
          title: settings["hero.slide3.title"] || "A Strong Foundation",
          accent: settings["hero.slide3.accent"] || "For Your Future.",
          action: settings["hero.slide3.action"] || "View Admission Details",
          href: settings["hero.slide3.href"] || "/admission/apply",
        },
      ]}
      instituteNotice={{
        unit1Title: settings["hero.notice.unit1Title"] || "1. Skill Development Institute",
        unit1Text: settings["hero.notice.unit1Text"] || "Affiliated to Maharashtra State Board of Skill, Vocational Education and Training",
        unit2Title: settings["hero.notice.unit2Title"] || "2. Vocational Training Centre",
        unit2Text: settings["hero.notice.unit2Text"] || "Accredited by National Council of Vocational and Research Training, New Delhi",
        unit2Extra: settings["hero.notice.unit2Extra"] || "(Accreditation No - NCVRT/MH/35074/VTC)",
        admissionLine: settings["hero.notice.admission"] || "Admission is open for Vocational Training Centre for the Academic Year 2026-27",
      }}
    />
  );
}
