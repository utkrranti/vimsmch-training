import Link from "next/link";
import { BookOpen, ClipboardList, Building2, Briefcase, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const cards = [
  {
    icon: BookOpen,
    title: "Our Courses",
    desc: "Five one-year certificate programmes in allied health sciences.",
    href: "/courses",
    color: "#04415f",
  },
  {
    icon: ClipboardList,
    title: "Admission",
    desc: "Eligibility, documents required, fees, and how to apply.",
    href: "/admission",
    color: "#059652",
  },
  {
    icon: Building2,
    title: "Campus & Facilities",
    desc: "800-bed teaching hospital, labs, and clinical training areas.",
    href: "/facilities",
    color: "#ff9800",
  },
  {
    icon: Briefcase,
    title: "Placements",
    desc: "Career support, counselling, and employment assistance.",
    href: "/placements",
    color: "#7c3aed",
  },
] as const;

export default function QuickAccessGrid() {
  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="eyebrow mb-4">Get Started</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#011e2c] mb-3 tracking-tight">
              Everything You Need, In One Place
            </h2>
            <div className="w-16 h-1 bg-[#2086b8] mx-auto rounded" />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ icon: Icon, title, desc, href, color }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Link
                href={href}
                className="group relative flex flex-col h-64 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-transform duration-300 p-6"
                style={{ background: `linear-gradient(145deg, ${color} 0%, ${color}cc 100%)` }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20 group-hover:bg-white/25 transition-colors">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg leading-snug mb-2">{title}</h3>
                <p className="text-white/75 text-xs leading-relaxed mb-4">{desc}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-white text-xs font-semibold">
                  Explore
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
