import { Clock, Building2, GraduationCap, FlaskConical, IndianRupee, Users, Briefcase } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "One-Year Certificate Courses",
    desc: "Job-oriented programmes designed to make you employment-ready in one year.",
  },
  {
    icon: Building2,
    title: "Practical Training in an 800-Bedded Multi-Specialty Teaching Hospital",
    desc: "Hands-on clinical exposure inside a real, functioning hospital — not just a classroom.",
  },
  {
    icon: GraduationCap,
    title: "Experienced Doctors as Faculty",
    desc: "Taught by practising doctors and medical professionals from VIMSMCH's Medical College & Hospital.",
  },
  {
    icon: FlaskConical,
    title: "Modern Laboratories",
    desc: "Access to well-equipped labs and hospital departments relevant to your certificate course.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Fees",
    desc: "Quality paramedical education priced to be accessible, with no hidden charges.",
  },
  {
    icon: Users,
    title: "Placement Assistance",
    desc: "Career counselling, personality development, and placement support to help you find work in healthcare.",
  },
  {
    icon: Briefcase,
    title: "Possible Opportunity for Employment in Foundation Hospital*",
    desc: "*Subject to performance and vacancies.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#e6edf0] py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#011e2c] mb-3">
            Learning Beyond the Classroom
          </h2>
          <div className="w-16 h-1 bg-[#2086b8] mx-auto rounded" />
          <p className="text-[#010608]/60 mt-4 max-w-xl mx-auto text-sm">
            Students receive practical exposure inside one of the region&apos;s leading multispecialty
            teaching hospitals.
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
