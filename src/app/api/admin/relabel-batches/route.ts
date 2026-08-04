import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const results: Record<string, string> = {};

  const batchAs = await prisma.batch.findMany({ where: { label: "Batch A" } });
  for (const batch of batchAs) {
    await prisma.batch.update({
      where: { id: batch.id },
      data: { label: "Calendar Year (January-December)", startDate: new Date("2027-01-01T00:00:00.000Z"), endDate: new Date("2027-12-31T00:00:00.000Z") },
    });
    results[batch.id] = "Calendar Year (January-December)";
  }

  const batchBs = await prisma.batch.findMany({ where: { label: "Batch B" } });
  for (const batch of batchBs) {
    await prisma.batch.update({
      where: { id: batch.id },
      data: { label: "Academic Year (July-June)", startDate: new Date("2026-07-01T00:00:00.000Z"), endDate: new Date("2027-06-30T00:00:00.000Z") },
    });
    results[batch.id] = "Academic Year (July-June)";
  }

  return NextResponse.json({ success: true, results });
}
