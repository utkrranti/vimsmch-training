import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import AdmissionWizard from "@/components/admission/AdmissionWizard";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/db/settings";
import { UserPlus } from "lucide-react";
import enAdmissionWizard from "@/messages/en/admissionWizard.json";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "New Application | Admin" };

export default async function AdminNewApplicationPage() {
  const [courses, settings] = await Promise.all([
    prisma.course.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        fees: true,
        eligibility: true,
        durationMonths: true,
        batches: {
          where: { isActive: true },
          orderBy: { startDate: "asc" },
          select: { id: true, label: true, startDate: true, seats: true },
        },
      },
    }),
    getSettings(["admission.feeQrUrl"]),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-[#011e2c]"><UserPlus size={23} className="text-[#04415f]" /> New Application</h1>
        <p className="mt-1 text-sm text-[#010608]/45">
          Fill this in on behalf of a student — e.g. a walk-in or phone applicant. The exact same form the public site uses.
          Your admin account will be recorded against this application as the one who filled it in.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-[#e2eaee] bg-white shadow-sm">
        {/* Admin tool stays English regardless of the public site's locale toggle. */}
        <NextIntlClientProvider locale="en" messages={{ admissionWizard: enAdmissionWizard }}>
          <AdmissionWizard
            adminMode
            courses={courses.map((course) => ({
              id: course.id,
              slug: course.slug,
              title: course.title,
              fees: course.fees,
              eligibility: course.eligibility,
              durationMonths: course.durationMonths,
              batches: course.batches.map((batch) => ({
                id: batch.id,
                label: batch.label,
                startDate: batch.startDate.toISOString(),
                seats: batch.seats,
              })),
            }))}
            feeQrUrl={settings["admission.feeQrUrl"]}
          />
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
