import { prisma } from "@/lib/prisma";
import { Briefcase } from "lucide-react";
import PlacementManager from "./PlacementManager";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Placements | Admin" };

export default async function AdminPlacementsPage() {
  const [placements, courses] = await Promise.all([
    prisma.placement.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    prisma.course.findMany({ where: { isActive: true }, select: { id: true, title: true }, orderBy: { title: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <Briefcase size={22} className="text-[#04415f]" /> Placements &amp; Testimonials
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">{placements.length} record{placements.length !== 1 ? "s" : ""} · shown on /placements</p>
      </div>
      <PlacementManager placements={placements} courses={courses} />
    </div>
  );
}
