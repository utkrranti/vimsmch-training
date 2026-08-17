import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getActiveAnnouncements } from "@/lib/db/announcements";
import { getLocale, getTranslations } from "next-intl/server";
import { pickLocale, type AppLocale } from "@/lib/i18n/pickLocale";
import { Megaphone, Paperclip } from "lucide-react";
import { formatDateIST } from "@/lib/date";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News & Notices | VIMSMCH Paramedical Institute",
  description: "Latest announcements and notices from VIMSMCH Paramedical Institute.",
};

export default async function NewsPage() {
  const [announcements, locale, t] = await Promise.all([
    getActiveAnnouncements(),
    getLocale() as Promise<AppLocale>,
    getTranslations("newsPage"),
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
          <div className="max-w-3xl mx-auto">
            {announcements.length === 0 ? (
              <div className="text-center py-20 bg-[#f1f5f7] rounded-2xl border border-[#e6edf0]">
                <Megaphone size={40} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium">{t("empty")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((a) => (
                  <div key={a.id} className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6">
                    <div className="flex items-start gap-3 mb-2">
                      <Megaphone size={18} className="text-[#04415f] mt-0.5 shrink-0" />
                      <div>
                        <h3 className="text-[#011e2c] font-bold text-base leading-snug">{pickLocale(locale, a.title, a.titleMr)}</h3>
                        <p className="text-[#010608]/40 text-xs mt-0.5">
                          {formatDateIST(a.createdAt, { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#010608]/65 text-sm leading-relaxed pl-[30px] whitespace-pre-wrap">{pickLocale(locale, a.body, a.bodyMr)}</p>
                    {a.attachmentUrl && (
                      <a
                        href={a.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 pl-[30px] mt-2 text-[#04415f] text-xs font-semibold hover:text-[#2086b8] transition-colors"
                      >
                        <Paperclip size={12} /> {t("viewAttachment")}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
