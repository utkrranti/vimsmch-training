export const admissionDocuments = [
  { type: "SSC_MARKSHEET", label: "SSC (10th) Mark Sheet", required: true },
  { type: "SSC_CERTIFICATE", label: "SSC (10th) Certificate", required: true },
  { type: "LEAVING_CERTIFICATE", label: "School Leaving / Transfer Certificate", required: true },
  { type: "AADHAAR", label: "Aadhaar Card", required: true },
  { type: "PHOTO", label: "Recent Passport-Size Photograph", required: true },
  { type: "MEDICAL_FITNESS", label: "Medical Fitness Certificate", required: true },
  { type: "DOMICILE", label: "Domicile Certificate", required: false },
  { type: "CASTE", label: "Caste Certificate", required: false },
  { type: "NON_CREAMY_LAYER", label: "Non-Creamy Layer Certificate", required: false },
  { type: "CHARACTER", label: "Character Certificate", required: false },
] as const;

export const requiredAdmissionDocumentTypes = admissionDocuments
  .filter((document) => document.required)
  .map((document) => document.type);

export const applicationStatuses = [
  "DRAFT",
  "SUBMITTED",
  "DOCUMENT_VERIFICATION",
  "CORRECTION_REQUIRED",
  "APPROVED",
  "REJECTED",
  "ENROLLED",
] as const;

export const callbackStatuses = [
  "NEW_LEAD",
  "CALL_PENDING",
  "CONTACTED",
  "CALL_BACK_LATER",
  "NOT_REACHABLE",
  "INTERESTED",
  "NOT_INTERESTED",
  "APPLICATION_IN_PROGRESS",
  "APPLICATION_SUBMITTED",
  "ADMITTED",
] as const;

export const paymentStatuses = ["NOT_STARTED", "UNDER_REVIEW", "VERIFIED", "REJECTED"] as const;

export function makeApplicationNumber() {
  return `VTC-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export function cleanText(value: unknown, maxLength = 250): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().slice(0, maxLength);
  return cleaned || null;
}
