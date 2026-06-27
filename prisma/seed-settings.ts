import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const settings = [
  // About — mission
  { key: "about.mission", value: "The Vocational Training Division of Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital offers UGC-recognised, NSQF-aligned skill programmes in healthcare and allied sciences. Our mission is to bridge the gap between academic learning and employable skills — equipping students with hands-on competencies for immediate entry into the healthcare workforce." },
  { key: "about.established", value: "2010" },
  { key: "about.naac", value: "A+" },
  { key: "about.ugc2f", value: "Yes" },
  { key: "about.ugc12b", value: "Yes" },
  { key: "about.affiliation", value: "Maharashtra University of Health Sciences (MUHS), Nashik" },
  { key: "about.nsqf", value: "NSQF Level 3–6" },

  // Grievance
  { key: "grievance.officerName", value: "Dr. [Name]" },
  { key: "grievance.officerDesignation", value: "Grievance Redressal Officer" },
  { key: "grievance.officerEmail", value: "grievance@vimsmch.edu.in" },
  { key: "grievance.officerPhone", value: "+91 241-2778042" },
  { key: "grievance.portalUrl", value: "https://vimsmch.edu.in/online_grievance" },

  // ICC — POSH Act
  { key: "icc.chairpersonName", value: "Dr. [Name]" },
  { key: "icc.chairpersonDesignation", value: "Chairperson, Internal Complaints Committee" },
  { key: "icc.chairpersonEmail", value: "icc@vimsmch.edu.in" },
  { key: "icc.description", value: "The Internal Complaints Committee (ICC) has been constituted as per the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act). The committee ensures a safe, respectful environment for all students, staff, and faculty." },

  // RTI
  { key: "rti.pioName", value: "Dr. [Name]" },
  { key: "rti.pioDesignation", value: "Public Information Officer" },
  { key: "rti.pioEmail", value: "rti@vimsmch.edu.in" },
  { key: "rti.firstAppealOfficerName", value: "Dr. [Name]" },
  { key: "rti.firstAppealOfficerDesignation", value: "First Appellate Authority" },

  // Anti-Ragging
  { key: "antiragging.helpline", value: "1800-180-5522" },
  { key: "antiragging.email", value: "helpline@antiragging.in" },
  { key: "antiragging.portalUrl", value: "https://antiragging.in" },
  { key: "antiragging.committeeChairperson", value: "Dr. [Name]" },
];

async function main() {
  console.log("Seeding settings...");
  for (const s of settings) {
    const existing = await prisma.setting.findUnique({ where: { key: s.key } });
    if (!existing) {
      await prisma.setting.create({ data: s });
      console.log(`  ✓ ${s.key}`);
    } else {
      console.log(`  ~ ${s.key} (skipped)`);
    }
  }
  console.log("\nSettings seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
