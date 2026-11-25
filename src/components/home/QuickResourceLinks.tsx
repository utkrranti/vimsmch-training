import Link from "next/link";
import { FileText, QrCode, HelpCircle, Image as ImageIcon, Newspaper, PhoneCall } from "lucide-react";
import { getSettings } from "@/lib/db/settings";
import { resolveFeeQrUrl } from "@/lib/fee-qr";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import FeeQrModal from "@/components/common/FeeQrModal";

export default async function QuickResourceLinks() {
  const [s, t] = await Promise.all([
    getSettings(["admission.formUrl", "admission.feeQrUrl"]),
    getTranslations("quickResourceLinks"),
  ]);

  const feeQrUrl = resolveFeeQrUrl(s["admission.feeQrUrl"]);

  const resources = [
    { icon: FileText, label: t("admissionForm"), href: s["admission.formUrl"], external: true, color: "#04415f" },
    // The QR image is never shown inline — this tile opens it in a modal.
    { icon: QrCode, label: t("feePaymentQr"), href: feeQrUrl, qrModal: true, color: "#2086b8" },
    { icon: Newspaper, label: t("newsNotices"), href: "/news", color: "#059652" },
    { icon: ImageIcon, label: t("gallery"), href: "/gallery", color: "#ff9800" },
    { icon: HelpCircle, label: t("faq"), href: "/faq", color: "#7c3aed" },
    { icon: PhoneCall, label: t("contactUs"), href: "/contact", color: "#0d9488" },
  ].filter((r) => r.href);

  if (resources.length === 0) return null;

  const tileCls =
    "group flex w-full flex-col items-center text-center gap-3 rounded-2xl p-6 h-full border border-black/5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300";

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 border-t border-[#e6edf0]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <span className="eyebrow mb-4">{t("eyebrow")}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#011e2c] mb-3 tracking-tight">
              {t("heading")}
            </h2>
            <div className="w-16 h-1 bg-[#2086b8] mx-auto rounded" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {resources.map(({ icon: Icon, label, href, external, qrModal, color }, i) => {
            const inner = (
              <>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-[#011e2c] text-sm font-semibold">{label}</span>
              </>
            );

            return (
              <Reveal key={label} delay={i * 0.05}>
                {qrModal ? (
                  <FeeQrModal
                    qrUrl={href as string}
                    title={t("qrModalTitle")}
                    hint={t("qrModalHint")}
                    alt={t("feeQrAlt")}
                    downloadLabel={t("downloadQr")}
                    closeLabel={t("closeQr")}
                    className={tileCls}
                    style={{ backgroundColor: `${color}12` }}
                  >
                    {inner}
                  </FeeQrModal>
                ) : (
                  <Link
                    href={href as string}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={tileCls}
                    style={{ backgroundColor: `${color}12` }}
                  >
                    {inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
