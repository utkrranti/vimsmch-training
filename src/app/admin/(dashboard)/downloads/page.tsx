import { prisma } from "@/lib/prisma";
import { FileDown } from "lucide-react";
import DownloadManager from "./DownloadManager";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Downloads | Admin" };

export default async function AdminDownloadsPage() {
  const downloads = await prisma.downloadItem.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <FileDown size={22} className="text-[#04415f]" /> Downloads
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">{downloads.length} file{downloads.length !== 1 ? "s" : ""} · shown on /downloads</p>
      </div>
      <DownloadManager downloads={downloads} />
    </div>
  );
}
