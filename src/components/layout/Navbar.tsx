"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/admission", label: "Admission" },
  { href: "/faculty", label: "Faculties" },
  { href: "/news", label: "News & Notices" },
  { href: "/placements", label: "Placement" },
  { href: "/facilities", label: "Facilities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="relative max-w-[1920px] mx-auto px-2 sm:px-6 h-20 sm:h-28 flex items-center justify-center">
        {/* Institute identity */}
        <Link href="/" className="flex min-w-0 items-center gap-1 sm:gap-3 shrink-0">
          <Image
            src="/images/foundation-logo.png"
            alt="Dr. Vithalrao Vikhe Patil Foundation"
            width={200}
            height={151}
            className="h-9 sm:h-20 w-auto shrink-0"
            priority
          />
          <div className="max-w-[680px] text-center text-[#04415f]">
            <span className="block font-display text-[10px] sm:text-xl 2xl:text-2xl font-semibold leading-tight whitespace-nowrap">
              Dr. Vithalrao Vikhe Patil Foundation&apos;s
            </span>
            <span className="block font-display text-[10px] sm:text-xl 2xl:text-2xl font-semibold leading-tight whitespace-nowrap">
              Paramedical Institute
            </span>
            <span className="mt-1 hidden sm:block text-[9px] md:text-[10px] 2xl:text-[11px] font-bold leading-snug text-[#04415f]/80">
              Affiliated to National Council of Vocational Research &amp; Training, New Delhi
              (NCVRT) — Registered Number REG/NCVRT/MH/35074/VTC.
            </span>
          </div>
          <Image
            src="/images/paramedical-institute-logo.png"
            alt="Paramedical Institute"
            width={150}
            height={150}
            className="h-9 sm:h-20 w-auto shrink-0"
            priority
          />
        </Link>

        {/* Tablet/mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden absolute right-1 sm:right-6 text-[#04415f] p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop navigation row */}
      <div className="hidden xl:block border-t border-[#e6edf0]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-center gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-2.5 py-2 text-[13px] font-medium rounded whitespace-nowrap transition-colors ${
                pathname === l.href
                  ? "text-[#04415f] font-semibold"
                  : "text-[#04415f]/80 hover:text-[#2086b8]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile/tablet menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden border-t border-[#cdd8de] overflow-hidden"
            style={{ background: "linear-gradient(180deg, #2589b8 0%, #4ab0e0 100%)" }}
          >
            <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 text-sm rounded font-medium ${
                    pathname === l.href
                      ? "text-white bg-white/20"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
