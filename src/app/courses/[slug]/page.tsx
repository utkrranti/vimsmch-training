import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseInquiryForm from "@/components/courses/CourseInquiryForm";
import { getCourseBySlug, getAllSlugs } from "@/lib/db/courses";
import { getCourseImage } from "@/lib/course-images";
import { Clock, Users, IndianRupee, CheckCircle, CalendarDays, Award } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.title} | VIMSMCH Vocational Training`,
    description: course.shortDesc,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const feeTotal = course.feeBreakdown.reduce((s, f) => s + f.amount, 0);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Page title */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-3">Home / Courses / {course.title}</p>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-[#04415f] text-white text-xs font-bold px-3 py-1 rounded-full">
                1 Year Certificate Course
              </span>
              <span className="bg-white border border-[#cdd8de] text-[#04415f] text-xs px-3 py-1 rounded-full capitalize">
                {course.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#011e2c] mb-4">{course.title}</h1>
            <div className="flex flex-wrap gap-6">
              <QuickStat icon={Clock} label="Duration" value={`${course.durationMonths} months · ${course.durationHours} hrs`} />
              <QuickStat icon={Users} label="Seats" value={`${course.seats} per batch`} />
              <QuickStat icon={Award} label="Certificate by" value={course.certBy} />
              <QuickStat icon={CalendarDays} label="Batches" value={course.batchMonths.join(" · ")} />
            </div>
          </div>
        </div>

        {/* Photo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-1">
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-sm mt-8">
            <Image src={getCourseImage(course.slug)} alt={course.title} fill className="object-cover" priority />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-10">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <Section title="About This Programme">
              <p className="text-[#010608]/70 text-sm leading-relaxed">{course.fullDesc}</p>
            </Section>

            {/* Eligibility */}
            <Section title="Admission Eligibility">
              <div className="grid sm:grid-cols-3 gap-4">
                <DetailBox label="Minimum Qualification" value={course.eligibility} />
                <DetailBox label="Age Limit" value={course.ageLimit} />
                <DetailBox label="Certified By" value={course.certBy} />
              </div>
            </Section>

            {/* Fee breakdown */}
            <Section title="Fee Structure">
              <div className="bg-white rounded-2xl border border-[#e6edf0] overflow-hidden shadow-sm">
                <div className="px-5 py-3 bg-[#04415f]/5 border-b border-[#e6edf0]">
                  <p className="text-xs text-[#04415f] font-medium">
                    Fees shown are provisional and subject to final approval. No hidden charges.
                  </p>
                </div>
                <table className="w-full">
                  <tbody>
                    {course.feeBreakdown.map((f, i) => (
                      <tr key={f.label} className={`border-b border-[#e6edf0] ${i % 2 === 0 ? "bg-white" : "bg-[#f1f5f7]"}`}>
                        <td className="px-5 py-3.5 text-sm text-[#010608]/70">{f.label}</td>
                        <td className="px-5 py-3.5 text-sm text-[#011e2c] font-medium text-right">
                          <span className="flex items-center justify-end gap-0.5">
                            <IndianRupee size={12} className="text-[#04415f]" />
                            {f.amount.toLocaleString("en-IN")}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-[#04415f] text-white">
                      <td className="px-5 py-4 font-bold text-sm">Total Course Fee (Provisional)</td>
                      <td className="px-5 py-4 text-right">
                        <span className="flex items-center justify-end gap-0.5 font-bold text-lg">
                          <IndianRupee size={15} />
                          {feeTotal.toLocaleString("en-IN")}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Assessment */}
            <Section title="Assessment &amp; Examination Scheme">
              <div className="bg-white rounded-2xl border-l-4 border-[#04415f] p-6 shadow-sm">
                <p className="text-[#010608]/70 text-sm leading-relaxed">{course.assessmentScheme}</p>
              </div>
            </Section>

            {/* Syllabus */}
            <Section title="Syllabus">
              <div className="space-y-3">
                {course.syllabus.map((unit, i) => (
                  <details
                    key={unit.unit}
                    className="bg-white border border-[#e6edf0] rounded-xl overflow-hidden shadow-sm group"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-[#f1f5f7] transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-[#04415f] rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-[#011e2c] font-semibold text-sm">{unit.unit}</span>
                      </div>
                      <span className="text-[#04415f] text-xs font-semibold">View Topics</span>
                    </summary>
                    <div className="px-5 pb-5 border-t border-[#e6edf0] pt-4 bg-[#f1f5f7]">
                      <ul className="space-y-2">
                        {unit.topics.map((t) => (
                          <li key={t} className="flex items-start gap-2 text-sm text-[#010608]/65">
                            <CheckCircle size={13} className="text-[#04415f] mt-0.5 shrink-0" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </Section>

            {/* Outcomes */}
            <Section title="What You Will Be Able to Do">
              <div className="grid sm:grid-cols-2 gap-4">
                {course.outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-3 bg-white border border-[#e6edf0] rounded-xl p-4 shadow-sm">
                    <CheckCircle size={15} className="text-[#04415f] mt-0.5 shrink-0" />
                    <p className="text-[#010608]/70 text-sm leading-snug">{o}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Fee card */}
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-6 sticky top-20">
              <div className="flex items-center gap-0.5 mb-1">
                <IndianRupee size={20} className="text-[#04415f]" />
                <span className="text-3xl font-bold text-[#011e2c]">
                  {course.fees.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[#010608]/40 text-xs mb-5">per year · provisional, subject to approval</p>
              <div className="space-y-2 text-xs text-[#010608]/60 mb-5 border-t border-[#e6edf0] pt-5">
                <p><span className="text-[#010608]/40">Duration: </span>{course.durationMonths} months</p>
                <p><span className="text-[#010608]/40">Hours: </span>{course.durationHours} hours</p>
                <p><span className="text-[#010608]/40">Certified By: </span>{course.certBy}</p>
                <p><span className="text-[#010608]/40">Seats: </span>{course.seats} per batch</p>
                <p><span className="text-[#010608]/40">Eligibility: </span>{course.eligibility}</p>
              </div>
              <Link
                href={`/enquire/${course.slug}`}
                className="block w-full bg-[#04415f] hover:bg-[#011e2c] text-white text-sm font-semibold py-3.5 rounded-lg text-center transition-colors shadow-md"
              >
                Enquire Now
              </Link>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-5">
              <p className="text-[#010608]/40 text-xs font-semibold uppercase tracking-wide mb-3">Skills Covered</p>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((t) => (
                  <span key={t} className="text-xs bg-[#04415f]/8 border border-[#04415f]/20 text-[#04415f] px-2.5 py-1 rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Batch months */}
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-5">
              <p className="text-[#010608]/40 text-xs font-semibold uppercase tracking-wide mb-3">Batch Start Months</p>
              <div className="flex flex-wrap gap-2">
                {course.batchMonths.map((m) => (
                  <span key={m} className="text-xs bg-[#f1f5f7] border border-[#cdd8de] text-[#010608]/60 px-2.5 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry form */}
        <div id="inquiry" className="bg-[#e6edf0] border-t border-[#cdd8de] py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#011e2c] mb-1">Inquire About This Course</h2>
            <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
            <p className="text-[#010608]/60 text-sm mb-8">
              Fill in your details and our counsellor will reach out within 1 working day.
            </p>
            <CourseInquiryForm courseTitle={course.title} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#011e2c] mb-1" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="w-10 h-0.5 bg-[#2086b8] mb-5" />
      {children}
    </div>
  );
}

function DetailBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-[#e6edf0] rounded-xl p-4 shadow-sm">
      <p className="text-[#010608]/40 text-xs mb-1">{label}</p>
      <p className="text-[#011e2c] text-sm font-semibold leading-snug">{value}</p>
    </div>
  );
}

function QuickStat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-[#2086b8] shrink-0" />
      <div>
        <p className="text-[#010608]/40 text-[10px] uppercase tracking-wide leading-none mb-0.5">{label}</p>
        <p className="text-[#011e2c] text-xs font-semibold">{value}</p>
      </div>
    </div>
  );
}
