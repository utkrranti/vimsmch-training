import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SEED_SECRET = "cfdeb47b69fc26c61b349daaa17e4bacd874f7ab";

export async function POST(request: Request) {
  if (request.headers.get("x-seed-secret") !== SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = "vaishugandlepwad@gmail.com";
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ success: true, skipped: "already exists", id: existing.id });

  const admin = await prisma.adminUser.create({
    data: { email, name: "Vaishu Gandlepwad", role: "EDITOR" },
  });
  return NextResponse.json({ success: true, id: admin.id, email: admin.email });
}
