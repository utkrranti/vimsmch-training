import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserCog, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import AdminUsersManager from "./AdminUsersManager";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin Users | Admin" };

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "SUPER_ADMIN") redirect("/admin");

  const currentEmail = (session?.user as { email?: string } | undefined)?.email ?? null;
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
          Sign-in uses a one-time code emailed to the account&apos;s address — there is no password to manage or reset.
          Only a Super Admin can add or remove admin accounts, from here.
        </p>
      </div>

      <AdminUsersManager users={users} currentEmail={currentEmail} />
    </div>
  );
}
