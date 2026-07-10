"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ImageOff, X } from "lucide-react";

type GalleryRow = { id: string; imageUrl: string; caption: string | null; category: string };
type CategoryOption = { value: string; label: string };

export default function GalleryGrid({ items, categories }: { items: GalleryRow[]; categories: CategoryOption[] }) {
  const [filter, setFilter] = useState("");
  const [lightbox, setLightbox] = useState<GalleryRow | null>(null);

  const filtered = filter ? items.filter((i) => i.category === filter) : items;

  return (
    <>
      {/* Filter tabs — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              filter === c.value
                ? "bg-[#04415f] text-white shadow-sm"
                : "bg-[#f1f5f7] text-[#010608]/55 hover:bg-[#e6edf0]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#f1f5f7] rounded-2xl border border-[#e6edf0]">
          <ImageOff size={32} className="text-[#010608]/20 mx-auto mb-3" />
          <p className="text-[#010608]/40 font-medium text-sm">No photos in this category yet.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setLightbox(item)}
                className="relative aspect-square rounded-2xl overflow-hidden border border-[#e6edf0] shadow-sm group text-left"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption ?? "VIMSMCH gallery photo"}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#011e2c]/85 to-transparent px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-[11px] font-medium leading-snug line-clamp-2">{item.caption}</p>
                  </div>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-[#011e2c]/90 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 sm:top-2 sm:-right-10 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black">
                <Image src={lightbox.imageUrl} alt={lightbox.caption ?? "VIMSMCH gallery photo"} fill sizes="90vw" className="object-contain" />
              </div>
              {lightbox.caption && (
                <p className="text-white/85 text-sm text-center mt-4">{lightbox.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
