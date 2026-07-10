"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const moreLinks = [
  { href: "/admission", label: "Admission & How to Apply" },
  { href: "/faculty", label: "Faculty" },
  { href: "/facilities", label: "Facilities" },
  { href: "/placements", label: "Placements & Outcomes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/verify", label: "Verify Certificate" },
];

const allLinks = [...primaryLinks, ...moreLinks];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const isMoreActive = moreLinks.some((l) => l.href === pathname);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="VIMSMCH"
            width={120}
            height={26}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                pathname === l.href
                  ? "text-[#04415f] font-semibold"
                  : "text-[#04415f] hover:text-[#2086b8]"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                isMoreActive ? "text-[#04415f] font-semibold" : "text-[#04415f] hover:text-[#2086b8]"
              }`}
            >
              More <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 pt-2 w-64"
                >
                  <div className="bg-white rounded-xl shadow-lg border border-[#e6edf0] overflow-hidden py-1.5">
                    {moreLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          pathname === l.href
                            ? "text-[#04415f] font-semibold bg-[#f1f5f7]"
                            : "text-[#010608]/70 hover:text-[#04415f] hover:bg-[#f1f5f7]"
                        }`}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/contact#inquiry"
            className="ml-3 bg-[#04415f] hover:bg-[#011e2c] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm"
          >
            Inquire Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#04415f] p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-[#cdd8de] overflow-hidden"
            style={{ background: "linear-gradient(180deg, #003c6c 0%, #0074ad 100%)" }}
          >
            <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {allLinks.map((l) => (
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
              <Link
                href="/contact#inquiry"
                onClick={() => setOpen(false)}
                className="block mt-3 bg-white text-[#04415f] text-sm font-semibold px-4 py-2.5 rounded text-center"
              >
                Inquire Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
