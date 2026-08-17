export const IST_TIMEZONE = "Asia/Kolkata";

export function formatDateIST(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", { timeZone: IST_TIMEZONE, ...options });
}

export function formatDateTimeIST(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-IN", { timeZone: IST_TIMEZONE, ...options });
}
