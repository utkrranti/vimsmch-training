"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendEmail, inquiryReplyHtml } from "@/lib/email";

export async function updateInquiryStatus(id: string, status: string) {
  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: string) {
  await prisma.inquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
}

export async function sendInquiryReply(id: string, replyMessage: string): Promise<{ ok: boolean; error?: string }> {
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { course: { select: { title: true } } },
  });

  if (!inquiry) return { ok: false, error: "Inquiry not found." };
  if (!inquiry.email) return { ok: false, error: "This inquiry has no email address." };

  try {
    await sendEmail({
      to: inquiry.email,
      subject: `Response to your enquiry — VIMSMCH Paramedical Institute`,
      html: inquiryReplyHtml(inquiry.name, inquiry.course?.title ?? null, replyMessage),
    });

    // Mark as CONTACTED after a reply is sent
    await prisma.inquiry.update({ where: { id }, data: { status: "CONTACTED" } });
    revalidatePath("/admin/inquiries");

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to send email." };
  }
}
