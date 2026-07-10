"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const courseOptions = [
  "Operation Theatre Assistant",
  "ECG Technology",
  "Dialysis Technician",
  "Medical Laboratory Technology",
  "Radiology and Imaging Technology",
  "Other / Not sure yet",
];

export default function QuickInquiry() {
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
        throw new Error(data.error || "Submission failed.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="py-20 px-4 sm:px-6"
      style={{ background: "linear-gradient(135deg, #04415f 0%, #065a82 100%)" }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div className="text-white">
          <span className="inline-block text-[#2086b8] text-xs font-semibold uppercase tracking-widest mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Interested? Let&apos;s Talk.
          </h2>
          <div className="w-16 h-1 bg-[#2086b8] rounded mb-6" />
          <p className="text-white/80 text-base leading-relaxed mb-7">
            Fill in your details and our admissions counsellor will call you within 1 working day.
            No commitment — just honest information.
          </p>
          <ul className="space-y-3 text-sm text-white/80">
            {[
              "Free counselling session",
              "Full fee transparency — no hidden charges",
              "Course duration & certificate details shared upfront",
            ].map((item) => (
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
              <h3 className="text-[#011e2c] font-bold text-xl mb-2">Inquiry Submitted!</h3>
              <p className="text-[#010608]/60 text-sm">
                Our counsellor will reach out to you within 1 working day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                />
              </div>
              <div>
                <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                />
              </div>
              <div>
                <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Course Interested In
                </label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="w-full border border-[#cdd8de] text-[#010608] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                >
                  <option value="">Select a course</option>
                  {courseOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
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
                {loading ? "Submitting..." : <><Send size={15} /> Submit Inquiry</>}
              </button>
              <p className="text-[#010608]/40 text-xs text-center">
                Your information is kept private and not shared with third parties.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
