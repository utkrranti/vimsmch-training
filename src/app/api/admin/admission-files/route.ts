import { get } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = request.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing file URL." }, { status: 400 });
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || !parsed.hostname.endsWith(".blob.vercel-storage.com")) {
      return NextResponse.json({ error: "Invalid file URL." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid file URL." }, { status: 400 });
  }

    const blobToken = process.env.ADMISSION_BLOB_READ_WRITE_TOKEN;
    if (!blobToken) return NextResponse.json({ error: "Private admission storage is not configured." }, { status: 503 });
    const result = await get(url, { access: "private", token: blobToken });
  if (!result?.stream) return NextResponse.json({ error: "File not found." }, { status: 404 });

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": result.headers.get("content-disposition") || "inline",
      "Cache-Control": "private, no-store",
    },
  });
}
