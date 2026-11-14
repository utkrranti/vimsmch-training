import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cleanText, APPLICATION_FEE_RUPEES } from "@/lib/admissions";
import {
  createRazorpayOrder,
  ensureRazorpayCaptured,
  fetchRazorpayPayment,
  isRazorpayEnabled,
  isValidRazorpaySignature,
  razorpayPublicKeyId,
} from "@/lib/razorpay";

const LOCKED_STATUSES = ["SUBMITTED", "APPROVED", "ENROLLED", "REJECTED"];

async function getAuthorizedApplication(id: string, request: Request) {
  const accessToken = request.headers.get("x-application-token");
  if (!accessToken) return null;
  return prisma.admissionApplication.findFirst({ where: { id, accessToken } });
}

// POST { action: "order" }  → creates a Razorpay order for the application fee.
// POST { action: "verify", razorpay_order_id, razorpay_payment_id, razorpay_signature }
//                           → checks the checkout signature and the payment itself, then marks the fee paid.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isRazorpayEnabled()) return NextResponse.json({ error: "Online payment is not available." }, { status: 503 });

  try {
    const { id } = await params;
    const application = await getAuthorizedApplication(id, request);
    if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });
    if (LOCKED_STATUSES.includes(application.status)) {
      return NextResponse.json({ error: "This application can no longer be edited." }, { status: 409 });
    }

    const body = await request.json().catch(() => ({}));

    if (body.action === "order") {
      if (application.paymentStatus === "VERIFIED") {
        return NextResponse.json({ error: "The application fee is already paid." }, { status: 409 });
      }
      const order = await createRazorpayOrder(APPLICATION_FEE_RUPEES, application.applicationNo, {
        applicationNo: application.applicationNo,
        applicationId: application.id,
      });
      await prisma.admissionApplication.update({
        where: { id },
        data: { paymentTxnRef: order.id, paymentAmount: APPLICATION_FEE_RUPEES, lastActivityAt: new Date() },
      });
      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: razorpayPublicKeyId(),
        prefill: { name: application.name, contact: application.phone, email: application.email ?? "" },
        applicationNo: application.applicationNo,
      });
    }

    if (body.action === "verify") {
      const orderId = cleanText(body.razorpay_order_id, 64) ?? "";
      const paymentId = cleanText(body.razorpay_payment_id, 64) ?? "";
      const signature = cleanText(body.razorpay_signature, 128) ?? "";
      if (!orderId || !paymentId || !signature) return NextResponse.json({ error: "Incomplete payment response." }, { status: 400 });
      if (orderId !== application.paymentTxnRef) return NextResponse.json({ error: "Payment does not match this application." }, { status: 400 });
      if (!isValidRazorpaySignature(orderId, paymentId, signature)) {
        return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
      }

      const payment = await ensureRazorpayCaptured(await fetchRazorpayPayment(paymentId));
      if (payment.order_id !== orderId || payment.amount !== APPLICATION_FEE_RUPEES * 100 || payment.status !== "captured") {
        return NextResponse.json({ error: "Payment is not complete yet. If money was deducted, contact admissions with your application number." }, { status: 400 });
      }

      await prisma.admissionApplication.update({
        where: { id },
        data: {
          paymentStatus: "VERIFIED",
          paymentTxnRef: payment.id,
          paymentAmount: APPLICATION_FEE_RUPEES,
          paymentDate: new Date(),
          lastActivityAt: new Date(),
        },
      });
      return NextResponse.json({ success: true, paymentId: payment.id });
    }

    return NextResponse.json({ error: "Invalid payment action." }, { status: 400 });
  } catch (error) {
    console.error("Admission payment error", error);
    return NextResponse.json({ error: "Unable to process the payment right now. Please try again." }, { status: 502 });
  }
}
