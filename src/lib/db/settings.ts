import { prisma } from "@/lib/prisma";

export async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? null;
}

export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

// Marathi translations for Setting rows are stored under a second row keyed `${key}_mr`.
// Falls back to the English value when the `_mr` row is missing or empty.
export async function getSettingsLocalized(keys: string[], locale: "en" | "mr"): Promise<Record<string, string>> {
  const mrKeys = keys.map((k) => `${k}_mr`);
  const rows = await prisma.setting.findMany({ where: { key: { in: [...keys, ...mrKeys] } } });
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return Object.fromEntries(
    keys.map((k) => {
      const mrValue = map[`${k}_mr`];
      const useMr = locale === "mr" && typeof mrValue === "string" && mrValue.trim() !== "";
      return [k, useMr ? mrValue : map[k]];
    })
  );
}
