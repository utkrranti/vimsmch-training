import Link from "next/link";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import DeleteApplicationButton from "./DeleteApplicationButton";
import { formatDateTimeIST } from "@/lib/date";

type ApplicationRow = {
  id: string;
  applicationNo: string;
  name: string;
  phone: string;
  status: string;
  callbackStatus: string;
  paymentStatus: string;
  completionPercent: number;
  currentStep: number;
  assignedTo: string | null;
  nextCallbackAt: Date | null;
  lastActivityAt: Date;
  submittedAt: Date | null;
  createdAt: Date;
  course: { title: string };
};

const badge = (value: string) => value.replaceAll("_", " ");

export default function ApplicationTable({ applications }: { applications: ApplicationRow[] }) {
  if (!applications.length) return <p className="px-6 py-14 text-center text-sm text-[#010608]/40">No applications match this filter.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-[#e6edf0] bg-[#f1f5f7]">
          <tr>{["Applicant", "Course", "Progress", "Callback", "Payment", "Applied On", "Next Call", ""].map((heading) => <th key={heading} className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[#010608]/45">{heading}</th>)}</tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id} className="border-b border-[#e6edf0] bg-white transition hover:bg-[#f8fafb]">
              <td className="px-5 py-4"><p className="font-semibold text-[#011e2c]">{application.name}</p><p className="mt-0.5 text-xs text-[#010608]/45">{application.applicationNo}</p><a href={`tel:${application.phone}`} className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#2086b8]"><PhoneCall size={11} />{application.phone}</a></td>
              <td className="px-5 py-4 text-xs font-medium text-[#04415f]">{application.course.title}</td>
              <td className="min-w-40 px-5 py-4"><div className="mb-1 flex justify-between text-[10px] text-[#010608]/45"><span>Step {application.currentStep}/6</span><span>{application.completionPercent}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#e6edf0]"><div className="h-full rounded-full bg-[#2086b8]" style={{ width: `${application.completionPercent}%` }} /></div><span className="mt-1.5 inline-block text-[10px] font-bold text-[#04415f]">{badge(application.status)}</span></td>
              <td className="px-5 py-4"><span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700">{badge(application.callbackStatus)}</span>{application.assignedTo && <p className="mt-1 text-[10px] text-[#010608]/40">{application.assignedTo}</p>}</td>
              <td className="px-5 py-4"><span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-700">{badge(application.paymentStatus)}</span></td>
              <td className="whitespace-nowrap px-5 py-4 text-xs text-[#010608]/55">{formatDateTimeIST(application.submittedAt ?? application.createdAt, { dateStyle: "medium", timeStyle: "short" })}</td>
              <td className="whitespace-nowrap px-5 py-4 text-xs text-[#010608]/55">{application.nextCallbackAt ? formatDateTimeIST(application.nextCallbackAt, { dateStyle: "medium", timeStyle: "short" }) : "—"}</td>
              <td className="px-5 py-4"><div className="flex items-center gap-2"><Link href={`/admin/applications/${application.id}`} className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-bold text-[#04415f] hover:text-[#2086b8]">Open <ArrowUpRight size={13} /></Link><DeleteApplicationButton id={application.id} name={application.name} compact /></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
