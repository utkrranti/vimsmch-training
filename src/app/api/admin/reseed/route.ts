import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// TEMPORARY, ONE-TIME-USE ROUTE. Reconciles production data with the corrected
// course catalogue and settings, since the production DATABASE_URL is a Sensitive
// Vercel env var that can't be read back to run the seed scripts locally.
// Delete this file after use.

const CERT_BY = "Dr. Vithalrao Vikhe Patil Foundation's Vocational Training Centre";
const ELIGIBILITY = "Passed Class 10 (SSC) from any recognised board";

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
        topics: ["Operation theatre protocols", "Sterilisation techniques", "Surgical instruments", "Patient preparation", "OT assistance", "Infection control"],
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
        topics: ["ECG recording", "Cardiac monitoring", "TMT assistance", "Holter monitoring", "Equipment maintenance", "Patient preparation"],
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
        topics: ["Hemodialysis procedures", "Dialysis machine handling", "Patient care", "Water treatment systems", "Infection prevention", "Emergency management"],
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
        topics: ["Clinical pathology", "Biochemistry", "Microbiology", "Haematology", "Sample collection", "Laboratory safety"],
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
        topics: ["X-Ray", "CT Scan", "MRI basics", "Patient positioning", "Radiation safety", "Imaging procedures"],
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

const settingsData = [
  {
    key: "about.mission",
    value:
      "Dr. Vithalrao Vikhe Patil Foundation's Vocational Training Centre offers affordable, quality, employment-oriented paramedical education through one-year certificate programmes with extensive hands-on clinical training at Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital, Ahilyanagar. Our mission is to bridge the gap between healthcare services and skilled human resources by preparing competent, compassionate healthcare personnel capable of supporting doctors, nurses, and other healthcare professionals in delivering quality patient care.",
  },
  { key: "about.established", value: "2026" },
  { key: "antiragging.helpline", value: "1800-180-5522" },
  { key: "antiragging.email", value: "helpline@antiragging.in" },
  { key: "antiragging.portalUrl", value: "https://antiragging.in" },
];

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-reseed-secret");
  if (!secret || secret !== process.env.RESEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const log: string[] = [];

  const keepSlugs = coursesData.map((c) => c.slug);
  const staleCourses = await prisma.course.findMany({ where: { slug: { notIn: keepSlugs } } });
  for (const s of staleCourses) {
    const [inquiryCount, enrollmentCount] = await Promise.all([
      prisma.inquiry.count({ where: { courseId: s.id } }),
      prisma.enrollment.count({ where: { courseId: s.id } }),
    ]);
    if (inquiryCount > 0 || enrollmentCount > 0) {
      await prisma.course.update({ where: { id: s.id }, data: { isActive: false } });
      log.push(`Deactivated "${s.title}" (${inquiryCount} inquiries / ${enrollmentCount} enrollments linked)`);
    } else {
      await prisma.course.delete({ where: { id: s.id } });
      log.push(`Removed outdated course: ${s.title}`);
    }
  }

  for (const c of coursesData) {
    const existing = await prisma.course.findUnique({ where: { slug: c.slug } });
    if (!existing) {
      await prisma.course.create({ data: c });
      log.push(`Created: ${c.title}`);
    } else {
      await prisma.course.update({ where: { slug: c.slug }, data: c });
      log.push(`Updated: ${c.title}`);
    }
  }

  const keepKeys = settingsData.map((s) => s.key);
  const staleSettings = await prisma.setting.findMany({ where: { key: { notIn: keepKeys } } });
  for (const s of staleSettings) {
    await prisma.setting.delete({ where: { id: s.id } });
    log.push(`Removed outdated setting: ${s.key}`);
  }
  for (const s of settingsData) {
    const existing = await prisma.setting.findUnique({ where: { key: s.key } });
    if (!existing) {
      await prisma.setting.create({ data: s });
      log.push(`Created setting: ${s.key}`);
    } else {
      await prisma.setting.update({ where: { key: s.key }, data: { value: s.value } });
      log.push(`Updated setting: ${s.key}`);
    }
  }

  return NextResponse.json({ success: true, log });
}
