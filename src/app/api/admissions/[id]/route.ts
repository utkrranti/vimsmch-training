import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cleanText, requiredAdmissionDocumentTypes } from "@/lib/admissions";

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
        lastActivityAt: new Date(),
        name: cleanText(data.name, 120) || application.name,
        phone: cleanText(data.phone, 20) || application.phone,
        email: cleanText(data.email, 160),
        gender: cleanText(data.gender, 30),
        addressLine: cleanText(data.addressLine, 300),
        city: cleanText(data.city, 80),
        district: cleanText(data.district, 80),
        state: cleanText(data.state, 80),
        pinCode: cleanText(data.pinCode, 10),
        guardianName: cleanText(data.guardianName, 120),
        guardianRelation: cleanText(data.guardianRelation, 50),
        guardianPhone: cleanText(data.guardianPhone, 20),
        emergencyPhone: cleanText(data.emergencyPhone, 20),
        board: cleanText(data.board, 100),
        schoolName: cleanText(data.schoolName, 180),
        passingYear: data.passingYear && Number.isFinite(Number(data.passingYear)) ? Number(data.passingYear) : null,
        seatNumber: cleanText(data.seatNumber, 60),
        percentage: data.percentage && Number.isFinite(Number(data.percentage)) ? Number(data.percentage) : null,
        category: cleanText(data.category, 50),
        scienceConfirmed: data.scienceConfirmed === true,
        declarationAccepted: data.declarationAccepted === true,
        paymentTxnRef: cleanText(data.paymentTxnRef, 100),
        paymentProofUrl: cleanText(data.paymentProofUrl, 500),
        contactConsent: true,
        callbackStatus: application.callbackStatus === "NEW_LEAD" ? "APPLICATION_IN_PROGRESS" : application.callbackStatus,
      };
      const dateOfBirth = cleanText(data.dateOfBirth, 10);
      const paymentDate = cleanText(data.paymentDate, 10);
      autosaveUpdate.dateOfBirth = dateOfBirth ? new Date(`${dateOfBirth}T00:00:00.000Z`) : null;
      autosaveUpdate.paymentDate = paymentDate ? new Date(`${paymentDate}T00:00:00.000Z`) : null;

      if (data.courseId && data.courseId !== application.courseId) {
        const course = await prisma.course.findFirst({ where: { id: data.courseId, isActive: true } });
        if (course) {
          autosaveUpdate.courseId = course.id;
          autosaveUpdate.paymentAmount = course.fees;
          if (data.batchId) {
            const batch = await prisma.batch.findFirst({ where: { id: data.batchId, courseId: course.id, isActive: true } });
            autosaveUpdate.batchId = batch?.id ?? null;
          }
        }
      }

      if (data.batchId) {
        const selectedCourseId = (autosaveUpdate.courseId as string | undefined) ?? application.courseId;
        const selectedBatchId = cleanText(data.batchId, 80);
        const batch = selectedBatchId
          ? await prisma.batch.findFirst({
              where: { id: selectedBatchId, courseId: selectedCourseId, isActive: true },
              select: { id: true },
            })
          : null;
        autosaveUpdate.batchId = batch?.id ?? null;
      } else {
        autosaveUpdate.batchId = null;
      }

      await prisma.admissionApplication.update({ where: { id }, data: autosaveUpdate });
      return NextResponse.json({ success: true, savedAt: new Date().toISOString() });
    }

    if (step === 1) {
      if (!cleanText(data.name, 120) || !cleanText(data.phone, 20) || !cleanText(data.courseId, 80)) {
        return NextResponse.json({ error: "Complete course and contact details." }, { status: 400 });
      }
      Object.assign(update, { currentStep: 2, completionPercent: 25, callbackStatus: "APPLICATION_IN_PROGRESS" });
    } else if (step === 2) {
      const dateOfBirth = cleanText(data.dateOfBirth, 10);
      const addressLine = cleanText(data.addressLine, 300);
      const city = cleanText(data.city, 80);
      const district = cleanText(data.district, 80);
      const state = cleanText(data.state, 80);
      const pinCode = cleanText(data.pinCode, 10);
      const guardianName = cleanText(data.guardianName, 120);
      const guardianPhone = cleanText(data.guardianPhone, 20);
      if (!dateOfBirth || !cleanText(data.gender, 30) || !addressLine || !city || !district || !state || !pinCode || !guardianName || !guardianPhone) {
        return NextResponse.json({ error: "Complete all required personal and guardian details." }, { status: 400 });
      }
      if (!/^\d{6}$/.test(pinCode)) return NextResponse.json({ error: "Enter a valid six-digit PIN code." }, { status: 400 });
      Object.assign(update, {
        dateOfBirth: new Date(`${dateOfBirth}T00:00:00.000Z`),
        gender: cleanText(data.gender, 30),
        addressLine,
        city,
        district,
        state,
        pinCode,
        guardianName,
        guardianRelation: cleanText(data.guardianRelation, 50),
        guardianPhone,
        emergencyPhone: cleanText(data.emergencyPhone, 20),
        currentStep: 3,
        completionPercent: 45,
      });
    } else if (step === 3) {
      const board = cleanText(data.board, 100);
      const schoolName = cleanText(data.schoolName, 180);
      const passingYear = Number(data.passingYear);
      const seatNumber = cleanText(data.seatNumber, 60);
      const percentage = Number(data.percentage);
      if (!board || !schoolName || !seatNumber || !Number.isInteger(passingYear) || passingYear < 1980 || passingYear > new Date().getFullYear() || !Number.isFinite(percentage) || percentage <= 0 || percentage > 100 || data.scienceConfirmed !== true) {
        return NextResponse.json({ error: "Enter valid SSC educational details." }, { status: 400 });
      }
      Object.assign(update, {
        board,
        schoolName,
        passingYear,
        seatNumber,
        percentage,
        category: cleanText(data.category, 50),
        scienceConfirmed: data.scienceConfirmed === true,
        currentStep: 4,
        completionPercent: 60,
      });
    } else if (step === 4) {
      const uploadedDocuments = await prisma.admissionDocument.findMany({
        where: { applicationId: id, type: { in: [...requiredAdmissionDocumentTypes] } },
        select: { type: true, aiStatus: true },
      });
      const uploadedTypes = new Set(uploadedDocuments.filter((document) => document.aiStatus !== "REUPLOAD").map((document) => document.type));
      if (requiredAdmissionDocumentTypes.some((type) => !uploadedTypes.has(type))) {
        return NextResponse.json({ error: "Upload all required documents before continuing." }, { status: 400 });
      }
      Object.assign(update, { currentStep: 5, completionPercent: 75 });
    } else if (step === 5) {
      if (data.declarationAccepted !== true) {
        return NextResponse.json({ error: "The declaration must be accepted." }, { status: 400 });
      }
      Object.assign(update, {
        declarationAccepted: true,
        currentStep: 6,
        completionPercent: 85,
      });
    } else if (step === 6) {
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
        where: { applicationId: id, type: { in: [...requiredAdmissionDocumentTypes] } },
        select: { type: true, aiStatus: true },
      });
      const uploadedTypes = new Set(uploadedDocuments.filter((document) => document.aiStatus !== "REUPLOAD").map((document) => document.type));
      const missing = requiredAdmissionDocumentTypes.filter((type) => !uploadedTypes.has(type));
      if (missing.length > 0) {
        return NextResponse.json({ error: "Upload all required documents before submitting." }, { status: 400 });
      }
      Object.assign(update, {
        paymentTxnRef,
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
  } catch {
    return NextResponse.json({ error: "Unable to save this step. Please try again." }, { status: 500 });
  }
}
