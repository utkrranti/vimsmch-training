import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { getSettings } from "@/lib/db/settings";
import {
  ClipboardList, FileEdit, FileCheck2, UserCheck2, IndianRupee, BadgeCheck, PartyPopper,
  GraduationCap, HeartPulse, MessageCircleHeart, BookOpen, FlaskConical, Stethoscope,
  ListChecks, ClipboardCheck, ArrowRight, Languages, Download, QrCode,
} from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admission & How to Apply | VIMSMCH Paramedical Institute",
  description: "Eligibility criteria, admission process, required documents, and fee structure for VIMSMCH Paramedical Institute's certificate courses.",
};

const eligibility = [
  { icon: GraduationCap, text: "Passed Secondary School Examination or its equivalent from a recognized Board with science as one of the subjects." },
  { icon: HeartPulse, text: "Candidates should be medically fit to undergo practical and clinical training." },
  { icon: MessageCircleHeart, text: "Applicants should possess good communication skills, a positive attitude and a genuine interest in serving the healthcare profession." },
];

const programmeConsistsOf = [
  { icon: BookOpen, label: "Classroom teaching" },
  { icon: FlaskConical, label: "Practical laboratory sessions" },
  { icon: Stethoscope, label: "Clinical postings" },
  { icon: ListChecks, label: "Skill-based training" },
  { icon: ClipboardCheck, label: "Continuous assessment" },
  { icon: BadgeCheck, label: "Final evaluation" },
];

const steps = [
  { icon: ClipboardList, title: "1. Obtain the Admission Form", body: "Obtain the Admission Form from the Paramedical Institute or download it from the website." },
  { icon: FileEdit, title: "2. Complete the Application", body: "Complete the application form with all required details." },
  { icon: FileCheck2, title: "3. Submit Application & Documents", body: "Submit the application along with the prescribed documents." },
  { icon: UserCheck2, title: "4. Document Verification", body: "Document verification by the Admission Committee." },
  { icon: IndianRupee, title: "5. Fee Payment", body: "Payment of the prescribed admission fee." },
  { icon: BadgeCheck, title: "6. Confirmation & ID Card", body: "Confirmation of admission and issue of Identity Card." },
  { icon: PartyPopper, title: "7. Orientation & Classes Begin", body: "Orientation Programme and commencement of classes." },
];

const documents = [
  "SSC (10th) Mark Sheet and Certificate",
  "School Leaving / Transfer Certificate",
  "Aadhaar Card",
  "Recent Passport Size Photographs (4 copies)",
  "Domicile Certificate (if applicable)",
  "Caste Certificate (if applicable)",
  "Non-Creamy Layer Certificate (where applicable)",
  "Medical Fitness Certificate",
  "Character Certificate (if required)",
];

const selection = [
  "Fulfilment of eligibility criteria",
  "Verification of original documents",
  "Availability of seats",
  "Institutional admission guidelines",
];

export default async function AdmissionPage() {
  const s = await getSettings(["admission.formUrl", "admission.feeQrUrl"]);
  const formUrl = s["admission.formUrl"];
  const feeQrUrl = s["admission.feeQrUrl"];

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div
          className="relative text-white py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #011e2c 0%, #04415f 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-white/50 mb-3">Home / Admission &amp; How to Apply</p>
            <span className="eyebrow eyebrow-light mb-4">Admissions Open — 2026 Batch</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">Admission &amp; How to Apply</h1>
          </div>
        </div>

        {/* Intro */}
        <section className="bg-white py-10 sm:py-12 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-3">
              Begin Your Journey Towards a Rewarding Career in Healthcare
            </h2>
            <p className="text-[#010608]/65 text-sm leading-relaxed mb-3">
              Dr. Vithalrao Vikhe Patil Foundation&apos;s Paramedical Institute invites applications from
              enthusiastic and motivated students who aspire to build a successful career in the healthcare
              sector. Our one-year certificate programmes are designed to provide quality, affordable and
              skill-oriented education with extensive practical training in a reputed multispecialty
              teaching hospital.
            </p>
            <p className="text-[#010608]/65 text-sm leading-relaxed">
              Whether you are seeking a career-oriented professional qualification, our programmes provide
              an excellent opportunity to acquire practical skills and become employment-ready in one year.
            </p>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="bg-[#f1f5f7] py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">Eligibility Criteria</h2>
            <p className="text-[#010608]/55 text-sm mb-6">Applicants should fulfil the following eligibility requirements:</p>
            <div className="space-y-3">
              {eligibility.map((e) => (
                <div key={e.text} className="flex items-start gap-3 bg-white border border-[#e6edf0] rounded-xl p-4 shadow-sm">
                  <e.icon size={18} className="text-[#04415f] mt-0.5 shrink-0" />
                  <p className="text-[#010608]/70 text-sm leading-relaxed">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Duration & Programme Structure */}
        <section className="bg-white py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">Duration of the Course: One Year</h2>
            <p className="text-[#010608]/55 text-sm mb-6">Each programme consists of:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {programmeConsistsOf.map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 bg-[#f1f5f7] border border-[#e6edf0] rounded-xl p-4">
                  <p.icon size={16} className="text-[#04415f] shrink-0" />
                  <p className="text-[#010608]/70 text-sm font-medium">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Admission Process — 7 steps */}
        <section className="bg-[#f1f5f7] py-12 sm:py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Admission Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-3">7 Steps to Enrolment</h2>
              <p className="text-[#010608]/60 text-sm max-w-xl mx-auto">
                Admissions are conducted on a first-come, first-served basis, subject to fulfilment of
                eligibility criteria and availability of seats.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border border-[#e6edf0] rounded-2xl p-5 sm:p-6">
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

        {/* Documents Required */}
        <section className="bg-white py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">Documents Required</h2>
            <p className="text-[#010608]/55 text-sm mb-6">
              Applicants should submit self-attested copies of the following documents online, followed by
              original documents along with four passport-size photographs for verification:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {documents.map((d) => (
                <div key={d} className="flex items-start gap-2.5 bg-[#f1f5f7] border border-[#e6edf0] rounded-xl p-4">
                  <FileCheck2 size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                  <p className="text-[#010608]/70 text-sm leading-snug">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selection Procedure */}
        <section className="bg-[#f1f5f7] py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-4">Selection Procedure</h2>
              <p className="text-[#010608]/55 text-sm mb-4">Selection will be based on:</p>
              <ul className="space-y-2.5">
                {selection.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-[#010608]/70">
                    <BadgeCheck size={15} className="text-[#04415f] mt-0.5 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
              <p className="text-[#010608]/50 text-xs mt-4 italic">
                The decision of the Admission Committee shall be final.
              </p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-4">Medium of Instruction</h2>
              <div className="flex items-center gap-2.5 bg-white border border-[#e6edf0] rounded-xl p-4">
                <Languages size={18} className="text-[#04415f] shrink-0" />
                <p className="text-[#010608]/70 text-sm">English, Hindi and Marathi (where required)</p>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mt-8 mb-3">Fee Structure</h2>
              <div className="bg-white border border-[#e6edf0] rounded-xl p-4">
                <p className="text-[#011e2c] font-bold text-lg mb-2">₹30,000 <span className="text-xs font-normal text-[#010608]/50">per course (provisional — subject to approval)</span></p>
                <p className="text-[#010608]/60 text-xs leading-relaxed">
                  In addition, students shall bear other charges as applicable, including examination fees,
                  certification fees, educational tour / field visit expenses, study materials and practical
                  record books, and any other charges prescribed by NCVRT or the Institute from time to time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form & Fee Payment */}
        {(formUrl || feeQrUrl) && (
          <section className="bg-white py-12 sm:py-14 px-4 sm:px-6 border-b border-[#e6edf0]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-[#011e2c] mb-1">Application Form &amp; Fee Payment</h2>
              <p className="text-[#010608]/55 text-sm mb-6">Download the admission form, or pay the application fee online via QR.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {formUrl && (
                  <div className="flex items-center gap-4 bg-[#f1f5f7] border border-[#e6edf0] rounded-xl p-5">
                    <div className="w-11 h-11 bg-[#04415f] rounded-xl flex items-center justify-center shrink-0">
                      <FileCheck2 size={18} className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#011e2c] font-semibold text-sm mb-1">Admission Form</p>
                      <a
                        href={formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-1.5 text-[#04415f] text-sm font-semibold hover:text-[#2086b8] transition-colors"
                      >
                        <Download size={14} /> Download PDF
                      </a>
                    </div>
                  </div>
                )}
                {feeQrUrl && (
                  <div className="flex items-center gap-4 bg-[#f1f5f7] border border-[#e6edf0] rounded-xl p-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={feeQrUrl}
                      alt="Scan to pay the application fee"
                      width={64}
                      height={64}
                      className="rounded-lg border border-[#e6edf0] bg-white p-1 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[#011e2c] font-semibold text-sm mb-1 flex items-center gap-1.5">
                        <QrCode size={14} className="text-[#04415f]" /> Application Fee
                      </p>
                      <p className="text-[#010608]/60 text-xs leading-relaxed">Scan the QR code to pay your application fee online.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

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
