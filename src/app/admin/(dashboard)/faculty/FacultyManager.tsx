"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, X, Loader2, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { saveFaculty, deleteFaculty, toggleFacultyActive } from "./actions";

type FacultyRow = {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  photoUrl: string | null;
  isActive: boolean;
  sortOrder: number;
};

const emptyForm = { name: "", designation: "", bio: "", photoUrl: "", sortOrder: 0, isActive: true };

export default function FacultyManager({ faculty }: { faculty: FacultyRow[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<FacultyRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEdit = (f: FacultyRow) => {
    setEditing(f);
    setForm({ name: f.name, designation: f.designation, bio: f.bio ?? "", photoUrl: f.photoUrl ?? "", sortOrder: f.sortOrder, isActive: f.isActive });
    setError("");
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.designation.trim()) {
      setError("Name and designation are required.");
      return;
    }
    startTransition(async () => {
      await saveFaculty(editing?.id ?? null, { ...form, sortOrder: Number(form.sortOrder) });
      setShowModal(false);
    });
  };

  const handleDelete = (f: FacultyRow) => {
    if (!confirm(`Delete "${f.name}"? This cannot be undone.`)) return;
    startTransition(async () => { await deleteFaculty(f.id); });
  };

  const handleToggle = (f: FacultyRow) => {
    startTransition(async () => { await toggleFacultyActive(f.id, !f.isActive); });
  };

  const inputCls = "w-full bg-[#f8fafb] border border-[#e2eaee] text-[#011e2c] placeholder-[#010608]/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:bg-white focus:ring-2 focus:ring-[#04415f]/10 transition-all";
  const labelCls = "block text-xs font-semibold text-[#010608]/50 uppercase tracking-wide mb-1.5";

  return (
    <>
      {/* Table with add button */}
      <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#04415f] hover:bg-[#011e2c] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Plus size={15} /> Add Faculty
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
        {faculty.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#f1f5f7] border border-[#e6edf0] flex items-center justify-center mb-4">
              <UserCircle2 size={24} className="text-[#010608]/20" />
            </div>
            <p className="text-[#010608]/50 text-sm font-medium">No faculty added yet</p>
            <button onClick={openAdd} className="mt-4 text-sm font-semibold text-[#04415f] hover:text-[#2086b8] transition-colors">+ Add faculty member</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f1f5f7] border-b border-[#e6edf0]">
                <tr>
                  {["Order", "Photo", "Name", "Designation", "Bio", "Active", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#010608]/50 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {faculty.map((f, i) => (
                  <tr key={f.id} className={`border-b border-[#e6edf0] hover:bg-[#f8fafb] transition-colors ${i % 2 !== 0 ? "bg-[#f8fafb]" : "bg-white"}`}>
                    <td className="px-5 py-3.5 text-[#010608]/40 text-xs font-mono">{f.sortOrder}</td>
                    <td className="px-5 py-3.5">
                      {f.photoUrl ? (
                        <Image src={f.photoUrl} alt={f.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover border border-[#e6edf0]" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#f1f5f7] border border-[#e6edf0] flex items-center justify-center">
                          <UserCircle2 size={20} className="text-[#010608]/20" />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-[#011e2c]">{f.name}</td>
                    <td className="px-5 py-3.5 text-[#04415f] text-xs font-medium">{f.designation}</td>
                    <td className="px-5 py-3.5 text-[#010608]/55 text-xs max-w-[200px]">
                      <span className="line-clamp-2">{f.bio || "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => handleToggle(f)}
                        disabled={isPending}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 disabled:opacity-60 ${f.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${f.isActive ? "translate-x-4" : "translate-x-0"}`} />
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg text-[#04415f] hover:bg-[#e6edf0] transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(f)} disabled={isPending} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="absolute inset-0 bg-[#011e2c]/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="h-1" style={{ background: "linear-gradient(90deg, #04415f, #2086b8)" }} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#011e2c]">{editing ? "Edit Faculty Member" : "Add Faculty Member"}</h2>
                <button onClick={() => setShowModal(false)} className="text-[#010608]/40 hover:text-[#011e2c] transition-colors p-1.5 rounded-lg hover:bg-[#f1f5f7]"><X size={18} /></button>
              </div>

              {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-xs mb-4">{error}</div>}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Name *</label>
                    <input className={inputCls} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Dr. Ramesh Kumar" />
                  </div>
                  <div>
                    <label className={labelCls}>Sort Order</label>
                    <input type="number" min={0} className={inputCls} value={form.sortOrder} onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))} />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Designation *</label>
                  <input className={inputCls} value={form.designation} onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))} placeholder="Programme Coordinator, OT Techniques" />
                </div>

                <div>
                  <label className={labelCls}>Photo URL</label>
                  <input className={inputCls} value={form.photoUrl} onChange={(e) => setForm((f) => ({ ...f, photoUrl: e.target.value }))} placeholder="https://... (optional)" />
                </div>

                <div>
                  <label className={labelCls}>Bio</label>
                  <textarea rows={3} className={`${inputCls} resize-none`} value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} placeholder="Short professional biography..." />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                    className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${form.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${form.isActive ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                  <span className="text-sm text-[#011e2c]">{form.isActive ? "Visible on public faculty page" : "Hidden from public page"}</span>
                </label>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-[#e6edf0]">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 text-sm font-medium text-[#010608]/50 hover:text-[#011e2c] rounded-xl hover:bg-[#f1f5f7] transition-colors">Cancel</button>
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
                >
                  {isPending ? <Loader2 size={14} className="animate-spin" /> : null}
                  {isPending ? "Saving..." : (editing ? "Save Changes" : "Add Faculty")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
