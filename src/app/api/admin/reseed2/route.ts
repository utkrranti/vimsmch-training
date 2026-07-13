import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// TEMPORARY, ONE-TIME-USE ROUTE. Reconciles production data with the
// draft-aligned course content and institute rename, since production
// DATABASE_URL is a Sensitive Vercel env var that can't be read back to
// run the seed scripts locally. Delete this file after use.

const CERT_BY = "Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute";
const ELIGIBILITY = "10th Pass. Medically fit to undergo clinical training.";

const coursesData = [
  {
    slug: "operation-theatre-assistant",
    title: "Certificate Course in Operation Theatre Assistant",
    shortDesc: "A one-year, skill-oriented programme preparing students to assist Surgeons, Anaesthetists, and Nursing staff in operation theatres.",
    fullDesc: "The Certificate Course in Operation Theatre Assistant is a one-year, skill-oriented programme designed to prepare students for assisting Surgeons, Anaesthetists, and Nursing staff in operation theatres. The course combines classroom teaching with intensive practical training in modern operation theatres of Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital. Students acquire the knowledge, technical skills and professional attitude required to ensure the smooth functioning of operation theatres while maintaining the highest standards of patient safety, sterilization and infection control.",
    nsqf: 0, durationMonths: 12, durationHours: 1200, fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25, eligibility: ELIGIBILITY, ageLimit: "No age limit", certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: ["Develop skilled Operation Theatre Assistants", "Understand operation theatre protocols and procedures", "Learn sterilization and infection control practices", "Handle surgical instruments and equipment efficiently", "Assist surgeons during various surgical procedures", "Ensure patient safety before, during and after surgery"],
    highlights: ["Comprehensive theoretical instruction", "Practical training in fully functional operation theatres", "Hands-on experience with modern surgical equipment", "Exposure to general and specialty surgeries", "Training under experienced surgeons, anaesthetists and nursing faculty"],
    syllabus: [{ unit: "Skills You Will Learn", topics: ["OT preparation", "Surgical instrument identification", "Sterilization techniques", "Infection prevention", "Patient positioning", "Surgical assistance", "Biomedical waste management", "Emergency preparedness"] }],
    clinicalPostings: ["Major Operation Theatre (General Surgery, Orthopaedic Surgery, Obstetric & Gynaecology Surgery)", "Minor Operation Theatre", "Emergency OT"],
    outcomes: ["Operation Theatre Assistant", "Surgical Assistant", "OT Technician", "Hospital Surgical Support Staff"],
    tags: ["OT preparation", "Surgical instruments", "Sterilization", "Infection prevention", "Surgical assistance"],
    category: "long-term", batchMonths: ["July"],
  },
  {
    slug: "ecg-technology",
    title: "Certificate Course in ECG Technology",
    shortDesc: "A one-year programme preparing students to perform electrocardiography and assist cardiologists in diagnosing cardiovascular diseases.",
    fullDesc: "The Certificate Course in ECG Technology prepares students to perform electrocardiography and assist cardiologists in diagnosing cardiovascular diseases. The programme provides comprehensive theoretical knowledge along with extensive practical exposure in cardiology departments.",
    nsqf: 0, durationMonths: 12, durationHours: 1200, fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25, eligibility: ELIGIBILITY, ageLimit: "No age limit", certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: ["Understand cardiac anatomy and physiology", "Perform ECG recording accurately", "Operate ECG machines safely", "Assist in cardiac diagnostic procedures", "Ensure patient comfort and safety"],
    highlights: ["Practical ECG recording", "Treadmill Test (TMT) assistance", "Holter monitoring", "Cardiac monitoring", "Interpretation basics", "Clinical exposure"],
    syllabus: [{ unit: "Skills You Will Learn", topics: ["ECG recording", "Patient preparation", "Machine calibration", "Cardiac monitoring", "Equipment maintenance", "Documentation"] }],
    clinicalPostings: ["Cardiology Department", "ICU", "CCU", "Emergency Department", "Medical Wards"],
    outcomes: ["ECG Technician", "Cardiac Diagnostic Assistant", "Cardiac Care Technician", "Hospital ECG Technologist"],
    tags: ["ECG recording", "Cardiac monitoring", "TMT assistance", "Holter monitoring", "Patient preparation"],
    category: "long-term", batchMonths: ["July"],
  },
  {
    slug: "dialysis-technician",
    title: "Certificate Course in Dialysis Technician",
    shortDesc: "A one-year programme developing competent Dialysis Technicians capable of assisting nephrologists in providing safe and effective dialysis treatment.",
    fullDesc: "This programme is designed to develop competent Dialysis Technicians capable of assisting nephrologists in providing safe and effective dialysis treatment to patients suffering from kidney disorders. Students receive intensive practical exposure in modern dialysis units under expert supervision.",
    nsqf: 0, durationMonths: 12, durationHours: 1200, fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25, eligibility: ELIGIBILITY, ageLimit: "No age limit", certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: ["Understand kidney diseases", "Operate dialysis machines", "Assist during haemodialysis procedures", "Maintain infection control", "Provide patient care before and after dialysis"],
    highlights: ["Dialysis machine operation", "Patient assessment", "Water treatment systems", "Emergency management", "Infection prevention", "Practical dialysis sessions"],
    syllabus: [{ unit: "Skills You Will Learn", topics: ["Dialysis procedures", "Machine handling", "Vascular access care", "Patient monitoring", "Infection control", "Biomedical waste management"] }],
    clinicalPostings: ["Dialysis Unit", "Nephrology Department", "ICU", "Emergency Department"],
    outcomes: ["Dialysis Technician", "Renal Care Assistant", "Dialysis Unit Technician", "Nephrology Support Staff"],
    tags: ["Dialysis machine operation", "Patient assessment", "Water treatment", "Infection prevention", "Vascular access care"],
    category: "long-term", batchMonths: ["July"],
  },
  {
    slug: "medical-laboratory-technology",
    title: "Certificate Course in Medical Laboratory Technology",
    shortDesc: "A one-year programme equipping students with the knowledge and practical skills required to perform laboratory tests accurately.",
    fullDesc: "Medical Laboratory Technologists play an indispensable role in modern healthcare by assisting clinicians in disease diagnosis through laboratory investigations. The course equips students with the knowledge and practical skills required to perform laboratory tests accurately while maintaining quality assurance and laboratory safety.",
    nsqf: 0, durationMonths: 12, durationHours: 1200, fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25, eligibility: ELIGIBILITY, ageLimit: "No age limit", certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: ["Understand laboratory sciences", "Perform routine laboratory investigations", "Operate laboratory equipment", "Maintain quality standards", "Ensure laboratory safety"],
    highlights: ["Sample collection", "Clinical Pathology", "Haematology", "Biochemistry", "Microbiology", "Laboratory automation"],
    syllabus: [{ unit: "Skills You Will Learn", topics: ["Blood collection", "Laboratory testing", "Microscopy", "Instrument handling", "Sample processing", "Record maintenance"] }],
    clinicalPostings: ["Clinical Laboratory", "Blood Bank", "Microbiology Laboratory", "Biochemistry Laboratory", "Pathology Department"],
    outcomes: ["Laboratory Technician", "Medical Laboratory Assistant", "Pathology Technician", "Diagnostic Laboratory Technologist"],
    tags: ["Blood collection", "Laboratory testing", "Microscopy", "Sample processing", "Instrument handling"],
    category: "long-term", batchMonths: ["July"],
  },
  {
    slug: "radiology-and-imaging-technology",
    title: "Certificate Course in Radiology and Imaging Technology",
    shortDesc: "A one-year programme preparing students to assist radiologists in performing diagnostic imaging procedures using modern imaging equipment.",
    fullDesc: "The Certificate Course in Radiology and Imaging Technology prepares students to assist radiologists in performing diagnostic imaging procedures using modern imaging equipment. Students receive practical training in radiography, patient positioning, radiation protection and imaging procedures.",
    nsqf: 0, durationMonths: 12, durationHours: 1200, fees: 30000,
    feeBreakdown: [{ label: "Course Fee (Provisional — subject to approval)", amount: 30000 }],
    seats: 25, eligibility: ELIGIBILITY, ageLimit: "No age limit", certBy: CERT_BY,
    assessmentScheme: "Theory + Practical + Clinical Training, assessed internally by the Institute.",
    creditEquivalence: "Not applicable",
    objectives: ["Understand diagnostic imaging principles", "Operate radiographic equipment safely", "Assist radiologists", "Maintain radiation safety standards", "Ensure patient care during imaging procedures"],
    highlights: ["Digital X-Ray", "CT Scan", "MRI Basics", "Contrast Studies", "Radiation Safety", "Patient Positioning"],
    syllabus: [{ unit: "Skills You Will Learn", topics: ["Radiographic positioning", "Imaging techniques", "Equipment handling", "Radiation protection", "Image processing", "Patient communication"] }],
    clinicalPostings: ["Radiology Department", "Digital X-Ray Unit", "CT Scan Centre", "MRI Unit", "Emergency Imaging Services"],
    outcomes: ["Radiology Technician", "Imaging Technologist", "X-Ray Technician", "Diagnostic Imaging Assistant"],
    tags: ["Digital X-Ray", "CT Scan", "MRI Basics", "Radiation Safety", "Patient Positioning"],
    category: "long-term", batchMonths: ["July"],
  },
];

const settingsData = [
  {
    key: "about.mission",
    value:
      "Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute offers affordable, quality, employment-oriented paramedical education through one-year certificate programmes with extensive hands-on clinical training at Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital, Ahilyanagar. Our mission is to bridge the gap between healthcare services and skilled human resources by preparing competent, compassionate healthcare personnel capable of supporting doctors, nurses, and other healthcare professionals in delivering quality patient care.",
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
