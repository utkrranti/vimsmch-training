import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, inquiryConfirmationHtml, adminNewInquiryHtml } from "@/lib/email";
import { getClientIp, isRateLimited } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  try {
    const ipAddress = getClientIp(req);
    if (await isRateLimited(ipAddress)) {
      return NextResponse.json(
        { error: "Too many enquiries submitted. Please try again later." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    const body = await req.json();
    const { name, phone, email, courseId, message } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    // Look up course name for emails
    const course = courseId ? await prisma.course.findUnique({ where: { id: courseId }, select: { title: true } }) : null;
    const courseName = course?.title ?? null;

    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        courseId: courseId?.trim() || null,
        message: message?.trim() || null,
        status: "PENDING",
        ipAddress,
      },
    });

    // Send emails in the background — don't block the response
    const emailJobs: Promise<void>[] = [];

    if (email?.trim()) {
      emailJobs.push(sendEmail({
        to: email.trim(),
        subject: `Your enquiry has been received — VIMSMCH Vocational Training`,
        html: inquiryConfirmationHtml(name.trim(), courseName ?? undefined),
      }));
    }

    if (process.env.ADMIN_NOTIFY_EMAIL) {
      emailJobs.push(sendEmail({
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: `New enquiry from ${name.trim()}${courseName ? ` — ${courseName}` : ""}`,
        html: adminNewInquiryHtml({ name: name.trim(), phone: phone.trim(), email, courseName, message }),
      }));
    }

    // Fire-and-forget — don't await, don't fail the request if email fails
    Promise.allSettled(emailJobs).catch(() => {});

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
