import { prisma } from "@/lib/prisma";
import { Megaphone } from "lucide-react";
import AnnouncementManager from "./AnnouncementManager";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Announcements | Admin" };

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <Megaphone size={22} className="text-[#04415f]" /> Announcements
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">
          {announcements.length} notice{announcements.length !== 1 ? "s" : ""} · active ones appear on the home page
        </p>
      </div>
      <AnnouncementManager announcements={announcements.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() }))} />
    </div>
  );
}
