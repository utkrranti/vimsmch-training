import { randomInt } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, adminOtpHtml } from "@/lib/email";

const RESEND_COOLDOWN_MS = 45_000;
const OTP_TTL_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email) return NextResponse.json({ error: "Enter your email address." }, { status: 400 });

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) return NextResponse.json({ error: "No admin account found for this email." }, { status: 404 });

    const recent = await prisma.adminOtp.findFirst({
      where: { email, createdAt: { gte: new Date(Date.now() - RESEND_COOLDOWN_MS) } },
      orderBy: { createdAt: "desc" },
    });
    if (recent) return NextResponse.json({ error: "A code was already sent. Please wait a moment before requesting another." }, { status: 429 });

    const code = String(randomInt(100000, 1000000));
    await prisma.adminOtp.create({ data: { email, code, expiresAt: new Date(Date.now() + OTP_TTL_MS) } });
    await sendEmail({ to: email, subject: `Your admin login code: ${code}`, html: adminOtpHtml(admin.name, code) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send admin OTP", error);
    return NextResponse.json({ error: "Unable to send the login code. Please try again." }, { status: 500 });
  }
}
