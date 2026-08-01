"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home } from "lucide-react";

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
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setHeaderHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const overlay = isHome && !scrolled;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          overlay ? "bg-transparent" : "bg-white shadow-sm"
        }`}
      >
        {/* Institute identity strip — shown on every page, above the menu bar */}
        <div
          className={`border-b transition-colors duration-300 ${
            overlay ? "border-white/0" : "border-[#04415f]/10"
          }`}
        >
          <div className="max-w-[1920px] mx-auto flex items-center justify-center gap-2.5 sm:gap-4 px-3 py-2 sm:py-3">
            <div className="relative shrink-0 flex items-center justify-center h-9 w-9 sm:h-14 sm:w-14">
              <div className="absolute inset-0 rounded-full p-[2px] sm:p-[3px] bg-[conic-gradient(from_0deg,#22c55e,#2086b8,#22c55e)] animate-spin-slow">
                <div className="h-full w-full rounded-full bg-white" />
              </div>
              <Image
                src="/images/foundation-logo.png"
                alt="Dr. Vithalrao Vikhe Patil Foundation"
                width={200}
                height={151}
                className="relative h-6 sm:h-10 w-auto"
              />
            </div>
            <div className="text-center text-[#04415f] leading-tight">
              <p className="font-display text-[11px] sm:text-base lg:text-lg font-bold">
                Dr. Vithalrao Vikhe Patil Foundation&apos;s Paramedical Institute
              </p>
              <p className="hidden sm:block text-[10px] lg:text-xs font-semibold text-[#04415f]/60 mt-0.5">
                Affiliated to NCVRT, New Delhi — Registered Number REG/NCVRT/MH/35074/VTC.
              </p>
            </div>
            <div className="relative shrink-0 flex items-center justify-center h-9 w-9 sm:h-14 sm:w-14">
              <div className="absolute inset-0 rounded-full p-[2px] sm:p-[3px] bg-[conic-gradient(from_0deg,#22c55e,#2086b8,#22c55e)] animate-spin-slow">
                <div className="h-full w-full rounded-full bg-white" />
              </div>
              <Image
                src="/images/paramedical-institute-logo.png"
                alt="Paramedical Institute"
                width={150}
                height={150}
                className="relative h-6 sm:h-10 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="relative max-w-[1920px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Hamburger menu trigger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            className="flex md:hidden items-center gap-2 px-3 py-2 rounded-lg border font-bold text-sm tracking-wide text-[#04415f] bg-white border-[#04415f]/20 shadow-sm hover:bg-[#04415f]/5 transition-colors shrink-0"
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
            MENU
          </button>

          {/* Desktop: link strip is always expanded, horizontally centered in the bar */}
          <nav className="hidden md:flex items-center gap-1 md:absolute md:left-1/2 md:-translate-x-1/2 max-w-[min(90%,760px)] overflow-x-auto rounded-lg border border-[#04415f]/20 bg-white/95 backdrop-blur-sm px-1.5 py-1.5 shadow-sm">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === l.href
                    ? "text-white bg-[#04415f]"
                    : "text-[#04415f] hover:bg-[#04415f]/8"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {!isHome && (
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold text-[#04415f] bg-white border-[#04415f]/20 shadow-sm hover:bg-[#04415f]/5 transition-colors shrink-0 ml-auto"
              aria-label="Back to Home"
            >
              <Home size={16} />
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}
        </div>
      </header>

      {/* Reserve header space on every page except Home, where the hero overlays it */}
      {!isHome && <div style={{ height: headerHeight }} />}

      {/* Mobile: drawer navigation */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#011e2c]/40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm overflow-y-auto shadow-2xl md:hidden"
              style={{ background: "linear-gradient(180deg, #04415f 0%, #011e2c 100%)" }}
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
                <span className="text-white font-bold text-sm tracking-wide">MENU</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white p-1.5"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 text-sm rounded-lg font-medium transition-colors ${
                      pathname === l.href
                        ? "text-white bg-white/15"
                        : "text-white/75 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
