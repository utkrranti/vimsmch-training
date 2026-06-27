"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function CourseInquiryForm({
  courseTitle,
  courseId,
}: {
  courseTitle: string;
  courseId?: string;
}) {
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
      if (!res.ok) throw new Error("Submission failed.");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-10 text-center">
        <CheckCircle size={52} className="text-[#059652] mx-auto mb-4" />
        <h3 className="text-[#011e2c] font-bold text-xl mb-2">Inquiry Submitted!</h3>
        <p className="text-[#010608]/60 text-sm">
          Our admissions counsellor will contact you within 1 working day regarding{" "}
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
          <label className={labelCls}>Full Name *</label>
          <input type="text" required placeholder="Your full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input type="tel" required placeholder="+91 XXXXX XXXXX" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Email Address</label>
        <input type="email" placeholder="your@email.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Course</label>
        <input type="text" readOnly value={courseTitle}
          className="w-full bg-[#e6edf0] border border-[#cdd8de] text-[#010608]/50 rounded-lg px-4 py-3 text-sm cursor-not-allowed" />
      </div>

      <div>
        <label className={labelCls}>Message / Questions</label>
        <textarea rows={3} placeholder="Any specific questions about this course..."
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputCls} resize-none`} />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0">
        {loading ? "Submitting..." : <><Send size={15} /> Submit Inquiry</>}
      </button>

      <p className="text-[#010608]/30 text-xs text-center">
        Your details are kept private and not shared with third parties.
      </p>
    </form>
  );
}
