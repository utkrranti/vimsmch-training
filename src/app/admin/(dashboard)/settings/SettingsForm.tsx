"use client";

import { useState, useTransition } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";
import { saveSettings } from "./actions";

type Field = { key: string; label: string; placeholder?: string; multiline?: boolean };
type Group = { title: string; description?: string; fields: Field[] };

const GROUPS: Group[] = [
  {
    title: "About the Institution",
    fields: [
      { key: "about.mission", label: "Mission Statement", placeholder: "Our mission is to...", multiline: true },
      { key: "about.established", label: "Year Established", placeholder: "1993" },
      { key: "about.naac", label: "NAAC Grade", placeholder: "A+" },
      { key: "about.affiliation", label: "Affiliation", placeholder: "Pravara Institute of Medical Sciences (Deemed University)" },
      { key: "about.ugc2f", label: "UGC 2(f) Recognition No.", placeholder: "UGC/2(f)/..." },
      { key: "about.ugc12b", label: "UGC 12(B) Recognition No.", placeholder: "UGC/12(B)/..." },
      { key: "about.nsqf", label: "NSQF Level Range", placeholder: "Level 3–6" },
    ],
  },
  {
    title: "Grievance Officer",
    description: "Displayed on the About page as per UGC grievance redressal norms.",
    fields: [
      { key: "grievance.officerName", label: "Officer Name", placeholder: "Dr. Name" },
      { key: "grievance.officerDesignation", label: "Designation", placeholder: "Professor & Head, Dept. of..." },
      { key: "grievance.officerEmail", label: "Email", placeholder: "grievance@vimsmch.edu.in" },
      { key: "grievance.officerPhone", label: "Phone", placeholder: "+91 241 230 XXXX" },
      { key: "grievance.portalUrl", label: "UGC Portal URL", placeholder: "https://grievance.ugc.ac.in" },
    ],
  },
  {
    title: "ICC / POSH Committee",
    description: "Internal Complaints Committee — mandatory under Sexual Harassment of Women at Workplace Act 2013.",
    fields: [
      { key: "icc.chairpersonName", label: "Chairperson Name", placeholder: "Dr. Name" },
      { key: "icc.chairpersonDesignation", label: "Designation", placeholder: "Professor, Dept. of..." },
      { key: "icc.chairpersonEmail", label: "Email", placeholder: "icc@vimsmch.edu.in" },
      { key: "icc.description", label: "Committee Description", placeholder: "The ICC is constituted under...", multiline: true },
    ],
  },
  {
    title: "RTI — Public Information Officer",
    description: "Right to Information Act 2005 — mandatory disclosure.",
    fields: [
      { key: "rti.pioName", label: "PIO Name", placeholder: "Name" },
      { key: "rti.pioDesignation", label: "PIO Designation", placeholder: "Registrar" },
      { key: "rti.pioEmail", label: "PIO Email", placeholder: "rti@vimsmch.edu.in" },
      { key: "rti.firstAppealOfficerName", label: "First Appellate Officer Name", placeholder: "Name" },
      { key: "rti.firstAppealOfficerDesignation", label: "First Appellate Officer Designation", placeholder: "Principal" },
    ],
  },
  {
    title: "Anti-Ragging",
    description: "As per UGC Regulations on Curbing the Menace of Ragging in HEIs, 2009.",
    fields: [
      { key: "antiragging.helpline", label: "National Helpline Number", placeholder: "1800-180-5522" },
      { key: "antiragging.email", label: "Anti-Ragging Email", placeholder: "antiragging@vimsmch.edu.in" },
      { key: "antiragging.portalUrl", label: "Anti-Ragging Portal URL", placeholder: "https://antiragging.in" },
      { key: "antiragging.committeeChairperson", label: "Committee Chairperson", placeholder: "Dr. Name, Principal" },
    ],
  },
];

export default function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const set = (key: string, val: string) => {
    setSaved(false);
    setValues((v) => ({ ...v, [key]: val }));
  };

  const handleSave = () => {
    startTransition(async () => {
      await saveSettings(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  const inputCls = "w-full bg-[#f8fafb] border border-[#e2eaee] text-[#011e2c] placeholder-[#010608]/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:bg-white focus:ring-2 focus:ring-[#04415f]/10 transition-all";
  const labelCls = "block text-xs font-semibold text-[#010608]/50 uppercase tracking-wide mb-1.5";

  return (
    <div className="space-y-6">
      {GROUPS.map((group) => (
        <div key={group.title} className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-6 space-y-4">
          <div className="border-b border-[#e6edf0] pb-3">
            <h2 className="font-bold text-[#011e2c] text-sm">{group.title}</h2>
            {group.description && <p className="text-[#010608]/45 text-xs mt-1">{group.description}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.fields.map((f) => (
              <div key={f.key} className={f.multiline ? "sm:col-span-2" : ""}>
                <label className={labelCls}>{f.label}</label>
                {f.multiline ? (
                  <textarea
                    rows={3}
                    className={`${inputCls} resize-y`}
                    value={values[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                ) : (
                  <input
                    className={inputCls}
                    value={values[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sticky save bar */}
      <div className="sticky bottom-4 flex items-center justify-between bg-white/90 backdrop-blur-sm border border-[#e6edf0] shadow-lg rounded-2xl px-6 py-4">
        {saved ? (
          <span className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
            <CheckCircle size={16} /> All settings saved
          </span>
        ) : (
          <span className="text-[#010608]/40 text-xs">Changes save to MongoDB — public /about page updates instantly.</span>
        )}
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {isPending ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </div>
  );
}
