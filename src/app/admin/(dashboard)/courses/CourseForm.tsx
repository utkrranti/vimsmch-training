"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import { saveCourse } from "./actions";

type FeeItem = { label: string; amount: number };
type SyllabusUnit = { unit: string; topics: string[] };

type CourseFormProps = {
  id?: string;
  initial?: {
    slug: string; title: string; shortDesc: string; fullDesc: string;
    nsqf: number; durationMonths: number; durationHours: number;
    fees: number; feeBreakdown: FeeItem[];
    seats: number; eligibility: string; ageLimit: string; certBy: string;
    assessmentScheme: string; creditEquivalence: string;
    objectives: string[]; highlights: string[];
    syllabus: SyllabusUnit[]; clinicalPostings: string[];
    outcomes: string[]; tags: string[];
    category: string; batchMonths: string[]; isActive: boolean;
  };
};

const CATEGORIES = ["Allied Health", "Medical", "Nursing", "Pharmacy", "Administrative", "Other"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const empty = {
  slug: "", title: "", shortDesc: "", fullDesc: "",
  nsqf: 4, durationMonths: 6, durationHours: 500,
  fees: 0, feeBreakdown: [{ label: "Tuition Fee", amount: 0 }],
  seats: 30, eligibility: "", ageLimit: "18–35 years", certBy: "NSDC",
  assessmentScheme: "", creditEquivalence: "",
  objectives: [""], highlights: [""],
  syllabus: [{ unit: "Unit 1", topics: [""] }],
  clinicalPostings: [""],
  outcomes: [""], tags: [""], category: "Allied Health",
  batchMonths: ["July"], isActive: true,
};

export default function CourseForm({ id, initial }: CourseFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(initial ?? empty);
  const [error, setError] = useState("");

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  // Fee breakdown helpers
  const setFee = (i: number, k: keyof FeeItem, v: string | number) =>
    set("feeBreakdown", form.feeBreakdown.map((f, idx) => idx === i ? { ...f, [k]: v } : f));
  const addFee = () => set("feeBreakdown", [...form.feeBreakdown, { label: "", amount: 0 }]);
  const removeFee = (i: number) => set("feeBreakdown", form.feeBreakdown.filter((_, idx) => idx !== i));

  // Syllabus helpers
  const setSyllUnit = (i: number, v: string) =>
    set("syllabus", form.syllabus.map((s, idx) => idx === i ? { ...s, unit: v } : s));
  const setSyllTopic = (si: number, ti: number, v: string) =>
    set("syllabus", form.syllabus.map((s, idx) =>
      idx === si ? { ...s, topics: s.topics.map((t, tidx) => tidx === ti ? v : t) } : s));
  const addSyllTopic = (si: number) =>
    set("syllabus", form.syllabus.map((s, idx) => idx === si ? { ...s, topics: [...s.topics, ""] } : s));
  const removeSyllTopic = (si: number, ti: number) =>
    set("syllabus", form.syllabus.map((s, idx) => idx === si ? { ...s, topics: s.topics.filter((_, tidx) => tidx !== ti) } : s));
  const addSyllUnit = () => set("syllabus", [...form.syllabus, { unit: `Unit ${form.syllabus.length + 1}`, topics: [""] }]);
  const removeSyllUnit = (i: number) => set("syllabus", form.syllabus.filter((_, idx) => idx !== i));

  // Array field helpers (objectives, highlights, clinicalPostings, outcomes, tags)
  type ArrField = "objectives" | "highlights" | "clinicalPostings" | "outcomes" | "tags";
  const setArr = (field: ArrField, i: number, v: string) =>
    set(field, (form[field] as string[]).map((x, idx) => idx === i ? v : x));
  const addArr = (field: ArrField) =>
    set(field, [...(form[field] as string[]), ""]);
  const removeArr = (field: ArrField, i: number) =>
    set(field, (form[field] as string[]).filter((_, idx) => idx !== i));

  const toggleBatchMonth = (m: string) =>
    set("batchMonths", form.batchMonths.includes(m)
      ? form.batchMonths.filter((x) => x !== m)
      : [...form.batchMonths, m]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    startTransition(async () => {
      try {
        await saveCourse(id ?? null, {
          ...form,
          feeBreakdown: form.feeBreakdown.map((f) => ({ ...f, amount: Number(f.amount) })),
        });
        router.push("/admin/courses");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save course.");
      }
    });
  };

  const inputCls = "w-full bg-[#f8fafb] border border-[#e2eaee] text-[#011e2c] placeholder-[#010608]/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:bg-white focus:ring-2 focus:ring-[#04415f]/10 transition-all";
  const labelCls = "block text-xs font-semibold text-[#010608]/50 uppercase tracking-wide mb-1.5";
  const sectionCls = "bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-6 space-y-5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className={sectionCls}>
        <h2 className="font-bold text-[#011e2c] text-sm border-b border-[#e6edf0] pb-3">Basic Information</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className={labelCls}>Course Title *</label>
            <input className={inputCls} value={form.title} onChange={(e) => {
              const title = e.target.value;
              set("title", title);
              if (!id) set("slug", title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
            }} required placeholder="e.g. Operation Theatre Techniques" />
          </div>
          <div>
            <label className={labelCls}>Slug *</label>
            <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} required placeholder="operation-theatre-techniques" />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Short Description</label>
            <input className={inputCls} value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} placeholder="One-line description shown on course cards" />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Full Description</label>
            <textarea className={`${inputCls} resize-y min-h-[100px]`} value={form.fullDesc} onChange={(e) => set("fullDesc", e.target.value)} placeholder="Detailed course description..." />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className={sectionCls}>
        <h2 className="font-bold text-[#011e2c] text-sm border-b border-[#e6edf0] pb-3">Course Details</h2>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label className={labelCls}>NSQF Level</label>
            <input type="number" min={1} max={10} className={inputCls} value={form.nsqf} onChange={(e) => set("nsqf", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelCls}>Duration (Months)</label>
            <input type="number" min={1} className={inputCls} value={form.durationMonths} onChange={(e) => set("durationMonths", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelCls}>Duration (Hours)</label>
            <input type="number" min={1} className={inputCls} value={form.durationHours} onChange={(e) => set("durationHours", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelCls}>Total Fees (₹)</label>
            <input type="number" min={0} className={inputCls} value={form.fees} onChange={(e) => set("fees", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelCls}>Seats</label>
            <input type="number" min={1} className={inputCls} value={form.seats} onChange={(e) => set("seats", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelCls}>Age Limit</label>
            <input className={inputCls} value={form.ageLimit} onChange={(e) => set("ageLimit", e.target.value)} placeholder="18–35 years" />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Eligibility</label>
            <input className={inputCls} value={form.eligibility} onChange={(e) => set("eligibility", e.target.value)} placeholder="Minimum 10th pass" />
          </div>
          <div>
            <label className={labelCls}>Certified By</label>
            <input className={inputCls} value={form.certBy} onChange={(e) => set("certBy", e.target.value)} placeholder="NSDC / PMKVY" />
          </div>
          <div className="col-span-3">
            <label className={labelCls}>Assessment Scheme</label>
            <input className={inputCls} value={form.assessmentScheme} onChange={(e) => set("assessmentScheme", e.target.value)} placeholder="Theory 30% + Practical 70%" />
          </div>
          <div className="col-span-3">
            <label className={labelCls}>Credit Equivalence</label>
            <input className={inputCls} value={form.creditEquivalence} onChange={(e) => set("creditEquivalence", e.target.value)} placeholder="Not applicable" />
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className={sectionCls}>
        <div className="flex items-center justify-between border-b border-[#e6edf0] pb-3">
          <h2 className="font-bold text-[#011e2c] text-sm">Fee Breakdown</h2>
          <button type="button" onClick={addFee} className="flex items-center gap-1.5 text-xs text-[#04415f] hover:text-[#2086b8] font-semibold transition-colors">
            <Plus size={13} /> Add Item
          </button>
        </div>
        <div className="space-y-3">
          {form.feeBreakdown.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <input className={`${inputCls} flex-1`} value={f.label} onChange={(e) => setFee(i, "label", e.target.value)} placeholder="Fee label" />
              <input type="number" min={0} className={`${inputCls} w-32`} value={f.amount} onChange={(e) => setFee(i, "amount", Number(e.target.value))} placeholder="Amount" />
              <button type="button" onClick={() => removeFee(i)} className="text-red-400 hover:text-red-600 transition-colors p-1.5">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Syllabus */}
      <div className={sectionCls}>
        <div className="flex items-center justify-between border-b border-[#e6edf0] pb-3">
          <h2 className="font-bold text-[#011e2c] text-sm">Skills You Will Learn (Syllabus)</h2>
          <button type="button" onClick={addSyllUnit} className="flex items-center gap-1.5 text-xs text-[#04415f] hover:text-[#2086b8] font-semibold transition-colors">
            <Plus size={13} /> Add Unit
          </button>
        </div>
        <div className="space-y-4">
          {form.syllabus.map((s, si) => (
            <div key={si} className="border border-[#e6edf0] rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <input className={`${inputCls} flex-1`} value={s.unit} onChange={(e) => setSyllUnit(si, e.target.value)} placeholder="Unit name" />
                <button type="button" onClick={() => removeSyllUnit(si)} className="text-red-400 hover:text-red-600 transition-colors p-1.5">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="space-y-2 pl-3 border-l-2 border-[#e6edf0]">
                {s.topics.map((t, ti) => (
                  <div key={ti} className="flex items-center gap-2">
                    <input className={`${inputCls} flex-1 text-xs`} value={t} onChange={(e) => setSyllTopic(si, ti, e.target.value)} placeholder="Topic" />
                    <button type="button" onClick={() => removeSyllTopic(si, ti)} className="text-red-400/60 hover:text-red-600 transition-colors p-1">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addSyllTopic(si)} className="text-xs text-[#04415f] hover:text-[#2086b8] font-medium transition-colors flex items-center gap-1 mt-1">
                  <Plus size={11} /> Add Topic
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple list fields: Objectives, Highlights, Clinical Postings, Career Opportunities, Skills Covered */}
      <div className="grid sm:grid-cols-2 gap-6">
        {([
          { field: "objectives", label: "Course Objectives", placeholder: "e.g. Understand cardiac anatomy and physiology" },
          { field: "highlights", label: "Course Highlights", placeholder: "e.g. Practical ECG recording" },
          { field: "clinicalPostings", label: "Clinical Training Postings", placeholder: "e.g. Cardiology Department" },
          { field: "outcomes", label: "Career Opportunities (job titles)", placeholder: "e.g. ECG Technician" },
          { field: "tags", label: "Skills Covered (chips shown on course cards)", placeholder: "e.g. ECG recording" },
        ] as const).map(({ field, label, placeholder }) => (
          <div key={field} className={sectionCls}>
            <div className="flex items-center justify-between border-b border-[#e6edf0] pb-3">
              <h2 className="font-bold text-[#011e2c] text-sm">{label}</h2>
              <button type="button" onClick={() => addArr(field)} className="flex items-center gap-1.5 text-xs text-[#04415f] hover:text-[#2086b8] font-semibold transition-colors">
                <Plus size={13} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {(form[field] as string[]).map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input className={`${inputCls} flex-1 text-xs`} value={v} onChange={(e) => setArr(field, i, e.target.value)} placeholder={placeholder} />
                  <button type="button" onClick={() => removeArr(field, i)} className="text-red-400/60 hover:text-red-600 transition-colors p-1">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Batch Months */}
      <div className={sectionCls}>
        <h2 className="font-bold text-[#011e2c] text-sm border-b border-[#e6edf0] pb-3">Batch Start Months</h2>
        <div className="flex flex-wrap gap-2 mt-1">
          {MONTHS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggleBatchMonth(m)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${form.batchMonths.includes(m) ? "bg-[#04415f] text-white" : "bg-[#f1f5f7] text-[#010608]/50 hover:bg-[#e6edf0]"}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Status + Submit */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-[#e6edf0] shadow-sm px-6 py-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            onClick={() => set("isActive", !form.isActive)}
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${form.isActive ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${form.isActive ? "translate-x-5" : "translate-x-0"}`} />
          </button>
          <span className="text-sm font-medium text-[#011e2c]">
            {form.isActive ? "Active — visible on public site" : "Inactive — hidden from public"}
          </span>
        </label>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.push("/admin/courses")} className="px-4 py-2 text-sm text-[#010608]/50 hover:text-[#011e2c] font-medium transition-colors rounded-xl hover:bg-[#f1f5f7]">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isPending ? "Saving..." : "Save Course"}
          </button>
        </div>
      </div>
    </form>
  );
}
