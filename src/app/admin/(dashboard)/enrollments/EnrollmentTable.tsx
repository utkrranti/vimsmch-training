"use client";

import { useState, useTransition } from "react";
import { Trash2, ChevronDown } from "lucide-react";
import { updateEnrollmentStatus, deleteEnrollment } from "./actions";

type Enrollment = {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  createdAt: Date;
  course: { title: string };
  certificate: { certificateNo: string } | null;
};

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
  CANCELLED: "bg-red-100 text-red-600 border-red-200",
  COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function StatusSelect({ id, initial }: { id: string; initial: string }) {
  const [status, setStatus] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: string) => {
    setStatus(next);
    startTransition(async () => { await updateEnrollmentStatus(id, next); });
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

export default function EnrollmentTable({ enrollments }: { enrollments: Enrollment[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete enrollment for "${name}"? This cannot be undone.`)) return;
    startTransition(async () => { await deleteEnrollment(id); });
  };

  if (enrollments.length === 0) {
    return <p className="px-6 py-12 text-center text-[#010608]/40 text-sm">No enrollments found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[#f1f5f7] border-b border-[#e6edf0]">
          <tr>
            {["Name", "Email", "Phone", "Course", "Date", "Certificate", "Status", ""].map((h) => (
              <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#010608]/50 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e, i) => (
            <tr key={e.id} className={`border-b border-[#e6edf0] hover:bg-[#f8fafb] transition-colors ${i % 2 !== 0 ? "bg-[#f8fafb]" : "bg-white"}`}>
              <td className="px-5 py-3.5 font-medium text-[#011e2c] whitespace-nowrap">{e.name}</td>
              <td className="px-5 py-3.5 text-[#010608]/60 text-xs">{e.email}</td>
              <td className="px-5 py-3.5 text-[#010608]/60 whitespace-nowrap">{e.phone}</td>
              <td className="px-5 py-3.5">
                <span className="text-xs bg-[#e6edf0] text-[#04415f] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">{e.course.title}</span>
              </td>
              <td className="px-5 py-3.5 text-[#010608]/50 text-xs whitespace-nowrap">
                {e.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </td>
              <td className="px-5 py-3.5">
                {e.certificate ? (
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2.5 py-1 rounded-full">{e.certificate.certificateNo}</span>
                ) : (
                  <a href={`/admin/certificates?enrollmentId=${e.id}`} className="text-xs text-[#04415f] hover:text-[#2086b8] font-medium transition-colors">Issue →</a>
                )}
              </td>
              <td className="px-5 py-3.5"><StatusSelect id={e.id} initial={e.status} /></td>
              <td className="px-5 py-3.5">
                <button onClick={() => handleDelete(e.id, e.name)} disabled={isPending} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
