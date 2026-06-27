import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const facultyData = [
  {
    name: "Dr. [Dean Name]",
    designation: "Dean & Head of Institution",
    bio: "Oversees all academic and vocational programmes at VIMSMCH. Leads the college's commitment to excellence in medical and paramedical education.",
    photoUrl: null,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: "Dr. [OT Faculty]",
    designation: "Programme Coordinator — Operation Theatre Techniques",
    bio: "Specialist in surgical sciences with over 15 years of clinical and teaching experience. Leads the OT Techniques certificate programme.",
    photoUrl: null,
    isActive: true,
    sortOrder: 2,
  },
  {
    name: "Dr. [Lab Faculty]",
    designation: "Programme Coordinator — Medical Laboratory Techniques",
    bio: "Qualified pathologist with extensive experience in clinical laboratory diagnostics. Heads the Diploma in Medical Laboratory Techniques.",
    photoUrl: null,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: "Dr. [Nursing Faculty]",
    designation: "Programme Coordinator — Healthcare Assistance & Nursing Aid",
    bio: "Senior nursing professional with expertise in patient care and clinical training. Leads both the Healthcare Assistance and Nursing Aid programmes.",
    photoUrl: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: "Mr. [Coding Faculty]",
    designation: "Programme Coordinator — Medical Coding & Billing",
    bio: "Certified medical coder with experience in ICD-10, CPT coding, and hospital information systems. Leads the Medical Coding & Billing programme.",
    photoUrl: null,
    isActive: true,
    sortOrder: 5,
  },
  {
    name: "Mr. [Pharmacy Faculty]",
    designation: "Programme Coordinator — Pharmacy Assistance",
    bio: "Licensed pharmacist with experience in retail and hospital pharmacy operations. Leads the Pharmacy Assistance certificate programme.",
    photoUrl: null,
    isActive: true,
    sortOrder: 6,
  },
];

async function main() {
  console.log("Seeding faculty...");
  for (const f of facultyData) {
    const existing = await prisma.faculty.findFirst({ where: { name: f.name } });
    if (!existing) {
      await prisma.faculty.create({ data: f });
      console.log(`  ✓ ${f.name}`);
    } else {
      console.log(`  ~ ${f.name} (skipped)`);
    }
  }
  console.log("\nFaculty seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
