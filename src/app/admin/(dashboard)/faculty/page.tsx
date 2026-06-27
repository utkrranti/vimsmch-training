import { prisma } from "@/lib/prisma";
import { Users } from "lucide-react";
import FacultyManager from "./FacultyManager";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Faculty | Admin" };

export default async function AdminFacultyPage() {
  const faculty = await prisma.faculty.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#011e2c] flex items-center gap-2">
            <Users size={22} className="text-[#04415f]" /> Faculty
          </h1>
          <p className="text-[#010608]/45 text-sm mt-1">{faculty.length} member{faculty.length !== 1 ? "s" : ""} · sorted by order number</p>
        </div>
      </div>
      <FacultyManager faculty={faculty} />
    </div>
  );
}
