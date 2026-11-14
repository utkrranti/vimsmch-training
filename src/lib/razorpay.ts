import { createHmac, timingSafeEqual } from "crypto";

// Online fee payments go through Razorpay's REST API. The gateway stays switched off
// (and the "Pay online" button hidden) until both keys are set in the environment.
const keyId = process.env.RAZORPAY_KEY_ID?.trim() ?? "";
const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() ?? "";

export const isRazorpayEnabled = () => keyId !== "" && keySecret !== "";
export const razorpayPublicKeyId = () => (isRazorpayEnabled() ? keyId : undefined);

async function razorpayRequest<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.error?.description ?? `Razorpay request failed (${response.status})`);
  return result as T;
}

export type RazorpayOrder = { id: string; amount: number; currency: string; receipt: string; status: string };
export type RazorpayPayment = { id: string; order_id: string; amount: number; currency: string; status: string; method?: string };

export function createRazorpayOrder(amountRupees: number, receipt: string, notes: Record<string, string>) {
  return razorpayRequest<RazorpayOrder>("/orders", {
    method: "POST",
    body: { amount: amountRupees * 100, currency: "INR", receipt: receipt.slice(0, 40), notes },
  });
}

export function fetchRazorpayPayment(paymentId: string) {
  return razorpayRequest<RazorpayPayment>(`/payments/${encodeURIComponent(paymentId)}`);
}

// Accounts set to manual capture leave payments "authorized"; capture them so they settle
// instead of auto-refunding after a few days.
export async function ensureRazorpayCaptured(payment: RazorpayPayment) {
  if (payment.status !== "authorized") return payment;
  return razorpayRequest<RazorpayPayment>(`/payments/${encodeURIComponent(payment.id)}/capture`, {
    method: "POST",
    body: { amount: payment.amount, currency: payment.currency },
  });
}

// Checkout returns HMAC_SHA256(order_id + "|" + payment_id, key_secret) as razorpay_signature.
export function isValidRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  const expected = createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
