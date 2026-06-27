"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/faculty", label: "Faculty" },
  { href: "/contact", label: "Contact" },
  { href: "/verify", label: "Verify Certificate" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="bg-[#04415f] rounded px-2 py-1">
            <Image
              src="/logo.png"
              alt="VIMSMCH"
              width={120}
              height={26}
              className="h-8 w-auto"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-[#011e2c] text-xs font-semibold leading-tight">Vocational Training</p>
            <p className="text-[#2086b8] text-[10px] leading-tight">training.vimsmch.edu.in</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
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
      {open && (
        <div
          className="lg:hidden border-t border-[#cdd8de] px-4 py-4 space-y-1"
          style={{
            background: "linear-gradient(180deg, #003c6c 0%, #0074ad 100%)",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 text-sm rounded font-medium ${
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
            className="block mt-3 bg-white text-[#04415f] text-sm font-semibold px-4 py-2 rounded text-center"
          >
            Inquire Now
          </Link>
        </div>
      )}
    </header>
  );
}
