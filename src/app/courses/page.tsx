import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseGrid from "@/components/courses/CourseGrid";
import { getAllCourses } from "@/lib/db/courses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vocational Courses | VIMSMCH Training",
  description:
    "Browse one-year paramedical certificate courses in healthcare and allied sciences at VIMSMCH's Vocational Training Centre.",
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Page title breadcrumb */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-2">Home / Courses</p>
            <h1 className="text-3xl font-bold text-[#011e2c] mb-1">Vocational Programmes</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

        {/* Fee disclosure */}
        <div className="bg-[#04415f]/5 border-b border-[#04415f]/15 py-3 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-x-8 gap-y-1 text-xs text-[#010608]/60">
            <span>
              <span className="text-[#04415f] font-semibold">Fee Disclosure: </span>
              Fees shown are provisional and subject to final approval. No additional charges without prior written notice.
            </span>
            <span>
              <span className="text-[#04415f] font-semibold">Certificates: </span>
              Issued by Dr. Vithalrao Vikhe Patil Foundation&apos;s Vocational Training Centre upon successful completion.
            </span>
          </div>
        </div>

        {/* Courses grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <CourseGrid courses={courses} />
        </div>
      </main>
      <Footer />
    </>
  );
}
