"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home, ChevronDown } from "lucide-react";

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

const importantLinks = [
  { href: "https://drvpf.org", label: "Dr. Vithalrao Vikhe Patil Foundation" },
  { href: "https://www.vimsmch.edu.in/", label: "Medical College & Hospital" },
  { href: "https://msbsvet.edu.in/", label: "MSBSVET" },
  { href: "https://www.ncvrtindia.org/", label: "NCVRT" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const linksRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!linksOpen) return;
    const onClick = (e: MouseEvent) => { if (linksRef.current && !linksRef.current.contains(e.target as Node)) setLinksOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [linksOpen]);

  const overlay = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          overlay ? "bg-transparent" : "bg-white shadow-sm"
        } md:bg-gradient-to-r md:from-[#04415f]/90 md:via-[#2086b8]/80 md:to-[#04415f]/90 md:backdrop-blur-lg md:shadow-lg md:border-b md:border-white/10`}
      >
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

          {/* Desktop: link strip spans the full header width */}
          <nav className="hidden md:flex md:flex-1 items-center justify-center gap-0.5 lg:gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-2 lg:px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === l.href
                    ? "text-white bg-white/20"
                    : "text-white/90 hover:bg-white/15 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div
              className="relative"
              ref={linksRef}
              onMouseEnter={() => setLinksOpen(true)}
              onMouseLeave={() => setLinksOpen(false)}
            >
              <button
                onClick={() => setLinksOpen((v) => !v)}
                className="flex items-center gap-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors text-white/90 hover:bg-white/15 hover:text-white"
                aria-expanded={linksOpen}
              >
                Important Links
                <ChevronDown size={14} className={`transition-transform ${linksOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {linksOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full w-72 rounded-xl border border-[#04415f]/15 bg-white shadow-lg p-2 z-50"
                  >
                    {importantLinks.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setLinksOpen(false)}
                        className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#04415f] hover:bg-[#04415f]/8 transition-colors"
                      >
                        {l.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {!isHome && (
            <Link
              href="/"
              className="flex md:hidden items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold text-[#04415f] bg-white border-[#04415f]/20 shadow-sm hover:bg-[#04415f]/5 transition-colors shrink-0 ml-auto"
              aria-label="Back to Home"
            >
              <Home size={16} />
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}
        </div>
      </header>

      {/* Reserve header space on every page except Home, where the hero overlays it */}
      {!isHome && <div className="h-16" />}

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
                <p className="px-4 pt-4 pb-1 text-xs font-bold uppercase tracking-wide text-white/40">Important Links</p>
                {importantLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm rounded-lg font-medium text-white/75 hover:text-white hover:bg-white/8 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
