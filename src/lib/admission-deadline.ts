import { getSetting } from "@/lib/db/settings";

export async function isAdmissionClosed(): Promise<boolean> {
  const lastDate = await getSetting("admission.lastDate");
  if (!lastDate) return false;
  const cutoff = new Date(`${lastDate}T23:59:59.999`);
  return Number.isFinite(cutoff.getTime()) && new Date() > cutoff;
}

export const ADMISSION_CLOSED_MESSAGE = "Applications are now closed. The last date for application has passed.";
