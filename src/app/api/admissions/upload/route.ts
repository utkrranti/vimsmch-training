import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const allowedContentTypes = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp"]);
const maximumSize = 4 * 1024 * 1024;

function withTimeout<T>(promise: Promise<T>, milliseconds: number) {
  return Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Private document storage timed out. Please try again.")), milliseconds)),
  ]);
}

export async function POST(request: Request) {
  try {
    const blobToken = process.env.ADMISSION_BLOB_READ_WRITE_TOKEN;
    if (!blobToken) return NextResponse.json({ error: "Private admission storage is not configured." }, { status: 503 });

    const applicationId = request.headers.get("x-application-id");
    const accessToken = request.headers.get("x-application-token");
    const application = applicationId && accessToken
      ? await prisma.admissionApplication.findFirst({
          where: { id: applicationId, accessToken },
          select: { id: true },
        })
      : null;
    if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });

    const formData = await request.formData();
    const file = formData.get("file");
    const type = formData.get("type");
    if (!(file instanceof File) || typeof type !== "string" || !/^[A-Z_]+$/.test(type)) {
      return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
    }
    if (!allowedContentTypes.has(file.type)) {
      return NextResponse.json({ error: "Upload a PDF, JPG, PNG, or WebP file." }, { status: 400 });
    }
    if (file.size > maximumSize) {
      return NextResponse.json({ error: "Each file must be 4 MB or smaller." }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const blob = await withTimeout(put(`admissions/${application.id}/${type.toLowerCase()}-${safeName}`, file, {
      access: "private",
      addRandomSuffix: true,
      token: blobToken,
    }), 20_000);
    return NextResponse.json({ success: true, blob });
  } catch (error) {
    console.error("Admission upload failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to upload the document." },
      { status: 500 },
    );
  }
}
