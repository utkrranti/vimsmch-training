"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Trash2, Loader2 } from "lucide-react";
import { createAdminUser, deleteAdminUser } from "./actions";
import { formatDateIST } from "@/lib/date";

type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};

export default function AdminUsersManager({
  users,
  currentEmail,
}: {
  users: AdminUserRow[];
  currentEmail: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ name: "", email: "", role: "EDITOR" });
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const fd = new FormData();
    fd.set("name", form.name);
    fd.set("email", form.email);
    fd.set("role", form.role);
    startTransition(async () => {
      const res = await createAdminUser(fd);
      if (res.ok) {
        setMessage({ ok: true, text: `Admin account created for ${form.email}.` });
        setForm({ name: "", email: "", role: "EDITOR" });
        router.refresh();
      } else {
        setMessage({ ok: false, text: res.error ?? "Something went wrong." });
      }
    });
  }

  function handleDelete(id: string, email: string) {
    if (!confirm(`Remove admin account ${email}?`)) return;
    setDeletingId(id);
    startTransition(async () => {
      const res = await deleteAdminUser(id);
      setDeletingId(null);
      if (res.ok) {
        router.refresh();
      } else {
        alert(res.error ?? "Could not remove this account.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleAdd}
        className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-5 flex flex-wrap items-end gap-4"
      >
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-[#cdd8de] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#04415f] bg-[#f1f5f7]"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-[#cdd8de] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#04415f] bg-[#f1f5f7]"
          />
        </div>
        <div className="min-w-[140px]">
          <label className="block text-[#011e2c] text-xs font-semibold mb-1.5 uppercase tracking-wide">Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full border border-[#cdd8de] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#04415f] bg-[#f1f5f7]"
          >
            <option value="EDITOR">EDITOR</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        >
          {isPending ? <Loader2 size={15} className="animate-spin" /> : <UserPlus size={15} />}
          Add Admin
        </button>
        {message && (
          <p className={`w-full text-xs ${message.ok ? "text-emerald-600" : "text-red-500"}`}>{message.text}</p>
        )}
      </form>

      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f1f5f7] border-b border-[#e6edf0]">
              <tr>
                {["Name", "Email", "Role", "Created", ""].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-[#010608]/50 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => {
                const isSelf = currentEmail && u.email.toLowerCase() === currentEmail.toLowerCase();
                return (
                  <tr key={u.id} className={`border-b border-[#e6edf0] ${i % 2 !== 0 ? "bg-[#f8fafb]" : "bg-white"}`}>
                    <td className="px-6 py-4 font-semibold text-[#011e2c]">{u.name}</td>
                    <td className="px-6 py-4 text-[#010608]/60">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${u.role === "SUPER_ADMIN" ? "bg-[#04415f] text-white" : "bg-[#e6edf0] text-[#04415f]"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#010608]/50 text-xs">
                      {formatDateIST(u.createdAt, { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!isSelf && (
                        <button
                          type="button"
                          onClick={() => handleDelete(u.id, u.email)}
                          disabled={isPending && deletingId === u.id}
                          className="text-red-500 hover:text-red-700 disabled:opacity-50"
                          aria-label={`Remove ${u.email}`}
                        >
                          {isPending && deletingId === u.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
