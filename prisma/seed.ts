import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CERT_BY = "Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute";
const ELIGIBILITY = "10th Pass. Medically fit to undergo clinical training.";

const coursesData = [
  {
    slug: "operation-theatre-assistant",
    title: "Certificate Course in Operation Theatre Assistant",
    shortDesc:
      "A one-year, skill-oriented programme preparing students to assist Surgeons, Anaesthetists, and Nursing staff in operation theatres.",
    fullDesc:
      "The Certificate Course in Operation Theatre Assistant is a one-year, skill-oriented programme designed to prepare students for assisting Surgeons, Anaesthetists, and Nursing staff in operation theatres. The course combines classroom teaching with intensive practical training in modern operation theatres of Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital. Students acquire the knowledge, technical skills and professional attitude required to ensure the smooth functioning of operation theatres while maintaining the highest standards of patient safety, sterilization and infection control.",
    nsqf: 0,
    durationMonths: 12,
    durationHours: 1200,
    fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25,
    eligibility: ELIGIBILITY,
    ageLimit: "No age limit",
    certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: [
      "Develop skilled Operation Theatre Assistants",
      "Understand operation theatre protocols and procedures",
      "Learn sterilization and infection control practices",
      "Handle surgical instruments and equipment efficiently",
      "Assist surgeons during various surgical procedures",
      "Ensure patient safety before, during and after surgery",
    ],
    highlights: [
      "Comprehensive theoretical instruction",
      "Practical training in fully functional operation theatres",
      "Hands-on experience with modern surgical equipment",
      "Exposure to general and specialty surgeries",
      "Training under experienced surgeons, anaesthetists and nursing faculty",
    ],
    syllabus: [
      {
        unit: "Skills You Will Learn",
        topics: [
          "OT preparation",
          "Surgical instrument identification",
          "Sterilization techniques",
          "Infection prevention",
          "Patient positioning",
          "Surgical assistance",
          "Biomedical waste management",
          "Emergency preparedness",
        ],
      },
    ],
    clinicalPostings: [
      "Major Operation Theatre (General Surgery, Orthopaedic Surgery, Obstetric & Gynaecology Surgery)",
      "Minor Operation Theatre",
      "Emergency OT",
    ],
    outcomes: [
      "Operation Theatre Assistant",
      "Surgical Assistant",
      "OT Technician",
      "Hospital Surgical Support Staff",
    ],
    tags: ["OT preparation", "Surgical instruments", "Sterilization", "Infection prevention", "Surgical assistance"],
    category: "long-term",
    batchMonths: ["July"],
  },
  {
    slug: "ecg-technology",
    title: "Certificate Course in ECG Technology",
    shortDesc:
      "A one-year programme preparing students to perform electrocardiography and assist cardiologists in diagnosing cardiovascular diseases.",
    fullDesc:
      "The Certificate Course in ECG Technology prepares students to perform electrocardiography and assist cardiologists in diagnosing cardiovascular diseases. The programme provides comprehensive theoretical knowledge along with extensive practical exposure in cardiology departments.",
    nsqf: 0,
    durationMonths: 12,
    durationHours: 1200,
    fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25,
    eligibility: ELIGIBILITY,
    ageLimit: "No age limit",
    certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: [
      "Understand cardiac anatomy and physiology",
      "Perform ECG recording accurately",
      "Operate ECG machines safely",
      "Assist in cardiac diagnostic procedures",
      "Ensure patient comfort and safety",
    ],
    highlights: [
      "Practical ECG recording",
      "Treadmill Test (TMT) assistance",
      "Holter monitoring",
      "Cardiac monitoring",
      "Interpretation basics",
      "Clinical exposure",
    ],
    syllabus: [
      {
        unit: "Skills You Will Learn",
        topics: ["ECG recording", "Patient preparation", "Machine calibration", "Cardiac monitoring", "Equipment maintenance", "Documentation"],
      },
    ],
    clinicalPostings: ["Cardiology Department", "ICU", "CCU", "Emergency Department", "Medical Wards"],
    outcomes: ["ECG Technician", "Cardiac Diagnostic Assistant", "Cardiac Care Technician", "Hospital ECG Technologist"],
    tags: ["ECG recording", "Cardiac monitoring", "TMT assistance", "Holter monitoring", "Patient preparation"],
    category: "long-term",
    batchMonths: ["July"],
  },
  {
    slug: "dialysis-technician",
    title: "Certificate Course in Dialysis Technician",
    shortDesc:
      "A one-year programme developing competent Dialysis Technicians capable of assisting nephrologists in providing safe and effective dialysis treatment.",
    fullDesc:
      "This programme is designed to develop competent Dialysis Technicians capable of assisting nephrologists in providing safe and effective dialysis treatment to patients suffering from kidney disorders. Students receive intensive practical exposure in modern dialysis units under expert supervision.",
    nsqf: 0,
    durationMonths: 12,
    durationHours: 1200,
    fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25,
    eligibility: ELIGIBILITY,
    ageLimit: "No age limit",
    certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: [
      "Understand kidney diseases",
      "Operate dialysis machines",
      "Assist during haemodialysis procedures",
      "Maintain infection control",
      "Provide patient care before and after dialysis",
    ],
    highlights: [
      "Dialysis machine operation",
      "Patient assessment",
      "Water treatment systems",
      "Emergency management",
      "Infection prevention",
      "Practical dialysis sessions",
    ],
    syllabus: [
      {
        unit: "Skills You Will Learn",
        topics: ["Dialysis procedures", "Machine handling", "Vascular access care", "Patient monitoring", "Infection control", "Biomedical waste management"],
      },
    ],
    clinicalPostings: ["Dialysis Unit", "Nephrology Department", "ICU", "Emergency Department"],
    outcomes: ["Dialysis Technician", "Renal Care Assistant", "Dialysis Unit Technician", "Nephrology Support Staff"],
    tags: ["Dialysis machine operation", "Patient assessment", "Water treatment", "Infection prevention", "Vascular access care"],
    category: "long-term",
    batchMonths: ["July"],
  },
  {
    slug: "medical-laboratory-technology",
    title: "Certificate Course in Medical Laboratory Technology",
    shortDesc:
      "A one-year programme equipping students with the knowledge and practical skills required to perform laboratory tests accurately.",
    fullDesc:
      "Medical Laboratory Technologists play an indispensable role in modern healthcare by assisting clinicians in disease diagnosis through laboratory investigations. The course equips students with the knowledge and practical skills required to perform laboratory tests accurately while maintaining quality assurance and laboratory safety.",
    nsqf: 0,
    durationMonths: 12,
    durationHours: 1200,
    fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25,
    eligibility: ELIGIBILITY,
    ageLimit: "No age limit",
    certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: [
      "Understand laboratory sciences",
      "Perform routine laboratory investigations",
      "Operate laboratory equipment",
      "Maintain quality standards",
      "Ensure laboratory safety",
    ],
    highlights: [
      "Sample collection",
      "Clinical Pathology",
      "Haematology",
      "Biochemistry",
      "Microbiology",
      "Laboratory automation",
    ],
    syllabus: [
      {
        unit: "Skills You Will Learn",
        topics: ["Blood collection", "Laboratory testing", "Microscopy", "Instrument handling", "Sample processing", "Record maintenance"],
      },
    ],
    clinicalPostings: ["Clinical Laboratory", "Blood Bank", "Microbiology Laboratory", "Biochemistry Laboratory", "Pathology Department"],
    outcomes: ["Laboratory Technician", "Medical Laboratory Assistant", "Pathology Technician", "Diagnostic Laboratory Technologist"],
    tags: ["Blood collection", "Laboratory testing", "Microscopy", "Sample processing", "Instrument handling"],
    category: "long-term",
    batchMonths: ["July"],
  },
  {
    slug: "radiology-and-imaging-technology",
    title: "Certificate Course in Radiology and Imaging Technology",
    shortDesc:
      "A one-year programme preparing students to assist radiologists in performing diagnostic imaging procedures using modern imaging equipment.",
    fullDesc:
      "The Certificate Course in Radiology and Imaging Technology prepares students to assist radiologists in performing diagnostic imaging procedures using modern imaging equipment. Students receive practical training in radiography, patient positioning, radiation protection and imaging procedures.",
    nsqf: 0,
    durationMonths: 12,
    durationHours: 1200,
    fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25,
    eligibility: ELIGIBILITY,
    ageLimit: "No age limit",
    certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: [
      "Understand diagnostic imaging principles",
      "Operate radiographic equipment safely",
      "Assist radiologists",
      "Maintain radiation safety standards",
      "Ensure patient care during imaging procedures",
    ],
    highlights: [
      "Digital X-Ray",
      "CT Scan",
      "MRI Basics",
      "Contrast Studies",
      "Radiation Safety",
      "Patient Positioning",
    ],
    syllabus: [
      {
        unit: "Skills You Will Learn",
        topics: ["Radiographic positioning", "Imaging techniques", "Equipment handling", "Radiation protection", "Image processing", "Patient communication"],
      },
    ],
    clinicalPostings: ["Radiology Department", "Digital X-Ray Unit", "CT Scan Centre", "MRI Unit", "Emergency Imaging Services"],
    outcomes: ["Radiology Technician", "Imaging Technologist", "X-Ray Technician", "Diagnostic Imaging Assistant"],
    tags: ["Digital X-Ray", "CT Scan", "MRI Basics", "Radiation Safety", "Patient Positioning"],
    category: "long-term",
    batchMonths: ["July"],
  },
];

async function main() {
  console.log("Seeding courses...");

  // Older documents predate fields added in this schema revision (objectives,
  // highlights, clinicalPostings), which makes every typed Prisma read on this
  // collection fail JSON validation - including reads used just to check for
  // linked inquiries/enrollments. Use a raw command to inspect/clear safely first.
  const raw = (await prisma.$runCommandRaw({
    find: "courses",
    filter: {},
    projection: { _id: 1, slug: 1, title: 1 },
  })) as { cursor?: { firstBatch?: Array<{ _id: string; slug: string; title: string }> } };
  const existingDocs = raw.cursor?.firstBatch ?? [];

  for (const doc of existingDocs) {
    const [inquiryCount, enrollmentCount] = await Promise.all([
      prisma.inquiry.count({ where: { courseId: doc._id } }),
      prisma.enrollment.count({ where: { courseId: doc._id } }),
    ]);
    if (inquiryCount > 0 || enrollmentCount > 0) {
      console.log(`  ! "${doc.title}" has ${inquiryCount} inquiries / ${enrollmentCount} enrollments linked — leaving record in place, only updating if slug matches current catalogue.`);
      continue;
    }
    await prisma.$runCommandRaw({ delete: "courses", deletes: [{ q: { _id: doc._id }, limit: 1 }] });
    console.log(`  - Removed: ${doc.title}`);
  }

  for (const c of coursesData) {
    await prisma.course.create({ data: c });
    console.log(`  ✓ ${c.title}`);
  }

  console.log("\nSeed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
