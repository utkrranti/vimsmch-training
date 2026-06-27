import { prisma } from "@/lib/prisma";
import { ClipboardList } from "lucide-react";
import EnrollmentTable from "./EnrollmentTable";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Enrollments | Admin" };

const STATUS_OPTIONS = ["ALL", "PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-600",
  COMPLETED: "bg-emerald-100 text-emerald-700",
};

type PageProps = { searchParams: Promise<{ status?: string }> };

export default async function AdminEnrollmentsPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const filter = STATUS_OPTIONS.includes(status ?? "") && status !== "ALL" ? status : undefined;

  const [enrollments, counts] = await Promise.all([
    prisma.enrollment.findMany({
      where: filter ? { status: filter } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        course: { select: { title: true } },
        certificate: { select: { certificateNo: true } },
      },
    }),
    prisma.enrollment.groupBy({ by: ["status"], _count: true }),
  ]);

  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count]));
  const total = Object.values(countMap).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <ClipboardList size={22} className="text-[#04415f]" /> Enrollments
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">{total} total enrollment{total !== 1 ? "s" : ""}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((s) => {
          const count = s === "ALL" ? total : (countMap[s] ?? 0);
          const active = (s === "ALL" && !filter) || s === filter;
          return (
            <a
              key={s}
              href={s === "ALL" ? "/admin/enrollments" : `/admin/enrollments?status=${s}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${active ? "bg-[#04415f] text-white shadow-sm" : "bg-white border border-[#e6edf0] text-[#010608]/55 hover:border-[#04415f] hover:text-[#04415f]"}`}
            >
              {s === "ALL" ? "All" : s}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${active ? "bg-white/20 text-white" : (statusColors[s] ?? "bg-[#f1f5f7] text-[#010608]/40")}`}>{count}</span>
            </a>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e6edf0]">
          <p className="text-sm font-semibold text-[#011e2c]">
            {filter ? `${filter} enrollments` : "All enrollments"}
            <span className="text-[#010608]/40 font-normal ml-2">— {enrollments.length} shown</span>
          </p>
        </div>
        <EnrollmentTable enrollments={enrollments} />
      </div>
    </div>
  );
}
