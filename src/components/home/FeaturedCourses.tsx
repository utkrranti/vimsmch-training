import Link from "next/link";
import { Clock, Users, IndianRupee, ArrowRight } from "lucide-react";
import { getFeaturedCourses } from "@/lib/db/courses";

export default async function FeaturedCourses() {
  const courses = await getFeaturedCourses(3);

  return (
    <section className="bg-[#f1f5f7] py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            UGC Approved Programmes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#011e2c] mb-3">Featured Courses</h2>
          <div className="w-16 h-1 bg-[#2086b8] mx-auto rounded" />
          <p className="text-[#010608]/60 mt-4 max-w-xl mx-auto text-sm">
            All programmes are NSQF-aligned with fees fully disclosed upfront — no hidden charges, as per UGC norms.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {courses.map((c) => (
            <div
              key={c.slug}
              className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-300 group"
            >
              {/* Card top accent */}
              <div className="h-1 bg-[#04415f]" />

              {/* Header */}
              <div className="px-6 py-5 border-b border-[#e6edf0] flex items-start justify-between gap-3">
                <h3 className="text-[#011e2c] font-semibold text-base leading-snug group-hover:text-[#04415f] transition-colors">
                  {c.title}
                </h3>
                <span className="shrink-0 bg-[#04415f] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  NSQF {c.nsqf}
                </span>
              </div>

              {/* Details */}
              <div className="px-6 py-5 flex-1 space-y-3">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#010608]/60">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-[#04415f]" />
                    {c.durationMonths} months · {c.durationHours} hrs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={13} className="text-[#04415f]" />
                    {c.seats} seats
                  </span>
                </div>

                <div className="text-sm">
                  <span className="text-[#010608]/40 text-xs">Eligibility: </span>
                  <span className="text-[#010608]/70">{c.eligibility}</span>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-[#04415f]/8 border border-[#04415f]/20 text-[#04415f] px-2.5 py-0.5 rounded-full font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Certificate authority — UGC required */}
                <div className="text-xs text-[#010608]/40 border-t border-[#e6edf0] pt-3">
                  <span className="text-[#04415f] font-medium">Certificate by: </span>
                  {c.certBy}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <IndianRupee size={14} className="text-[#04415f]" />
                    <span className="text-2xl font-bold text-[#011e2c]">
                      {c.fees.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[#010608]/40 text-xs ml-1">total</span>
                  </div>
                  <Link
                    href={`/courses/${c.slug}`}
                    className="flex items-center gap-1.5 text-[#04415f] hover:text-[#011e2c] text-sm font-semibold transition-colors"
                  >
                    Know More <ArrowRight size={13} />
                  </Link>
                </div>
                <Link
                  href={`/enquire/${c.slug}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#04415f] hover:bg-[#011e2c] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 border-2 border-[#04415f] text-[#04415f] font-semibold px-7 py-3 rounded-lg hover:bg-[#04415f] hover:text-white transition-colors"
          >
            View All Courses <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
