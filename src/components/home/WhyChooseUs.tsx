import { Stethoscope, FlaskConical, MonitorPlay, Building2, Users, GraduationCap } from "lucide-react";

const reasons = [
  {
    icon: GraduationCap,
    title: "Experienced Medical Faculty",
    desc: "Taught by practising doctors and medical professionals from VIMSMCH's Medical College & Hospital.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Exposure from Day One",
    desc: "Hands-on training inside a real, functioning multispecialty teaching hospital — not just a classroom.",
  },
  {
    icon: FlaskConical,
    title: "Modern Laboratories",
    desc: "Access to well-equipped labs and hospital departments relevant to your certificate course.",
  },
  {
    icon: MonitorPlay,
    title: "Simulation-Based Learning",
    desc: "Structured demonstration and practical sessions before supervised clinical postings.",
  },
  {
    icon: Building2,
    title: "Hospital Internship",
    desc: "Supervised practical training across departments of Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital.",
  },
  {
    icon: Users,
    title: "Career Guidance & Placement Assistance",
    desc: "Personality development, soft-skills training, and placement assistance in hospitals, diagnostic centres, and clinics across the region.",
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
