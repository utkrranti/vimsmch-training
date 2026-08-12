export type AppLocale = "en" | "mr";

export function pickLocale(locale: AppLocale, en: string, mr?: string | null): string {
  if (locale === "mr" && typeof mr === "string" && mr.trim() !== "") return mr;
  return en;
}

export function pickLocaleArray(locale: AppLocale, en: unknown, mr?: unknown): string[] {
  const enArr = Array.isArray(en) ? (en as string[]) : [];
  if (locale !== "mr" || !Array.isArray(mr)) return enArr;
  const mrArr = mr as string[];
  return enArr.map((item, i) => (typeof mrArr[i] === "string" && mrArr[i].trim() !== "" ? mrArr[i] : item));
}

export function pickLocaleFeeBreakdown(
  locale: AppLocale,
  items: Array<{ label: string; labelMr?: string; amount: number }>
): Array<{ label: string; amount: number }> {
  return items.map((f) => ({ label: pickLocale(locale, f.label, f.labelMr), amount: f.amount }));
}

export function pickLocaleSyllabus(
  locale: AppLocale,
  items: Array<{ unit: string; unitMr?: string; topics: string[]; topicsMr?: string[] }>
): Array<{ unit: string; topics: string[] }> {
  return items.map((u) => ({
    unit: pickLocale(locale, u.unit, u.unitMr),
    topics: pickLocaleArray(locale, u.topics, u.topicsMr),
  }));
}
