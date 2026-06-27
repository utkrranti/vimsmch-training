"use client";

import { useState, useTransition } from "react";
import { Trash2, ChevronDown } from "lucide-react";
import { updateInquiryStatus, deleteInquiry } from "./actions";

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
    startTransition(async () => {
      await updateInquiryStatus(id, next);
    });
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

export default function InquiryTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete inquiry from "${name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteInquiry(id);
    });
  };

  if (inquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-[#010608]/40 text-sm font-medium">No inquiries found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[#f1f5f7] border-b border-[#e6edf0]">
          <tr>
            {["Name", "Phone", "Email", "Course", "Message", "Date", "Status", ""].map((h) => (
              <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#010608]/50 uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq, i) => (
            <tr key={inq.id} className={`border-b border-[#e6edf0] hover:bg-[#f8fafb] transition-colors ${i % 2 !== 0 ? "bg-[#f8fafb]" : "bg-white"}`}>
              <td className="px-5 py-3.5 font-medium text-[#011e2c] whitespace-nowrap">{inq.name}</td>
              <td className="px-5 py-3.5 text-[#010608]/60 whitespace-nowrap">{inq.phone}</td>
              <td className="px-5 py-3.5 text-[#010608]/60 whitespace-nowrap">{inq.email || "—"}</td>
              <td className="px-5 py-3.5">
                {inq.course ? (
                  <span className="text-xs bg-[#e6edf0] text-[#04415f] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                    {inq.course.title}
                  </span>
                ) : <span className="text-[#010608]/30 text-xs">General</span>}
              </td>
              <td className="px-5 py-3.5 text-[#010608]/55 text-xs max-w-[220px]">
                <span className="line-clamp-2">{inq.message || "—"}</span>
              </td>
              <td className="px-5 py-3.5 text-[#010608]/50 text-xs whitespace-nowrap">
                {inq.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </td>
              <td className="px-5 py-3.5">
                <StatusSelect id={inq.id} initial={inq.status} />
              </td>
              <td className="px-5 py-3.5">
                <button
                  onClick={() => handleDelete(inq.id, inq.name)}
                  disabled={isPending}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
