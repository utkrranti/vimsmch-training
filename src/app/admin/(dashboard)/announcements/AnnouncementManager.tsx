"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, X, Loader2, Megaphone } from "lucide-react";
import { saveAnnouncement, deleteAnnouncement, toggleAnnouncementActive } from "./actions";

type AnnouncementRow = { id: string; title: string; body: string; isActive: boolean; createdAt: string };

const emptyForm = { title: "", body: "", isActive: true };

export default function AnnouncementManager({ announcements }: { announcements: AnnouncementRow[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<AnnouncementRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const openAdd = () => { setEditing(null); setForm(emptyForm); setError(""); setShowModal(true); };
  const openEdit = (a: AnnouncementRow) => { setEditing(a); setForm({ title: a.title, body: a.body, isActive: a.isActive }); setError(""); setShowModal(true); };

  const handleSave = () => {
    if (!form.title.trim() || !form.body.trim()) { setError("Title and message are required."); return; }
    startTransition(async () => {
      await saveAnnouncement(editing?.id ?? null, form);
      setShowModal(false);
    });
  };

  const handleDelete = (a: AnnouncementRow) => {
    if (!confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    startTransition(async () => { await deleteAnnouncement(a.id); });
  };

  const handleToggle = (a: AnnouncementRow) => {
    startTransition(async () => { await toggleAnnouncementActive(a.id, !a.isActive); });
  };

  const inputCls = "w-full bg-[#f8fafb] border border-[#e2eaee] text-[#011e2c] placeholder-[#010608]/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:bg-white focus:ring-2 focus:ring-[#04415f]/10 transition-all";
  const labelCls = "block text-xs font-semibold text-[#010608]/50 uppercase tracking-wide mb-1.5";

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#04415f] hover:bg-[#011e2c] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm w-full sm:w-auto justify-center"
        >
          <Plus size={15} /> Add Announcement
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
        {announcements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-[#f1f5f7] border border-[#e6edf0] flex items-center justify-center mb-4">
              <Megaphone size={24} className="text-[#010608]/20" />
            </div>
            <p className="text-[#010608]/50 text-sm font-medium">No announcements yet</p>
            <button onClick={openAdd} className="mt-4 text-sm font-semibold text-[#04415f] hover:text-[#2086b8] transition-colors">+ Add announcement</button>
          </div>
        ) : (
          <ul className="divide-y divide-[#e6edf0]">
            <AnimatePresence initial={false}>
              {announcements.map((a) => (
                <motion.li
                  key={a.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[#011e2c] text-sm">{a.title}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.isActive ? "bg-emerald-100 text-emerald-700" : "bg-[#f1f5f7] text-[#010608]/40"}`}>
                        {a.isActive ? "LIVE" : "HIDDEN"}
                      </span>
                    </div>
                    <p className="text-[#010608]/55 text-xs mt-1.5 leading-relaxed break-words">{a.body}</p>
                    <p className="text-[#010608]/30 text-[11px] mt-2">{new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => handleToggle(a)}
                      disabled={isPending}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 disabled:opacity-60 ${a.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${a.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                    <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg text-[#04415f] hover:bg-[#e6edf0] transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(a)} disabled={isPending} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"><Trash2 size={14} /></button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <div className="absolute inset-0 bg-[#011e2c]/40 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="h-1" style={{ background: "linear-gradient(90deg, #04415f, #2086b8)" }} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-[#011e2c]">{editing ? "Edit Announcement" : "Add Announcement"}</h2>
                  <button onClick={() => setShowModal(false)} className="text-[#010608]/40 hover:text-[#011e2c] transition-colors p-1.5 rounded-lg hover:bg-[#f1f5f7]"><X size={18} /></button>
                </div>

                {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-xs mb-4">{error}</div>}

                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Title *</label>
                    <input className={inputCls} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Admissions Open for 2026 Batch" />
                  </div>
                  <div>
                    <label className={labelCls}>Message *</label>
                    <textarea rows={4} className={`${inputCls} resize-none`} value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} placeholder="Short notice text shown on the home page..." />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${form.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${form.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                    <span className="text-sm text-[#011e2c]">{form.isActive ? "Visible on home page" : "Hidden"}</span>
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
                    {isPending ? "Saving..." : (editing ? "Save Changes" : "Add Announcement")}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
