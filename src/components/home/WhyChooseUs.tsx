import { ShieldCheck, BookOpen, GraduationCap, BadgeCheck, Users, FileText } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "UGC Recognised",
    desc: "All programmes approved under UGC 2(f) and 12(B) — ensuring national validity of your certificate.",
  },
  {
    icon: BookOpen,
    title: "NSQF Aligned Curriculum",
    desc: "Every course maps to the National Skills Qualifications Framework, making credits transferable and industry-accepted.",
  },
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    desc: "Taught by practising medical professionals and industry specialists with minimum 5 years of field experience.",
  },
  {
    icon: BadgeCheck,
    title: "Govt. Recognised Certificates",
    desc: "Certificates issued by VIMSMCH and affiliating university — valid across India for employment and higher education.",
  },
  {
    icon: Users,
    title: "Placement Assistance",
    desc: "Dedicated placement support with tie-ups to hospitals, diagnostic labs, clinics, and healthcare organisations.",
  },
  {
    icon: FileText,
    title: "Transparent Fee Structure",
    desc: "No hidden charges. Full fee disclosed upfront as per UGC norms. Scholarship and instalment options available.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#e6edf0] py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Why VIMSMCH Vocational
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#011e2c] mb-3">
            Built on Trust &amp; Compliance
          </h2>
          <div className="w-16 h-1 bg-[#2086b8] mx-auto rounded" />
          <p className="text-[#010608]/60 mt-4 max-w-xl mx-auto text-sm">
            Every programme is designed to meet UGC, NSQF, and industry standards — so your
            qualification means something.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(4,65,95,0.08)] transition-all duration-300 group border border-[#e6edf0]"
            >
              <div className="w-14 h-14 rounded-xl bg-[#04415f]/10 flex items-center justify-center mb-5 group-hover:bg-[#04415f] transition-colors">
                <Icon size={22} className="text-[#04415f] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[#011e2c] font-bold text-base mb-2">{title}</h3>
              <p className="text-[#010608]/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
