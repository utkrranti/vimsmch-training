"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";

/**
 * Renders a trigger (its children) that opens the fee-payment QR in a modal.
 * The QR image itself is never rendered inline — only inside the modal.
 */
export default function FeeQrModal({
  qrUrl,
  title,
  hint,
  alt,
  downloadLabel,
  closeLabel,
  className,
  style,
  children,
}: {
  qrUrl: string;
  title: string;
  hint: string;
  alt: string;
  downloadLabel: string;
  closeLabel: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} style={style}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="absolute right-3 top-3 rounded-lg p-1.5 text-[#010608]/40 transition-colors hover:bg-[#f1f5f7] hover:text-[#011e2c]"
            >
              <X size={18} />
            </button>

            <h3 className="pr-6 text-base font-bold text-[#011e2c]">{title}</h3>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt={alt}
              className="mx-auto mt-4 aspect-square w-full max-w-[260px] rounded-xl border border-[#e6edf0] bg-white object-contain p-3"
            />

            <p className="mt-4 text-xs leading-relaxed text-[#010608]/60">{hint}</p>

            <a
              href={qrUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#04415f] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#011e2c]"
            >
              <Download size={14} /> {downloadLabel}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
