"use client";

import { useState, useTransition } from "react";
import { Award, Loader2 } from "lucide-react";
import { issueCertificate } from "./actions";

type Enrollment = { id: string; name: string; course: { title: string } };

export default function IssueCertForm({ enrollments }: { enrollments: Enrollment[] }) {
  const [isPending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState("");
  const [certNo, setCertNo] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const selected = enrollments.find((e) => e.id === selectedId);

  const handleIssue = () => {
    if (!selectedId || !certNo.trim()) { setError("Select an enrollment and enter a certificate number."); return; }
    if (!selected) return;
    setError("");
    startTransition(async () => {
      try {
        await issueCertificate({
          enrollmentId: selectedId,
          certificateNo: certNo.trim(),
          studentName: selected.name,
          courseName: selected.course.title,
        });
        setSuccess(`Certificate ${certNo} issued to ${selected.name}.`);
        setSelectedId("");
        setCertNo("");
      } catch {
        setError("Failed to issue certificate. The certificate number may already exist.");
      }
    });
  };

  const inputCls = "w-full bg-[#f8fafb] border border-[#e2eaee] text-[#011e2c] placeholder-[#010608]/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:bg-white focus:ring-2 focus:ring-[#04415f]/10 transition-all";
  const labelCls = "block text-xs font-semibold text-[#010608]/50 uppercase tracking-wide mb-1.5";

  return (
    <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#e6edf0]">
        <div className="w-8 h-8 bg-[#04415f]/10 rounded-xl flex items-center justify-center">
          <Award size={16} className="text-[#04415f]" />
        </div>
        <h2 className="font-bold text-[#011e2c] text-sm">Issue New Certificate</h2>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-xs mb-4">{error}</div>}
      {success && <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-700 text-xs mb-4">{success}</div>}

      <div className="space-y-4">
        <div>
          <label className={labelCls}>Select Enrollment (without certificate)</label>
          {enrollments.length === 0 ? (
            <p className="text-xs text-[#010608]/40 bg-[#f1f5f7] rounded-xl px-4 py-3">No pending enrollments without a certificate.</p>
          ) : (
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className={inputCls}>
              <option value="">— Select student enrollment —</option>
              {enrollments.map((e) => (
                <option key={e.id} value={e.id}>{e.name} — {e.course.title}</option>
              ))}
            </select>
          )}
        </div>

        {selected && (
          <div className="bg-[#f1f5f7] rounded-xl px-4 py-3 text-xs space-y-1">
            <p><span className="text-[#010608]/40">Student: </span><span className="text-[#011e2c] font-semibold">{selected.name}</span></p>
            <p><span className="text-[#010608]/40">Course: </span><span className="text-[#011e2c]">{selected.course.title}</span></p>
          </div>
        )}

        <div>
          <label className={labelCls}>Certificate Number</label>
          <input
            className={inputCls}
            value={certNo}
            onChange={(e) => setCertNo(e.target.value)}
            placeholder="e.g. VIMSMCH/VT/2026/0001"
          />
          <p className="text-[10px] text-[#010608]/35 mt-1">Must be unique. Suggested format: VIMSMCH/VT/YEAR/NNNN</p>
        </div>

        <button
          onClick={handleIssue}
          disabled={isPending || !selectedId || !certNo.trim()}
          className="flex items-center justify-center gap-2 w-full bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-50 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
        >
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Award size={14} />}
          {isPending ? "Issuing..." : "Issue Certificate"}
        </button>
      </div>
    </div>
  );
}
