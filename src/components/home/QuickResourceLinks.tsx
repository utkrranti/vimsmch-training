import Link from "next/link";
import { FileText, QrCode, HelpCircle, Image as ImageIcon, Newspaper, PhoneCall } from "lucide-react";
import { getSettings } from "@/lib/db/settings";
import Reveal from "@/components/ui/Reveal";

export default async function QuickResourceLinks() {
  const s = await getSettings(["admission.formUrl", "admission.feeQrUrl"]);

  const resources = [
    { icon: FileText, label: "Admission Form", href: s["admission.formUrl"], external: true, color: "#04415f" },
    { icon: QrCode, label: "Fee Payment QR", href: s["admission.feeQrUrl"], external: true, color: "#2086b8" },
    { icon: Newspaper, label: "News & Notices", href: "/news", color: "#059652" },
    { icon: ImageIcon, label: "Gallery", href: "/gallery", color: "#ff9800" },
    { icon: HelpCircle, label: "FAQ", href: "/faq", color: "#7c3aed" },
    { icon: PhoneCall, label: "Contact Us", href: "/contact", color: "#0d9488" },
  ].filter((r) => r.href);

  if (resources.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 border-t border-[#e6edf0]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <span className="eyebrow mb-4">Quick Access</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#011e2c] mb-3 tracking-tight">
              Student Resources
            </h2>
            <div className="w-16 h-1 bg-[#2086b8] mx-auto rounded" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {resources.map(({ icon: Icon, label, href, external, color }, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <Link
                href={href as string}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center text-center gap-3 rounded-2xl p-6 h-full border border-black/5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                style={{ backgroundColor: `${color}12` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-[#011e2c] text-sm font-semibold">{label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
