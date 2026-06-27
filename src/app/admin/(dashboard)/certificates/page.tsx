import { prisma } from "@/lib/prisma";
import { Award, Search } from "lucide-react";
import IssueCertForm from "./IssueCertForm";
import RevokeCertButton from "./RevokeCertButton";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Certificates | Admin" };

export default async function AdminCertificatesPage() {
  const [certs, pendingEnrollments] = await Promise.all([
    prisma.certificate.findMany({
      orderBy: { issuedAt: "desc" },
      include: { enrollment: { select: { course: { select: { title: true } } } } },
    }),
    prisma.enrollment.findMany({
      where: { certificate: null },
      orderBy: { createdAt: "desc" },
      include: { course: { select: { title: true } } },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <Award size={22} className="text-[#04415f]" /> Certificates
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">{certs.length} issued · {pendingEnrollments.length} enrollment{pendingEnrollments.length !== 1 ? "s" : ""} pending</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Issue form */}
        <div className="lg:col-span-1">
          <IssueCertForm enrollments={pendingEnrollments} />
        </div>

        {/* Issued certificates list */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e6edf0] flex items-center justify-between">
              <h2 className="font-bold text-[#011e2c] text-sm">Issued Certificates</h2>
              <span className="text-xs text-[#010608]/40">{certs.length} total</span>
            </div>
            {certs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search size={28} className="text-[#010608]/15 mb-3" />
                <p className="text-[#010608]/40 text-sm">No certificates issued yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#f1f5f7] border-b border-[#e6edf0]">
                    <tr>
                      {["Certificate No.", "Student", "Course", "Issued On", ""].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#010608]/50 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {certs.map((c, i) => (
                      <tr key={c.id} className={`border-b border-[#e6edf0] hover:bg-[#f8fafb] transition-colors ${i % 2 !== 0 ? "bg-[#f8fafb]" : "bg-white"}`}>
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs font-semibold text-[#04415f] bg-[#e6edf0] px-2.5 py-1 rounded-lg">{c.certificateNo}</span>
                        </td>
                        <td className="px-5 py-3.5 font-medium text-[#011e2c] whitespace-nowrap">{c.studentName}</td>
                        <td className="px-5 py-3.5 text-xs text-[#010608]/60">{c.courseName}</td>
                        <td className="px-5 py-3.5 text-xs text-[#010608]/50 whitespace-nowrap">
                          {c.issuedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-5 py-3.5">
                          <RevokeCertButton id={c.id} certNo={c.certificateNo} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
