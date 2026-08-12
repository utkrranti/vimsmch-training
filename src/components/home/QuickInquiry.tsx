"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle } from "lucide-react";

export default function QuickInquiry() {
  const t = useTranslations("quickInquiry");
  const courseOptions = [
    "Operation Theatre Assistant",
    "ECG Technology",
    "Dialysis Technician",
    "Medical Laboratory Technology",
    "Radiology and Imaging Technology",
  ];
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", course: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.course ? `Course of interest: ${form.course}` : undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("submissionFailed"));
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("genericError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="py-20 px-4 sm:px-6"
      style={{ background: "linear-gradient(135deg, #2589b8 0%, #3fa0cc 100%)" }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div className="text-white">
          <span className="inline-block text-[#2086b8] text-xs font-semibold uppercase tracking-widest mb-4">
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t("heading")}
          </h2>
          <div className="w-16 h-1 bg-[#2086b8] rounded mb-6" />
          <p className="text-white/80 text-base leading-relaxed mb-7">
            {t("description")}
          </p>
          <ul className="space-y-3 text-sm text-white/80">
            {[t("bullet1"), t("bullet2"), t("bullet3")].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-[#2086b8] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={52} className="text-[#059652] mx-auto mb-4" />
              <h3 className="text-[#011e2c] font-bold text-xl mb-2">{t("submittedTitle")}</h3>
              <p className="text-[#010608]/60 text-sm">
                {t("submittedText")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  {t("fullNameLabel")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("fullNamePlaceholder")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                />
              </div>
              <div>
                <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  {t("phoneLabel")}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={t("phonePlaceholder")}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                />
              </div>
              <div>
                <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  {t("courseLabel")}
                </label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="w-full border border-[#cdd8de] text-[#010608] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                >
                  <option value="">{t("selectCourse")}</option>
                  {courseOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                  <option value="Other / Not sure yet">{t("courseOtherOption")}</option>
                </select>
              </div>
              {error && (
                <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? t("submitting") : <><Send size={15} /> {t("submit")}</>}
              </button>
              <p className="text-[#010608]/40 text-xs text-center">
                {t("privacyNote")}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
