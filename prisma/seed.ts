import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding courses...");

  const coursesData = [
    {
      slug: "operation-theatre-techniques",
      title: "Certificate in Operation Theatre Techniques",
      shortDesc:
        "A six-month NSQF Level 4 programme training students as OT technicians — covering surgical instrumentation, sterilisation, anaesthesia assistance, and OT protocols.",
      fullDesc:
        "This UGC-approved programme prepares students to work as Operation Theatre (OT) technicians in hospitals and surgical centres. Students are trained in surgical instrument handling, pre- and post-operative care, OT setup and maintenance, sterilisation procedures, and assisting anaesthesiologists and surgeons. Training is delivered through classroom sessions and supervised hands-on exposure in VIMSMCH's operating theatres.",
      nsqf: 4,
      durationMonths: 6,
      durationHours: 360,
      fees: 9500,
      feeBreakdown: [
        { label: "Tuition Fee", amount: 7500 },
        { label: "Examination Fee", amount: 800 },
        { label: "Certificate & Processing", amount: 500 },
        { label: "OT Kit & Consumables", amount: 700 },
      ],
      seats: 20,
      eligibility: "Passed Class 12 (HSC) — any stream from a recognised board",
      ageLimit: "17 – 30 years",
      certBy: "VIMSMCH / Affiliating University",
      assessmentScheme:
        "Internal Assessment: 30 marks | Theory Exam: 30 marks | OT Practical: 40 marks | Pass: 50% aggregate with minimum 50% in Practical",
      creditEquivalence: "10 Credits (NSQF Level 4) — transferable under UGC Academic Bank of Credits",
      syllabus: [
        { unit: "Anatomy & Surgical Basics", topics: ["Basic human anatomy for OT", "Surgical terminology", "Types of surgeries and their requirements", "Roles within the surgical team"] },
        { unit: "OT Setup & Maintenance", topics: ["Layout and zones of an OT", "OT table positioning and attachments", "Equipment checks pre-surgery", "Environmental control (temperature, humidity, air pressure)"] },
        { unit: "Sterilisation & Infection Control", topics: ["Methods of sterilisation (autoclave, ETO, UV)", "Scrubbing, gowning, and gloving", "CSSD basics", "Biomedical waste management in OT"] },
        { unit: "Surgical Instrumentation", topics: ["Classification of surgical instruments", "Counting procedures (sponge, instrument, needle)", "Passing instruments to surgeon", "Care and maintenance of instruments"] },
        { unit: "Anaesthesia & Patient Support", topics: ["Types of anaesthesia — overview", "Monitoring equipment (BP, SpO2, ECG)", "Anaesthesia machine familiarisation", "Pre- and post-operative patient care"] },
      ],
      outcomes: [
        "Set up and prepare an OT for a scheduled surgical procedure",
        "Handle and pass surgical instruments correctly and safely",
        "Perform sterilisation as per CSSD protocols",
        "Assist the surgical and anaesthesia team during procedures",
        "Maintain accurate instrument and sponge counts throughout surgery",
      ],
      tags: ["OT Setup", "Surgical Instruments", "Sterilisation", "Anaesthesia Support", "CSSD"],
      category: "short-term",
      batchMonths: ["January", "July"],
    },
    {
      slug: "medical-lab-techniques",
      title: "Diploma in Medical Laboratory Techniques",
      shortDesc:
        "A one-year NSQF Level 5 programme training students in clinical laboratory procedures across haematology, biochemistry, microbiology, and pathology.",
      fullDesc:
        "This UGC-recognised diploma prepares students to work as laboratory technicians in hospitals, diagnostic labs, and research centres. The curriculum covers clinical biochemistry, haematology, microbiology, blood banking, and pathological sample processing. Students get hands-on training in VIMSMCH's fully equipped medical laboratories under the supervision of qualified medical professionals.",
      nsqf: 5,
      durationMonths: 12,
      durationHours: 720,
      fees: 12000,
      feeBreakdown: [
        { label: "Tuition Fee", amount: 9000 },
        { label: "Examination Fee", amount: 1200 },
        { label: "Certificate & Processing", amount: 500 },
        { label: "Lab & Consumables Charges", amount: 1300 },
      ],
      seats: 20,
      eligibility: "Passed Class 12 (HSC) with Science (Physics, Chemistry, Biology)",
      ageLimit: "17 – 28 years",
      certBy: "VIMSMCH / Affiliating University",
      assessmentScheme:
        "Internal Assessment: 30 marks | Theory Exam (2 papers): 40 marks | Practical Exam: 30 marks | Pass: 50% aggregate with minimum 40% in Practical",
      creditEquivalence: "20 Credits (NSQF Level 5) — transferable under UGC Academic Bank of Credits",
      syllabus: [
        { unit: "Haematology", topics: ["Blood collection techniques", "CBC analysis", "ESR & bleeding time", "Blood grouping & cross-matching"] },
        { unit: "Clinical Biochemistry", topics: ["Blood glucose tests", "Liver & kidney function tests", "Lipid profile", "Electrolyte analysis"] },
        { unit: "Microbiology & Serology", topics: ["Gram staining & culture", "Urine & stool analysis", "VDRL, Widal, HIV ELISA basics", "Sterilisation methods"] },
        { unit: "Pathology & Histology", topics: ["Tissue processing basics", "H&E staining", "Cytology smear preparation", "Biopsy handling"] },
        { unit: "Blood Banking", topics: ["ABO & Rh typing", "Crossmatch procedures", "Component separation basics", "Safe transfusion protocols"] },
      ],
      outcomes: [
        "Perform routine clinical laboratory investigations independently",
        "Handle biological samples safely per standard biosafety protocols",
        "Operate common diagnostic instruments (haematology analyser, centrifuge, etc.)",
        "Interpret normal vs. abnormal lab values",
        "Maintain quality control and lab records",
      ],
      tags: ["Haematology", "Biochemistry", "Microbiology", "Pathology", "Blood Banking"],
      category: "long-term",
      batchMonths: ["June", "December"],
    },
    {
      slug: "healthcare-assistant",
      title: "Certificate in Healthcare Assistance",
      shortDesc:
        "A three-month NSQF Level 3 programme preparing students for patient care and supportive roles in hospitals, nursing homes, and homecare settings.",
      fullDesc:
        "This short-term UGC-approved certificate programme is designed for individuals who wish to enter the healthcare workforce quickly. Students are trained in fundamental patient care skills, hospital hygiene, vital signs monitoring, and basic first aid. The programme is delivered through a combination of classroom instruction and supervised hospital floor training at VIMSMCH.",
      nsqf: 3,
      durationMonths: 3,
      durationHours: 180,
      fees: 5000,
      feeBreakdown: [
        { label: "Tuition Fee", amount: 3800 },
        { label: "Examination Fee", amount: 600 },
        { label: "Certificate & Processing", amount: 400 },
        { label: "Uniform & Kit", amount: 200 },
      ],
      seats: 40,
      eligibility: "Passed Class 10 (SSC) from any recognised board",
      ageLimit: "16 – 40 years",
      certBy: "VIMSMCH / NSDC",
      assessmentScheme:
        "Internal Assessment: 40 marks | Final Theory Exam: 30 marks | Practical / Clinical Assessment: 30 marks | Pass: 40% in each component",
      creditEquivalence: "6 Credits (NSQF Level 3) — transferable under UGC Academic Bank of Credits",
      syllabus: [
        { unit: "Introduction to Healthcare", topics: ["Hospital hierarchy & departments", "Patient rights & ethics", "Infection control & hand hygiene", "Personal protective equipment"] },
        { unit: "Patient Care Fundamentals", topics: ["Bed making & patient positioning", "Oral, eye, and wound care basics", "Mobility assistance & fall prevention", "Patient communication skills"] },
        { unit: "Vital Signs Monitoring", topics: ["Temperature, pulse, respiration", "Blood pressure measurement", "SpO2 and glucometer use", "Recording & reporting vitals"] },
        { unit: "First Aid & Emergency Response", topics: ["CPR basics", "Choking & wound management", "Fracture & burn first aid", "Emergency triage basics"] },
      ],
      outcomes: [
        "Provide safe, compassionate basic patient care",
        "Monitor and accurately record patient vital signs",
        "Maintain infection control and hospital hygiene standards",
        "Respond to common medical emergencies with basic first aid",
        "Communicate effectively with patients and healthcare teams",
      ],
      tags: ["Patient Care", "First Aid", "Vital Signs", "Hospital Hygiene", "CPR"],
      category: "short-term",
      batchMonths: ["January", "April", "July", "October"],
    },
    {
      slug: "medical-coding-billing",
      title: "Certificate in Medical Coding & Billing",
      shortDesc:
        "An NSQF Level 4 programme covering ICD-10, CPT coding, health insurance claims, and hospital billing systems.",
      fullDesc:
        "Medical coding is one of the fastest-growing healthcare support roles globally. This UGC-approved programme trains students in ICD-10-CM/PCS and CPT coding systems, insurance claim processing, and hospital billing software. Students learn to translate medical records into standardised codes used by hospitals, insurance companies, and government health programmes.",
      nsqf: 4,
      durationMonths: 6,
      durationHours: 360,
      fees: 9000,
      feeBreakdown: [
        { label: "Tuition Fee", amount: 7000 },
        { label: "Examination Fee", amount: 800 },
        { label: "Certificate & Processing", amount: 500 },
        { label: "Software & Lab Access", amount: 700 },
      ],
      seats: 25,
      eligibility: "Passed Class 12 from any stream from a recognised board",
      ageLimit: "17 – 35 years",
      certBy: "VIMSMCH / Affiliating University",
      assessmentScheme:
        "Internal Assessment: 40 marks | Theory Exam: 30 marks | Coding Practical: 30 marks | Pass: 40% in each component",
      creditEquivalence: "10 Credits (NSQF Level 4) — transferable under UGC Academic Bank of Credits",
      syllabus: [
        { unit: "Medical Terminology", topics: ["Anatomical terms & body systems", "Disease & procedure terminology", "Abbreviations in clinical records", "Reading discharge summaries"] },
        { unit: "ICD-10 Coding", topics: ["ICD-10-CM structure & guidelines", "Diagnosis coding for inpatient/outpatient", "Coding conventions & sequencing", "Coding from case studies"] },
        { unit: "CPT & Procedure Coding", topics: ["CPT manual structure", "E&M coding levels", "Surgical & radiology codes", "Modifier usage"] },
        { unit: "Insurance & Billing", topics: ["Health insurance types (Ayushman Bharat, private)", "Claim form preparation", "Denial management basics", "Hospital billing software (demo)"] },
      ],
      outcomes: [
        "Assign accurate ICD-10 and CPT codes from medical records",
        "Process insurance claims and handle basic denials",
        "Operate hospital billing systems",
        "Understand compliance and coding ethics",
        "Work in hospital billing departments, TPAs, or from home (remote coding)",
      ],
      tags: ["ICD-10", "CPT Coding", "Medical Billing", "Insurance Claims", "Ayushman Bharat"],
      category: "short-term",
      batchMonths: ["February", "August"],
    },
    {
      slug: "pharmacy-assistant",
      title: "Certificate in Pharmacy Assistance",
      shortDesc:
        "An NSQF Level 3 programme covering dispensing basics, drug storage, pharmacy record keeping, and retail pharmacy operations.",
      fullDesc:
        "This programme trains students to work as pharmacy assistants in retail pharmacies, hospital pharmacies, and community health centres under the supervision of a licensed pharmacist. Students learn about drug classifications, safe dispensing practices, inventory management, and customer interaction in a pharmacy setting.",
      nsqf: 3,
      durationMonths: 4,
      durationHours: 240,
      fees: 6000,
      feeBreakdown: [
        { label: "Tuition Fee", amount: 4800 },
        { label: "Examination Fee", amount: 600 },
        { label: "Certificate & Processing", amount: 400 },
        { label: "Lab & Material Charges", amount: 200 },
      ],
      seats: 30,
      eligibility: "Passed Class 10 (SSC) from any recognised board",
      ageLimit: "16 – 35 years",
      certBy: "VIMSMCH / Affiliating University",
      assessmentScheme:
        "Internal Assessment: 40 marks | Theory Exam: 30 marks | Practical: 30 marks | Pass: 40% in each component",
      creditEquivalence: "8 Credits (NSQF Level 3) — transferable under UGC Academic Bank of Credits",
      syllabus: [
        { unit: "Introduction to Pharmacy", topics: ["Drug classifications", "OTC vs. prescription drugs", "Drug safety & storage conditions", "Pharmacy laws & ethics"] },
        { unit: "Dispensing Basics", topics: ["Reading prescriptions", "Dosage forms & routes", "Labelling & packaging", "Safe dispensing under supervision"] },
        { unit: "Inventory & Record Keeping", topics: ["Stock management", "Expiry date monitoring", "Billing & invoicing", "Controlled substance records"] },
      ],
      outcomes: [
        "Assist licensed pharmacists in dispensing medication safely",
        "Maintain drug inventory and cold-chain storage",
        "Handle billing and prescription records",
        "Counsel patients on basic OTC medication usage",
      ],
      tags: ["Drug Dispensing", "Pharmacy Records", "Inventory", "Drug Storage", "OTC Drugs"],
      category: "short-term",
      batchMonths: ["March", "September"],
    },
    {
      slug: "nursing-aid",
      title: "Certificate in Nursing Aid",
      shortDesc:
        "An NSQF Level 4 programme training students as nursing aides for hospitals, elderly care, and home nursing services.",
      fullDesc:
        "This UGC-approved nursing aid programme prepares students to support registered nurses in clinical and home care settings. The curriculum covers personal care, medication reminder assistance, wound care assistance, patient observation, and documentation. Graduates are in high demand across hospitals, care homes, and home nursing agencies across India.",
      nsqf: 4,
      durationMonths: 6,
      durationHours: 360,
      fees: 7500,
      feeBreakdown: [
        { label: "Tuition Fee", amount: 5800 },
        { label: "Examination Fee", amount: 800 },
        { label: "Certificate & Processing", amount: 500 },
        { label: "Uniform, Kit & Clinical Charges", amount: 400 },
      ],
      seats: 25,
      eligibility: "Passed Class 10 (SSC) from any recognised board",
      ageLimit: "17 – 40 years",
      certBy: "VIMSMCH / Affiliating University",
      assessmentScheme:
        "Internal Assessment: 30 marks | Theory Exam: 30 marks | Clinical Practical: 40 marks | Pass: 40% in each component with minimum 50% in Clinical Practical",
      creditEquivalence: "10 Credits (NSQF Level 4) — transferable under UGC Academic Bank of Credits",
      syllabus: [
        { unit: "Nursing Fundamentals", topics: ["Roles of nursing aide vs. RN", "Patient privacy & dignity", "Documentation basics", "Infection control in clinical settings"] },
        { unit: "Personal & Hygiene Care", topics: ["Bathing & grooming assistance", "Oral and skin care", "Catheter & colostomy assistance", "Dressing and undressing patients"] },
        { unit: "Clinical Support Skills", topics: ["Medication reminders & observation", "Wound care assistance", "Specimen collection assistance", "Post-operative care support"] },
        { unit: "Geriatric & Home Care", topics: ["Care of elderly patients", "Dementia patient basics", "Home nursing environment setup", "Family caregiver education"] },
      ],
      outcomes: [
        "Provide safe and dignified personal care to patients",
        "Assist registered nurses in clinical procedures",
        "Monitor and report changes in patient condition",
        "Deliver quality home nursing support",
        "Maintain clinical documentation accurately",
      ],
      tags: ["Nursing Aid", "Patient Care", "Geriatric Care", "Home Nursing", "Clinical Support"],
      category: "long-term",
      batchMonths: ["January", "July"],
    },
  ];

  for (const c of coursesData) {
    const existing = await prisma.course.findUnique({ where: { slug: c.slug } });
    if (!existing) {
      await prisma.course.create({ data: c });
      console.log(`  ✓ ${c.title}`);
    } else {
      console.log(`  ~ ${c.title} (already exists, skipped)`);
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
