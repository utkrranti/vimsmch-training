import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FILLED_STATUSES = ["SUBMITTED", "APPROVED", "ENROLLED"];

export async function GET(request: NextRequest) {
  const courseId = request.nextUrl.searchParams.get("courseId");
  if (!courseId) return NextResponse.json({ batches: [] });

  const batches = await prisma.batch.findMany({
    where: { courseId, isActive: true },
    orderBy: { startDate: "asc" },
  });

  const withAvailability = await Promise.all(
    batches.map(async (batch) => {
      const taken = await prisma.admissionApplication.count({
        where: { batchId: batch.id, status: { in: FILLED_STATUSES } },
      });
      return { id: batch.id, label: batch.label, startDate: batch.startDate, remaining: batch.seats - taken };
    }),
  );

  return NextResponse.json({ batches: withAvailability.filter((batch) => batch.remaining > 0) });
}
