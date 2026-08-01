import { ClipboardCheck, PhoneCall, TimerReset, UserCheck } from "lucide-react";
import ApplicationTable from "./ApplicationTable";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<{ status?: string }> };

export default async function ApplicationsPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const where = status ? { status } : undefined;
  const [applications, statusCounts, dueCallbacks] = await Promise.all([
    prisma.admissionApplication.findMany({ where, orderBy: { lastActivityAt: "desc" }, include: { course: { select: { title: true } } } }),
    prisma.admissionApplication.groupBy({ by: ["status"], _count: true }),
    prisma.admissionApplication.count({ where: { nextCallbackAt: { lte: new Date() }, status: { notIn: ["REJECTED", "ENROLLED"] } } }),
  ]);
  const counts = Object.fromEntries(statusCounts.map((row) => [row.status, row._count]));
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const submitted = (counts.SUBMITTED ?? 0) + (counts.DOCUMENT_VERIFICATION ?? 0);

  return <div className="space-y-6"><div><h1 className="flex items-center gap-2 text-2xl font-bold text-[#011e2c]"><ClipboardCheck size={23} className="text-[#04415f]" /> Admission Applications</h1><p className="mt-1 text-sm text-[#010608]/45">Track applicants, callbacks, documents, and payments.</p></div><div className="grid gap-4 sm:grid-cols-3"><Summary icon={PhoneCall} label="Total leads" value={total} /><Summary icon={TimerReset} label="Callbacks due" value={dueCallbacks} /><Summary icon={UserCheck} label="Submitted" value={submitted} /></div><div className="flex flex-wrap gap-2">{["", "DRAFT", "SUBMITTED", "DOCUMENT_VERIFICATION", "CORRECTION_REQUIRED", "ENROLLED", "REJECTED"].map((item) => <a key={item || "ALL"} href={item ? `/admin/applications?status=${item}` : "/admin/applications"} className={`rounded-full px-4 py-2 text-xs font-semibold ${status === item || (!status && !item) ? "bg-[#04415f] text-white" : "border border-[#e2eaee] bg-white text-[#010608]/55"}`}>{item ? item.replaceAll("_", " ") : "ALL"} <span className="ml-1 opacity-65">{item ? counts[item] ?? 0 : total}</span></a>)}</div><div className="overflow-hidden rounded-2xl border border-[#e2eaee] bg-white shadow-sm"><ApplicationTable applications={applications} /></div></div>;
}

function Summary({ icon: Icon, label, value }: { icon: typeof PhoneCall; label: string; value: number }) {
  return <div className="rounded-2xl border border-[#e2eaee] bg-white p-5 shadow-sm"><Icon size={20} className="text-[#2086b8]" /><p className="mt-3 text-3xl font-bold text-[#011e2c]">{value}</p><p className="text-xs font-semibold uppercase tracking-wide text-[#010608]/40">{label}</p></div>;
}
