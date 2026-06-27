import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Browse Courses",
    desc: "Explore our NSQF-aligned vocational programmes. Each listing shows full fee structure, eligibility, duration, and certificate authority — as per UGC norms.",
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
    desc: "Visit the admissions office, complete documentation, pay the disclosed fee (no hidden charges per UGC norms), and join the next available batch.",
    cta: null,
  },
];

export default function HowToEnroll() {
  return (
    <section className="bg-[#f1f5f7] py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#011e2c] mb-3">How to Enrol</h2>
          <div className="w-16 h-1 bg-[#2086b8] mx-auto rounded" />
        </div>

        <div className="grid md:grid-cols-3 gap-7 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-11 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#04415f]/20 via-[#04415f]/60 to-[#04415f]/20" />

          {steps.map((s) => (
            <div
              key={s.num}
              className="relative bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#e6edf0] hover:-translate-y-1 transition-transform"
            >
              <div className="w-14 h-14 bg-[#04415f] text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 relative z-10 shadow-lg">
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
          ))}
        </div>
      </div>
    </section>
  );
}
