"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, LogIn, AlertCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const inputCls =
    "w-full bg-[#f8fafb] border border-[#e2eaee] text-[#010608] placeholder-[#010608]/25 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#04415f] focus:bg-white focus:ring-2 focus:ring-[#04415f]/10 transition-all duration-200";

  const requestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setInfo(""); setLoading(true);
    try {
      const response = await fetch("/api/admin/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setInfo(`A login code has been sent to ${email}.`);
      setStep("code");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to send the login code.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const result = await signIn("credentials", { email, code, redirect: false });
    if (result?.error) {
      setError("Invalid or expired code. Please try again.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {step === "email" ? (
        <motion.form
          key="email"
          onSubmit={requestCode}
          className="space-y-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div>
            <label className="block text-xs text-[#010608]/50 font-semibold mb-2 uppercase tracking-wide">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@vimsmch.edu.in"
              autoComplete="email"
              autoFocus
              className={inputCls}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 overflow-hidden"
              >
                <AlertCircle size={15} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-xs">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2 bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-[#04415f]/20 text-sm mt-2"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <Mail size={15} />
            )}
            {loading ? "Sending code..." : "Send login code"}
          </motion.button>
        </motion.form>
      ) : (
        <motion.form
          key="code"
          onSubmit={verifyCode}
          className="space-y-5"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {info && <p className="text-xs text-[#04415f] bg-[#04415f]/5 border border-[#04415f]/15 rounded-xl px-4 py-3">{info}</p>}

          <div>
            <label className="block text-xs text-[#010608]/50 font-semibold mb-2 uppercase tracking-wide">6-digit code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              placeholder="000000"
              autoComplete="one-time-code"
              autoFocus
              className={`${inputCls} text-center text-lg tracking-[0.5em] font-bold`}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 overflow-hidden"
              >
                <AlertCircle size={15} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-xs">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading || code.length !== 6}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2 bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-[#04415f]/20 text-sm mt-2"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <LogIn size={15} />
            )}
            {loading ? "Verifying..." : "Sign In"}
          </motion.button>

          <button
            type="button"
            onClick={() => { setStep("email"); setCode(""); setError(""); setInfo(""); }}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-[#010608]/45 hover:text-[#04415f] font-medium transition-colors"
          >
            <ArrowLeft size={13} /> Use a different email
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
