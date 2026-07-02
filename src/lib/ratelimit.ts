import { prisma } from "@/lib/prisma";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || null;
}

// Sliding-window limiter backed by MongoDB — counts recent Inquiry rows for the IP.
export async function isRateLimited(ipAddress: string | null): Promise<boolean> {
  if (!ipAddress) return false;
  const since = new Date(Date.now() - WINDOW_MS);
  const recent = await prisma.inquiry.count({
    where: { ipAddress, createdAt: { gte: since } },
  });
  return recent >= MAX_REQUESTS;
}
