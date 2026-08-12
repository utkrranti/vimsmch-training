import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TOKEN = "feba91834614324c9317b4ef6ea21dd9e0623b50e464ba19";

const settings = [
  { key: "about.mission_mr", value: "डॉ. विठ्ठलराव विखे पाटील फाउंडेशनचे व्यवसाय प्रशिक्षण केंद्र, अहिल्यानगर येथील डॉ. विठ्ठलराव विखे पाटील फाउंडेशनच्या मेडिकल कॉलेज आणि हॉस्पिटलमध्ये सखोल प्रत्यक्ष क्लिनिकल प्रशिक्षणासह एक वर्षाच्या प्रमाणपत्र कार्यक्रमांद्वारे परवडणारे, दर्जेदार आणि रोजगाराभिमुख पॅरामेडिकल शिक्षण प्रदान करते. डॉक्टर, परिचारिका आणि इतर आरोग्यसेवा व्यावसायिकांना दर्जेदार रुग्णसेवा देण्यात मदत करण्यास सक्षम असे सक्षम, दयाळू आरोग्यसेवा कर्मचारी तयार करून आरोग्यसेवा आणि कुशल मनुष्यबळ यामधील तफावत भरून काढणे हे आमचे ध्येय आहे." },
];

const faculty = [
  { name: "Dr. [Dean Name]", designationMr: "डीन आणि संस्था प्रमुख", bioMr: "VIMSMCH मधील सर्व शैक्षणिक आणि व्यवसाय कार्यक्रमांचे पर्यवेक्षण करतात. वैद्यकीय आणि पॅरामेडिकल शिक्षणातील उत्कृष्टतेसाठी महाविद्यालयाच्या बांधिलकीचे नेतृत्व करतात." },
  { name: "Dr. [OT Faculty]", designationMr: "कार्यक्रम समन्वयक — ऑपरेशन थिएटर तंत्र", bioMr: "15 वर्षांहून अधिक क्लिनिकल आणि अध्यापन अनुभव असलेले शल्यचिकित्सा शास्त्रातील तज्ज्ञ. OT तंत्र प्रमाणपत्र कार्यक्रमाचे नेतृत्व करतात." },
  { name: "Dr. [Lab Faculty]", designationMr: "कार्यक्रम समन्वयक — मेडिकल लॅबोरेटरी तंत्र", bioMr: "क्लिनिकल प्रयोगशाळा निदानात व्यापक अनुभव असलेले पात्र पॅथॉलॉजिस्ट. मेडिकल लॅबोरेटरी तंत्र डिप्लोमाचे प्रमुख आहेत." },
  { name: "Dr. [Nursing Faculty]", designationMr: "कार्यक्रम समन्वयक — आरोग्यसेवा सहाय्य आणि नर्सिंग सहाय्य", bioMr: "रुग्णसेवा आणि क्लिनिकल प्रशिक्षणात तज्ज्ञ असलेले वरिष्ठ नर्सिंग व्यावसायिक. आरोग्यसेवा सहाय्य आणि नर्सिंग सहाय्य या दोन्ही कार्यक्रमांचे नेतृत्व करतात." },
  { name: "Mr. [Coding Faculty]", designationMr: "कार्यक्रम समन्वयक — मेडिकल कोडिंग आणि बिलिंग", bioMr: "ICD-10, CPT कोडिंग आणि हॉस्पिटल माहिती प्रणालींचा अनुभव असलेले प्रमाणित मेडिकल कोडर. मेडिकल कोडिंग आणि बिलिंग कार्यक्रमाचे नेतृत्व करतात." },
  { name: "Mr. [Pharmacy Faculty]", designationMr: "कार्यक्रम समन्वयक — फार्मसी सहाय्य", bioMr: "किरकोळ आणि हॉस्पिटल फार्मसी कामकाजाचा अनुभव असलेले परवानाधारक फार्मासिस्ट. फार्मसी सहाय्य प्रमाणपत्र कार्यक्रमाचे नेतृत्व करतात." },
];

const courses = [
  { slug: "operation-theatre-assistant", titleMr: "ऑपरेशन थिएटर असिस्टंट प्रमाणपत्र अभ्यासक्रम", shortDescMr: "शस्त्रक्रियागृहात सर्जन, भूलतज्ज्ञ आणि परिचारिका कर्मचाऱ्यांना मदत करण्यासाठी विद्यार्थ्यांना तयार करणारा एक वर्षाचा कौशल्याभिमुख अभ्यासक्रम.", eligibilityMr: "10वी उत्तीर्ण. क्लिनिकल प्रशिक्षणासाठी वैद्यकीयदृष्ट्या सक्षम.", certByMr: "डॉ. विठ्ठलराव विखे पाटील फाउंडेशनचे पॅरामेडिकल इन्स्टिट्यूट" },
  { slug: "ecg-technology", titleMr: "ईसीजी टेक्नॉलॉजी प्रमाणपत्र अभ्यासक्रम", shortDescMr: "इलेक्ट्रोकार्डियोग्राफी करण्यासाठी आणि हृदयविकारांचे निदान करण्यात हृदयरोगतज्ज्ञांना मदत करण्यासाठी विद्यार्थ्यांना तयार करणारा एक वर्षाचा अभ्यासक्रम.", eligibilityMr: "10वी उत्तीर्ण. क्लिनिकल प्रशिक्षणासाठी वैद्यकीयदृष्ट्या सक्षम.", certByMr: "डॉ. विठ्ठलराव विखे पाटील फाउंडेशनचे पॅरामेडिकल इन्स्टिट्यूट" },
  { slug: "dialysis-technician", titleMr: "डायलिसिस टेक्निशियन प्रमाणपत्र अभ्यासक्रम", shortDescMr: "नेफ्रोलॉजिस्टना सुरक्षित आणि प्रभावी डायलिसिस उपचार देण्यात मदत करण्यास सक्षम असलेले कुशल डायलिसिस टेक्निशियन घडवणारा एक वर्षाचा अभ्यासक्रम.", eligibilityMr: "10वी उत्तीर्ण. क्लिनिकल प्रशिक्षणासाठी वैद्यकीयदृष्ट्या सक्षम.", certByMr: "डॉ. विठ्ठलराव विखे पाटील फाउंडेशनचे पॅरामेडिकल इन्स्टिट्यूट" },
  { slug: "medical-laboratory-technology", titleMr: "मेडिकल लॅबोरेटरी टेक्नॉलॉजी प्रमाणपत्र अभ्यासक्रम", shortDescMr: "प्रयोगशाळेतील चाचण्या अचूकपणे करण्यासाठी आवश्यक ज्ञान आणि व्यावहारिक कौशल्ये विद्यार्थ्यांना देणारा एक वर्षाचा अभ्यासक्रम.", eligibilityMr: "10वी उत्तीर्ण. क्लिनिकल प्रशिक्षणासाठी वैद्यकीयदृष्ट्या सक्षम.", certByMr: "डॉ. विठ्ठलराव विखे पाटील फाउंडेशनचे पॅरामेडिकल इन्स्टिट्यूट" },
  { slug: "radiology-and-imaging-technology", titleMr: "रेडिओलॉजी आणि इमेजिंग टेक्नॉलॉजी प्रमाणपत्र अभ्यासक्रम", shortDescMr: "आधुनिक इमेजिंग उपकरणांचा वापर करून निदानात्मक इमेजिंग प्रक्रिया करण्यात रेडिओलॉजिस्टना मदत करण्यासाठी विद्यार्थ्यांना तयार करणारा एक वर्षाचा अभ्यासक्रम.", eligibilityMr: "10वी उत्तीर्ण. क्लिनिकल प्रशिक्षणासाठी वैद्यकीयदृष्ट्या सक्षम.", certByMr: "डॉ. विठ्ठलराव विखे पाटील फाउंडेशनचे पॅरामेडिकल इन्स्टिट्यूट" },
];

export async function POST(request: Request) {
  if (request.headers.get("x-token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const report: string[] = [];

  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: { key: s.key, value: s.value } });
    report.push(`setting: ${s.key} OK`);
  }

  for (const f of faculty) {
    const row = await prisma.faculty.findFirst({ where: { name: f.name } });
    if (!row) { report.push(`faculty: ${f.name} NOT FOUND`); continue; }
    await prisma.faculty.update({ where: { id: row.id }, data: { designationMr: f.designationMr, bioMr: f.bioMr } });
    report.push(`faculty: ${f.name} OK`);
  }

  for (const c of courses) {
    const row = await prisma.course.findUnique({ where: { slug: c.slug } });
    if (!row) { report.push(`course: ${c.slug} NOT FOUND`); continue; }
    await prisma.course.update({ where: { id: row.id }, data: { titleMr: c.titleMr, shortDescMr: c.shortDescMr, eligibilityMr: c.eligibilityMr, certByMr: c.certByMr } });
    report.push(`course: ${c.slug} OK`);
  }

  return NextResponse.json({ report });
}
