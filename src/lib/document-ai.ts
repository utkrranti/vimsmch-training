import { get } from "@vercel/blob";

export type DocumentAiResult = {
  status: "ACCEPTABLE" | "REVIEW" | "REUPLOAD";
  score: number;
  visibilityScore: number;
  authenticity: "NO_OBVIOUS_CONCERNS" | "CONCERNS" | "INDETERMINATE";
  summary: string;
  issues: string[];
};

function responseText(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const output = (payload as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> }).output;
  for (const item of output ?? []) for (const content of item.content ?? []) {
    if (content.type === "output_text" && content.text) return content.text;
  }
  return null;
}

export async function validateAdmissionDocument(fileUrl: string, fileName: string, expectedLabel: string): Promise<DocumentAiResult> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPEN_AI_APIKEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");
  const blobToken = process.env.ADMISSION_BLOB_READ_WRITE_TOKEN;
  if (!blobToken) throw new Error("ADMISSION_BLOB_READ_WRITE_TOKEN is not configured.");
  const blob = await get(fileUrl, { access: "private", token: blobToken });
  if (!blob) throw new Error("Uploaded document could not be read.");
  if ((blob.blob.size ?? 0) > 5 * 1024 * 1024) throw new Error("Document exceeds the AI validation size limit.");
  const bytes = Buffer.from(await new Response(blob.stream).arrayBuffer());
  const contentType = blob.blob.contentType || "application/octet-stream";
  const encoded = bytes.toString("base64");
  const fileContent = contentType === "application/pdf"
    ? { type: "input_file", filename: fileName, file_data: `data:application/pdf;base64,${encoded}` }
    : { type: "input_image", image_url: `data:${contentType};base64,${encoded}`, detail: "high" };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_DOCUMENT_MODEL || "gpt-5.6-terra",
      store: false,
      reasoning: { effort: "low" },
      input: [{ role: "user", content: [
        { type: "input_text", text: `Screen this upload as an expected \"${expectedLabel}\" for a vocational-course admission.

Perform two bounded checks:
1. Visibility and completeness: legibility, focus, resolution, lighting, orientation, complete uncropped edges/pages, not blank or unrelated, and normally expected fields being visible.
2. Standard-level authenticity indicators only: whether the document generally resembles its expected category; expected headings, layout, issuing-body details, seals, stamps, signatures, dates, numbering and formatting where normally applicable; internal consistency; and obvious visible editing, compositing, font, alignment, or tampering anomalies.

There is no issuing-authority, university, government, QR, signature, or results database lookup. Never claim that a document is genuine or forged. Set authenticity to NO_OBVIOUS_CONCERNS only when no obvious visual concern is present, CONCERNS when specific visible anomalies exist, and INDETERMINATE when image quality or limited evidence prevents assessment. Do not infer sensitive traits or reject merely because some personal values are obscured.

ACCEPTABLE means clearly usable with no obvious visual authenticity concern. REVIEW means uncertain, authenticity is indeterminate, or staff should inspect a specific concern. REUPLOAD means plainly wrong, unreadable, blank, materially cropped, or too poor to assess. Give a brief student-friendly summary and at most four specific issues.` },
        fileContent,
      ] }],
      text: { format: { type: "json_schema", name: "document_quality_review", strict: true, schema: {
        type: "object", additionalProperties: false,
        properties: {
          status: { type: "string", enum: ["ACCEPTABLE", "REVIEW", "REUPLOAD"] },
          score: { type: "integer", minimum: 0, maximum: 100 },
          visibilityScore: { type: "integer", minimum: 0, maximum: 100 },
          authenticity: { type: "string", enum: ["NO_OBVIOUS_CONCERNS", "CONCERNS", "INDETERMINATE"] },
          summary: { type: "string" },
          issues: { type: "array", items: { type: "string" }, maxItems: 4 },
        },
        required: ["status", "score", "visibilityScore", "authenticity", "summary", "issues"],
      } } },
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(typeof payload?.error?.message === "string" ? payload.error.message : "OpenAI document validation failed.");
  const text = responseText(payload);
  if (!text) throw new Error("OpenAI returned no validation result.");
  return JSON.parse(text) as DocumentAiResult;
}
