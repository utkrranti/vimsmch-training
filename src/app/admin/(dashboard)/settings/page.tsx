import { prisma } from "@/lib/prisma";
import { Settings } from "lucide-react";
import SettingsForm from "./SettingsForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Settings | Admin" };

const ALL_KEYS = [
  "about.mission", "about.established", "about.naac", "about.affiliation",
  "about.ugc2f", "about.ugc12b", "about.nsqf",
  "grievance.officerName", "grievance.officerDesignation",
  "grievance.officerEmail", "grievance.officerPhone", "grievance.portalUrl",
  "icc.chairpersonName", "icc.chairpersonDesignation",
  "icc.chairpersonEmail", "icc.description",
  "rti.pioName", "rti.pioDesignation", "rti.pioEmail",
  "rti.firstAppealOfficerName", "rti.firstAppealOfficerDesignation",
  "antiragging.helpline", "antiragging.email",
  "antiragging.portalUrl", "antiragging.committeeChairperson",
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
          These values populate the public <strong>/about</strong> page — UGC mandatory disclosures, grievance officer, ICC, RTI, and anti-ragging details.
        </p>
      </div>
      <SettingsForm initial={initial} />
    </div>
  );
}
