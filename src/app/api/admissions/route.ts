import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cleanText, makeApplicationNumber } from "@/lib/admissions";
import { getClientIp } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = cleanText(body.name, 120);
    const phone = cleanText(body.phone, 20);
    const email = cleanText(body.email, 160);
    const courseId = cleanText(body.courseId, 80);

    if (!name || !phone || !courseId) {
      return NextResponse.json(
        { error: "Name, phone, and course are required." },
        { status: 400 },
      );
    }
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const course = await prisma.course.findFirst({ where: { id: courseId, isActive: true } });
    if (!course) return NextResponse.json({ error: "Selected course is unavailable." }, { status: 400 });

    const alreadyEnrolled = await prisma.admissionApplication.findFirst({
      where: { phone, status: { in: ["APPROVED", "ENROLLED"] } },
    });
    if (alreadyEnrolled) {
      return NextResponse.json(
        { error: "This mobile number is already enrolled in a course. Contact admissions if you need to apply for another course." },
        { status: 400 },
      );
    }

    const ipAddress = getClientIp(request);
    if (ipAddress) {
      const recent = await prisma.admissionApplication.count({
        where: { ipAddress, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
      });
      if (recent >= 3) {
        return NextResponse.json(
          { error: "Too many applications started. Please try again later." },
          { status: 429 },
        );
      }
    }

    const application = await prisma.admissionApplication.create({
      data: {
        applicationNo: makeApplicationNumber(),
        accessToken: crypto.randomUUID(),
        name,
        phone,
        email,
        courseId,
        contactConsent: true,
        currentStep: 1,
        completionPercent: 15,
        callbackStatus: "NEW_LEAD",
        paymentAmount: 100,
        ipAddress,
      },
      select: { id: true, applicationNo: true, accessToken: true },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    console.error("Failed to create admission application", error);
    return NextResponse.json(
      {
        error: "Unable to start the application. Please try again.",
        ...(process.env.NODE_ENV === "development" && {
          details: error instanceof Error ? error.message : "Unknown server error",
        }),
      },
      { status: 500 },
    );
  }
}
