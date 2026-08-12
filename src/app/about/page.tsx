import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSettingsLocalized } from "@/lib/db/settings";
import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/lib/i18n/pickLocale";
import { Target, Compass, GraduationCap, Users, Phone, Mail, AlertTriangle, CheckCircle2, Quote, UserCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute",
  description:
    "Learn about Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute — affordable, employment-oriented paramedical certificate courses with hands-on hospital training.",
};

export default async function AboutPage() {
  const locale = (await getLocale()) as AppLocale;
  const [s, t] = await Promise.all([
    getSettingsLocalized(
      [
        "about.mission", "about.established",
        "leadership.chairman.name", "leadership.chairman.message",
        "leadership.secretaryGeneral.name", "leadership.secretaryGeneral.message",
        "leadership.director.name", "leadership.director.message",
        "antiragging.helpline", "antiragging.email", "antiragging.portalUrl",
      ],
      locale
    ),
    getTranslations("aboutPage"),
  ]);

  const objectives = t.raw("objectives") as string[];
  const ourObjectives = t.raw("ourObjectives") as string[];

  const quickFacts = [
    { icon: GraduationCap, label: t("quickFact1Label"), value: t("quickFact1Value"), sub: t("quickFact1Sub") },
    { icon: Target, label: t("quickFact2Label"), value: t("quickFact2Value"), sub: t("quickFact2Sub") },
    { icon: Users, label: t("quickFact3Label"), value: t("quickFact3Value"), sub: t("quickFact3Sub") },
    { icon: Compass, label: t("quickFact4Label"), value: t("quickFact4Value"), sub: t("quickFact4Sub") },
  ];

  const leaders = [
    { key: "chairman", title: t("leaderChairman") },
    { key: "secretaryGeneral", title: t("leaderSecretaryGeneral") },
    { key: "director", title: t("leaderDirector") },
  ] as const;

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div
          className="relative text-white py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(90deg, #04415f 0%, #2086b8 50%, #04415f 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-white/50 mb-3">{t("breadcrumb")}</p>
            <span className="eyebrow eyebrow-light mb-4">{t("eyebrow")}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">{t("heading")}</h1>
          </div>
        </div>

        {/* Mission */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                {t("missionEyebrow")}
              </span>
              <h2 className="text-3xl font-bold text-[#011e2c] mb-4 leading-snug">
                {t("missionHeadingLine1")}<br />
                {t("missionHeadingLine2")}
              </h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
              <p className="text-[#010608]/65 text-sm leading-relaxed mb-6">
                {s["about.mission"]}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {quickFacts.map((c) => (
                <div key={c.label} className="bg-[#f1f5f7] rounded-2xl p-5 border border-[#e6edf0]">
                  <c.icon size={20} className="text-[#04415f] mb-3" />
                  <p className="text-[#010608]/40 text-xs uppercase tracking-wide mb-1">{c.label}</p>
                  <p className="text-[#011e2c] font-bold text-base">{c.value}</p>
                  {c.sub && <p className="text-[#010608]/50 text-xs mt-1 leading-snug">{c.sub}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Legacy */}
        <section className="bg-[#f1f5f7] py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-10 items-center">
            <div className="mx-auto lg:mx-0">
              <div className="relative w-56 sm:w-64 lg:w-full aspect-[550/712] rounded-2xl overflow-hidden shadow-sm border border-[#e6edf0]">
                <Image
                  src="/images/Balasaheb_Vikhe_Patil_accepting_Padma_Bhushan_(cropped).jpg"
                  alt="Late Padmabhushan Dr. Balasaheb Vikhe Patil"
                  fill
                  sizes="(max-width: 1024px) 224px, 280px"
                  className="object-cover"
                />
              </div>
              <p className="text-[#010608]/45 text-xs text-center mt-2">
                {t("legacyImageCaption")}
              </p>
            </div>
            <div>
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                {t("legacyEyebrow")}
              </span>
              <h2 className="text-2xl font-bold text-[#011e2c] mb-4">{t("legacyHeading")}</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
              <p className="text-[#010608]/65 text-sm leading-relaxed mb-4">
                {t("legacyPara1")}
              </p>
              <p className="text-[#010608]/65 text-sm leading-relaxed mb-7">
                {t("legacyPara2")}
              </p>
              <div className="grid grid-cols-1 gap-5">
                <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-6">
                  <div className="w-11 h-11 bg-[#04415f] rounded-xl flex items-center justify-center mb-4">
                    <Compass size={19} className="text-white" />
                  </div>
                  <h3 className="text-[#011e2c] font-bold text-lg mb-2">{t("visionTitle")}</h3>
                  <p className="text-[#010608]/65 text-sm leading-relaxed">
                    {t("visionText")}
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-6">
                  <div className="w-11 h-11 bg-[#04415f] rounded-xl flex items-center justify-center mb-4">
                    <Target size={19} className="text-white" />
                  </div>
                  <h3 className="text-[#011e2c] font-bold text-lg mb-2">{t("missionTitle")}</h3>
                  <p className="text-[#010608]/65 text-sm leading-relaxed">
                    {s["about.mission"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Vocational Training */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                {t("whyEyebrow")}
              </span>
              <h2 className="text-2xl font-bold text-[#011e2c] mb-4">{t("whyHeading")}</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
              <p className="text-[#010608]/65 text-sm leading-relaxed mb-4">
                {t("whyPara1")}
              </p>
              <p className="text-[#010608]/65 text-sm leading-relaxed">
                {t("whyPara2")}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {objectives.map((o) => (
                <div key={o} className="flex items-start gap-2.5 bg-[#f1f5f7] rounded-xl p-4 border border-[#e6edf0]">
                  <CheckCircle2 size={16} className="text-[#04415f] mt-0.5 shrink-0" />
                  <p className="text-[#010608]/70 text-sm leading-snug">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Objectives */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                {t("ourObjectivesEyebrow")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-1">{t("ourObjectivesHeading")}</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ourObjectives.map((o) => (
                <div key={o} className="flex items-start gap-2.5 bg-[#f1f5f7] rounded-xl p-4 border border-[#e6edf0]">
                  <CheckCircle2 size={16} className="text-[#04415f] mt-0.5 shrink-0" />
                  <p className="text-[#010608]/70 text-sm leading-snug">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Messages from Leadership */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                {t("leadershipEyebrow")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-1">{t("leadershipHeading")}</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mx-auto mt-3" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {leaders.map((l) => {
                const name = s[`leadership.${l.key}.name`];
                const message = s[`leadership.${l.key}.message`];
                return (
                  <div key={l.key} className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6 flex flex-col">
                    <Quote size={22} className="text-[#04415f]/30 mb-3" />
                    {message ? (
                      <p className="text-[#010608]/70 text-sm leading-relaxed flex-1 mb-4">{message}</p>
                    ) : (
                      <p className="text-[#010608]/40 text-sm italic flex-1 mb-4">{t("messageComingSoon")}</p>
                    )}
                    <div className="flex items-center gap-3 border-t border-[#e6edf0] pt-4">
                      <div className="w-10 h-10 rounded-full bg-[#04415f]/8 flex items-center justify-center shrink-0">
                        <UserCircle2 size={20} className="text-[#04415f]/40" />
                      </div>
                      <div>
                        <p className="text-[#011e2c] font-bold text-sm">{name || t("toBeAnnounced")}</p>
                        <p className="text-[#010608]/50 text-xs">{l.title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Anti-Ragging */}
        <section className="bg-[#04415f] py-14 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                  <AlertTriangle size={26} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-widest">{t("antiRaggingZeroTolerance")}</p>
                  <h2 className="text-white font-bold text-xl">{t("antiRaggingTitle")}</h2>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1">
                {t("antiRaggingText")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href={`tel:${s["antiragging.helpline"]?.replace(/-/g, "")}`}
                  className="flex items-center gap-2 bg-white text-[#04415f] font-bold text-sm px-5 py-3 rounded-lg hover:bg-[#e6edf0] transition-colors"
                >
                  <Phone size={14} />
                  {s["antiragging.helpline"] || t("defaultHelpline")}
                </a>
                <a
                  href={s["antiragging.portalUrl"] || "https://antiragging.in"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/40 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {t("antiRaggingPortal")}
                </a>
              </div>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-white/8 rounded-xl p-4 flex items-center gap-3">
                <Mail size={16} className="text-white/60 shrink-0" />
                <div>
                  <p className="text-white/50 text-xs">{t("helplineEmailLabel")}</p>
                  <a href={`mailto:${s["antiragging.email"]}`} className="text-white text-sm font-medium hover:text-white/80 transition-colors">
                    {s["antiragging.email"] || t("defaultEmail")}
                  </a>
                </div>
              </div>
              <div className="bg-white/8 rounded-xl p-4 flex items-center gap-3">
                <Users size={16} className="text-white/60 shrink-0" />
                <div>
                  <p className="text-white/50 text-xs">{t("reachOutLabel")}</p>
                  <p className="text-white text-sm font-medium">{t("reachOutText")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
