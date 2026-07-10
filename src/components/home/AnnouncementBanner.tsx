"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Megaphone, X } from "lucide-react";

type AnnouncementRow = { id: string; title: string; body: string };

export default function AnnouncementBanner({ announcements }: { announcements: AnnouncementRow[] }) {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (announcements.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % announcements.length), 5000);
    return () => clearInterval(t);
  }, [announcements.length]);

  if (dismissed || announcements.length === 0) return null;
  const current = announcements[index];

  return (
    <div className="bg-[#04415f] border-b border-[#2086b8]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
        <Megaphone size={15} className="text-[#7dd3fc] shrink-0" />
        <div className="min-w-0 flex-1 overflow-hidden h-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white text-xs sm:text-sm truncate"
            >
              <span className="font-semibold">{current.title}</span>
              <span className="text-white/70"> — {current.body}</span>
            </motion.p>
          </AnimatePresence>
        </div>
        {announcements.length > 1 && (
          <div className="hidden sm:flex items-center gap-1 shrink-0">
            {announcements.map((a, i) => (
              <span key={a.id} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? "bg-[#7dd3fc]" : "bg-white/25"}`} />
            ))}
          </div>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
