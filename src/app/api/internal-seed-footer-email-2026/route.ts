import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TOKEN = "c39f7a1e5d8b2046f9a3c7e1b5d9f2046a8c0e4b7d1f3a5c9e2b6d8f0a4c7e9b1d";

export async function POST(request: Request) {
  if (request.headers.get("x-token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const updated = await prisma.setting.upsert({
    where: { key: "contact.footerEmail" },
    update: { value: "paramedical.vimsmch@gmail.com" },
    create: { key: "contact.footerEmail", value: "paramedical.vimsmch@gmail.com" },
  });

  return NextResponse.json({ status: "seeded", setting: updated });
}
