import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ClipboardCheck, FileText, IndianRupee, CheckCircle2, ArrowRight, FileCheck2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admission & How to Apply | VIMSMCH Vocational Training",
  description: "Step-by-step admission process for VIMSMCH Vocational Training courses — eligibility, application, required documents, fees, and confirmation.",
};

const steps = [
  {
    icon: ClipboardCheck,
    title: "1. Check Eligibility",
    body: "Review the eligibility criteria and age limit listed on each course page. Most programmes require a minimum of 10th/12th pass, with some courses requiring a relevant diploma or degree.",
  },
  {
    icon: FileText,
    title: "2. Submit an Enquiry / Application",
    body: "Fill the online enquiry form from the course page or Contact Us page with your name, phone, email, and course of interest. Our admissions counsellor will call you within 1 working day.",
  },
  {
    icon: FileCheck2,
    title: "3. Document Verification",
    body: "Keep the following documents ready: Aadhaar card, latest mark sheet / educational certificate, passport-size photographs, and category certificate (if applicable). Originals are verified at the time of enrolment.",
  },
  {
    icon: IndianRupee,
    title: "4. Fee Payment",
    body: "Course fees are disclosed upfront with a full breakdown on every course page — no hidden charges. Fees can be paid at the vocational training office; payment plans may be available for select courses.",
  },
  {
    icon: CheckCircle2,
    title: "5. Confirmation & Batch Allotment",
    body: "Once your documents and fee payment are verified, your seat is confirmed and you are allotted to the next available batch. You will receive confirmation via phone and email.",
  },
];

export default function AdmissionPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-8 sm:py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-2">Home / Admission &amp; How to Apply</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-1">Admission &amp; How to Apply</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

        {/* Steps */}
        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Simple 5-Step Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-3">From Enquiry to Enrolment</h2>
              <p className="text-[#010608]/60 text-sm max-w-xl mx-auto">
                No lengthy paperwork to begin. Follow these steps to secure your seat in a vocational training programme.
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-5 sm:p-6">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#04415f] rounded-xl flex items-center justify-center shrink-0">
                      <s.icon size={20} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[#011e2c] font-bold text-base sm:text-lg mb-1.5">{s.title}</h3>
                      <p className="text-[#010608]/65 text-sm leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-16 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #04415f 0%, #065a82 100%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Begin?</h2>
            <p className="text-white/75 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Browse our course catalogue or reach out directly — our admissions team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/courses"
                className="flex items-center justify-center gap-2 bg-white text-[#04415f] font-semibold px-6 py-3 rounded-lg hover:bg-[#e6edf0] transition-colors text-sm"
              >
                Browse Courses <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact#inquiry"
                className="flex items-center justify-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Talk to Admissions
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
