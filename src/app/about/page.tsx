import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/lib/db/settings";
import { Target, Compass, GraduationCap, Users, Phone, Mail, AlertTriangle, CheckCircle2, Quote, UserCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute",
  description:
    "Learn about Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute — affordable, employment-oriented paramedical certificate courses with hands-on hospital training.",
};

const objectives = [
  "Providing affordable healthcare education",
  "Creating employment opportunities for rural youth",
  "Developing job-ready healthcare professionals",
  "Supporting hospitals with skilled manpower",
  "Enhancing employability through practical training",
  "Promoting self-reliance through skill development",
];

const ourObjectives = [
  "Affordable education",
  "Quality practical training",
  "Skill-based learning",
  "Industry-oriented curriculum",
  "Hospital exposure",
  "Personality development",
  "Career guidance",
  "Placement assistance",
];

const quickFacts = [
  { icon: GraduationCap, label: "Certificate Courses", value: "5", sub: "One-year paramedical programmes" },
  { icon: Target, label: "Course Duration", value: "1 Year", sub: "Theory, practical & clinical training" },
  { icon: Users, label: "Training Location", value: "On Campus", sub: "Inside VIMSMCH's teaching hospital" },
  { icon: Compass, label: "Focus", value: "Rural Ahilyanagar", sub: "Students from the district & surrounding regions" },
];

const leaders = [
  { key: "chairman", title: "Chairman" },
  { key: "secretaryGeneral", title: "Secretary General" },
  { key: "director", title: "Director" },
] as const;

export default async function AboutPage() {
  const s = await getSettings([
    "about.mission", "about.established",
    "leadership.chairman.name", "leadership.chairman.message",
    "leadership.secretaryGeneral.name", "leadership.secretaryGeneral.message",
    "leadership.director.name", "leadership.director.message",
    "antiragging.helpline", "antiragging.email", "antiragging.portalUrl",
  ]);

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
            <p className="text-xs text-white/50 mb-3">Home / About Us</p>
            <span className="eyebrow eyebrow-light mb-4">Who We Are</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">About Us</h1>
          </div>
        </div>

        {/* Mission */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                Paramedical Institute
              </span>
              <h2 className="text-3xl font-bold text-[#011e2c] mb-4 leading-snug">
                Dr. Vithalrao Vikhe Patil Foundation&apos;s<br />
                Medical College &amp; Hospital
              </h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
              <p className="text-[#010608]/65 text-sm leading-relaxed mb-6">
                {s["about.mission"]}
              </p>
              <a
                href="https://vimsmch.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#04415f] hover:bg-[#011e2c] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Visit Main Website →
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {quickFacts.map((c) => (
                <div key={c.label} className="bg-[#f1f5f7] rounded-2xl p-5 border border-[#e6edf0]">
                  <c.icon size={20} className="text-[#04415f] mb-3" />
                  <p className="text-[#010608]/40 text-xs uppercase tracking-wide mb-1">{c.label}</p>
                  <p className="text-[#011e2c] font-bold text-base">{c.value}</p>
                  {c.sub && <p className="text-[#010608]/50 text-xs mt-1 leading-snug">{c.sub}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Legacy */}
        <section className="bg-[#f1f5f7] py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-10 items-center">
            <div className="mx-auto lg:mx-0">
              <div className="relative w-56 sm:w-64 lg:w-full aspect-[550/712] rounded-2xl overflow-hidden shadow-sm border border-[#e6edf0]">
                <Image
                  src="/images/Balasaheb_Vikhe_Patil_accepting_Padma_Bhushan_(cropped).jpg"
                  alt="Late Padmabhushan Dr. Balasaheb Vikhe Patil"
                  fill
                  sizes="(max-width: 1024px) 224px, 280px"
                  className="object-cover"
                />
              </div>
              <p className="text-[#010608]/45 text-xs text-center mt-2">
                Late Padmabhushan Dr. Balasaheb Vikhe Patil
              </p>
            </div>
            <div>
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                About Us
              </span>
              <h2 className="text-2xl font-bold text-[#011e2c] mb-4">Our Legacy</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
              <p className="text-[#010608]/65 text-sm leading-relaxed mb-4">
                Inspired by the visionary leadership of Late Padmabhushan Dr. Balasaheb Vikhe Patil, Dr. Vithalrao Vikhe Patil Foundation has consistently worked towards providing quality education and healthcare services to society.
              </p>
              <p className="text-[#010608]/65 text-sm leading-relaxed">
                The Foundation has established numerous institutions in engineering, pharmacy, nursing, physiotherapy, agriculture, management, medical education and healthcare, contributing significantly to the educational development of Maharashtra. The Paramedical Institute is another milestone in this continuing journey of nation building through skill development.
              </p>
            </div>
          </div>
        </section>

        {/* Why Vocational Training */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Why Vocational Training?
              </span>
              <h2 className="text-2xl font-bold text-[#011e2c] mb-4">Bridging the Skills Gap</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
              <p className="text-[#010608]/65 text-sm leading-relaxed mb-4">
                India is witnessing a growing demand for trained paramedical professionals due to rapid expansion of healthcare infrastructure. The Paramedical Institute has therefore been established with clear, focused objectives.
              </p>
              <p className="text-[#010608]/65 text-sm leading-relaxed">
                Special emphasis is laid on students from Ahilyanagar District and surrounding rural regions who aspire to build successful careers in healthcare.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {objectives.map((o) => (
                <div key={o} className="flex items-start gap-2.5 bg-[#f1f5f7] rounded-xl p-4 border border-[#e6edf0]">
                  <CheckCircle2 size={16} className="text-[#04415f] mt-0.5 shrink-0" />
                  <p className="text-[#010608]/70 text-sm leading-snug">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="bg-[#f1f5f7] py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-7">
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-7">
              <div className="w-12 h-12 bg-[#04415f] rounded-xl flex items-center justify-center mb-5">
                <Compass size={20} className="text-white" />
              </div>
              <h3 className="text-[#011e2c] font-bold text-lg mb-3">Vision</h3>
              <p className="text-[#010608]/65 text-sm leading-relaxed">
                To become a premier vocational training institution in allied health sciences by producing competent, ethical and skilled paramedical professionals capable of serving society with excellence and compassion.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-7">
              <div className="w-12 h-12 bg-[#04415f] rounded-xl flex items-center justify-center mb-5">
                <Target size={20} className="text-white" />
              </div>
              <h3 className="text-[#011e2c] font-bold text-lg mb-3">Mission</h3>
              <p className="text-[#010608]/65 text-sm leading-relaxed">
                {s["about.mission"]}
              </p>
            </div>
          </div>
        </section>

        {/* Our Objectives */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Our Objectives
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-1">What We Set Out to Achieve</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ourObjectives.map((o) => (
                <div key={o} className="flex items-start gap-2.5 bg-[#f1f5f7] rounded-xl p-4 border border-[#e6edf0]">
                  <CheckCircle2 size={16} className="text-[#04415f] mt-0.5 shrink-0" />
                  <p className="text-[#010608]/70 text-sm leading-snug">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Messages from Leadership */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-1">Messages from Leadership</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mx-auto mt-3" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {leaders.map((l) => {
                const name = s[`leadership.${l.key}.name`];
                const message = s[`leadership.${l.key}.message`];
                return (
                  <div key={l.key} className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6 flex flex-col">
                    <Quote size={22} className="text-[#04415f]/30 mb-3" />
                    {message ? (
                      <p className="text-[#010608]/70 text-sm leading-relaxed flex-1 mb-4">{message}</p>
                    ) : (
                      <p className="text-[#010608]/40 text-sm italic flex-1 mb-4">Message coming soon.</p>
                    )}
                    <div className="flex items-center gap-3 border-t border-[#e6edf0] pt-4">
                      <div className="w-10 h-10 rounded-full bg-[#04415f]/8 flex items-center justify-center shrink-0">
                        <UserCircle2 size={20} className="text-[#04415f]/40" />
                      </div>
                      <div>
                        <p className="text-[#011e2c] font-bold text-sm">{name || "To be announced"}</p>
                        <p className="text-[#010608]/50 text-xs">{l.title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Anti-Ragging */}
        <section className="bg-[#04415f] py-14 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                  <AlertTriangle size={26} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-widest">Zero Tolerance</p>
                  <h2 className="text-white font-bold text-xl">Anti-Ragging Policy</h2>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1">
                This institution is committed to providing a ragging-free environment. Ragging is a criminal offence under Indian law. Students, parents, and staff are urged to report immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href={`tel:${s["antiragging.helpline"]?.replace(/-/g, "")}`}
                  className="flex items-center gap-2 bg-white text-[#04415f] font-bold text-sm px-5 py-3 rounded-lg hover:bg-[#e6edf0] transition-colors"
                >
                  <Phone size={14} />
                  {s["antiragging.helpline"] || "1800-180-5522"}
                </a>
                <a
                  href={s["antiragging.portalUrl"] || "https://antiragging.in"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/40 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Anti-Ragging Portal →
                </a>
              </div>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-white/8 rounded-xl p-4 flex items-center gap-3">
                <Mail size={16} className="text-white/60 shrink-0" />
                <div>
                  <p className="text-white/50 text-xs">Helpline Email</p>
                  <a href={`mailto:${s["antiragging.email"]}`} className="text-white text-sm font-medium hover:text-white/80 transition-colors">
                    {s["antiragging.email"] || "helpline@antiragging.in"}
                  </a>
                </div>
              </div>
              <div className="bg-white/8 rounded-xl p-4 flex items-center gap-3">
                <Users size={16} className="text-white/60 shrink-0" />
                <div>
                  <p className="text-white/50 text-xs">Reach Out</p>
                  <p className="text-white text-sm font-medium">Contact the admissions office directly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
