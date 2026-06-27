import CourseForm from "../CourseForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Course | Admin" };

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/courses" className="inline-flex items-center gap-1.5 text-xs text-[#010608]/45 hover:text-[#04415f] font-medium transition-colors mb-3">
          <ChevronLeft size={14} /> Back to Courses
        </Link>
        <h1 className="text-2xl font-bold text-[#011e2c]">Add New Course</h1>
        <p className="text-[#010608]/45 text-sm mt-1">Fill in the details below to create a new vocational course.</p>
      </div>
      <CourseForm />
    </div>
  );
}
