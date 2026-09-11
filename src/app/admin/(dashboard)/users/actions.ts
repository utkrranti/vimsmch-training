"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const VALID_ROLES = ["SUPER_ADMIN", "EDITOR"];

export async function createAdminUser(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "SUPER_ADMIN") {
    return { ok: false, error: "Only a Super Admin can add admin accounts." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const newRole = String(formData.get("role") ?? "EDITOR").trim();

  if (!name || !email) {
    return { ok: false, error: "Name and email are required." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (!VALID_ROLES.includes(newRole)) {
    return { ok: false, error: "Invalid role." };
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: `An admin account already exists for ${email} (role: ${existing.role}).` };
  }

  await prisma.adminUser.create({ data: { email, name, role: newRole } });
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function deleteAdminUser(id: string): Promise<{ ok: boolean; error?: string }> {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "SUPER_ADMIN") {
    return { ok: false, error: "Only a Super Admin can remove admin accounts." };
  }

  const target = await prisma.adminUser.findUnique({ where: { id } });
  const currentEmail = (session?.user as { email?: string } | undefined)?.email;
  if (target && currentEmail && target.email.toLowerCase() === currentEmail.toLowerCase()) {
    return { ok: false, error: "You can't remove your own admin account." };
  }

  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/users");
  return { ok: true };
}
