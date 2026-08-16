import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TOKEN = "b28d5f1c0a3e7429b6d8f0a2c4e6819357b9d1f3a5c7e9b0d2f4a6c8e0b2d4f6";

export async function POST(request: Request) {
  if (request.headers.get("x-token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const updated = await prisma.adminUser.update({
    where: { email: "staffoffr.vimsmch@gmail.com" },
    data: { role: "EDITOR" },
  });

  return NextResponse.json({ status: "updated", user: updated });
}
