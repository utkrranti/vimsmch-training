import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { getSettings } from "@/lib/db/settings";
import { getTranslations } from "next-intl/server";
import {
  ClipboardList, FileEdit, FileCheck2, UserCheck2, IndianRupee, BadgeCheck, PartyPopper,
  GraduationCap, HeartPulse, MessageCircleHeart, BookOpen, FlaskConical, Stethoscope,
  ListChecks, ClipboardCheck, ArrowRight, Languages, Download, QrCode,
} from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admission & How to Apply | VIMSMCH Paramedical Institute",
  description: "Eligibility criteria, admission process, required documents, and fee structure for VIMSMCH Paramedical Institute's certificate courses.",
};

export default async function AdmissionPage() {
  const [s, t] = await Promise.all([
    getSettings(["admission.formUrl", "admission.feeQrUrl"]),
    getTranslations("admissionPage"),
  ]);
  const formUrl = s["admission.formUrl"];
  const feeQrUrl = s["admission.feeQrUrl"];

  const eligibility = [
    { icon: GraduationCap, text: t("eligibility1") },
    { icon: HeartPulse, text: t("eligibility2") },
    { icon: MessageCircleHeart, text: t("eligibility3") },
  ];

  const programmeConsistsOf = [
    { icon: BookOpen, label: t("programme1") },
    { icon: FlaskConical, label: t("programme2") },
    { icon: Stethoscope, label: t("programme3") },
    { icon: ListChecks, label: t("programme4") },
    { icon: ClipboardCheck, label: t("programme5") },
    { icon: BadgeCheck, label: t("programme6") },
  ];

  const steps = [
    { icon: ClipboardList, title: t("step1Title"), body: t("step1Body") },
    { icon: FileEdit, title: t("step2Title"), body: t("step2Body") },
    { icon: FileCheck2, title: t("step3Title"), body: t("step3Body") },
    { icon: UserCheck2, title: t("step4Title"), body: t("step4Body") },
    { icon: IndianRupee, title: t("step5Title"), body: t("step5Body") },
    { icon: BadgeCheck, title: t("step6Title"), body: t("step6Body") },
    { icon: PartyPopper, title: t("step7Title"), body: t("step7Body") },
  ];

  const documents = [
    t("document1"), t("document2"), t("document3"), t("document4"), t("document5"),
    t("document6"), t("document7"), t("document8"), t("document9"),
  ];

  const selection = [t("selection1"), t("selection2"), t("selection3"), t("selection4")];

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
          <div className="relative max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs text-white/50 mb-3">{t("breadcrumb")}</p>
              <span className="eyebrow eyebrow-light mb-4">{t("eyebrow")}</span>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">{t("heading")}</h1>
            </div>
            <Link
              href="/admission/apply"
              className="group flex items-center gap-2 bg-white text-[#04415f] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#e6edf0] transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 shrink-0"
            >
              {t("applyNow")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Intro */}
        <section className="bg-white py-10 sm:py-12 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-3">
              {t("introHeading")}
            </h2>
            <p className="text-[#010608]/65 text-sm leading-relaxed mb-3">
              {t("introPara1")}
            </p>
            <p className="text-[#010608]/65 text-sm leading-relaxed">
              {t("introPara2")}
            </p>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="bg-[#f1f5f7] py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">{t("eligibilityHeading")}</h2>
            <p className="text-[#010608]/55 text-sm mb-6">{t("eligibilitySub")}</p>
            <div className="space-y-3">
              {eligibility.map((e) => (
                <div key={e.text} className="flex items-start gap-3 bg-white border border-[#e6edf0] rounded-xl p-4 shadow-sm">
                  <e.icon size={18} className="text-[#04415f] mt-0.5 shrink-0" />
                  <p className="text-[#010608]/70 text-sm leading-relaxed">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Duration & Programme Structure */}
        <section className="bg-white py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">{t("durationHeading")}</h2>
            <p className="text-[#010608]/55 text-sm mb-6">{t("durationSub")}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {programmeConsistsOf.map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 bg-[#f1f5f7] border border-[#e6edf0] rounded-xl p-4">
                  <p.icon size={16} className="text-[#04415f] shrink-0" />
                  <p className="text-[#010608]/70 text-sm font-medium">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Admission Process — 7 steps */}
        <section className="bg-[#f1f5f7] py-12 sm:py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                {t("processEyebrow")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-3">{t("processHeading")}</h2>
              <p className="text-[#010608]/60 text-sm max-w-xl mx-auto">
                {t("processSub")}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border border-[#e6edf0] rounded-2xl p-5 sm:p-6">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#04415f] rounded-xl flex items-center justify-center shrink-0">
                      <s.icon size={20} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[#011e2c] font-bold text-base sm:text-lg mb-1.5">{s.title}</h3>
                      <p className="text-[#010608]/65 text-sm leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Required */}
        <section className="bg-white py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">{t("documentsHeading")}</h2>
            <p className="text-[#010608]/55 text-sm mb-6">
              {t("documentsSub")}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {documents.map((d) => (
                <div key={d} className="flex items-start gap-2.5 bg-[#f1f5f7] border border-[#e6edf0] rounded-xl p-4">
                  <FileCheck2 size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                  <p className="text-[#010608]/70 text-sm leading-snug">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#8ccfe7] bg-[#eaf7fc] p-4 sm:p-5">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2086b8] text-white">
                <QrCode size={18} />
              </div>
              <p className="text-sm leading-relaxed text-[#04415f]">
                <span className="font-bold">{t("importantNoteLabel")}</span> {t("importantNoteText")}
              </p>
            </div>
          </div>
        </section>

        {/* Selection Procedure */}
        <section className="bg-[#f1f5f7] py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-4">{t("selectionHeading")}</h2>
              <p className="text-[#010608]/55 text-sm mb-4">{t("selectionSub")}</p>
              <ul className="space-y-2.5">
                {selection.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-[#010608]/70">
                    <BadgeCheck size={15} className="text-[#04415f] mt-0.5 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
              <p className="text-[#010608]/50 text-xs mt-4 italic">
                {t("selectionFinal")}
              </p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-4">{t("mediumHeading")}</h2>
              <div className="flex items-center gap-2.5 bg-white border border-[#e6edf0] rounded-xl p-4">
                <Languages size={18} className="text-[#04415f] shrink-0" />
                <p className="text-[#010608]/70 text-sm">{t("mediumText")}</p>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mt-8 mb-3">{t("feeHeading")}</h2>
              <div className="bg-white border border-[#e6edf0] rounded-xl p-4">
                <p className="text-[#011e2c] font-bold text-lg mb-2">{t("feeAmount")} <span className="text-xs font-normal text-[#010608]/50">{t("feeNote")}</span></p>
                <p className="text-[#010608]/60 text-xs leading-relaxed">
                  {t("feeExtra")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form & Fee Payment */}
        {(formUrl || feeQrUrl) && (
          <section className="bg-white py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">{t("formFeeHeading")}</h2>
              <p className="text-[#010608]/55 text-sm mb-6">{t("formFeeSub")}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {formUrl && (
                  <div className="flex items-center gap-4 bg-[#f1f5f7] border border-[#e6edf0] rounded-xl p-5">
                    <div className="w-11 h-11 bg-[#04415f] rounded-xl flex items-center justify-center shrink-0">
                      <FileCheck2 size={18} className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#011e2c] font-semibold text-sm mb-1">{t("admissionFormLabel")}</p>
                      <a
                        href={formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-1.5 text-[#04415f] text-sm font-semibold hover:text-[#2086b8] transition-colors"
                      >
                        <Download size={14} /> {t("downloadPdf")}
                      </a>
                    </div>
                  </div>
                )}
                {feeQrUrl && (
                  <div className="flex items-center gap-4 bg-[#f1f5f7] border border-[#e6edf0] rounded-xl p-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={feeQrUrl}
                      alt={t("feeQrAlt")}
                      width={64}
                      height={64}
                      className="rounded-lg border border-[#e6edf0] bg-white p-1 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[#011e2c] font-semibold text-sm mb-1 flex items-center gap-1.5">
                        <QrCode size={14} className="text-[#04415f]" /> {t("applicationFeeLabel")}
                      </p>
                      <p className="text-[#010608]/60 text-xs leading-relaxed">{t("scanToPay")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-14 sm:py-16 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #2589b8 0%, #3fa0cc 100%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t("ctaHeading")}</h2>
            <p className="text-white/75 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              {t("ctaText")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/courses"
                className="flex items-center justify-center gap-2 bg-white text-[#04415f] font-semibold px-6 py-3 rounded-lg hover:bg-[#e6edf0] transition-colors text-sm"
              >
                {t("browseCourses")} <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact#inquiry"
                className="flex items-center justify-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                {t("talkToAdmissions")}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
