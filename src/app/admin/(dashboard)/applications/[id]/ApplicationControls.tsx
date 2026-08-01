"use client";

import { useState, useTransition } from "react";
import { Download, FileArchive, Loader2, PhoneCall, Save, UserPlus } from "lucide-react";
import { addFollowUp, convertToEnrollment, updateApplication } from "../actions";
import { applicationStatuses, callbackStatuses, paymentStatuses } from "@/lib/admissions";

const field = "w-full rounded-xl border border-[#dce6eb] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2086b8]";
type Application = { id: string; status: string; callbackStatus: string; paymentStatus: string; assignedTo: string | null; nextCallbackAt: Date | null; enrollmentId: string | null };

export default function ApplicationControls({ application }: { application: Application }) {
  const [status, setStatus] = useState(application.status), [callbackStatus, setCallbackStatus] = useState(application.callbackStatus), [paymentStatus, setPaymentStatus] = useState(application.paymentStatus);
  const [assignedTo, setAssignedTo] = useState(application.assignedTo ?? ""), [nextCallbackAt, setNextCallbackAt] = useState(application.nextCallbackAt ? new Date(application.nextCallbackAt.getTime() - application.nextCallbackAt.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "");
  const [note, setNote] = useState(""), [outcome, setOutcome] = useState("CONTACTED"), [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const run = (job: () => Promise<void>, success: string) => startTransition(async () => { try { setMessage(""); await job(); setMessage(success); } catch (error) { setMessage(error instanceof Error ? error.message : "Action failed"); } });

  return <div className="space-y-5">
    <div className="rounded-2xl border border-[#b8dfea] bg-[#edf8fc] p-5 shadow-sm">
      <h2 className="flex items-center gap-2 font-bold text-[#04415f]"><FileArchive size={18}/>Complete admission package</h2>
      <p className="mt-2 text-xs leading-relaxed text-[#010608]/55">Download the filled admission form, all uploaded documents, and payment proof in one ZIP.</p>
      <a href={`/api/admin/applications/${application.id}/download`} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#04415f] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#065a82]"><Download size={17}/>Download complete ZIP</a>
    </div>
    <div className="rounded-2xl border border-[#e2eaee] bg-white p-5 shadow-sm"><h2 className="font-bold text-[#011e2c]">Application status</h2><div className="mt-4 grid gap-3 sm:grid-cols-2"><Select label="Application" value={status} options={[...applicationStatuses]} onChange={setStatus}/><Select label="Callback" value={callbackStatus} options={[...callbackStatuses]} onChange={setCallbackStatus}/><Select label="Payment" value={paymentStatus} options={[...paymentStatuses]} onChange={setPaymentStatus}/><label><span className="mb-1 block text-xs font-semibold text-[#010608]/50">Assigned staff</span><input className={field} value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)} placeholder="Staff name"/></label><label className="sm:col-span-2"><span className="mb-1 block text-xs font-semibold text-[#010608]/50">Next callback</span><input className={field} type="datetime-local" value={nextCallbackAt} onChange={(event) => setNextCallbackAt(event.target.value)}/></label></div><button disabled={pending} onClick={() => run(() => updateApplication(application.id, { status, callbackStatus, paymentStatus, assignedTo, nextCallbackAt }), "Application updated.")} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#04415f] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">{pending ? <Loader2 size={15} className="animate-spin"/> : <Save size={15}/>} Save status</button></div>
    <div className="rounded-2xl border border-[#e2eaee] bg-white p-5 shadow-sm"><h2 className="flex items-center gap-2 font-bold text-[#011e2c]"><PhoneCall size={17}/>Log callback</h2><div className="mt-4 space-y-3"><Select label="Outcome" value={outcome} options={[...callbackStatuses]} onChange={setOutcome}/><label><span className="mb-1 block text-xs font-semibold text-[#010608]/50">Call note</span><textarea className={`${field} min-h-24`} value={note} onChange={(event) => setNote(event.target.value)} placeholder="What was discussed?"/></label><button disabled={pending} onClick={() => run(async () => { await addFollowUp(application.id, { outcome, note, nextCallbackAt }); setNote(""); }, "Callback saved.")} className="inline-flex items-center gap-2 rounded-xl border border-[#04415f] px-4 py-2.5 text-sm font-bold text-[#04415f] disabled:opacity-60"><PhoneCall size={15}/>Save callback</button></div></div>
    {!application.enrollmentId && <button disabled={pending || paymentStatus !== "VERIFIED"} onClick={() => run(() => convertToEnrollment(application.id), "Student enrolled successfully.")} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"><UserPlus size={17}/>Convert to Enrollment</button>}
    {message && <p className="rounded-xl bg-[#edf8fc] p-3 text-sm font-medium text-[#04415f]">{message}</p>}
  </div>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label><span className="mb-1 block text-xs font-semibold text-[#010608]/50">{label}</span><select className={field} value={value} onChange={(event) => onChange(event.target.value)}>{options.map(option => <option key={option} value={option}>{option.replaceAll("_", " ")}</option>)}</select></label>;
}
