import Image from "next/image";
import { Quote } from "lucide-react";
import { getSettingsLocalized } from "@/lib/db/settings";
import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/lib/i18n/pickLocale";
import Reveal from "@/components/ui/Reveal";

export default async function DirectorMessage() {
  const locale = (await getLocale()) as AppLocale;
  const [s, t] = await Promise.all([
    getSettingsLocalized(["leadership.director.name", "leadership.director.message"], locale),
    getTranslations("directorMessage"),
  ]);
  const name = s["leadership.director.name"];
  const message = s["leadership.director.message"];

  if (!name && !message) return null;

  return (
    <section className="bg-[#f1f5f7] py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#e6edf0] overflow-hidden grid md:grid-cols-[280px_1fr]">
            <div className="relative h-64 md:h-full min-h-[260px]">
              <Image src="/images/principal.webp" alt={name || "Principal"} fill sizes="280px" className="object-cover" />
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <span className="eyebrow mb-4 self-start">{t("eyebrow")}</span>
              <Quote size={32} className="text-[#2086b8]/30 mb-4" />
              {message && (
                <p className="text-[#010608]/70 text-base leading-relaxed mb-6 whitespace-pre-line">{message}</p>
              )}
              {name && <p className="font-display text-lg font-bold text-[#011e2c]">{name}</p>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
