import HeroCarousel from "@/components/home/HeroCarousel";
import { getSettingsLocalized } from "@/lib/db/settings";
import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/lib/i18n/pickLocale";

export default async function HeroSection() {
  const locale = (await getLocale()) as AppLocale;
  const [settings, t] = await Promise.all([
    getSettingsLocalized(
      [
        "hero.notice.unit1Title",
        "hero.notice.unit1Text",
        "hero.notice.unit2Title",
        "hero.notice.unit2Text",
        "hero.notice.unit2Extra",
        "hero.notice.admission",
      ],
      locale
    ),
    getTranslations("hero"),
  ]);

  return (
    <HeroCarousel
      instituteNotice={{
        unit1Title: settings["hero.notice.unit1Title"] || t("defaultUnit1Title"),
        unit1Text: settings["hero.notice.unit1Text"] || t("defaultUnit1Text"),
        unit2Title: settings["hero.notice.unit2Title"] || t("defaultUnit2Title"),
        unit2Text: settings["hero.notice.unit2Text"] || t("defaultUnit2Text"),
        unit2Extra: settings["hero.notice.unit2Extra"] || t("defaultUnit2Extra"),
        admissionLine: settings["hero.notice.admission"] || t("defaultAdmissionLine"),
      }}
    />
  );
}
