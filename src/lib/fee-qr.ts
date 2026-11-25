/**
 * Fee-payment QR code.
 *
 * The QR is normally managed from Admin → Settings → Admission, which stores a
 * blob URL in the `admission.feeQrUrl` setting. Until that is uploaded the
 * setting is empty, which previously hid the QR everywhere. This bundled copy
 * is the fallback so the QR is always available; an uploaded one overrides it.
 */
export const DEFAULT_FEE_QR_URL = "/images/fee-payment-qr.png";

export function resolveFeeQrUrl(setting?: string | null): string {
  const value = setting?.trim();
  return value && value.length > 0 ? value : DEFAULT_FEE_QR_URL;
}
