import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseGrid from "@/components/courses/CourseGrid";
import Reveal from "@/components/ui/Reveal";
import { getAllCourses } from "@/lib/db/courses";
import { HeartPulse, BedDouble, GraduationCap, ShieldCheck } from "lucide-react";
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
        <div
          className="relative text-white py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #011e2c 0%, #04415f 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-white/50 mb-3">Home / Courses</p>
            <span className="eyebrow eyebrow-light mb-4">One-Year Certificate Programmes</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">Courses at a Glance</h1>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white border-b border-[#e6edf0] py-14 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-stretch">
                <div className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-7 sm:p-9">
                  <span className="eyebrow mb-4">About the Programme</span>
                  <p className="text-[#010608]/70 text-sm leading-relaxed mb-4">
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

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  {[
                    { icon: GraduationCap, value: "5", label: "Certificate Courses" },
                    { icon: BedDouble, value: "800+", label: "Bed Teaching Hospital" },
                    { icon: HeartPulse, value: "25+", label: "Clinical Departments" },
                    { icon: ShieldCheck, value: "1 Year", label: "Duration" },
                  ].map((f) => (
                    <div key={f.label} className="bg-[#04415f] rounded-2xl p-5 text-white flex items-center gap-4">
                      <f.icon size={20} className="text-[#7dd3fc] shrink-0" />
                      <div>
                        <p className="font-display text-xl font-semibold leading-none">{f.value}</p>
                        <p className="text-white/60 text-[11px] mt-1 leading-snug">{f.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
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
