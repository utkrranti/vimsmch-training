import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    num: "01",
    title: "Browse Courses",
    desc: "Explore our one-year certificate programmes. Each listing shows duration, eligibility, provisional fee, and certificate authority.",
    cta: { label: "View Courses", href: "/courses" },
  },
  {
    num: "02",
    title: "Submit Inquiry",
    desc: "Fill in the inquiry form with your name, phone, and course of interest. Our counsellor will call you within 1 working day — no commitment required.",
    cta: { label: "Inquire Now", href: "/contact#inquiry" },
  },
  {
    num: "03",
    title: "Confirm &amp; Join",
    desc: "Visit the admissions office, complete documentation, pay the applicable fee, and join the next available batch.",
    cta: null,
  },
];

export default function HowToEnroll() {
  return (
    <section className="bg-[#f1f5f7] py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="eyebrow mb-4">Simple Process</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#011e2c] mb-3 tracking-tight">How to Enrol</h2>
            <div className="w-16 h-1 bg-[#2086b8] mx-auto rounded" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-7 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-11 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#04415f]/20 via-[#04415f]/60 to-[#04415f]/20" />

          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
              <div className="relative bg-white rounded-2xl p-8 h-full shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#e6edf0] hover:-translate-y-1 transition-transform">
                <div className="font-display w-14 h-14 bg-[#04415f] text-white rounded-full flex items-center justify-center font-semibold text-lg mb-6 relative z-10 shadow-lg">
                  {s.num}
                </div>
                <h3 className="text-[#011e2c] font-bold text-lg mb-3">{s.title}</h3>
                <p
                  className="text-[#010608]/60 text-sm leading-relaxed mb-5"
                  dangerouslySetInnerHTML={{ __html: s.desc }}
                />
                {s.cta && (
                  <Link
                    href={s.cta.href}
                    className="inline-flex items-center gap-1 text-[#04415f] font-semibold text-sm hover:text-[#2086b8] transition-colors"
                  >
                    {s.cta.label} →
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
