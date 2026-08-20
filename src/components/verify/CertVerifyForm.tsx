"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, CheckCircle, XCircle, Award, Calendar, User } from "lucide-react";
import { formatDateIST } from "@/lib/date";

type Result = {
  valid: boolean;
  certificateNo?: string;
  studentName?: string;
  courseName?: string;
  issuedAt?: string;
};

export default function CertVerifyForm({ footerEmail = "paramedical.vimsmch@gmail.com" }: { footerEmail?: string }) {
  const t = useTranslations("verifyPage");
  const [certNo, setCertNo] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNo.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/verify?certNo=${encodeURIComponent(certNo.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ valid: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={certNo}
          onChange={(e) => setCertNo(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1 bg-[#f1f5f7] border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !certNo.trim()}
          className="flex items-center gap-2 bg-[#04415f] hover:bg-[#011e2c] disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm shrink-0"
        >
          <Search size={15} />
          {loading ? t("checking") : t("verify")}
        </button>
      </form>

      {result !== null && (
        <>
          {result.valid ? (
            <div className="bg-[#f1f5f7] border border-[#04415f]/20 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={22} className="text-[#04415f] shrink-0" />
                <div>
                  <p className="text-[#04415f] font-bold text-sm">{t("certVerifiedTitle")}</p>
                  <p className="text-[#010608]/50 text-xs">{t("certVerifiedText")}</p>
                </div>
              </div>
              <div className="border-t border-[#e6edf0] pt-4 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Award size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5">{t("certificateNumberLabel")}</p>
                    <p className="text-[#011e2c] font-semibold text-sm">{result.certificateNo}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5">{t("studentNameLabel")}</p>
                    <p className="text-[#011e2c] font-semibold text-sm">{result.studentName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5">{t("courseLabel")}</p>
                    <p className="text-[#011e2c] font-semibold text-sm">{result.courseName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5">{t("issuedOnLabel")}</p>
                    <p className="text-[#011e2c] font-semibold text-sm">
                      {result.issuedAt
                        ? formatDateIST(result.issuedAt, { day: "numeric", month: "long", year: "numeric" })
                        : t("emptyValue")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-3">
              <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-bold text-sm mb-1">{t("notFoundTitle")}</p>
                <p className="text-red-600 text-xs">
                  {t("notFoundText", { certNo })} <a href={`mailto:${footerEmail}`} className="underline">{footerEmail}</a>.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
