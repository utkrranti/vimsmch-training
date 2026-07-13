"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, X, Loader2, HelpCircle } from "lucide-react";
import { saveFaqItem, deleteFaqItem, toggleFaqItemActive } from "./actions";

type FaqRow = { id: string; question: string; answer: string | null; sortOrder: number; isActive: boolean };
const emptyForm = { question: "", answer: "", sortOrder: 0, isActive: true };

export default function FaqManager({ items }: { items: FaqRow[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<FaqRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const openAdd = () => { setEditing(null); setForm(emptyForm); setError(""); setShowModal(true); };
  const openEdit = (f: FaqRow) => {
    setEditing(f);
    setForm({ question: f.question, answer: f.answer ?? "", sortOrder: f.sortOrder, isActive: f.isActive });
    setError(""); setShowModal(true);
  };

  const handleSave = () => {
    if (!form.question.trim()) { setError("Question is required."); return; }
    startTransition(async () => {
      await saveFaqItem(editing?.id ?? null, { ...form, sortOrder: Number(form.sortOrder) });
      setShowModal(false);
    });
  };

  const handleDelete = (f: FaqRow) => {
    if (!confirm("Delete this question? This cannot be undone.")) return;
    startTransition(async () => { await deleteFaqItem(f.id); });
  };

  const handleToggle = (f: FaqRow) => {
    startTransition(async () => { await toggleFaqItemActive(f.id, !f.isActive); });
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
          <Plus size={15} /> Add Question
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="w-14 h-14 rounded-2xl bg-[#f1f5f7] border border-[#e6edf0] flex items-center justify-center mb-4">
            <HelpCircle size={24} className="text-[#010608]/20" />
          </div>
          <p className="text-[#010608]/50 text-sm font-medium">No questions added yet</p>
          <button onClick={openAdd} className="mt-4 text-sm font-semibold text-[#04415f] hover:text-[#2086b8] transition-colors">+ Add question</button>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {items.map((f) => (
              <motion.div
                key={f.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[#011e2c] font-bold text-sm mb-1">{f.question}</p>
                    <p className="text-[#010608]/55 text-xs leading-relaxed">{f.answer || "— No answer yet —"}</p>
                    {!f.isActive && (
                      <span className="inline-block mt-2 bg-[#011e2c]/8 text-[#010608]/50 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">Hidden</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggle(f)}
                      disabled={isPending}
                      className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 disabled:opacity-60 ${f.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition duration-200 ${f.isActive ? "translate-x-3" : "translate-x-0"}`} />
                    </button>
                    <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg text-[#04415f] hover:bg-[#e6edf0] transition-colors"><Pencil size={13} /></button>
                    <button onClick={() => handleDelete(f)} disabled={isPending} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"><Trash2 size={13} /></button>
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
                  <h2 className="text-lg font-bold text-[#011e2c]">{editing ? "Edit Question" : "Add Question"}</h2>
                  <button onClick={() => setShowModal(false)} className="text-[#010608]/40 hover:text-[#011e2c] transition-colors p-1.5 rounded-lg hover:bg-[#f1f5f7]"><X size={18} /></button>
                </div>

                {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-xs mb-4">{error}</div>}

                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Question *</label>
                    <input className={inputCls} value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} placeholder="Is the course recognized for government jobs?" />
                  </div>
                  <div>
                    <label className={labelCls}>Answer</label>
                    <textarea rows={3} className={`${inputCls} resize-y`} value={form.answer} onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))} placeholder="Leave blank to show 'being finalised' until you have an answer." />
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
                    {isPending ? "Saving..." : (editing ? "Save Changes" : "Add Question")}
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
