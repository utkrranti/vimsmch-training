import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "./GalleryGrid";
import { getAllGalleryItems } from "@/lib/db/gallery";
import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/lib/i18n/pickLocale";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | VIMSMCH Paramedical Institute",
  description: "Photos and moments from VIMSMCH Paramedical Institute classes, events, and certificate ceremonies.",
};

export default async function GalleryPage() {
  const [items, locale, t] = await Promise.all([
    getAllGalleryItems(),
    getLocale() as Promise<AppLocale>,
    getTranslations("galleryPage"),
  ]);

  const CATEGORIES = [
    { value: "", label: t("catAll") },
    { value: "campus", label: t("catCampus") },
    { value: "hospital", label: t("catHospital") },
    { value: "laboratories", label: t("catLaboratories") },
    { value: "clinical-training", label: t("catClinicalTraining") },
    { value: "events", label: t("catEvents") },
    { value: "convocation", label: t("catConvocation") },
    { value: "guest-lectures", label: t("catGuestLectures") },
    { value: "students", label: t("catStudents") },
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

        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <GalleryGrid items={items} categories={CATEGORIES} locale={locale} emptyText={t("empty")} photoAlt={t("photoAlt")} closeLabel={t("close")} />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
