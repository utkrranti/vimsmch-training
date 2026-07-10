"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Loader2, ImageOff } from "lucide-react";
import { saveGalleryItem, deleteGalleryItem, toggleGalleryItemActive } from "./actions";

type GalleryRow = {
  id: string; imageUrl: string; caption: string | null; category: string;
  courseId: string | null; sortOrder: number; isActive: boolean;
};
type CourseOption = { id: string; title: string };

const CATEGORIES = ["general", "facility", "event", "ceremony"];
const emptyForm = { imageUrl: "", caption: "", category: "general", courseId: "", sortOrder: 0, isActive: true };

export default function GalleryManager({ items, courses }: { items: GalleryRow[]; courses: CourseOption[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<GalleryRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const openAdd = () => { setEditing(null); setForm(emptyForm); setError(""); setShowModal(true); };
  const openEdit = (g: GalleryRow) => {
    setEditing(g);
    setForm({ imageUrl: g.imageUrl, caption: g.caption ?? "", category: g.category, courseId: g.courseId ?? "", sortOrder: g.sortOrder, isActive: g.isActive });
    setError(""); setShowModal(true);
  };

  const handleSave = () => {
    if (!form.imageUrl.trim()) { setError("Image URL is required."); return; }
    startTransition(async () => {
      await saveGalleryItem(editing?.id ?? null, { ...form, sortOrder: Number(form.sortOrder) });
      setShowModal(false);
    });
  };

  const handleDelete = (g: GalleryRow) => {
    if (!confirm("Delete this gallery item? This cannot be undone.")) return;
    startTransition(async () => { await deleteGalleryItem(g.id); });
  };

  const handleToggle = (g: GalleryRow) => {
    startTransition(async () => { await toggleGalleryItemActive(g.id, !g.isActive); });
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
          <Plus size={15} /> Add Photo
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="w-14 h-14 rounded-2xl bg-[#f1f5f7] border border-[#e6edf0] flex items-center justify-center mb-4">
            <ImageOff size={24} className="text-[#010608]/20" />
          </div>
          <p className="text-[#010608]/50 text-sm font-medium">No photos added yet</p>
          <button onClick={openAdd} className="mt-4 text-sm font-semibold text-[#04415f] hover:text-[#2086b8] transition-colors">+ Add photo</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence initial={false}>
            {items.map((g) => (
              <motion.div
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden group"
              >
                <div className="relative aspect-square bg-[#f1f5f7]">
                  <Image src={g.imageUrl} alt={g.caption ?? "Gallery photo"} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                  {!g.isActive && (
                    <div className="absolute inset-0 bg-[#011e2c]/50 flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold uppercase tracking-wide">Hidden</span>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-[#011e2c]/70 text-white text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">{g.category}</span>
                </div>
                <div className="p-3">
                  <p className="text-[#011e2c] text-xs font-medium line-clamp-2 min-h-[2rem]">{g.caption || "—"}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e6edf0]">
                    <button
                      onClick={() => handleToggle(g)}
                      disabled={isPending}
                      className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 disabled:opacity-60 ${g.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition duration-200 ${g.isActive ? "translate-x-3" : "translate-x-0"}`} />
                    </button>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(g)} className="p-1.5 rounded-lg text-[#04415f] hover:bg-[#e6edf0] transition-colors"><Pencil size={13} /></button>
                      <button onClick={() => handleDelete(g)} disabled={isPending} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

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
                  <h2 className="text-lg font-bold text-[#011e2c]">{editing ? "Edit Photo" : "Add Photo"}</h2>
                  <button onClick={() => setShowModal(false)} className="text-[#010608]/40 hover:text-[#011e2c] transition-colors p-1.5 rounded-lg hover:bg-[#f1f5f7]"><X size={18} /></button>
                </div>

                {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-xs mb-4">{error}</div>}

                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Image URL *</label>
                    <input className={inputCls} value={form.imageUrl} onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." />
                  </div>
                  <div>
                    <label className={labelCls}>Caption</label>
                    <input className={inputCls} value={form.caption} onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))} placeholder="OT Techniques Lab — practical session" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Category</label>
                      <select className={inputCls} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Sort Order</label>
                      <input type="number" min={0} className={inputCls} value={form.sortOrder} onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Related Course (optional)</label>
                    <select className={inputCls} value={form.courseId} onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}>
                      <option value="">— None —</option>
                      {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${form.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${form.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                    <span className="text-sm text-[#011e2c]">{form.isActive ? "Visible publicly" : "Hidden"}</span>
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
                    {isPending ? "Saving..." : (editing ? "Save Changes" : "Add Photo")}
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
