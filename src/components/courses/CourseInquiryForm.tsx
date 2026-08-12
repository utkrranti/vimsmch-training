"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle } from "lucide-react";

export default function CourseInquiryForm({
  courseTitle,
  courseId,
}: {
  courseTitle: string;
  courseId?: string;
}) {
  const t = useTranslations("courseInquiryForm");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          courseId,
          message: `Course: ${courseTitle}. ${form.message}`,
        }),
      });
      if (!res.ok) throw new Error(t("submissionFailed"));
      setSubmitted(true);
    } catch {
      alert(t("genericError"));
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-10 text-center">
        <CheckCircle size={52} className="text-[#059652] mx-auto mb-4" />
        <h3 className="text-[#011e2c] font-bold text-xl mb-2">{t("submittedTitle")}</h3>
        <p className="text-[#010608]/60 text-sm">
          {t("submittedText")}{" "}
          <strong className="text-[#011e2c]">{courseTitle}</strong>.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full bg-[#f1f5f7] border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors";
  const labelCls = "block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-8 space-y-5">
      <input type="hidden" name="course" value={courseTitle} />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>{t("fullNameLabel")}</label>
          <input type="text" required placeholder={t("fullNamePlaceholder")} value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{t("phoneLabel")}</label>
          <input type="tel" required placeholder={t("phonePlaceholder")} value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>{t("emailLabel")}</label>
        <input type="email" placeholder={t("emailPlaceholder")} value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>{t("courseLabel")}</label>
        <input type="text" readOnly value={courseTitle}
          className="w-full bg-[#e6edf0] border border-[#cdd8de] text-[#010608]/50 rounded-lg px-4 py-3 text-sm cursor-not-allowed" />
      </div>

      <div>
        <label className={labelCls}>{t("messageLabel")}</label>
        <textarea rows={3} placeholder={t("messagePlaceholder")}
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputCls} resize-none`} />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0">
        {loading ? t("submitting") : <><Send size={15} /> {t("submit")}</>}
      </button>

      <p className="text-[#010608]/30 text-xs text-center">
        {t("privacyNote")}
      </p>
    </form>
  );
}
