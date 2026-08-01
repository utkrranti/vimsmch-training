"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { applicationStatuses, callbackStatuses, paymentStatuses } from "@/lib/admissions";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");
  return session.user;
}

export async function updateApplication(id: string, input: { status: string; callbackStatus: string; paymentStatus: string; assignedTo?: string; nextCallbackAt?: string }) {
  await requireAdmin();
  if (!applicationStatuses.includes(input.status as (typeof applicationStatuses)[number])) throw new Error("Invalid application status");
  if (!callbackStatuses.includes(input.callbackStatus as (typeof callbackStatuses)[number])) throw new Error("Invalid callback status");
  if (!paymentStatuses.includes(input.paymentStatus as (typeof paymentStatuses)[number])) throw new Error("Invalid payment status");

  await prisma.admissionApplication.update({
    where: { id },
    data: {
      status: input.status,
      callbackStatus: input.callbackStatus,
      paymentStatus: input.paymentStatus,
      assignedTo: input.assignedTo?.trim() || null,
      nextCallbackAt: input.nextCallbackAt ? new Date(input.nextCallbackAt) : null,
    },
  });
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${id}`);
}

export async function addFollowUp(id: string, input: { outcome: string; note?: string; nextCallbackAt?: string }) {
  const admin = await requireAdmin();
  const outcome = input.outcome.trim();
  if (!outcome) throw new Error("Outcome is required");

  await prisma.admissionFollowUp.create({
    data: {
      applicationId: id,
      outcome,
      note: input.note?.trim() || null,
      nextCallbackAt: input.nextCallbackAt ? new Date(input.nextCallbackAt) : null,
      createdBy: admin.name || admin.email || "Admin",
    },
  });
  await prisma.admissionApplication.update({
    where: { id },
    data: {
      callbackStatus: outcome,
      lastContactedAt: new Date(),
      nextCallbackAt: input.nextCallbackAt ? new Date(input.nextCallbackAt) : null,
    },
  });
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${id}`);
}

export async function reviewDocument(applicationId: string, documentId: string, status: "VERIFIED" | "REJECTED", remark?: string) {
  await requireAdmin();
  await prisma.admissionDocument.update({
    where: { id: documentId },
    data: { status, adminRemark: remark?.trim() || null },
  });
  revalidatePath(`/admin/applications/${applicationId}`);
}

export async function convertToEnrollment(id: string) {
  await requireAdmin();
  const application = await prisma.admissionApplication.findUnique({ where: { id } });
  if (!application) throw new Error("Application not found");
  if (application.enrollmentId) return;
  if (application.paymentStatus !== "VERIFIED") throw new Error("Verify payment before enrollment");

  const enrollment = await prisma.enrollment.create({
    data: {
      name: application.name,
      email: application.email || `${application.phone.replace(/\D/g, "")}@pending.local`,
      phone: application.phone,
      courseId: application.courseId,
      batchId: application.batchId,
      status: "CONFIRMED",
    },
  });
  await prisma.admissionApplication.update({
    where: { id },
    data: { status: "ENROLLED", callbackStatus: "ADMITTED", enrollmentId: enrollment.id },
  });
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${id}`);
  revalidatePath("/admin/enrollments");
}
