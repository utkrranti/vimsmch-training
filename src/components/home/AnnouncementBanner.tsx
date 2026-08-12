"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pickLocale, type AppLocale } from "@/lib/i18n/pickLocale";

type AnnouncementRow = { id: string; title: string; titleMr?: string | null; body: string; bodyMr?: string | null };

export default function AnnouncementBanner({ announcements }: { announcements: AnnouncementRow[] }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("announcementBanner");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (announcements.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % announcements.length), 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (announcements.length === 0) return null;
  const current = announcements[index];
  const title = pickLocale(locale, current.title, current.titleMr);
  const body = pickLocale(locale, current.body, current.bodyMr);
  const canStep = announcements.length > 1;

  return (
    <div className="border-y border-[#e6edf0] bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <span className="shrink-0 rounded-full bg-[#a4802f] px-3 py-1 text-[10px] font-bold tracking-wide text-white sm:text-xs">
          {t("badge")}
        </span>
        <div className="h-5 min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="truncate text-xs text-[#011e2c] sm:text-sm"
            >
              <span className="font-semibold">{title}</span>
              <span className="text-[#010608]/55"> — {body}</span>
            </motion.p>
          </AnimatePresence>
        </div>
        {canStep && (
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={() => setIndex((i) => (i - 1 + announcements.length) % announcements.length)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#04415f] text-white hover:bg-[#011e2c] transition-colors"
              aria-label={t("prev")}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % announcements.length)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#04415f] text-white hover:bg-[#011e2c] transition-colors"
              aria-label={t("next")}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
