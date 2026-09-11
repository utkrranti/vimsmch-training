"use client";

import { useState } from "react";
import { Megaphone, X, Send, CheckCircle } from "lucide-react";

const PROGRAMME_OPTIONS = [
  "Operation Theatre Assistant",
  "ECG Technology",
  "Dialysis Technician",
  "Medical Laboratory Technology",
  "Radiology and Imaging Technology",
  "Other / Not sure yet",
];

export default function AdmissionEnquiryModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "", website: "" });

  function reset() {
    setForm({ name: "", email: "", phone: "", course: "", message: "", website: "" });
    setSubmitted(false);
    setError("");
  }

  function close() {
    setOpen(false);
    setTimeout(reset, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admission-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-2 text-white font-bold text-base px-9 py-4 rounded-full shadow-lg animate-[admission-pulse_1.8s_ease-in-out_infinite] transition-transform hover:-translate-y-0.5 hover:scale-[1.03]"
          style={{ background: "linear-gradient(135deg, #e0122b 0%, #8f0018 100%)" }}
        >
          <Megaphone size={18} className="shrink-0" />
          Admission Enquiry
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admissionEnquiryTitle"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto">
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ background: "linear-gradient(135deg, #04415f 0%, #065a82 100%)" }}
            >
              <h2 id="admissionEnquiryTitle" className="text-white font-bold text-lg flex items-center gap-2">
                <Megaphone size={18} /> For Admission Enquiry
              </h2>
              <button type="button" onClick={close} aria-label="Close" className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-6">
                  <CheckCircle size={48} className="text-[#059652] mx-auto mb-4" />
                  <h3 className="text-[#011e2c] font-bold text-lg mb-2">Thank you!</h3>
                  <p className="text-[#010608]/60 text-sm mb-5">
                    Your admission enquiry has been submitted. Our team will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="text-sm font-semibold text-[#04415f] hover:underline"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot — hidden from real visitors */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="absolute -left-[9999px] w-px h-px overflow-hidden"
                    aria-hidden="true"
                  />

                  <div>
                    <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">Contact No</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">Programme</label>
                    <select
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full border border-[#cdd8de] text-[#010608] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7]"
                    >
                      <option value="">Select Programme</option>
                      {PROGRAMME_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">How can we help you?</label>
                    <textarea
                      rows={3}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors bg-[#f1f5f7] resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={close}
                      className="flex-1 border border-[#cdd8de] text-[#011e2c] font-semibold py-3 rounded-lg transition-colors hover:bg-[#f1f5f7]"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                      style={{ background: "#e0122b" }}
                    >
                      {loading ? "Submitting..." : <><Send size={15} /> Submit</>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
