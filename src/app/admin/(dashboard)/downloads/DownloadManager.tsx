"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, X, Loader2, FileDown, FileText } from "lucide-react";
import { saveDownload, deleteDownload, toggleDownloadActive } from "./actions";
import { BilingualField, BilingualTextarea } from "@/components/admin/bilingual/BilingualField";
import FileUploadField from "@/components/admin/FileUploadField";

type DownloadRow = {
  id: string;
  title: string;
  titleMr: string | null;
  description: string | null;
  descriptionMr: string | null;
  fileUrl: string;
  sortOrder: number;
  isActive: boolean;
};

const emptyForm = { title: "", titleMr: "", description: "", descriptionMr: "", fileUrl: "", sortOrder: 0, isActive: true };

export default function DownloadManager({ downloads }: { downloads: DownloadRow[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<DownloadRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const openAdd = () => { setEditing(null); setForm(emptyForm); setError(""); setShowModal(true); };
  const openEdit = (d: DownloadRow) => {
    setEditing(d);
    setForm({
      title: d.title, titleMr: d.titleMr ?? "",
      description: d.description ?? "", descriptionMr: d.descriptionMr ?? "",
      fileUrl: d.fileUrl, sortOrder: d.sortOrder, isActive: d.isActive,
    });
    setError(""); setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.fileUrl.trim()) { setError("A PDF file is required."); return; }
    startTransition(async () => {
      await saveDownload(editing?.id ?? null, { ...form, sortOrder: Number(form.sortOrder) });
      setShowModal(false);
    });
  };

  const handleDelete = (d: DownloadRow) => {
    if (!confirm(`Delete "${d.title}"? This cannot be undone.`)) return;
    startTransition(async () => { await deleteDownload(d.id); });
  };

  const handleToggle = (d: DownloadRow) => {
    startTransition(async () => { await toggleDownloadActive(d.id, !d.isActive); });
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
          <Plus size={15} /> Add Download
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
        {downloads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-[#f1f5f7] border border-[#e6edf0] flex items-center justify-center mb-4">
              <FileDown size={24} className="text-[#010608]/20" />
            </div>
            <p className="text-[#010608]/50 text-sm font-medium">No downloads added yet</p>
            <button onClick={openAdd} className="mt-4 text-sm font-semibold text-[#04415f] hover:text-[#2086b8] transition-colors">+ Add download</button>
          </div>
        ) : (
          <ul className="divide-y divide-[#e6edf0]">
            <AnimatePresence initial={false}>
              {downloads.map((d) => (
                <motion.li
                  key={d.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#04415f]/8 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-[#04415f]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[#011e2c] text-sm">{d.title}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.isActive ? "bg-emerald-100 text-emerald-700" : "bg-[#f1f5f7] text-[#010608]/40"}`}>
                        {d.isActive ? "LIVE" : "HIDDEN"}
                      </span>
                    </div>
                    {d.description && <p className="text-[#010608]/55 text-xs mt-1.5 leading-relaxed break-words">{d.description}</p>}
                    <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#04415f] text-[11px] font-medium hover:underline mt-2">
                      <FileDown size={11} /> View PDF
                    </a>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => handleToggle(d)}
                      disabled={isPending}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 disabled:opacity-60 ${d.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${d.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                    <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg text-[#04415f] hover:bg-[#e6edf0] transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(d)} disabled={isPending} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"><Trash2 size={14} /></button>
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
                  <h2 className="text-lg font-bold text-[#011e2c]">{editing ? "Edit Download" : "Add Download"}</h2>
                  <button onClick={() => setShowModal(false)} className="text-[#010608]/40 hover:text-[#011e2c] transition-colors p-1.5 rounded-lg hover:bg-[#f1f5f7]"><X size={18} /></button>
                </div>

                {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-xs mb-4">{error}</div>}

                <div className="space-y-4">
                  <BilingualField
                    label="Title"
                    required
                    value={form.title}
                    valueMr={form.titleMr}
                    onChange={(v) => setForm((f) => ({ ...f, title: v }))}
                    onChangeMr={(v) => setForm((f) => ({ ...f, titleMr: v }))}
                    placeholder="Admission Form 2026"
                  />
                  <BilingualTextarea
                    label="Description (optional)"
                    rows={3}
                    value={form.description}
                    valueMr={form.descriptionMr}
                    onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                    onChangeMr={(v) => setForm((f) => ({ ...f, descriptionMr: v }))}
                    placeholder="What this file is for..."
                  />
                  <div>
                    <label className={labelCls}>PDF File *</label>
                    <FileUploadField
                      value={form.fileUrl}
                      onChange={(url) => setForm((f) => ({ ...f, fileUrl: url }))}
                      accept="application/pdf"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Sort Order</label>
                    <input type="number" min={0} className={inputCls} value={form.sortOrder} onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))} />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${form.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${form.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                    <span className="text-sm text-[#011e2c]">{form.isActive ? "Visible on downloads page" : "Hidden"}</span>
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
                    {isPending ? "Saving..." : (editing ? "Save Changes" : "Add Download")}
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
