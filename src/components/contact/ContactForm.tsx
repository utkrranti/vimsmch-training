"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("submissionFailed"));
      }
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("genericError"));
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-14 h-14 bg-[#04415f]/10 rounded-full flex items-center justify-center">
          <CheckCircle size={28} className="text-[#04415f]" />
        </div>
        <h3 className="text-[#011e2c] font-bold text-lg">{t("submittedTitle")}</h3>
        <p className="text-[#010608]/60 text-sm max-w-xs">
          {t("submittedText")}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-[#04415f] hover:text-[#2086b8] font-medium transition-colors"
        >
          {t("submitAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs text-[#010608]/50 font-medium mb-1.5">
            {t("fullNameLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder={t("fullNamePlaceholder")}
            className="w-full bg-[#f1f5f7] border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-[#010608]/50 font-medium mb-1.5">
            {t("phoneLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder={t("phonePlaceholder")}
            className="w-full bg-[#f1f5f7] border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#010608]/50 font-medium mb-1.5">{t("emailLabel")}</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("emailPlaceholder")}
          className="w-full bg-[#f1f5f7] border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-[#010608]/50 font-medium mb-1.5">{t("messageLabel")}</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder={t("messagePlaceholder")}
          className="w-full bg-[#f1f5f7] border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-colors shadow-md text-sm"
      >
        <Send size={15} />
        {status === "loading" ? t("sending") : t("send")}
      </button>

      <p className="text-[#010608]/40 text-xs text-center">
        {t("responseNote")}
      </p>
    </form>
  );
}
