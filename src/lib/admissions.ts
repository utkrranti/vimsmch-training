// `labelKey` refers to a key in the admissionWizard message namespace — translate
// with `t(definition.labelKey)` at render time rather than using a literal label here.
export const admissionDocuments = [
  { type: "SSC_MARKSHEET", labelKey: "documentSscMarksheet", required: true },
  { type: "SSC_CERTIFICATE", labelKey: "documentSscCertificate", required: true },
  { type: "LEAVING_CERTIFICATE", labelKey: "documentLeavingCertificate", required: true },
  { type: "AADHAAR", labelKey: "documentAadhaar", required: true },
  { type: "PHOTO", labelKey: "documentPhoto", required: true },
  { type: "MEDICAL_FITNESS", labelKey: "documentMedicalFitness", required: true },
  { type: "DOMICILE", labelKey: "documentDomicile", required: false },
  { type: "CASTE", labelKey: "documentCaste", required: false },
  { type: "NON_CREAMY_LAYER", labelKey: "documentNonCreamyLayer", required: false },
  { type: "CHARACTER", labelKey: "documentCharacter", required: false },
] as const;

export const requiredAdmissionDocumentTypes = admissionDocuments
  .filter((document) => document.required)
  .map((document) => document.type);

export function getRequiredAdmissionDocumentTypes(data: { domicile?: string | null; category?: string | null }) {
  const required: string[] = [...requiredAdmissionDocumentTypes];
  if (data.domicile === "MAHARASHTRA") required.push("DOMICILE");
  if (data.category && !["OPEN", "EWS", "OTHER"].includes(data.category)) {
    required.push("CASTE");
    if (["OBC", "VJNT"].includes(data.category)) required.push("NON_CREAMY_LAYER");
  }
  return required;
}

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
