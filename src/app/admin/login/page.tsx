import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Login | VIMSMCH Vocational Training" };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #011e2c 0%, #04415f 50%, #065a82 100%)" }}>

      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #2086b8, transparent)" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #04415f, transparent)" }} />

      <div className="relative w-full max-w-md z-10">
        {/* Logo mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 mb-5 shadow-xl">
            <Image src="/logo.png" alt="VIMSMCH" width={160} height={36} className="h-9 w-auto" />
          </div>
          <h2 className="text-white/60 text-xs uppercase tracking-[0.2em] font-medium">Vocational Training Division</h2>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Top accent bar */}
          <div className="h-1" style={{ background: "linear-gradient(90deg, #04415f, #2086b8, #04415f)" }} />

          <div className="p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-[#011e2c] tracking-tight mb-1">Welcome back</h1>
              <p className="text-[#010608]/45 text-sm">Sign in to the admin portal</p>
            </div>
            <AdminLoginForm />
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-7">
          © {new Date().getFullYear()} Dr. Vithalrao Vikhe Patil Foundation&apos;s · All Rights Reserved
        </p>
      </div>
    </div>
  );
}
