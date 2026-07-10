"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, X, Loader2, CalendarRange, ChevronDown, Users } from "lucide-react";
import { saveBatch, deleteBatch, toggleBatchActive, assignEnrollmentBatch } from "./actions";

type BatchRow = {
  id: string; courseId: string; courseTitle: string; label: string;
  startDate: string; endDate: string; seats: number; isActive: boolean;
  enrolledCount: number; enrolledNames: string[];
};
type CourseOption = { id: string; title: string };
type EnrollmentRow = { id: string; name: string; courseId: string; batchId: string | null; course: { title: string } };

const emptyForm = { courseId: "", label: "", startDate: "", endDate: "", seats: 20, isActive: true };
const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BatchManager({ batches, courses, enrollments }: { batches: BatchRow[]; courses: CourseOption[]; enrollments: EnrollmentRow[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BatchRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setError(""); setShowModal(true); };
  const openEdit = (b: BatchRow) => {
    setEditing(b);
    setForm({ courseId: b.courseId, label: b.label, startDate: b.startDate.slice(0, 10), endDate: b.endDate.slice(0, 10), seats: b.seats, isActive: b.isActive });
    setError(""); setShowModal(true);
  };

  const handleSave = () => {
    if (!form.courseId || !form.label.trim() || !form.startDate || !form.endDate) { setError("Course, label, and both dates are required."); return; }
    startTransition(async () => {
      await saveBatch(editing?.id ?? null, { ...form, seats: Number(form.seats) });
      setShowModal(false);
    });
  };

  const handleDelete = (b: BatchRow) => {
    if (!confirm(`Delete batch "${b.label}"? Enrolled students will be unassigned.`)) return;
    startTransition(async () => { await deleteBatch(b.id); });
  };

  const handleToggle = (b: BatchRow) => {
    startTransition(async () => { await toggleBatchActive(b.id, !b.isActive); });
  };

  const handleAssign = (enrollmentId: string, batchId: string | null) => {
    startTransition(async () => { await assignEnrollmentBatch(enrollmentId, batchId); });
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
          <Plus size={15} /> Add Batch
        </button>
      </div>

      {batches.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="w-14 h-14 rounded-2xl bg-[#f1f5f7] border border-[#e6edf0] flex items-center justify-center mb-4">
            <CalendarRange size={24} className="text-[#010608]/20" />
          </div>
          <p className="text-[#010608]/50 text-sm font-medium">No batches created yet</p>
          <button onClick={openAdd} className="mt-4 text-sm font-semibold text-[#04415f] hover:text-[#2086b8] transition-colors">+ Add batch</button>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {batches.map((b) => {
              const isOpen = expanded === b.id;
              const courseEnrollments = enrollments.filter((e) => e.courseId === b.courseId);
              return (
                <motion.div
                  key={b.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden"
                >
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[#011e2c] text-sm">{b.label}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${b.isActive ? "bg-emerald-100 text-emerald-700" : "bg-[#f1f5f7] text-[#010608]/40"}`}>
                          {b.isActive ? "ACTIVE" : "HIDDEN"}
                        </span>
                      </div>
                      <p className="text-[#04415f] text-xs font-medium mt-1">{b.courseTitle}</p>
                      <p className="text-[#010608]/45 text-xs mt-1">{fmt(b.startDate)} – {fmt(b.endDate)} · {b.enrolledCount}/{b.seats} seats filled</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                      <button
                        onClick={() => handleToggle(b)}
                        disabled={isPending}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 disabled:opacity-60 ${b.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${b.isActive ? "translate-x-4" : "translate-x-0"}`} />
                      </button>
                      <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg text-[#04415f] hover:bg-[#e6edf0] transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(b)} disabled={isPending} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"><Trash2 size={14} /></button>
                      <button
                        onClick={() => setExpanded(isOpen ? null : b.id)}
                        className="p-1.5 rounded-lg text-[#010608]/50 hover:bg-[#f1f5f7] transition-colors flex items-center gap-1 text-xs font-medium"
                      >
                        <Users size={14} />
                        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-[#e6edf0] bg-[#f8fafb] overflow-hidden"
                      >
                        <div className="p-4 sm:p-5">
                          <p className="text-[#010608]/45 text-xs font-semibold uppercase tracking-wide mb-3">
                            Enrolled Students — {b.courseTitle}
                          </p>
                          {courseEnrollments.length === 0 ? (
                            <p className="text-[#010608]/40 text-xs">No enrollments for this course yet.</p>
                          ) : (
                            <div className="grid sm:grid-cols-2 gap-2">
                              {courseEnrollments.map((e) => (
                                <label key={e.id} className="flex items-center gap-2.5 bg-white border border-[#e6edf0] rounded-xl px-3 py-2.5 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={e.batchId === b.id}
                                    disabled={isPending}
                                    onChange={(ev) => handleAssign(e.id, ev.target.checked ? b.id : null)}
                                    className="accent-[#04415f] w-4 h-4 shrink-0"
                                  />
                                  <span className="text-sm text-[#011e2c] truncate">{e.name}</span>
                                  {e.batchId && e.batchId !== b.id && (
                                    <span className="ml-auto text-[10px] text-[#010608]/35 shrink-0">in another batch</span>
                                  )}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
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
                  <h2 className="text-lg font-bold text-[#011e2c]">{editing ? "Edit Batch" : "Add Batch"}</h2>
                  <button onClick={() => setShowModal(false)} className="text-[#010608]/40 hover:text-[#011e2c] transition-colors p-1.5 rounded-lg hover:bg-[#f1f5f7]"><X size={18} /></button>
                </div>

                {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-xs mb-4">{error}</div>}

                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Course *</label>
                    <select className={inputCls} value={form.courseId} onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}>
                      <option value="">Select a course</option>
                      {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Batch Label *</label>
                    <input className={inputCls} value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="Batch 2 · Jan–Mar 2026" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Start Date *</label>
                      <input type="date" className={inputCls} value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>End Date *</label>
                      <input type="date" className={inputCls} value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Seats</label>
                    <input type="number" min={1} className={inputCls} value={form.seats} onChange={(e) => setForm((f) => ({ ...f, seats: Number(e.target.value) }))} />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${form.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${form.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                    <span className="text-sm text-[#011e2c]">{form.isActive ? "Active batch" : "Inactive"}</span>
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
                    {isPending ? "Saving..." : (editing ? "Save Changes" : "Add Batch")}
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
