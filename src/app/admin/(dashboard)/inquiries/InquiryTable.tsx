"use client";

import { useState, useTransition } from "react";
import { Trash2, ChevronDown, Mail, X, Loader2, Send, CheckCircle } from "lucide-react";
import { updateInquiryStatus, deleteInquiry, sendInquiryReply } from "./actions";

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
  course: { title: string } | null;
};

const STATUSES = ["PENDING", "CONTACTED", "CLOSED"];

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONTACTED: "bg-blue-100 text-blue-700 border-blue-200",
  CLOSED: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function StatusSelect({ id, initial }: { id: string; initial: string }) {
  const [status, setStatus] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: string) => {
    setStatus(next);
    startTransition(async () => { await updateInquiryStatus(id, next); });
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isPending}
        className={`appearance-none text-xs font-semibold pl-3 pr-7 py-1.5 rounded-full border cursor-pointer transition-all disabled:opacity-60 ${statusStyles[status] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}
      >
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <ChevronDown size={11} className="absolute right-2 pointer-events-none opacity-60" />
    </div>
  );
}

function ReplyModal({ inquiry, onClose }: { inquiry: Inquiry; onClose: () => void }) {
  const [msg, setMsg] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(null);

  const handleSend = () => {
    if (!msg.trim()) return;
    startTransition(async () => {
      const res = await sendInquiryReply(inquiry.id, msg.trim());
      setResult(res);
      if (res.ok) setMsg("");
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-[#011e2c]/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="h-1" style={{ background: "linear-gradient(90deg, #04415f, #2086b8)" }} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#011e2c] flex items-center gap-2">
              <Mail size={18} className="text-[#04415f]" /> Reply to {inquiry.name}
            </h2>
            <button onClick={onClose} className="text-[#010608]/40 hover:text-[#011e2c] transition-colors p-1.5 rounded-lg hover:bg-[#f1f5f7]">
              <X size={18} />
            </button>
          </div>

          {/* Recipient summary */}
          <div className="bg-[#f1f5f7] rounded-xl px-4 py-3 text-xs space-y-1 mb-4">
            <p><span className="text-[#010608]/40">To: </span><span className="text-[#011e2c] font-semibold">{inquiry.email}</span></p>
            {inquiry.course && <p><span className="text-[#010608]/40">Re: </span><span className="text-[#011e2c]">{inquiry.course.title}</span></p>}
          </div>

          {result?.ok ? (
            <div className="flex flex-col items-center py-8 text-center gap-3">
              <CheckCircle size={40} className="text-emerald-500" />
              <p className="text-[#011e2c] font-semibold">Reply sent successfully!</p>
              <p className="text-[#010608]/50 text-xs">Status updated to CONTACTED.</p>
              <button onClick={onClose} className="mt-2 px-5 py-2 text-sm font-medium text-[#04415f] hover:text-[#011e2c] border border-[#e6edf0] rounded-xl hover:bg-[#f1f5f7] transition-colors">
                Close
              </button>
            </div>
          ) : (
            <>
              {result?.error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-xs mb-4">{result.error}</div>
              )}
              <label className="block text-xs font-semibold text-[#010608]/50 uppercase tracking-wide mb-1.5">Your Message</label>
              <textarea
                rows={6}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your reply here. Be clear and helpful — the student will receive this via email."
                className="w-full bg-[#f8fafb] border border-[#e2eaee] text-[#011e2c] placeholder-[#010608]/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:bg-white focus:ring-2 focus:ring-[#04415f]/10 transition-all resize-none"
              />
              <p className="text-[10px] text-[#010608]/35 mt-1.5 mb-4">Sending from: {process.env.NEXT_PUBLIC_SMTP_FROM ?? "no-reply@wecodeyourdream.cloud"} · Status will auto-update to CONTACTED.</p>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-[#010608]/50 hover:text-[#011e2c] rounded-xl hover:bg-[#f1f5f7] transition-colors">Cancel</button>
                <button
                  onClick={handleSend}
                  disabled={isPending || !msg.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-50 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
                >
                  {isPending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  {isPending ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InquiryTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [replyTarget, setReplyTarget] = useState<Inquiry | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete inquiry from "${name}"? This cannot be undone.`)) return;
    startTransition(async () => { await deleteInquiry(id); });
  };

  if (inquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-[#010608]/40 text-sm font-medium">No inquiries found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#f1f5f7] border-b border-[#e6edf0]">
            <tr>
              {["Name", "Phone", "Email", "Course", "Message", "Date", "Status", ""].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#010608]/50 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq, i) => (
              <tr key={inq.id} className={`border-b border-[#e6edf0] hover:bg-[#f8fafb] transition-colors ${i % 2 !== 0 ? "bg-[#f8fafb]" : "bg-white"}`}>
                <td className="px-5 py-3.5 font-medium text-[#011e2c] whitespace-nowrap">{inq.name}</td>
                <td className="px-5 py-3.5 text-[#010608]/60 whitespace-nowrap">{inq.phone}</td>
                <td className="px-5 py-3.5 text-[#010608]/60 whitespace-nowrap text-xs">{inq.email || "—"}</td>
                <td className="px-5 py-3.5">
                  {inq.course
                    ? <span className="text-xs bg-[#e6edf0] text-[#04415f] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">{inq.course.title}</span>
                    : <span className="text-[#010608]/30 text-xs">General</span>}
                </td>
                <td className="px-5 py-3.5 text-[#010608]/55 text-xs max-w-[200px]">
                  <span className="line-clamp-2">{inq.message || "—"}</span>
                </td>
                <td className="px-5 py-3.5 text-[#010608]/50 text-xs whitespace-nowrap">
                  {inq.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-5 py-3.5"><StatusSelect id={inq.id} initial={inq.status} /></td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {inq.email && (
                      <button
                        onClick={() => setReplyTarget(inq)}
                        className="p-1.5 rounded-lg text-[#04415f] hover:bg-[#e6edf0] transition-colors"
                        title="Reply by email"
                      >
                        <Mail size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(inq.id, inq.name)}
                      disabled={isPending}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {replyTarget && <ReplyModal inquiry={replyTarget} onClose={() => setReplyTarget(null)} />}
    </>
  );
}
