"use client";

const inputCls =
  "w-full bg-[#f8fafb] border border-[#e2eaee] text-[#011e2c] placeholder-[#010608]/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:bg-white focus:ring-2 focus:ring-[#04415f]/10 transition-all";
const labelCls = "block text-xs font-semibold text-[#010608]/50 uppercase tracking-wide mb-1.5";
const mrLabelCls = "block text-xs font-semibold text-[#2086b8]/70 uppercase tracking-wide mb-1.5";

type FieldProps = {
  label: string;
  value: string;
  valueMr: string;
  onChange: (v: string) => void;
  onChangeMr: (v: string) => void;
  placeholder?: string;
  required?: boolean;
};

/** English input + a stacked Marathi input beneath it, for a single-line field. */
export function BilingualField({ label, value, valueMr, onChange, onChangeMr, placeholder, required }: FieldProps) {
  return (
    <div className="space-y-2">
      <div>
        <label className={labelCls}>{label}{required ? " *" : ""}</label>
        <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </div>
      <div>
        <label className={mrLabelCls}>{label} (Marathi)</label>
        <input className={inputCls} value={valueMr} onChange={(e) => onChangeMr(e.target.value)} placeholder="मराठी भाषांतर (ऐच्छिक)" />
      </div>
    </div>
  );
}

/** English textarea + a stacked Marathi textarea beneath it. */
export function BilingualTextarea({ label, value, valueMr, onChange, onChangeMr, placeholder, required, rows = 3 }: FieldProps & { rows?: number }) {
  return (
    <div className="space-y-2">
      <div>
        <label className={labelCls}>{label}{required ? " *" : ""}</label>
        <textarea rows={rows} className={`${inputCls} resize-y`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </div>
      <div>
        <label className={mrLabelCls}>{label} (Marathi)</label>
        <textarea rows={rows} className={`${inputCls} resize-y`} value={valueMr} onChange={(e) => onChangeMr(e.target.value)} placeholder="मराठी भाषांतर (ऐच्छिक)" />
      </div>
    </div>
  );
}

export { inputCls, labelCls };
