"use client";

import { useState, useTransition } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";
import { saveSettings } from "./actions";
import FileUploadField from "@/components/admin/FileUploadField";

type Field = { key: string; label: string; placeholder?: string; multiline?: boolean; file?: boolean; accept?: string };
type Group = { title: string; description?: string; fields: Field[] };

const GROUPS: Group[] = [
  {
    title: "About the Institution",
    fields: [
      { key: "about.mission", label: "Mission Statement", placeholder: "Our mission is to...", multiline: true },
      { key: "about.established", label: "Year Established", placeholder: "2026" },
    ],
  },
  {
    title: "Leadership Messages",
    description: "Shown on the About page as 'Messages from Leadership'. Leave blank to hide a card until the message is ready.",
    fields: [
      { key: "leadership.chairman.name", label: "Chairman — Name", placeholder: "Full name" },
      { key: "leadership.chairman.message", label: "Chairman — Message", placeholder: "Message text...", multiline: true },
      { key: "leadership.secretaryGeneral.name", label: "Secretary General — Name", placeholder: "Full name" },
      { key: "leadership.secretaryGeneral.message", label: "Secretary General — Message", placeholder: "Message text...", multiline: true },
      { key: "leadership.director.name", label: "Director — Name", placeholder: "Full name" },
      { key: "leadership.director.message", label: "Director — Message", placeholder: "Message text...", multiline: true },
    ],
  },
  {
    title: "Contact Channels",
    description: "WhatsApp and Admission Helpline shown on the Contact page. Leave blank to hide.",
    fields: [
      { key: "contact.whatsapp", label: "WhatsApp Number", placeholder: "+91 XXXXX XXXXX" },
      { key: "contact.admissionHelpline", label: "Admission Helpline Number", placeholder: "+91 XXXXX XXXXX" },
    ],
  },
  {
    title: "Prospectus",
    description: "Once uploaded, the 'Download Prospectus' button and QR code appear automatically on the homepage and contact page.",
    fields: [
      { key: "prospectus.pdfUrl", label: "Prospectus PDF", file: true, accept: "application/pdf" },
    ],
  },
  {
    title: "Admission",
    description: "Downloadable admission form and fee-payment QR code, shown on the Admission page. Leave blank to hide.",
    fields: [
      { key: "admission.formUrl", label: "Admission Form (PDF)", file: true, accept: "application/pdf" },
      { key: "admission.feeQrUrl", label: "Fee Payment QR Code (image)", file: true, accept: "image/*" },
    ],
  },
  {
    title: "Anti-Ragging",
    description: "National anti-ragging helpline, displayed on the About page.",
    fields: [
      { key: "antiragging.helpline", label: "National Helpline Number", placeholder: "1800-180-5522" },
      { key: "antiragging.email", label: "Anti-Ragging Email", placeholder: "helpline@antiragging.in" },
      { key: "antiragging.portalUrl", label: "Anti-Ragging Portal URL", placeholder: "https://antiragging.in" },
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
                {f.file ? (
                  <FileUploadField
                    value={values[f.key] ?? ""}
                    onChange={(url) => set(f.key, url)}
                    accept={f.accept}
                  />
                ) : f.multiline ? (
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
