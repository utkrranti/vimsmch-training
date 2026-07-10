import { prisma } from "@/lib/prisma";
import { Images } from "lucide-react";
import GalleryManager from "./GalleryManager";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Gallery | Admin" };

export default async function AdminGalleryPage() {
  const [items, courses] = await Promise.all([
    prisma.galleryItem.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    prisma.course.findMany({ where: { isActive: true }, select: { id: true, title: true }, orderBy: { title: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <Images size={22} className="text-[#04415f]" /> Gallery
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">{items.length} item{items.length !== 1 ? "s" : ""} · shown on /gallery and /facilities</p>
      </div>
      <GalleryManager items={items} courses={courses} />
    </div>
  );
}
