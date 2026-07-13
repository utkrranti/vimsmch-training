"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminSidebarNav from "@/components/admin/AdminSidebarNav";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const sidebarInner = (
    <>
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      {/* Logo */}
      <div className="relative px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" onClick={() => setOpen(false)}>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 border border-white/15 rounded-xl p-2 backdrop-blur-sm">
              <Image src="/logo.png" alt="VIMSMCH" width={90} height={20} className="h-5 w-auto" />
            </div>
          </div>
        </Link>
        <button onClick={() => setOpen(false)} className="lg:hidden text-white/50 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Close menu">
          <X size={18} />
        </button>
      </div>
      <div className="relative px-5 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium">Admin Portal</p>
        </div>
      </div>

      {/* Nav */}
      <div className="relative flex-1 overflow-y-auto py-4 px-3" onClick={() => setOpen(false)}>
        <AdminSidebarNav />
      </div>

      {/* Footer */}
      <div className="relative px-4 py-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs transition-colors px-2 py-2 rounded-lg hover:bg-white/5 mb-1"
        >
          <span className="text-[10px]">↗</span> View Public Site
        </Link>
        <AdminLogoutButton />
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-[#f0f4f7]">

      {/* Desktop sidebar — always visible */}
      <aside
        className="hidden lg:flex w-64 shrink-0 flex-col min-h-screen sticky top-0 h-screen overflow-hidden"
        style={{ background: "linear-gradient(180deg, #011e2c 0%, #04415f 60%, #065a82 100%)" }}
      >
        {sidebarInner}
      </aside>

      {/* Mobile off-canvas sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#011e2c]/50 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
              className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] flex flex-col lg:hidden"
              style={{ background: "linear-gradient(180deg, #011e2c 0%, #04415f 60%, #065a82 100%)" }}
            >
              {sidebarInner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-[#e2eaee] px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-[#04415f] p-1.5 -ml-1.5 rounded-lg hover:bg-[#f1f5f7] transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="w-1.5 h-5 rounded-full bg-[#04415f] hidden sm:block shrink-0" />
            <p className="text-[#010608]/50 text-xs font-medium truncate">VIMSMCH Paramedical Institute</p>
          </div>
          <p className="text-[#010608]/35 text-xs hidden sm:block shrink-0">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
