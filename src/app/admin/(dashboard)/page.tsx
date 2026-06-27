import { prisma } from "@/lib/prisma";
import { BookOpen, MessageSquare, ClipboardList, Award } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [courses, inquiries, enrollments, certificates] = await Promise.all([
    prisma.course.count({ where: { isActive: true } }),
    prisma.inquiry.count(),
    prisma.enrollment.count(),
    prisma.certificate.count(),
  ]);

  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const stats = [
    { label: "Active Courses", value: courses, icon: BookOpen, color: "bg-[#04415f]" },
    { label: "Total Inquiries", value: inquiries, icon: MessageSquare, color: "bg-[#2086b8]" },
    { label: "Enrollments", value: enrollments, icon: ClipboardList, color: "bg-[#065a82]" },
    { label: "Certificates Issued", value: certificates, icon: Award, color: "bg-[#011e2c]" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#011e2c]">Dashboard</h1>
        <p className="text-[#010608]/50 text-sm mt-1">Welcome back — here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-5 flex items-center gap-4">
            <div className={`w-11 h-11 ${s.color} rounded-xl flex items-center justify-center shrink-0`}>
              <s.icon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[#011e2c]">{s.value}</p>
              <p className="text-[#010608]/45 text-xs">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e6edf0] flex items-center justify-between">
          <h2 className="font-bold text-[#011e2c] text-sm">Recent Inquiries</h2>
          <a href="/admin/inquiries" className="text-xs text-[#04415f] hover:text-[#2086b8] font-medium transition-colors">
            View all →
          </a>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="px-6 py-8 text-[#010608]/40 text-sm text-center">No inquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f1f5f7] border-b border-[#e6edf0]">
                <tr>
                  {["Name", "Phone", "Email", "Date", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#010608]/50 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq, i) => (
                  <tr key={inq.id} className={`border-b border-[#e6edf0] ${i % 2 === 0 ? "bg-white" : "bg-[#f1f5f7]"}`}>
                    <td className="px-5 py-3 font-medium text-[#011e2c]">{inq.name}</td>
                    <td className="px-5 py-3 text-[#010608]/60">{inq.phone}</td>
                    <td className="px-5 py-3 text-[#010608]/60">{inq.email || "—"}</td>
                    <td className="px-5 py-3 text-[#010608]/50 text-xs">
                      {inq.createdAt.toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={inq.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    CONTACTED: "bg-blue-100 text-blue-700",
    CLOSED: "bg-green-100 text-green-700",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
