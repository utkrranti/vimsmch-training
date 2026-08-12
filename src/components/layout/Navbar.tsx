"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import {
  Menu,
  X,
  Home,
  ChevronDown,
  Users,
  GraduationCap,
  ClipboardList,
  Megaphone,
  Briefcase,
  Landmark,
  Image as ImageIcon,
  HelpCircle,
  Link2,
} from "lucide-react";
import { setLocale } from "@/app/actions/locale";
import type { Locale } from "@/i18n/request";

const navLinks = [
  { href: "/", key: "home", icon: Home },
  { href: "/about", key: "about", icon: Users },
  { href: "/courses", key: "courses", icon: GraduationCap },
  { href: "/admission", key: "admission", icon: ClipboardList },
  { href: "/faculty", key: "faculty", icon: Users },
  { href: "/news", key: "news", icon: Megaphone },
  { href: "/placements", key: "placement", icon: Briefcase },
  { href: "/facilities", key: "facilities", icon: Landmark },
  { href: "/gallery", key: "gallery", icon: ImageIcon },
  { href: "/faq", key: "faq", icon: HelpCircle },
] as const;

const importantLinks = [
  { href: "https://drvpf.org", key: "foundation" },
  { href: "https://www.vimsmch.edu.in/", key: "medicalCollege" },
  { href: "https://msbsvet.edu.in/", key: "msbsvet" },
  { href: "https://www.ncvrtindia.org/", key: "ncvrt" },
] as const;

function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale || pending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div className={`flex items-center rounded-md border border-white/25 text-xs font-bold ${className ?? ""}`}>
      <button
        onClick={() => switchTo("en")}
        disabled={pending}
        className={`px-2 py-1 rounded-l-[5px] transition-colors ${locale === "en" ? "bg-white text-[#04415f]" : "text-white/80 hover:text-white"}`}
      >
        EN
      </button>
      <button
        onClick={() => switchTo("mr")}
        disabled={pending}
        className={`px-2 py-1 rounded-r-[5px] transition-colors ${locale === "mr" ? "bg-white text-[#04415f]" : "text-white/80 hover:text-white"}`}
      >
        MR
      </button>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const linksRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!linksOpen) return;
    const onClick = (e: MouseEvent) => { if (linksRef.current && !linksRef.current.contains(e.target as Node)) setLinksOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [linksOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#04415f] shadow-md">
        <div className="relative max-w-[1920px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Hamburger menu trigger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            className="flex md:hidden items-center gap-2 px-3 py-2 rounded-lg border font-bold text-sm tracking-wide text-white bg-white/10 border-white/20 hover:bg-white/15 transition-colors shrink-0"
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
            {t("menu")}
          </button>

          {/* Desktop: link strip spans the full header width */}
          <nav className="hidden md:flex md:flex-1 items-stretch justify-center gap-0.5 lg:gap-1">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-1.5 px-2 lg:px-3 h-16 text-[16px] font-[500] whitespace-nowrap transition-colors ${
                    active
                      ? "text-white bg-[#a4802f]"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <l.icon size={15} className="shrink-0" />
                  {t(`links.${l.key}`)}
                </Link>
              );
            })}
            <div
              className="relative flex items-stretch"
              ref={linksRef}
              onMouseEnter={() => setLinksOpen(true)}
              onMouseLeave={() => setLinksOpen(false)}
            >
              <button
                onClick={() => setLinksOpen((v) => !v)}
                className="flex items-center gap-1.5 px-2 lg:px-3 h-16 text-[16px] font-[500] whitespace-nowrap transition-colors text-white/90 hover:bg-white/10 hover:text-white"
                aria-expanded={linksOpen}
              >
                <Link2 size={15} className="shrink-0" />
                {t("importantLinks")}
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
                        {t(`importantLinksList.${l.key}`)}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="hidden md:flex items-center shrink-0">
            <LanguageSwitcher />
          </div>

          {!isHome && (
            <Link
              href="/"
              className="flex md:hidden items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold text-white bg-white/10 border-white/20 hover:bg-white/15 transition-colors shrink-0 ml-auto"
              aria-label="Back to Home"
            >
              <Home size={16} />
              <span className="hidden sm:inline">{t("backToHome")}</span>
            </Link>
          )}
        </div>
      </header>

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
                <span className="text-white font-bold text-sm tracking-wide">{t("menu")}</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white p-1.5"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="px-5 pt-4">
                <LanguageSwitcher />
              </div>
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 text-sm rounded-lg font-medium transition-colors ${
                      pathname === l.href
                        ? "text-white bg-[#a4802f]"
                        : "text-white/75 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    <l.icon size={16} className="shrink-0" />
                    {t(`links.${l.key}`)}
                  </Link>
                ))}
                <p className="px-4 pt-4 pb-1 text-xs font-bold uppercase tracking-wide text-white/40">{t("importantLinks")}</p>
                {importantLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm rounded-lg font-medium text-white/75 hover:text-white hover:bg-white/8 transition-colors"
                  >
                    {t(`importantLinksList.${l.key}`)}
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
