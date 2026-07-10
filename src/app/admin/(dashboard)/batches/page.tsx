import { prisma } from "@/lib/prisma";
import { CalendarRange } from "lucide-react";
import BatchManager from "./BatchManager";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Batches | Admin" };

export default async function AdminBatchesPage() {
  const [batches, courses, enrollments] = await Promise.all([
    prisma.batch.findMany({
      orderBy: { startDate: "desc" },
      include: { course: { select: { title: true } }, enrollments: { select: { id: true, name: true } } },
    }),
    prisma.course.findMany({ where: { isActive: true }, select: { id: true, title: true }, orderBy: { title: "asc" } }),
    prisma.enrollment.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, courseId: true, batchId: true, course: { select: { title: true } } },
    }),
  ]);

  const batchRows = batches.map((b) => ({
    id: b.id,
    courseId: b.courseId,
    courseTitle: b.course.title,
    label: b.label,
    startDate: b.startDate.toISOString(),
    endDate: b.endDate.toISOString(),
    seats: b.seats,
    isActive: b.isActive,
    enrolledCount: b.enrollments.length,
    enrolledNames: b.enrollments.map((e) => e.name),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <CalendarRange size={22} className="text-[#04415f]" /> Batches
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">{batches.length} batch{batches.length !== 1 ? "es" : ""} · assign confirmed enrollments to a batch below</p>
      </div>
      <BatchManager batches={batchRows} courses={courses} enrollments={enrollments} />
    </div>
  );
}
