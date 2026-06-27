import Link from "next/link";
import Image from "next/image";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminSidebarNav from "@/components/admin/AdminSidebarNav";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin | VIMSMCH Vocational Training" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#f0f4f7]">

      {/* Sidebar */}
      <aside className="w-64 shrink-0 flex flex-col min-h-screen sticky top-0 h-screen overflow-hidden"
        style={{ background: "linear-gradient(180deg, #011e2c 0%, #04415f 60%, #065a82 100%)" }}>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

        {/* Logo */}
        <div className="relative px-5 py-5 border-b border-white/10">
          <Link href="/admin">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 border border-white/15 rounded-xl p-2 backdrop-blur-sm">
                <Image src="/logo.png" alt="VIMSMCH" width={90} height={20} className="h-5 w-auto" />
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium">Admin Portal</p>
          </div>
        </div>

        {/* Nav */}
        <div className="relative flex-1 overflow-y-auto py-4 px-3">
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
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-[#e2eaee] px-6 py-3.5 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 rounded-full bg-[#04415f]" />
            <p className="text-[#010608]/50 text-xs font-medium">VIMSMCH Vocational Training</p>
          </div>
          <p className="text-[#010608]/35 text-xs">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
