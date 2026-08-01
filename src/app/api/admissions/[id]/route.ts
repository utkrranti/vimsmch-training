import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cleanText, getRequiredAdmissionDocumentTypes } from "@/lib/admissions";
import { validateAdmissionStep } from "@/lib/admission-validation";

const numberOrNull = (value: unknown) => value !== "" && Number.isFinite(Number(value)) ? Number(value) : null;
const dateOrNull = (value: unknown) => { const text = cleanText(value, 10); return text ? new Date(`${text}T00:00:00.000Z`) : null; };
const subjectsOrNull = (value: unknown) => Array.isArray(value)
  ? value.slice(0, 6).map((row) => ({ subject: cleanText(row?.subject, 80) ?? "", maximum: numberOrNull(row?.maximum), obtained: numberOrNull(row?.obtained), grade: cleanText(row?.grade, 20) })).filter((row) => row.subject || row.maximum !== null || row.obtained !== null || row.grade)
  : [];

function applicationFields(data: Record<string, unknown>) {
  return {
    name: cleanText(data.name, 120), phone: cleanText(data.phone, 20), email: cleanText(data.email, 160),
    dateOfBirth: dateOrNull(data.dateOfBirth), gender: cleanText(data.gender, 30), placeOfBirth: cleanText(data.placeOfBirth, 100), nationality: cleanText(data.nationality, 80), domicile: cleanText(data.domicile, 50), bloodGroup: cleanText(data.bloodGroup, 10), aadhaarNumber: cleanText(data.aadhaarNumber, 12), category: cleanText(data.category, 50),
    fatherName: cleanText(data.fatherName, 120), fatherAge: numberOrNull(data.fatherAge), fatherOccupation: cleanText(data.fatherOccupation, 120), fatherPhone: cleanText(data.fatherPhone, 20), fatherEmail: cleanText(data.fatherEmail, 160), motherName: cleanText(data.motherName, 120), motherAge: numberOrNull(data.motherAge), motherPhone: cleanText(data.motherPhone, 20), motherEmail: cleanText(data.motherEmail, 160),
    addressLine: cleanText(data.addressLine, 300), city: cleanText(data.city, 80), district: cleanText(data.district, 80), state: cleanText(data.state, 80), pinCode: cleanText(data.pinCode, 6), residencePhone: cleanText(data.residencePhone, 20), permanentSameAsPresent: data.permanentSameAsPresent === true,
    permanentAddressLine: data.permanentSameAsPresent === true ? cleanText(data.addressLine, 300) : cleanText(data.permanentAddressLine, 300), permanentCity: data.permanentSameAsPresent === true ? cleanText(data.city, 80) : cleanText(data.permanentCity, 80), permanentDistrict: data.permanentSameAsPresent === true ? cleanText(data.district, 80) : cleanText(data.permanentDistrict, 80), permanentState: data.permanentSameAsPresent === true ? cleanText(data.state, 80) : cleanText(data.permanentState, 80), permanentPinCode: data.permanentSameAsPresent === true ? cleanText(data.pinCode, 6) : cleanText(data.permanentPinCode, 6), permanentResidencePhone: data.permanentSameAsPresent === true ? cleanText(data.residencePhone, 20) : cleanText(data.permanentResidencePhone, 20),
    board: cleanText(data.board, 100), schoolName: cleanText(data.schoolName, 180), passingYear: numberOrNull(data.passingYear), seatNumber: cleanText(data.seatNumber, 60), sscResultType: data.sscResultType === "GRADES" ? "GRADES" : "MARKS", sscMarksObtained: numberOrNull(data.sscMarksObtained), sscMaximumMarks: numberOrNull(data.sscMaximumMarks), percentage: numberOrNull(data.percentage), sscSubjects: subjectsOrNull(data.sscSubjects), scienceConfirmed: data.scienceConfirmed === true,
    hscApplicable: data.hscApplicable === true, hscBoard: cleanText(data.hscBoard, 100), hscSchoolName: cleanText(data.hscSchoolName, 180), hscPassingYear: numberOrNull(data.hscPassingYear), hscResultType: data.hscResultType === "GRADES" ? "GRADES" : "MARKS", hscMarksObtained: numberOrNull(data.hscMarksObtained), hscMaximumMarks: numberOrNull(data.hscMaximumMarks), hscPercentage: numberOrNull(data.hscPercentage), hscSubjects: subjectsOrNull(data.hscSubjects),
    declarationAccepted: data.declarationAccepted === true, paymentTxnRef: cleanText(data.paymentTxnRef, 100), paymentDate: dateOrNull(data.paymentDate), paymentProofUrl: cleanText(data.paymentProofUrl, 500), contactConsent: true,
  };
}

const contactKeys = ["name", "phone", "email", "contactConsent"] as const;
const identityKeys = ["dateOfBirth", "gender", "placeOfBirth", "nationality", "domicile", "bloodGroup", "aadhaarNumber", "category"] as const;
const familyAddressKeys = ["fatherName", "fatherAge", "fatherOccupation", "fatherPhone", "fatherEmail", "motherName", "motherAge", "motherPhone", "motherEmail", "addressLine", "city", "district", "state", "pinCode", "residencePhone", "permanentSameAsPresent", "permanentAddressLine", "permanentCity", "permanentDistrict", "permanentState", "permanentPinCode", "permanentResidencePhone"] as const;
const educationKeys = ["board", "schoolName", "passingYear", "seatNumber", "sscResultType", "sscMarksObtained", "sscMaximumMarks", "percentage", "sscSubjects", "scienceConfirmed", "hscApplicable", "hscBoard", "hscSchoolName", "hscPassingYear", "hscResultType", "hscMarksObtained", "hscMaximumMarks", "hscPercentage", "hscSubjects"] as const;

function applicationFieldsForStep(data: Record<string, unknown>, step: number, application: { name: string; phone: string; email: string | null }) {
  const all = applicationFields(data);
  // Only this step's own fields — earlier steps' fields were already persisted by
  // their own PATCH calls, and resending all of them cumulatively on every step
  // pushes the update past MongoDB Atlas's 50-stage aggregation pipeline limit.
  const stepKeys = step === 2 ? identityKeys : step === 3 ? familyAddressKeys : step === 4 ? educationKeys : [];
  const keys = [...contactKeys, ...stepKeys];
  const result = Object.fromEntries(keys.map((key) => [key, all[key]])) as Record<string, unknown>;
  // Steps after 1 don't resubmit contact fields, so an empty `data.name`/`data.phone`
  // here must fall back to what's already saved rather than null out required columns.
  result.name = (result.name as string | null) || application.name;
  result.phone = (result.phone as string | null) || application.phone;
  result.email = (result.email as string | null) ?? application.email;
  return result;
}

async function getAuthorizedApplication(id: string, request: Request) {
  const accessToken = request.headers.get("x-application-token");
  if (!accessToken) return null;
  return prisma.admissionApplication.findFirst({ where: { id, accessToken } });
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await getAuthorizedApplication(id, request);
  if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });
  return NextResponse.json({ application });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const application = await getAuthorizedApplication(id, request);
    if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });
    if (["SUBMITTED", "APPROVED", "ENROLLED", "REJECTED"].includes(application.status)) {
      return NextResponse.json({ error: "This application can no longer be edited." }, { status: 409 });
    }

    const body = await request.json();
    const step = Number(body.step);
    const data = body.data ?? {};
    const update: Record<string, unknown> = { lastActivityAt: new Date() };

    if (body.autosave === true) {
      const autosaveUpdate: Record<string, unknown> = {
        ...applicationFieldsForStep(data, step, application),
        lastActivityAt: new Date(),
        callbackStatus: application.callbackStatus === "NEW_LEAD" ? "APPLICATION_IN_PROGRESS" : application.callbackStatus,
      };

      if (data.courseId && data.courseId !== application.courseId) {
        const course = await prisma.course.findFirst({ where: { id: data.courseId, isActive: true } });
        if (course) {
          autosaveUpdate.courseId = course.id;
          autosaveUpdate.paymentAmount = 50;
        }
      }

      await prisma.admissionApplication.update({ where: { id }, data: autosaveUpdate });
      return NextResponse.json({ success: true, savedAt: new Date().toISOString() });
    }

    const fieldError = [1, 2, 3, 4, 6].includes(step) ? validateAdmissionStep(data, step) : "";
    if (fieldError) return NextResponse.json({ error: fieldError }, { status: 400 });

    if (step === 1) {
      if (!cleanText(data.name, 120) || !cleanText(data.phone, 20) || !cleanText(data.courseId, 80)) {
        return NextResponse.json({ error: "Complete course and contact details." }, { status: 400 });
      }
      Object.assign(update, { currentStep: 2, completionPercent: 25, callbackStatus: "APPLICATION_IN_PROGRESS" });
    } else if (step === 2) {
      if (!cleanText(data.dateOfBirth, 10) || !cleanText(data.gender, 30) || !cleanText(data.placeOfBirth, 100) || !cleanText(data.nationality, 80) || !cleanText(data.domicile, 50) || !cleanText(data.bloodGroup, 10) || !/^\d{12}$/.test(cleanText(data.aadhaarNumber, 12) ?? "")) return NextResponse.json({ error: "Complete valid identity details." }, { status: 400 });
      Object.assign(update, applicationFieldsForStep(data, 2, application), { currentStep: 3, completionPercent: 40 });
    } else if (step === 3) {
      if (!cleanText(data.fatherName, 120) || !cleanText(data.fatherPhone, 20) || !cleanText(data.motherName, 120) || !cleanText(data.motherPhone, 20) || !cleanText(data.addressLine, 300) || !cleanText(data.city, 80) || !/^\d{6}$/.test(cleanText(data.pinCode, 6) ?? "") || (data.permanentSameAsPresent !== true && (!cleanText(data.permanentAddressLine, 300) || !cleanText(data.permanentCity, 80) || !/^\d{6}$/.test(cleanText(data.permanentPinCode, 6) ?? "")))) return NextResponse.json({ error: "Complete valid parent and address details." }, { status: 400 });
      Object.assign(update, applicationFieldsForStep(data, 3, application), { currentStep: 4, completionPercent: 55 });
    } else if (step === 4) {
      const passingYear = Number(data.passingYear), percentage = Number(data.percentage), obtained = Number(data.sscMarksObtained), maximum = Number(data.sscMaximumMarks);
      const sscUsesGrades = data.sscResultType === "GRADES";
      const hscUsesGrades = data.hscResultType === "GRADES";
      const hscPercentage = Number(data.hscPercentage), hscObtained = Number(data.hscMarksObtained), hscMaximum = Number(data.hscMaximumMarks);
      const invalidSscMarks = !sscUsesGrades && (obtained <= 0 || maximum <= 0 || obtained > maximum);
      const invalidHsc = data.hscApplicable === true && (!cleanText(data.hscBoard, 100) || !cleanText(data.hscSchoolName, 180) || !Number(data.hscPassingYear) || !Number.isFinite(hscPercentage) || hscPercentage <= 0 || hscPercentage > 100 || (!hscUsesGrades && (hscObtained <= 0 || hscMaximum <= 0 || hscObtained > hscMaximum)));
      if (!cleanText(data.board, 100) || !cleanText(data.schoolName, 180) || !Number.isInteger(passingYear) || passingYear < 1980 || passingYear > new Date().getFullYear() || !Number.isFinite(percentage) || percentage <= 0 || percentage > 100 || invalidSscMarks || data.scienceConfirmed !== true || invalidHsc) return NextResponse.json({ error: "Enter valid SSC and HSC educational details." }, { status: 400 });
      Object.assign(update, applicationFieldsForStep(data, 4, application), { currentStep: 5, completionPercent: 70 });
    } else if (step === 5) {
      const uploadedDocuments = await prisma.admissionDocument.findMany({ where: { applicationId: id }, select: { type: true, aiStatus: true } });
      const uploadedTypes = new Set(uploadedDocuments.filter((document) => document.aiStatus !== "REUPLOAD").map((document) => document.type));
      // TEMP (testing only): `false &&` disables the document requirement so the wizard can be tested past step 5 — remove before launch.
      if (false && getRequiredAdmissionDocumentTypes(data).some((type) => !uploadedTypes.has(type))) return NextResponse.json({ error: "Upload all required documents before continuing." }, { status: 400 });
      Object.assign(update, { currentStep: 6, completionPercent: 85 });
    } else if (step === 6) {
      if (data.declarationAccepted !== true) return NextResponse.json({ error: "The declaration must be accepted." }, { status: 400 });
      const paymentTxnRef = cleanText(data.paymentTxnRef, 100);
      const paymentProofUrl = cleanText(data.paymentProofUrl, 500);
      const paymentDate = cleanText(data.paymentDate, 10);
      if (!paymentTxnRef || !paymentProofUrl || !paymentDate) {
        return NextResponse.json(
          { error: "Payment reference, payment date, and screenshot are required." },
          { status: 400 },
        );
      }
      if (!paymentProofUrl.includes(`/admissions/${id}/payment_proof-`)) {
        return NextResponse.json({ error: "Invalid payment proof upload." }, { status: 400 });
      }
      const uploadedDocuments = await prisma.admissionDocument.findMany({
        where: { applicationId: id },
        select: { type: true, aiStatus: true },
      });
      const uploadedTypes = new Set(uploadedDocuments.filter((document) => document.aiStatus !== "REUPLOAD").map((document) => document.type));
      const missing = getRequiredAdmissionDocumentTypes(data).filter((type) => !uploadedTypes.has(type));
      if (missing.length > 0) {
        return NextResponse.json({ error: "Upload all required documents before submitting." }, { status: 400 });
      }
      Object.assign(update, {
        paymentTxnRef,
        paymentAmount: 50,
        declarationAccepted: true,
        paymentProofUrl,
        paymentDate: new Date(`${paymentDate}T00:00:00.000Z`),
        paymentStatus: "UNDER_REVIEW",
        status: "SUBMITTED",
        callbackStatus: "APPLICATION_SUBMITTED",
        currentStep: 7,
        completionPercent: 100,
        submittedAt: new Date(),
      });
    } else {
      return NextResponse.json({ error: "Invalid application step." }, { status: 400 });
    }

    const updated = await prisma.admissionApplication.update({
      where: { id },
      data: update,
      select: {
        id: true,
        applicationNo: true,
        currentStep: true,
        completionPercent: true,
        status: true,
        paymentStatus: true,
      },
    });
    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error("Unable to update admission application", error);
    const message = error instanceof Error ? error.message : "";
    const errorName = error instanceof Error ? error.name : "UnknownError";
    const errorCode = typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" ? error.code : null;
    const schemaMismatch = errorName.includes("PrismaClientValidationError") || message.includes("Unknown argument") || message.includes("Unknown field");
    return NextResponse.json({
      error: schemaMismatch ? "The admission service schema is out of date. Please redeploy the latest build." : "Unable to save this step. Please try again.",
      diagnostic: errorCode ?? errorName,
      ...(process.env.NODE_ENV === "development" && { details: message || "Unknown error" }),
    }, { status: 500 });
  }
}
