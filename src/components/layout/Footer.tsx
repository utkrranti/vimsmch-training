import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "All Courses" },
  { href: "/admission", label: "Admission & How to Apply" },
  { href: "/about", label: "About Us" },
  { href: "/faculty", label: "Faculty" },
  { href: "/facilities", label: "Facilities" },
  { href: "/placements", label: "Placements & Outcomes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/verify", label: "Verify Certificate" },
];

const courses = [
  "Operation Theatre Techniques",
  "Medical Lab Techniques",
  "Healthcare Assistant",
  "Medical Coding & Billing",
  "Pharmacy Assistant",
  "Nursing Aid",
];

export default function Footer() {
  return (
    <footer className="bg-[#f1f5f7] border-t border-[#cdd8de] mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1 — About */}
        <div>
          <div className="bg-[#04415f] inline-block rounded px-2 py-1 mb-5">
            <Image src="/logo.png" alt="VIMSMCH" width={140} height={30} className="h-8 w-auto" />
          </div>
          <p className="text-[#010608]/70 text-sm leading-relaxed mb-5">
            Vocational Training Division of Dr. Vithalrao Vikhe Patil Foundation&apos;s Medical
            College &amp; Hospital — offering UGC recognised, NSQF-aligned skill programmes in
            healthcare and allied sciences.
          </p>
          <ul className="space-y-2 text-sm text-[#010608]/65">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-[#04415f] mt-0.5 shrink-0" />
              <span>Opp. Govt. Milk Dairy, Post – M.I.D.C., Vadgaon Gupta, Ahilyanagar – 414 111</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={14} className="text-[#04415f] mt-0.5 shrink-0" />
              <span>
                <a href="tel:18001234858" className="hover:text-[#04415f] transition-colors">1800 123 4858</a>
                {" | "}
                <a href="tel:+912412778042" className="hover:text-[#04415f] transition-colors">+91 241-2778042</a>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-[#04415f] shrink-0" />
              <a href="mailto:dean@vimsmch.edu.in" className="hover:text-[#04415f] transition-colors">
                dean@vimsmch.edu.in
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={14} className="text-[#04415f] shrink-0" />
              <a href="https://vimsmch.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#04415f] transition-colors">
                vimsmch.edu.in
              </a>
            </li>
          </ul>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 className="text-[#011e2c] font-bold text-base mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#04415f] rounded-full shrink-0" />
                <Link href={l.href} className="text-[#010608]/70 hover:text-[#04415f] text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Courses */}
        <div>
          <h4 className="text-[#011e2c] font-bold text-base mb-4">Our Courses</h4>
          <ul className="space-y-2.5">
            {courses.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#04415f] rounded-full shrink-0" />
                <Link href="/courses" className="text-[#010608]/70 hover:text-[#04415f] text-sm transition-colors">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Compliance */}
        <div>
          <h4 className="text-[#011e2c] font-bold text-base mb-4">Compliance &amp; Legal</h4>
          <ul className="space-y-3">
            <li>
              <span className="block text-xs text-[#010608]/50 mb-0.5 uppercase tracking-wide">Grievance Officer</span>
              <span className="text-sm text-[#010608]/80 font-medium">[Officer Name]</span>
              <a href="mailto:grievance@vimsmch.edu.in" className="block text-xs text-[#04415f] hover:text-[#2086b8] transition-colors">
                grievance@vimsmch.edu.in
              </a>
            </li>
            <li>
              <span className="block text-xs text-[#010608]/50 mb-0.5 uppercase tracking-wide">ICC — POSH Act</span>
              <span className="text-sm text-[#010608]/80">[ICC Chairperson Name]</span>
            </li>
            <li>
              <span className="block text-xs text-[#010608]/50 mb-0.5 uppercase tracking-wide">RTI — Public Info Officer</span>
              <span className="text-sm text-[#010608]/80">[PIO Name]</span>
            </li>
            <li className="pt-1 flex flex-col gap-1.5">
              <a href="https://antiragging.in" target="_blank" rel="noopener noreferrer"
                className="text-sm text-[#04415f] hover:text-[#2086b8] transition-colors font-medium">
                Anti-Ragging Portal →
              </a>
              <Link href="/about#disclosure" className="text-sm text-[#04415f] hover:text-[#2086b8] transition-colors">
                Mandatory Disclosure →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Anti-ragging bar */}
      <div className="bg-[#04415f] border-t-2 border-[#2086b8] py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-center text-white">
          <span className="font-bold text-[#2086b8]">ANTI-RAGGING NOTICE:</span>
          <span className="opacity-80">
            This institution is committed to being ragging-free. Report any incident to:
          </span>
          <a href="tel:18001805522" className="font-bold hover:text-[#2086b8] transition-colors">
            1800-180-5522
          </a>
          <span className="opacity-40">|</span>
          <a href="https://antiragging.in" target="_blank" rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity">
            www.antiragging.in
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#cdd8de] py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-[#010608]/50">
          <span>
            © {new Date().getFullYear()} Dr. Vithalrao Vikhe Patil Foundation&apos;s. All Rights Reserved.
          </span>
          <span>
            Designed by{" "}
            <a href="https://utkrranti.com" target="_blank" rel="noopener noreferrer"
              className="font-semibold text-[#04415f] hover:text-[#2086b8] transition-colors">
              UT<span className="text-red-500">K</span>RRANTI
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
