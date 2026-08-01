"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          overlay ? "bg-transparent" : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
          {/* Hamburger menu trigger — primary navigation on every screen size */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border font-bold text-sm tracking-wide text-[#04415f] bg-white border-[#04415f]/20 shadow-sm hover:bg-[#04415f]/5 transition-colors"
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
            MENU
          </button>

          {!isHome && (
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold text-[#04415f] bg-white border-[#04415f]/20 shadow-sm hover:bg-[#04415f]/5 transition-colors"
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

      {/* Drawer navigation — used at every breakpoint */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#011e2c]/40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm overflow-y-auto shadow-2xl"
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
