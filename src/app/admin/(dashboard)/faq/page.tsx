import { prisma } from "@/lib/prisma";
import { HelpCircle } from "lucide-react";
import FaqManager from "./FaqManager";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "FAQ | Admin" };

export default async function AdminFaqPage() {
  const items = await prisma.faqItem.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <HelpCircle size={22} className="text-[#04415f]" /> FAQ
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">{items.length} question{items.length !== 1 ? "s" : ""} · shown on /faq</p>
      </div>
      <FaqManager items={items} />
    </div>
  );
}
