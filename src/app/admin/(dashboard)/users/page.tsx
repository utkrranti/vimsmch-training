import { prisma } from "@/lib/prisma";
import { UserCog, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin Users | Admin" };

export default async function AdminUsersPage() {
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#011e2c] flex items-center gap-2">
            <UserCog size={22} className="text-[#04415f]" /> Admin Users
          </h1>
          <p className="text-[#010608]/45 text-sm mt-1">{users.length} admin account{users.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="bg-[#04415f]/5 border border-[#04415f]/15 rounded-2xl px-5 py-4 flex items-start gap-3">
        <ShieldCheck size={18} className="text-[#04415f] shrink-0 mt-0.5" />
        <p className="text-xs text-[#010608]/65 leading-relaxed">
          Admin accounts can only be created via the database seed script (<code className="bg-white border border-[#e6edf0] rounded px-1.5 py-0.5 font-mono text-[11px]">npm run db:seed-admin</code>).
          Password reset must also be done from the server. This keeps credentials out of the browser.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f1f5f7] border-b border-[#e6edf0]">
              <tr>
                {["Name", "Email", "Role", "Created"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-[#010608]/50 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={`border-b border-[#e6edf0] ${i % 2 !== 0 ? "bg-[#f8fafb]" : "bg-white"}`}>
                  <td className="px-6 py-4 font-semibold text-[#011e2c]">{u.name}</td>
                  <td className="px-6 py-4 text-[#010608]/60">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${u.role === "SUPER_ADMIN" ? "bg-[#04415f] text-white" : "bg-[#e6edf0] text-[#04415f]"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#010608]/50 text-xs">
                    {u.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
