import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CERT_BY = "Dr. Vithalrao Vikhe Patil Foundation's Vocational Training Centre";
const ELIGIBILITY = "Passed Class 10 (SSC) from any recognised board";

async function main() {
  console.log("Seeding courses...");

  const coursesData = [
    {
      slug: "operation-theatre-assistant",
      title: "Certificate Course in Operation Theatre Assistant",
      shortDesc:
        "A one-year certificate programme training students as Operation Theatre assistants — covering OT protocols, sterilisation, surgical instruments, and patient preparation.",
      fullDesc:
        "This one-year certificate programme prepares students to work as Operation Theatre (OT) assistants in hospitals and surgical centres. Students are trained in operation theatre protocols, sterilisation techniques, handling of surgical instruments, patient preparation, and infection control, with extensive hands-on clinical training inside the operation theatres of Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital.",
      nsqf: 0,
      durationMonths: 12,
      durationHours: 1200,
      fees: 30000,
      feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
      seats: 20,
      eligibility: ELIGIBILITY,
      ageLimit: "No age limit",
      certBy: CERT_BY,
      assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Vocational Training Centre.",
      creditEquivalence: "Not applicable",
      syllabus: [
        {
          unit: "What Students Learn",
          topics: [
            "Operation theatre protocols",
            "Sterilisation techniques",
            "Surgical instruments",
            "Patient preparation",
            "OT assistance",
            "Infection control",
          ],
        },
      ],
      outcomes: [
        "Assist in operation theatre setup and protocols",
        "Carry out sterilisation procedures correctly",
        "Handle and prepare surgical instruments",
        "Prepare patients for surgical procedures",
        "Maintain infection control standards in the OT",
      ],
      tags: ["Multispecialty Hospitals", "Surgical Centres", "Trauma Centres", "Day Care Surgery Units"],
      category: "long-term",
      batchMonths: ["July"],
    },
    {
      slug: "ecg-technology",
      title: "Certificate Course in ECG Technology",
      shortDesc:
        "A one-year certificate programme training students in ECG recording, cardiac monitoring, and related diagnostic support skills.",
      fullDesc:
        "This one-year certificate programme prepares students to work as ECG technicians in hospitals and diagnostic centres. Students are trained in ECG recording, cardiac monitoring, TMT assistance, Holter monitoring, and equipment maintenance, with hands-on clinical exposure at Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital.",
      nsqf: 0,
      durationMonths: 12,
      durationHours: 1200,
      fees: 30000,
      feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
      seats: 20,
      eligibility: ELIGIBILITY,
      ageLimit: "No age limit",
      certBy: CERT_BY,
      assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Vocational Training Centre.",
      creditEquivalence: "Not applicable",
      syllabus: [
        {
          unit: "Training Includes",
          topics: [
            "ECG recording",
            "Cardiac monitoring",
            "TMT assistance",
            "Holter monitoring",
            "Equipment maintenance",
            "Patient preparation",
          ],
        },
      ],
      outcomes: [
        "Record and process ECGs accurately",
        "Assist with cardiac monitoring procedures",
        "Support TMT and Holter monitoring sessions",
        "Maintain ECG equipment",
        "Prepare patients for cardiac diagnostic procedures",
      ],
      tags: ["Cardiology Departments", "Diagnostic Centres", "Hospitals", "Cardiac Clinics"],
      category: "long-term",
      batchMonths: ["July"],
    },
    {
      slug: "dialysis-technician",
      title: "Certificate Course in Dialysis Technician",
      shortDesc:
        "A one-year certificate programme training students in hemodialysis procedures, machine handling, and patient care for dialysis units.",
      fullDesc:
        "This one-year certificate programme prepares students to work as dialysis technicians in hospitals and dialysis units. Students are trained in hemodialysis procedures, dialysis machine handling, patient care, water treatment systems, infection prevention, and emergency management, with hands-on clinical training at Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital.",
      nsqf: 0,
      durationMonths: 12,
      durationHours: 1200,
      fees: 30000,
      feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
      seats: 20,
      eligibility: ELIGIBILITY,
      ageLimit: "No age limit",
      certBy: CERT_BY,
      assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Vocational Training Centre.",
      creditEquivalence: "Not applicable",
      syllabus: [
        {
          unit: "Training Includes",
          topics: [
            "Hemodialysis procedures",
            "Dialysis machine handling",
            "Patient care",
            "Water treatment systems",
            "Infection prevention",
            "Emergency management",
          ],
        },
      ],
      outcomes: [
        "Operate and handle dialysis machines safely",
        "Carry out hemodialysis procedures under supervision",
        "Provide patient care during dialysis sessions",
        "Follow infection prevention protocols",
        "Respond to dialysis-related emergencies",
      ],
      tags: ["Dialysis Units", "Kidney Hospitals", "Multispecialty Hospitals"],
      category: "long-term",
      batchMonths: ["July"],
    },
    {
      slug: "medical-laboratory-technology",
      title: "Certificate Course in Medical Laboratory Technology",
      shortDesc:
        "A one-year certificate programme training students in clinical pathology, biochemistry, microbiology, and haematology laboratory procedures.",
      fullDesc:
        "This one-year certificate programme prepares students to work as laboratory technicians in hospitals, diagnostic labs, and blood banks. Students are trained in clinical pathology, biochemistry, microbiology, haematology, sample collection, and laboratory safety, with hands-on training in the fully equipped laboratories of Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital.",
      nsqf: 0,
      durationMonths: 12,
      durationHours: 1200,
      fees: 30000,
      feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
      seats: 20,
      eligibility: ELIGIBILITY,
      ageLimit: "No age limit",
      certBy: CERT_BY,
      assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Vocational Training Centre.",
      creditEquivalence: "Not applicable",
      syllabus: [
        {
          unit: "Training Includes",
          topics: [
            "Clinical pathology",
            "Biochemistry",
            "Microbiology",
            "Haematology",
            "Sample collection",
            "Laboratory safety",
          ],
        },
      ],
      outcomes: [
        "Perform routine clinical laboratory investigations",
        "Handle biological samples safely",
        "Carry out biochemistry and haematology tests",
        "Follow microbiology testing procedures",
        "Maintain laboratory safety standards",
      ],
      tags: ["Diagnostic Laboratories", "Hospitals", "Blood Banks", "Research Laboratories"],
      category: "long-term",
      batchMonths: ["July"],
    },
    {
      slug: "radiology-and-imaging-technology",
      title: "Certificate Course in Radiology and Imaging Technology",
      shortDesc:
        "A one-year certificate programme training students in X-Ray, CT scan, and MRI-basics imaging procedures and patient positioning.",
      fullDesc:
        "This one-year certificate programme prepares students to work as radiology and imaging technicians in hospitals and diagnostic centres. Students are trained in X-Ray, CT scan, MRI basics, patient positioning, radiation safety, and imaging procedures, with hands-on clinical training in the radiology department of Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital.",
      nsqf: 0,
      durationMonths: 12,
      durationHours: 1200,
      fees: 30000,
      feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
      seats: 20,
      eligibility: ELIGIBILITY,
      ageLimit: "No age limit",
      certBy: CERT_BY,
      assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Vocational Training Centre.",
      creditEquivalence: "Not applicable",
      syllabus: [
        {
          unit: "Training Includes",
          topics: [
            "X-Ray",
            "CT Scan",
            "MRI basics",
            "Patient positioning",
            "Radiation safety",
            "Imaging procedures",
          ],
        },
      ],
      outcomes: [
        "Assist with X-Ray, CT, and MRI imaging procedures",
        "Position patients correctly for imaging",
        "Follow radiation safety protocols",
        "Support radiology department workflows",
        "Maintain imaging equipment and records",
      ],
      tags: ["Radiology Departments", "Imaging Centres", "Diagnostic Hospitals"],
      category: "long-term",
      batchMonths: ["July"],
    },
  ];

  const keepSlugs = coursesData.map((c) => c.slug);

  // Remove any previously seeded courses that are not part of the current 5-course catalogue.
  const stale = await prisma.course.findMany({ where: { slug: { notIn: keepSlugs } } });
  for (const s of stale) {
    const [inquiryCount, enrollmentCount] = await Promise.all([
      prisma.inquiry.count({ where: { courseId: s.id } }),
      prisma.enrollment.count({ where: { courseId: s.id } }),
    ]);
    if (inquiryCount > 0 || enrollmentCount > 0) {
      console.log(`  ! Skipping delete of "${s.title}" — has ${inquiryCount} inquiries / ${enrollmentCount} enrollments linked. Deactivating instead.`);
      await prisma.course.update({ where: { id: s.id }, data: { isActive: false } });
    } else {
      await prisma.course.delete({ where: { id: s.id } });
      console.log(`  - Removed outdated course: ${s.title}`);
    }
  }

  for (const c of coursesData) {
    const existing = await prisma.course.findUnique({ where: { slug: c.slug } });
    if (!existing) {
      await prisma.course.create({ data: c });
      console.log(`  ✓ ${c.title}`);
    } else {
      await prisma.course.update({ where: { slug: c.slug }, data: c });
      console.log(`  ~ ${c.title} (updated)`);
    }
  }

  console.log("\nSeed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
