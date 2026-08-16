import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TOKEN = "a17c4e0b9d2f6318a5c7e9b0d4f2a6183c5e7b9d0f2a4c6e8b1d3f5a7c9e0b2d4";

export async function POST(request: Request) {
  if (request.headers.get("x-token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const email = "staffoffr.vimsmch@gmail.com";
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ status: "already exists", user: existing });
  }

  const created = await prisma.adminUser.create({
    data: { email, name: "Staff Office", role: "SUPER_ADMIN" },
  });
  return NextResponse.json({ status: "created", user: created });
}
