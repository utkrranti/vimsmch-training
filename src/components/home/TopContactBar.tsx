import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default async function TopContactBar() {
  const t = await getTranslations("footer");

  return (
    <div className="bg-[#011e2c]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 text-xs text-white/90 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-6 sm:text-sm">
        <div className="flex items-center gap-2.5">
          <MapPin size={15} className="shrink-0 text-white/70" />
          <span>{t("address")}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone size={15} className="shrink-0 text-white/70" />
          <a href="tel:18001234858" className="text-white/90 hover:text-white transition-colors">1800 123 4858</a>
          <span className="text-white/40">/</span>
          <a href="tel:+918956263701" className="text-white/90 hover:text-white transition-colors">+91 8956263701</a>
        </div>
        <div className="flex items-center gap-2.5">
          <Mail size={15} className="shrink-0 text-white/70" />
          <a href="mailto:dean@vimsmch.edu.in" className="text-white/90 hover:text-white transition-colors">dean@vimsmch.edu.in</a>
        </div>
        <div className="flex items-center gap-2.5">
          <Globe size={15} className="shrink-0 text-white/70" />
          <a href="https://vimsmch.edu.in" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">
            www.vimsmch.edu.in
          </a>
        </div>
      </div>
    </div>
  );
}
