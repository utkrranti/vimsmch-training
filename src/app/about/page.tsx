import { Fragment } from "react";
import UGCTopBar from "@/components/layout/UGCTopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/lib/db/settings";
import { Shield, Award, BookOpen, Users, Phone, Mail, FileText, AlertTriangle, Scale, Info } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | VIMSMCH Vocational Training",
  description:
    "Learn about VIMSMCH Vocational Training Division — UGC recognised, NSQF-aligned healthcare skill programmes. Mandatory disclosures, grievance, ICC, and RTI information.",
};

export default async function AboutPage() {
  const s = await getSettings([
    "about.mission", "about.established", "about.naac",
    "about.ugc2f", "about.ugc12b", "about.affiliation", "about.nsqf",
    "grievance.officerName", "grievance.officerDesignation",
    "grievance.officerEmail", "grievance.officerPhone", "grievance.portalUrl",
    "icc.chairpersonName", "icc.chairpersonDesignation",
    "icc.chairpersonEmail", "icc.description",
    "rti.pioName", "rti.pioDesignation", "rti.pioEmail",
    "rti.firstAppealOfficerName", "rti.firstAppealOfficerDesignation",
    "antiragging.helpline", "antiragging.email",
    "antiragging.portalUrl", "antiragging.committeeChairperson",
  ]);

  const recognitionCards = [
    { icon: Award, label: "UGC 2(f)", value: "Recognised", sub: "Entitled to receive central govt. grants" },
    { icon: Award, label: "UGC 12(B)", value: "Recognised", sub: "Eligible for UGC grants & schemes" },
    { icon: Shield, label: "NAAC", value: s["about.naac"] || "—", sub: "National Assessment & Accreditation Council" },
    { icon: BookOpen, label: "NSQF Aligned", value: s["about.nsqf"] || "Level 3–6", sub: "National Skills Qualifications Framework" },
    { icon: Users, label: "Affiliation", value: "MUHS Nashik", sub: s["about.affiliation"] || "" },
    { icon: Info, label: "Established", value: s["about.established"] || "—", sub: "Years of healthcare education excellence" },
  ];

  const mandatoryDisclosure = [
    { section: "About Us", items: ["Overview", "Act / Memorandum of Association", "Affiliating University", "Accreditation", "Recognition / Approval", "Annual Reports"] },
    { section: "Administration", items: ["Dean", "Grievance Officer", "Ombudsperson", "Internal Complaint Committee"] },
    { section: "Academics", items: ["Academic Programs", "Academic Calendar", "Departments", "IQAC"] },
    { section: "Admissions & Fee", items: ["Prospectus", "Admission Process", "Fee Refund Policy"] },
    { section: "Student Life", items: ["Anti-Ragging", "Internal Complaint", "NSS", "Equal Opportunity"] },
    { section: "Information Corner", items: ["RTI", "Circulars / Notices", "Newsletters", "Events"] },
  ];

  return (
    <>
      <UGCTopBar />
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-2">Home / About Us</p>
            <h1 className="text-3xl font-bold text-[#011e2c] mb-1">About Us</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

        {/* Mission */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                Vocational Training Division
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
              {recognitionCards.map((c) => (
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

        {/* UGC Mandatory Disclosure */}
        <section id="disclosure" className="bg-[#f1f5f7] py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                UGC Public Self Disclosure
              </span>
              <h2 className="text-2xl font-bold text-[#011e2c] mb-1">Mandatory Disclosure</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mb-3" />
              <p className="text-[#010608]/55 text-sm">
                Disclosed as per UGC (Mandatory Disclosure by Higher Educational Institutions) Regulations — for full institutional disclosures, refer to the parent college website.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e6edf0] overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#04415f] text-white">
                    <th className="px-5 py-3.5 text-left font-semibold w-8">S.No</th>
                    <th className="px-5 py-3.5 text-left font-semibold">Particulars</th>
                    <th className="px-5 py-3.5 text-center font-semibold w-28">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    let sno = 0;
                    return mandatoryDisclosure.map((section) => (
                      <Fragment key={section.section}>
                        <tr className="bg-[#04415f]/8">
                          <td colSpan={3} className="px-5 py-2.5 font-bold text-[#04415f] text-xs uppercase tracking-wide">
                            {section.section}
                          </td>
                        </tr>
                        {section.items.map((item, i) => {
                          sno++;
                          return (
                            <tr key={item} className={`border-b border-[#e6edf0] ${i % 2 === 0 ? "bg-white" : "bg-[#f1f5f7]"}`}>
                              <td className="px-5 py-3 text-[#010608]/40 text-xs text-center">{sno}</td>
                              <td className="px-5 py-3 text-[#010608]/70">{item}</td>
                              <td className="px-5 py-3 text-center">
                                <a
                                  href="https://vimsmch.edu.in"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#04415f] hover:text-[#2086b8] font-medium transition-colors"
                                >
                                  View →
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </Fragment>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Compliance section — 3 columns */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#e6edf0]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Statutory Compliance
              </span>
              <h2 className="text-2xl font-bold text-[#011e2c] mb-1">Grievance, ICC &amp; RTI</h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-7">

              {/* Grievance */}
              <div className="bg-[#f1f5f7] rounded-2xl border border-[#e6edf0] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#04415f] rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#010608]/40 text-xs uppercase tracking-wide">Grievance Redressal</p>
                    <h3 className="text-[#011e2c] font-bold text-sm">Officer Details</h3>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5">Name</p>
                    <p className="text-[#011e2c] font-semibold">{s["grievance.officerName"]}</p>
                  </div>
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5">Designation</p>
                    <p className="text-[#010608]/70">{s["grievance.officerDesignation"]}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-[#04415f] shrink-0" />
                    <a href={`mailto:${s["grievance.officerEmail"]}`} className="text-[#04415f] hover:text-[#2086b8] transition-colors text-xs">
                      {s["grievance.officerEmail"]}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-[#04415f] shrink-0" />
                    <a href={`tel:${s["grievance.officerPhone"]}`} className="text-[#04415f] hover:text-[#2086b8] transition-colors text-xs">
                      {s["grievance.officerPhone"]}
                    </a>
                  </div>
                </div>
                <a
                  href={s["grievance.portalUrl"] || "https://vimsmch.edu.in/online_grievance"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block w-full text-center bg-[#04415f] hover:bg-[#011e2c] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
                >
                  File Online Grievance →
                </a>
              </div>

              {/* ICC */}
              <div className="bg-[#f1f5f7] rounded-2xl border border-[#e6edf0] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#04415f] rounded-xl flex items-center justify-center shrink-0">
                    <Scale size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#010608]/40 text-xs uppercase tracking-wide">POSH Act 2013</p>
                    <h3 className="text-[#011e2c] font-bold text-sm">Internal Complaint Committee</h3>
                  </div>
                </div>
                <p className="text-[#010608]/60 text-xs leading-relaxed mb-4">
                  {s["icc.description"]}
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5">Chairperson</p>
                    <p className="text-[#011e2c] font-semibold">{s["icc.chairpersonName"]}</p>
                    <p className="text-[#010608]/55 text-xs">{s["icc.chairpersonDesignation"]}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-[#04415f] shrink-0" />
                    <a href={`mailto:${s["icc.chairpersonEmail"]}`} className="text-[#04415f] hover:text-[#2086b8] transition-colors text-xs">
                      {s["icc.chairpersonEmail"]}
                    </a>
                  </div>
                </div>
              </div>

              {/* RTI */}
              <div className="bg-[#f1f5f7] rounded-2xl border border-[#e6edf0] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#04415f] rounded-xl flex items-center justify-center shrink-0">
                    <Info size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#010608]/40 text-xs uppercase tracking-wide">RTI Act 2005</p>
                    <h3 className="text-[#011e2c] font-bold text-sm">Public Information Officer</h3>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5">Public Information Officer</p>
                    <p className="text-[#011e2c] font-semibold">{s["rti.pioName"]}</p>
                    <p className="text-[#010608]/55 text-xs">{s["rti.pioDesignation"]}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Mail size={12} className="text-[#04415f] shrink-0" />
                      <a href={`mailto:${s["rti.pioEmail"]}`} className="text-[#04415f] hover:text-[#2086b8] transition-colors text-xs">
                        {s["rti.pioEmail"]}
                      </a>
                    </div>
                  </div>
                  <div className="border-t border-[#e6edf0] pt-4">
                    <p className="text-[#010608]/40 text-xs mb-0.5">First Appellate Authority</p>
                    <p className="text-[#011e2c] font-semibold">{s["rti.firstAppealOfficerName"]}</p>
                    <p className="text-[#010608]/55 text-xs">{s["rti.firstAppealOfficerDesignation"]}</p>
                  </div>
                </div>
              </div>

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
                This institution is committed to providing a ragging-free environment. Any act of ragging is a criminal offence under UGC Regulations. Students, parents, and staff are urged to report immediately.
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
                  <p className="text-white/50 text-xs">Anti-Ragging Committee Chairperson</p>
                  <p className="text-white text-sm font-medium">{s["antiragging.committeeChairperson"]}</p>
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
