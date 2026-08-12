import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";
import { getAllGalleryItems } from "@/lib/db/gallery";
import { getLocale, getTranslations } from "next-intl/server";
import { pickLocale, type AppLocale } from "@/lib/i18n/pickLocale";
import { FlaskConical, Monitor, BookOpenCheck, Stethoscope, ImageOff } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Facilities | VIMSMCH Paramedical Institute",
  description: "Labs, classrooms, and practical training equipment available to VIMSMCH Paramedical Institute students.",
};

export default async function FacilitiesPage() {
  const [photos, locale, t] = await Promise.all([
    getAllGalleryItems("laboratories"),
    getLocale() as Promise<AppLocale>,
    getTranslations("facilitiesPage"),
  ]);

  const facilities = [
    { icon: Stethoscope, title: t("facility1Title"), body: t("facility1Body") },
    { icon: FlaskConical, title: t("facility2Title"), body: t("facility2Body") },
    { icon: Monitor, title: t("facility3Title"), body: t("facility3Body") },
    { icon: BookOpenCheck, title: t("facility4Title"), body: t("facility4Body") },
  ];

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

        {/* Facility cards */}
        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                {t("learningEyebrow")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-3">{t("learningHeading")}</h2>
              <p className="text-[#010608]/60 text-sm max-w-xl mx-auto">
                {t("learningSub")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.06}>
                  <div className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6 h-full">
                    <div className="w-12 h-12 bg-[#04415f] rounded-xl flex items-center justify-center mb-4">
                      <f.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-[#011e2c] font-bold text-sm mb-2">{f.title}</h3>
                    <p className="text-[#010608]/60 text-xs leading-relaxed">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Photo grid */}
        <section className="bg-[#f1f5f7] py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">{t("campusHeading")}</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mx-auto" />
            </div>

            {photos.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#e6edf0]">
                <ImageOff size={32} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium text-sm">{t("emptyPhotos")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {photos.map((p, i) => {
                  const caption = pickLocale(locale, p.caption ?? "", p.captionMr) || null;
                  return (
                  <Reveal key={p.id} delay={(i % 8) * 0.05}>
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#e6edf0] shadow-sm group">
                      <Image
                        src={p.imageUrl}
                        alt={caption ?? t("photoAlt")}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#011e2c]/80 to-transparent px-3 py-2.5">
                          <p className="text-white text-[11px] font-medium leading-snug line-clamp-2">{caption}</p>
                        </div>
                      )}
                    </div>
                  </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
