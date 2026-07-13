import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseGrid from "@/components/courses/CourseGrid";
import { getAllCourses } from "@/lib/db/courses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate Courses | VIMSMCH Paramedical Institute",
  description:
    "Browse one-year paramedical certificate courses in healthcare and allied sciences at VIMSMCH's Paramedical Institute.",
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
            <h1 className="text-3xl font-bold text-[#011e2c] mb-1">Courses at a Glance</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white border-b border-[#e6edf0] py-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-[#010608]/70 text-sm leading-relaxed">
              Approval has been received to commence 5 certificate courses, which will be conducted in an
              800-bedded multispecialty teaching hospital equipped with state-of-the-art infrastructure and
              comprehensive clinical facilities. The hospital has well-established departments including
              General Medicine, General Surgery, Orthopaedics, Obstetrics &amp; Gynaecology, Paediatrics,
              Ophthalmology, ENT, Dermatology, Psychiatry, Anaesthesiology, Radiodiagnosis, Emergency
              Medicine, Intensive Care Units (Medical, Surgical, Cardiac and Neonatal ICUs), Cardiology,
              Nephrology, Urology, Neurology, Neurosurgery, Oncology, Dentistry, Physiotherapy, Blood
              Centre, Central Clinical Laboratory, Operation Theatre Complex, Dialysis Unit, and Trauma
              &amp; Emergency Services.
            </p>
            <p className="text-[#010608]/70 text-sm leading-relaxed">
              Students enrolled in these courses will receive extensive hands-on practical training and
              supervised clinical exposure in their respective specialties, enabling them to acquire the
              knowledge, technical skills, and professional competencies required for employment in the
              healthcare sector.
            </p>
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
              Issued by Dr. Vithalrao Vikhe Patil Foundation&apos;s Paramedical Institute upon successful completion.
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
