import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import CourseRow from "./CourseRow";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Courses | Admin" };

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, slug: true, title: true, category: true,
      nsqf: true, fees: true, seats: true, isActive: true,
      _count: { select: { inquiries: true, enrollments: true } },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#011e2c] flex items-center gap-2">
            <BookOpen size={22} className="text-[#04415f]" /> Courses
          </h1>
          <p className="text-[#010608]/45 text-sm mt-1">{courses.length} course{courses.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="flex items-center gap-2 bg-[#04415f] hover:bg-[#011e2c] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-[#04415f]/20"
        >
          <Plus size={15} /> Add Course
        </Link>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm overflow-hidden">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#f1f5f7] border border-[#e6edf0] flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-[#010608]/20" />
            </div>
            <p className="text-[#010608]/50 text-sm font-medium">No courses yet</p>
            <p className="text-[#010608]/30 text-xs mt-1">Create your first course to get started.</p>
            <Link href="/admin/courses/new" className="mt-5 text-sm font-semibold text-[#04415f] hover:text-[#2086b8] transition-colors">
              + Add a course
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f1f5f7] border-b border-[#e6edf0]">
                <tr>
                  {["Title", "Category", "NSQF", "Fees (₹)", "Seats", "Inquiries", "Enrollments", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#010608]/50 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((course, i) => (
                  <CourseRow key={course.id} course={course} zebra={i % 2 !== 0} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
