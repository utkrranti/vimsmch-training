import { getSettings } from "@/lib/db/settings";
import { FileText, Download } from "lucide-react";

export default async function ProspectusSection() {
  const s = await getSettings(["prospectus.pdfUrl"]);
  const pdfUrl = s["prospectus.pdfUrl"];

  if (!pdfUrl) return null;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=0&data=${encodeURIComponent(
    pdfUrl
  )}`;

  return (
    <section className="bg-white py-12 px-4 sm:px-6 border-b border-[#e6edf0]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 bg-[#04415f]/10 rounded-xl flex items-center justify-center shrink-0">
              <FileText size={22} className="text-[#04415f]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#011e2c]">Institute Prospectus</h3>
              <p className="text-[#010608]/55 text-sm mt-0.5">
                Courses, fees, and admission details in one document.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrc}
              alt="Scan to download the prospectus"
              width={72}
              height={72}
              className="rounded-lg border border-[#e6edf0] bg-white p-1 hidden sm:block"
            />
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 bg-[#04415f] hover:bg-[#011e2c] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm shrink-0"
            >
              <Download size={16} />
              Download Prospectus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
