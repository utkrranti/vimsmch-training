import { Clock, Building2, GraduationCap, FlaskConical, IndianRupee, Users, Briefcase } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

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
    <section className="bg-[#e6edf0] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-6">
            <span className="eyebrow mb-2">Why Choose Us</span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#011e2c] mt-1 tracking-tight">
              Learning Beyond the Classroom
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.06}>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 h-full shadow-sm hover:shadow-md transition-all duration-300 group border border-[#e6edf0]">
                <div className="w-9 h-9 rounded-lg bg-[#04415f]/10 flex items-center justify-center shrink-0 group-hover:bg-[#04415f] transition-colors">
                  <Icon size={16} className="text-[#04415f] group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[#011e2c] font-bold text-xs leading-snug mb-1">{title}</h3>
                  <p className="text-[#010608]/55 text-[11px] leading-snug">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
