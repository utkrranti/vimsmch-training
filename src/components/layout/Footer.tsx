import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Globe, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "All Courses" },
  { href: "/admission", label: "Admission & How to Apply" },
  { href: "/about", label: "About Us" },
  { href: "/faculty", label: "Faculty" },
  { href: "/facilities", label: "Facilities" },
  { href: "/placements", label: "Placements & Outcomes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News & Notices" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/verify", label: "Verify Certificate" },
];

const courses = [
  "Operation Theatre Assistant",
  "ECG Technology",
  "Dialysis Technician",
  "Medical Laboratory Technology",
  "Radiology and Imaging Technology",
];

export default function Footer() {
  return (
    <footer
      className="relative mt-auto text-white overflow-hidden"
      style={{ background: "linear-gradient(180deg, #011e2c 0%, #04415f 100%)" }}
    >
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #04415f, #2086b8, #7dd3fc, #2086b8, #04415f)" }} />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[26rem] h-[26rem] rounded-full bg-[#2086b8]/10 blur-[100px]" />
      <div className="absolute inset-0 bg-dot-grid opacity-[0.04] text-white" />

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Col 1 — About */}
        <div>
          <div className="inline-block bg-white rounded-xl p-2.5 mb-6 shadow-lg">
            <Image src="/logo.png" alt="VIMSMCH" width={220} height={47} className="h-10 w-auto" />
          </div>
          <p className="text-white/55 text-sm leading-relaxed mb-6">
            Paramedical Institute of Dr. Vithalrao Vikhe Patil Foundation&apos;s Medical
            College &amp; Hospital — one-year certificate courses in paramedical skills with
            hands-on hospital training.
          </p>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-[#7dd3fc] mt-0.5 shrink-0" />
              <span>Opp. Govt. Milk Dairy, Post – M.I.D.C., Vadgaon Gupta, Ahilyanagar – 414 111</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={14} className="text-[#7dd3fc] mt-0.5 shrink-0" />
              <span>
                <a href="tel:18001234858" className="text-white/65 hover:text-white transition-colors">1800 123 4858</a>
                <span className="text-white/30">{" | "}</span>
                <a href="tel:+912412778042" className="text-white/65 hover:text-white transition-colors">+91 241-2778042</a>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-[#7dd3fc] shrink-0" />
              <a href="mailto:dean@vimsmch.edu.in" className="text-white/65 hover:text-white transition-colors">
                dean@vimsmch.edu.in
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe size={14} className="text-[#7dd3fc] shrink-0" />
              <a href="https://vimsmch.edu.in" target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white transition-colors">
                vimsmch.edu.in
              </a>
            </li>
          </ul>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 className="text-white/40 font-semibold text-[11px] uppercase tracking-[0.16em] mb-5">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group inline-flex items-center gap-1.5 text-white/65 hover:text-white text-sm transition-colors">
                  {l.label}
                  <ArrowUpRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Courses */}
        <div>
          <h4 className="text-white/40 font-semibold text-[11px] uppercase tracking-[0.16em] mb-5">Our Courses</h4>
          <ul className="space-y-2.5">
            {courses.map((c) => (
              <li key={c}>
                <Link href="/courses" className="group inline-flex items-center gap-1.5 text-white/65 hover:text-white text-sm transition-colors">
                  {c}
                  <ArrowUpRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Admissions */}
        <div>
          <h4 className="text-white/40 font-semibold text-[11px] uppercase tracking-[0.16em] mb-5">Admissions</h4>
          <ul className="space-y-4">
            <li>
              <span className="block text-[11px] text-white/35 mb-1 uppercase tracking-wide">Eligibility</span>
              <span className="text-sm text-white/80">10th Pass (SSC), no age limit</span>
            </li>
            <li>
              <span className="block text-[11px] text-white/35 mb-1 uppercase tracking-wide">Fee</span>
              <span className="text-sm text-white/80">₹30,000/year (provisional)</span>
            </li>
            <li className="pt-1">
              <a href="https://antiragging.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[#7dd3fc] hover:text-white transition-colors font-medium">
                Anti-Ragging Portal <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Anti-ragging bar */}
      <div className="relative border-t border-white/10 py-3 px-4 bg-black/15">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-center">
          <span className="font-bold text-[#7dd3fc]">ANTI-RAGGING NOTICE:</span>
          <span className="text-white/60">
            This institution is committed to being ragging-free. Report any incident to:
          </span>
          <a href="tel:18001805522" className="font-bold text-white hover:text-[#7dd3fc] transition-colors">
            1800-180-5522
          </a>
          <span className="text-white/25">|</span>
          <a href="https://antiragging.in" target="_blank" rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors">
            www.antiragging.in
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} Dr. Vithalrao Vikhe Patil Foundation&apos;s. All Rights Reserved.
          </span>
          <span>
            Designed by{" "}
            <a href="https://utkrranti.com" target="_blank" rel="noopener noreferrer"
              className="font-semibold text-white/70 hover:text-white transition-colors">
              UT<span className="text-red-400">K</span>RRANTI
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
