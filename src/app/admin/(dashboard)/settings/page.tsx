import { prisma } from "@/lib/prisma";
import { Settings } from "lucide-react";
import SettingsForm from "./SettingsForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Settings | Admin" };

const ALL_KEYS = [
  "about.mission", "about.established",
  "leadership.chairman.name", "leadership.chairman.message",
  "leadership.secretaryGeneral.name", "leadership.secretaryGeneral.message",
  "leadership.director.name", "leadership.director.message",
  "contact.whatsapp", "contact.admissionHelpline",
  "prospectus.pdfUrl",
  "admission.formUrl", "admission.feeQrUrl",
  "placements.about", "placements.philosophy", "placements.assistance", "placements.careerSupport",
  "antiragging.helpline", "antiragging.email", "antiragging.portalUrl",
];

export default async function AdminSettingsPage() {
  const rows = await prisma.setting.findMany({ where: { key: { in: ALL_KEYS } } });
  const initial = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#011e2c] flex items-center gap-2">
          <Settings size={22} className="text-[#04415f]" /> Site Settings
        </h1>
        <p className="text-[#010608]/45 text-sm mt-1">
          These values populate the public <strong>/about</strong>, <strong>/contact</strong>, and homepage — mission
          statement, leadership messages, contact channels, prospectus, and anti-ragging helpline.
        </p>
      </div>
      <SettingsForm initial={initial} />
    </div>
  );
}
