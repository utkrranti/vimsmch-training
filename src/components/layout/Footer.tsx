import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Globe, ArrowUpRight } from "lucide-react";
import { getSettings } from "@/lib/db/settings";

const quickLinks = [
  { href: "/", key: "home" },
  { href: "/courses", key: "allCourses" },
  { href: "/admission", key: "admission" },
  { href: "/about", key: "about" },
  { href: "/faculty", key: "faculty" },
  { href: "/facilities", key: "facilities" },
  { href: "/placements", key: "placements" },
  { href: "/gallery", key: "gallery" },
  { href: "/news", key: "news" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
  { href: "/verify", key: "verify" },
] as const;

const courseKeys = ["otAssistant", "ecgTechnology", "dialysisTechnician", "medicalLabTechnology", "radiologyImaging"] as const;

export default async function Footer() {
  const [t, settings] = await Promise.all([
    getTranslations("footer"),
    getSettings(["contact.footerEmail"]),
  ]);
  const footerEmail = settings["contact.footerEmail"] || "paramedical.vimsmch@gmail.com";

  return (
    <footer
      className="relative mt-auto text-white overflow-hidden"
      style={{ background: "linear-gradient(180deg, #206f9c 0%, #3fa0cc 100%)" }}
    >
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #04415f, #2086b8, #7dd3fc, #2086b8, #04415f)" }} />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[26rem] h-[26rem] rounded-full bg-[#2086b8]/10 blur-[100px]" />
      <div className="absolute inset-0 bg-dot-grid opacity-[0.04] text-white" />

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Col 1 — About */}
        <div>
          <div className="inline-flex items-center gap-3 bg-white rounded-xl px-4 py-3 mb-6 shadow-lg">
            <Image src="/images/foundation-logo.png" alt="Dr. Vithalrao Vikhe Patil Foundation" width={200} height={151} className="h-14 w-auto" />
            <div className="w-px h-11 bg-[#cdd8de]" />
            <Image src="/images/paramedical-institute-logo.png" alt="Paramedical Institute" width={150} height={150} className="h-14 w-auto" />
          </div>
          <p className="text-white/85 text-sm font-medium leading-relaxed mb-6">
            {t("description")}
          </p>
          <ul className="space-y-3 text-sm font-medium text-white/85">
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-white/90 mt-0.5 shrink-0" />
              <span>{t("address")}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={14} className="text-white/90 mt-0.5 shrink-0" />
              <span>
                <a href="tel:18001234858" className="text-white/90 hover:text-white transition-colors">1800 123 4858</a>
                <span className="text-white/55">{" | "}</span>
                <a href="tel:+918956263701" className="text-white/90 hover:text-white transition-colors">+91 8956263701</a>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-white/90 shrink-0" />
              <a href={`mailto:${footerEmail}`} className="text-white/90 hover:text-white transition-colors">
                {footerEmail}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe size={14} className="text-white/90 shrink-0" />
              <a href="https://vimsmch.edu.in" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">
                vimsmch.edu.in
              </a>
            </li>
          </ul>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.16em] mb-5">{t("quickLinksHeading")}</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group inline-flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors hover:translate-x-0.5">
                  {t(`quickLinks.${l.key}`)}
                  <ArrowUpRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Courses */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.16em] mb-5">{t("coursesHeading")}</h4>
          <ul className="space-y-2.5">
            {courseKeys.map((key) => (
              <li key={key}>
                <Link href="/courses" className="group inline-flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors hover:translate-x-0.5">
                  {t(`courses.${key}`)}
                  <ArrowUpRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Admissions */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.16em] mb-5">{t("admissionsHeading")}</h4>
          <ul className="space-y-4">
            <li>
              <span className="block text-[11px] text-white/35 mb-1 uppercase tracking-wide">{t("eligibilityLabel")}</span>
              <span className="text-sm text-white/80">{t("eligibilityValue")}</span>
            </li>
            <li>
              <span className="block text-[11px] text-white/35 mb-1 uppercase tracking-wide">{t("feeLabel")}</span>
              <span className="text-sm text-white/80">{t("feeValue")}</span>
            </li>
            <li className="pt-1">
              <a href="https://antiragging.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[#7dd3fc] hover:text-white transition-colors font-medium">
                {t("antiRaggingPortal")} <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Anti-ragging bar */}
      <div className="relative border-t border-white/10 py-3 px-4 bg-black/15">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-center">
          <span className="font-bold text-[#7dd3fc]">{t("antiRaggingNoticeLabel")}</span>
          <span className="text-white/60">
            {t("antiRaggingNoticeText")}
          </span>
          <a href="tel:18001805522" className="font-bold text-white hover:text-[#7dd3fc] transition-colors">
            1800-180-5522
          </a>
          <span className="text-white/25">|</span>
          <a href="https://antiragging.in" target="_blank" rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors">
            www.antiragging.in
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-white/40">
          <span>
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
          <span>
            {t("designedBy")}{" "}
            <a href="https://utkrranti.com" target="_blank" rel="noopener noreferrer"
              className="font-semibold text-white/70 hover:text-white transition-colors">
              UT<span className="text-red-400">K</span>RRANTI
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
