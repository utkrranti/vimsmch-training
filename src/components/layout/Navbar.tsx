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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
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
        <nav className="hidden xl:flex items-center gap-0.5">
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

          <Link
            href="/contact#inquiry"
            className="ml-2 bg-[#04415f] hover:bg-[#011e2c] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm shrink-0"
          >
            Inquire Now
          </Link>
        </nav>

        {/* Tablet/mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden text-[#04415f] p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
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
