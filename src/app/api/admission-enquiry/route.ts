import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, inquiryConfirmationHtml, adminNewInquiryHtml } from "@/lib/email";
import { getClientIp, isRateLimited } from "@/lib/ratelimit";

// Dedicated recipient for this form — intentionally independent of
// ADMIN_NOTIFY_EMAIL so it keeps going here regardless of that setting.
const ADMISSIONS_EMAIL = "admissions@dbvpu.com";
const DEAN_EMAIL = "dean.vimsmch@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const ipAddress = getClientIp(req);
    if (await isRateLimited(ipAddress)) {
      return NextResponse.json(
        { error: "Too many enquiries submitted. Please try again later." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }

    const body = await req.json();
    const { name, phone, email, course, message, website } = body;

    // Honeypot — real visitors never fill this hidden field.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      return NextResponse.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const courseName: string | null = course?.trim() || null;
    const combinedMessage = [
      courseName ? `Programme of interest: ${courseName}` : null,
      message?.trim() || null,
    ]
      .filter(Boolean)
      .join("\n\n") || null;

    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        message: combinedMessage,
        status: "PENDING",
        ipAddress,
      },
    });

    const emailJobs: Promise<void>[] = [];

    if (email?.trim()) {
      emailJobs.push(
        sendEmail({
          to: email.trim(),
          subject: "Your admission enquiry has been received — VIMSMCH Paramedical Institute",
          html: inquiryConfirmationHtml(name.trim(), courseName ?? undefined),
        }),
      );
    }

    emailJobs.push(
      sendEmail({
        to: ADMISSIONS_EMAIL,
        cc: DEAN_EMAIL,
        subject: `New Admission Enquiry from ${name.trim()}`,
        html: adminNewInquiryHtml({
          name: name.trim(),
          phone: phone.trim(),
          email,
          courseName,
          message: message?.trim() || null,
        }),
      }),
    );

    // Fire-and-forget — don't block the response on email delivery.
    Promise.allSettled(emailJobs).catch(() => {});

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
