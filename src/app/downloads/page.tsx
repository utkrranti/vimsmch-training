import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getActiveDownloads } from "@/lib/db/downloads";
import { getLocale, getTranslations } from "next-intl/server";
import { pickLocale, type AppLocale } from "@/lib/i18n/pickLocale";
import { FileDown, FileText } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Downloads | VIMSMCH Paramedical Institute",
  description: "Download admission forms, prospectuses, and other documents from VIMSMCH Paramedical Institute.",
};

export default async function DownloadsPage() {
  const [downloads, locale, t] = await Promise.all([
    getActiveDownloads(),
    getLocale() as Promise<AppLocale>,
    getTranslations("downloadsPage"),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div
          className="relative text-[#011e2c] py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(90deg, #d6ecfa 0%, #a9d8f2 50%, #d6ecfa 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.06] text-[#04415f]" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-[#04415f]/60 mb-3">{t("breadcrumb")}</p>
            <span className="eyebrow mb-4">{t("eyebrow")}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#011e2c]">{t("heading")}</h1>
          </div>
        </div>

        <section className="bg-white py-14 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {downloads.length === 0 ? (
              <div className="text-center py-16 bg-[#f1f5f7] rounded-2xl border border-[#e6edf0]">
                <FileDown size={32} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium text-sm">{t("empty")}</p>
              </div>
            ) : (
              downloads.map((d) => {
                const title = pickLocale(locale, d.title, d.titleMr);
                const description = d.description ? pickLocale(locale, d.description, d.descriptionMr) : "";
                return (
                  <div
                    key={d.id}
                    className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#04415f]/10 flex items-center justify-center shrink-0">
                      <FileText size={22} className="text-[#04415f]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[#011e2c] font-bold text-base leading-snug">{title}</h3>
                      {description && <p className="text-[#010608]/60 text-sm leading-relaxed mt-1">{description}</p>}
                    </div>
                    <a
                      href={d.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center gap-2 bg-[#04415f] hover:bg-[#011e2c] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0 justify-center"
                    >
                      <FileDown size={15} /> {t("downloadButton")}
                    </a>
                  </div>
                );
              })
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
