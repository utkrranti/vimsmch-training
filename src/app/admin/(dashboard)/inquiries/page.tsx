import { prisma } from "@/lib/prisma";
import { MessageSquare } from "lucide-react";
import InquiryTable from "./InquiryTable";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Inquiries | Admin" };

const STATUS_OPTIONS = ["ALL", "PENDING", "CONTACTED", "CLOSED"];

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  CLOSED: "bg-emerald-100 text-emerald-700",
};

type PageProps = { searchParams: Promise<{ status?: string }> };

export default async function AdminInquiriesPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const filter = STATUS_OPTIONS.includes(status ?? "") && status !== "ALL" ? status : undefined;

  const [inquiries, counts] = await Promise.all([
    prisma.inquiry.findMany({
      where: filter ? { status: filter } : undefined,
      orderBy: { createdAt: "desc" },
      include: { course: { select: { title: true } } },
    }),
    prisma.inquiry.groupBy({ by: ["status"], _count: true }),
  ]);

  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count]));
  const total = Object.values(countMap).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <MessageSquare size={22} className="text-[#04415f]" /> Inquiries
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">{total} total enquiries received</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((s) => {
          const count = s === "ALL" ? total : (countMap[s] ?? 0);
          const active = (s === "ALL" && !filter) || s === filter;
          return (
            <a
              key={s}
              href={s === "ALL" ? "/admin/inquiries" : `/admin/inquiries?status=${s}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                active
                  ? "bg-[#04415f] text-white shadow-sm"
                  : "bg-white border border-[#e6edf0] text-[#010608]/55 hover:border-[#04415f] hover:text-[#04415f]"
              }`}
            >
              {s === "ALL" ? "All" : s}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${active ? "bg-white/20 text-white" : (statusColors[s] ?? "bg-[#f1f5f7] text-[#010608]/40")}`}>
                {count}
              </span>
            </a>
          );
        })}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e6edf0]">
          <p className="text-sm font-semibold text-[#011e2c]">
            {filter ? `${filter} inquiries` : "All inquiries"}
            <span className="text-[#010608]/40 font-normal ml-2">— {inquiries.length} shown</span>
          </p>
        </div>
        <InquiryTable inquiries={inquiries} />
      </div>
    </div>
  );
}
