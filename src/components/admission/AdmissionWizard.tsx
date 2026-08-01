"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  FileCheck2,
  Loader2,
  LockKeyhole,
  QrCode,
  UploadCloud,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { admissionDocuments, requiredAdmissionDocumentTypes } from "@/lib/admissions";

type CourseOption = {
  id: string;
  slug: string;
  title: string;
  fees: number;
  eligibility: string;
  durationMonths: number;
  batches: Array<{ id: string; label: string; startDate: string; seats: number }>;
};

type WizardData = {
  courseId: string;
  batchId: string;
  name: string;
  phone: string;
  email: string;
  contactConsent: boolean;
  dateOfBirth: string;
  gender: string;
  addressLine: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  emergencyPhone: string;
  board: string;
  schoolName: string;
  passingYear: string;
  seatNumber: string;
  percentage: string;
  category: string;
  scienceConfirmed: boolean;
  declarationAccepted: boolean;
  paymentTxnRef: string;
  paymentDate: string;
  paymentProofUrl: string;
};

type UploadedDocument = { type: string; fileName: string; fileUrl: string; aiStatus?: string | null; aiScore?: number | null; aiVisibilityScore?: number | null; aiAuthenticity?: string | null; aiSummary?: string | null; aiIssues?: string[] };

const steps = ["Course & Contact", "Personal Details", "Education", "Documents", "Review", "Payment"];
const initialData: WizardData = {
  courseId: "", batchId: "", name: "", phone: "", email: "", contactConsent: true,
  dateOfBirth: "", gender: "", addressLine: "", city: "", district: "Ahilyanagar",
  state: "Maharashtra", pinCode: "", guardianName: "", guardianRelation: "",
  guardianPhone: "", emergencyPhone: "", board: "", schoolName: "", passingYear: "",
  seatNumber: "", percentage: "", category: "OPEN", scienceConfirmed: false,
  declarationAccepted: false, paymentTxnRef: "", paymentDate: "", paymentProofUrl: "",
};

const inputClass = "w-full rounded-xl border border-[#cdd8de] bg-white px-4 py-3 text-sm text-[#011e2c] outline-none transition focus:border-[#2086b8] focus:ring-2 focus:ring-[#2086b8]/15";
const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#04415f]/70";

export default function AdmissionWizard({ courses, initialCourseId, feeQrUrl }: { courses: CourseOption[]; initialCourseId?: string; feeQrUrl?: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({ ...initialData, courseId: initialCourseId ?? "" });
  const [applicationId, setApplicationId] = useState("");
  const [applicationNo, setApplicationNo] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState("");
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Saving…" | "Offline">("Saved");
  const creatingDraft = useRef(false);

  /* Restoring a persisted multi-step draft requires hydrating several related state values together. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const saved = window.localStorage.getItem("vimsmch-admission-draft");
    if (!saved) {
      setHydrated(true);
      return;
    }
    try {
      const draft = JSON.parse(saved) as { step: number; data: WizardData; applicationId: string; applicationNo: string; accessToken: string; documents: UploadedDocument[] };
      if (draft.applicationId && draft.accessToken) {
        setStep(draft.step);
        setData(draft.data);
        setApplicationId(draft.applicationId);
        setApplicationNo(draft.applicationNo);
        setAccessToken(draft.accessToken);
        setDocuments(draft.documents ?? []);
      }
    } catch {
      window.localStorage.removeItem("vimsmch-admission-draft");
    } finally {
      setHydrated(true);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return;
    if (step === 7) {
      window.localStorage.removeItem("vimsmch-admission-draft");
      return;
    }
    window.localStorage.setItem("vimsmch-admission-draft", JSON.stringify({ step, data, applicationId, applicationNo, accessToken, documents }));
  }, [hydrated, step, data, applicationId, applicationNo, accessToken, documents]);

  const selectedCourse = useMemo(() => courses.find((course) => course.id === data.courseId), [courses, data.courseId]);

  const setField = <K extends keyof WizardData>(key: K, value: WizardData[K]) => setData((current) => ({ ...current, [key]: value }));

  const createDraft = useCallback(async () => {
    if (applicationId) return { id: applicationId, accessToken, applicationNo };
    if (creatingDraft.current) return null;
    creatingDraft.current = true;
    setSaveStatus("Saving…");
    try {
      const response = await fetch("/api/admissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setApplicationId(result.application.id);
      setApplicationNo(result.application.applicationNo);
      setAccessToken(result.application.accessToken);
      setSaveStatus("Saved");
      return result.application as { id: string; accessToken: string; applicationNo: string };
    } catch (caught) {
      setSaveStatus("Offline");
      setError(caught instanceof Error ? caught.message : "Unable to create your draft.");
      return null;
    } finally {
      creatingDraft.current = false;
    }
  }, [applicationId, applicationNo, accessToken, data]);

  useEffect(() => {
    if (applicationId || !data.courseId || !data.name.trim() || !/^[0-9+\-\s]{10,20}$/.test(data.phone.trim())) return;
    const timer = window.setTimeout(() => { void createDraft(); }, 900);
    return () => window.clearTimeout(timer);
  }, [applicationId, createDraft, data.courseId, data.name, data.phone]);

  useEffect(() => {
    if (!applicationId || !accessToken || step > 6) return;
    const timer = window.setTimeout(async () => {
      setSaveStatus("Saving…");
      try {
        const response = await fetch(`/api/admissions/${applicationId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "x-application-token": accessToken },
          body: JSON.stringify({ autosave: true, step, data }),
        });
        if (!response.ok) throw new Error();
        setSaveStatus("Saved");
      } catch {
        setSaveStatus("Offline");
      }
    }, 700);
    return () => window.clearTimeout(timer);
  }, [applicationId, accessToken, data, step]);

  const validateStep = () => {
    if (step === 1 && (!data.courseId || !data.name.trim() || !data.phone.trim())) return "Select a course and enter the required contact details.";
    if (step === 2 && (!data.dateOfBirth || !data.gender || !data.addressLine || !data.city || !data.pinCode || !data.guardianName || !data.guardianPhone)) return "Complete all required personal, address, and guardian fields.";
    if (step === 3 && (!data.board || !data.schoolName || !data.passingYear || !data.seatNumber || !data.percentage || !data.scienceConfirmed)) return "Complete the educational details and science-subject confirmation.";
    if (step === 4) {
      const present = new Set(documents.filter((document) => document.aiStatus !== "REUPLOAD").map((document) => document.type));
      if (requiredAdmissionDocumentTypes.some((type) => !present.has(type))) return "Upload every required document before continuing.";
    }
    if (step === 5 && !data.declarationAccepted) return "Accept the declaration before continuing.";
    if (step === 6 && (!data.paymentTxnRef || !data.paymentDate || !data.paymentProofUrl)) return "Enter payment details and upload the successful payment screenshot.";
    return "";
  };

  const saveAndContinue = async () => {
    const validationError = validateStep();
    if (validationError) return setError(validationError);
    setError("");
    setBusy(true);
    try {
      let currentId = applicationId;
      let currentToken = accessToken;
      if (!currentId || !currentToken) {
        const draft = await createDraft();
        if (!draft) throw new Error("Please wait while your draft is saved.");
        currentId = draft.id;
        currentToken = draft.accessToken;
      }
      {
        const response = await fetch(`/api/admissions/${currentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "x-application-token": currentToken },
          body: JSON.stringify({ step, data }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        if (step === 6) {
          window.localStorage.removeItem("vimsmch-admission-draft");
          setStep(7);
        } else setStep((current) => current + 1);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const uploadFile = async (file: File, type: string, label: string, payment = false) => {
    if (!applicationId || !accessToken) return setError("Save your contact details before uploading files.");
    if (file.size > 4 * 1024 * 1024) return setError("Each file must be 4 MB or smaller.");
    setError("");
    setUploading(type);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      const uploadResponse = await fetch("/api/admissions/upload", {
        method: "POST",
        headers: { "x-application-id": applicationId, "x-application-token": accessToken },
        body: formData,
      });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadResult.error || "Unable to upload the file.");
      const blob = uploadResult.blob as { url: string };
      if (payment) {
        setField("paymentProofUrl", blob.url);
      } else {
        const response = await fetch(`/api/admissions/${applicationId}/documents`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-application-token": accessToken },
          body: JSON.stringify({ type, fileUrl: blob.url, fileName: file.name }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setDocuments((current) => [...current.filter((item) => item.type !== type), result.document]);
        if (result.document.aiStatus === "REUPLOAD") setError(result.document.aiSummary || `Please upload a clearer ${label}.`);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Unable to upload ${label}.`);
    } finally {
      setUploading("");
    }
  };

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="animate-pulse">
          <div className="h-3 w-32 rounded bg-[#b8dfea]" />
          <div className="mt-4 h-10 w-80 max-w-full rounded-xl bg-[#dcecf2]" />
          <div className="mt-8 h-16 rounded-2xl border border-[#e2eaee] bg-white" />
          <div className="mt-7 h-96 rounded-3xl border border-[#e2eaee] bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  if (step === 7) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <CheckCircle2 size={52} className="mx-auto mb-5 text-emerald-600" />
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Application submitted</p>
          <h1 className="mt-3 text-3xl font-bold text-[#011e2c]">Thank you, {data.name}</h1>
          <p className="mt-4 text-[#010608]/60">Your documents and payment proof are under review. The admissions team may call you for verification.</p>
          <div className="mx-auto mt-7 max-w-sm rounded-2xl bg-[#f1f5f7] p-5">
            <p className="text-xs uppercase tracking-wide text-[#010608]/45">Application number</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#04415f]">{applicationNo}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2086b8]">Online admission</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-[#011e2c] sm:text-4xl">Apply for the 2026 Batch</h1>
        <p className="mt-2 text-sm text-[#010608]/55">Your progress is saved after each step. The admissions team can assist you if needed.</p>
      </div>

      <div className="mb-7 overflow-x-auto rounded-2xl border border-[#e2eaee] bg-white p-4">
        <div className="flex min-w-[680px] items-center">
          {steps.map((label, index) => {
            const number = index + 1;
            const completed = number < step;
            return (
              <div key={label} className="flex flex-1 items-center last:flex-none">
                <div className="flex items-center gap-2">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${completed ? "bg-emerald-600 text-white" : number === step ? "bg-[#04415f] text-white" : "bg-[#e6edf0] text-[#010608]/40"}`}>
                    {completed ? <Check size={15} /> : number}
                  </span>
                  <span className={`text-xs font-semibold ${number === step ? "text-[#04415f]" : "text-[#010608]/45"}`}>{label}</span>
                </div>
                {number < steps.length && <div className={`mx-3 h-px flex-1 ${completed ? "bg-emerald-300" : "bg-[#cdd8de]"}`} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-[#e2eaee] bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#010608]/45">
          <p>{applicationNo ? <>Draft application: <span className="text-[#04415f]">{applicationNo}</span></> : "Your first entries are saved on this device."}</p>
          <p aria-live="polite" className={saveStatus === "Offline" ? "text-amber-700" : saveStatus === "Saving…" ? "text-[#2086b8]" : "text-emerald-700"}>{saveStatus}</p>
        </div>

        {step === 1 && <CourseContactStep courses={courses} data={data} setField={setField} selectedCourse={selectedCourse} inputClass={inputClass} labelClass={labelClass} />}
        {step === 2 && <PersonalStep data={data} setField={setField} inputClass={inputClass} labelClass={labelClass} />}
        {step === 3 && <EducationStep data={data} setField={setField} inputClass={inputClass} labelClass={labelClass} />}
        {step === 4 && (
          <div>
            <StepHeading title="Upload Required Documents" description="Upload clear PDF, JPG, PNG, or WebP files. Each upload is screened for visibility, completeness, and standard visual authenticity indicators. Final verification is completed by admissions staff. Maximum size: 4 MB." />
            <div className="grid gap-3 sm:grid-cols-2">
              {admissionDocuments.map((document) => {
                const uploaded = documents.find((item) => item.type === document.type);
                return (
                  <label key={document.type} className={`relative overflow-hidden rounded-xl border p-4 transition ${uploading === document.type ? "min-h-36 border-[#56b9dd] bg-gradient-to-br from-[#e8f7fc] via-white to-[#dff3fa] shadow-[0_10px_35px_rgba(32,134,184,0.18)]" : uploaded ? "border-emerald-200 bg-emerald-50" : "border-[#e2eaee] bg-[#f8fafb]"}`}>
                    {uploading === document.type && <span aria-hidden="true" className="pointer-events-none absolute inset-0"><span className="absolute inset-x-0 top-0 h-px animate-pulse bg-gradient-to-r from-transparent via-[#2086b8] to-transparent" /><span className="absolute -left-1/4 top-0 h-full w-1/2 animate-[admission-scan_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#8cdef4]/35 to-transparent blur-sm" /><span className="absolute right-5 top-5 h-14 w-14 animate-pulse rounded-full bg-[#8cdef4]/30 blur-xl" /></span>}
                    <span className="flex items-start gap-3">
                      {uploading === document.type ? <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#04415f] text-white shadow-lg shadow-[#2086b8]/25"><BrainCircuit size={20} className="animate-pulse" /><span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-ping rounded-full bg-[#56c8ee]" /></span> : uploaded ? <FileCheck2 size={19} className="mt-0.5 text-emerald-600" /> : <UploadCloud size={19} className="mt-0.5 text-[#2086b8]" />}
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-[#011e2c]">{document.label} {document.required && <span className="text-red-500">*</span>}</span>
                        {uploading === document.type ? <span className="mt-2 block"><span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0878ad]">AI document scan active</span><span className="mt-1 block text-xs text-[#294956]">Analyzing visibility, completeness and authenticity indicators...</span><span className="mt-3 flex gap-1.5"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0878ad] [animation-delay:-0.3s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#2086b8] [animation-delay:-0.15s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#56b9dd]" /></span></span> : <span className="mt-1 block truncate text-xs text-[#010608]/45">{uploaded?.fileName ?? "Choose file"}</span>}
                        {uploaded?.aiStatus && <span className={`mt-2 block text-xs font-semibold ${uploaded.aiStatus === "ACCEPTABLE" ? "text-emerald-700" : uploaded.aiStatus === "REUPLOAD" ? "text-red-700" : "text-amber-700"}`}>AI check: {uploaded.aiStatus === "ACCEPTABLE" ? "Looks good" : uploaded.aiStatus === "REUPLOAD" ? "Please re-upload" : uploaded.aiStatus === "ERROR" ? "Manual review required" : "Needs staff review"}{typeof uploaded.aiScore === "number" ? ` · ${uploaded.aiScore}/100` : ""}</span>}
                        {uploaded?.aiAuthenticity && <span className="mt-1 block text-[11px] font-medium text-[#07577b]">Visual authenticity: {uploaded.aiAuthenticity === "NO_OBVIOUS_CONCERNS" ? "No obvious concerns" : uploaded.aiAuthenticity === "CONCERNS" ? "Concerns detected — staff review required" : "Could not be determined"}{typeof uploaded.aiVisibilityScore === "number" ? ` · Visibility ${uploaded.aiVisibilityScore}/100` : ""}</span>}
                        {uploaded?.aiSummary && <span className="mt-1 block text-xs leading-relaxed text-[#294956]">{uploaded.aiSummary}</span>}
                      </span>
                    </span>
                    <input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" className="hidden" disabled={Boolean(uploading)} onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadFile(file, document.type, document.label); }} />
                  </label>
                );
              })}
            </div>
            <style jsx>{`@keyframes admission-scan { 0%, 100% { transform: translateX(-45%); opacity: .35; } 50% { transform: translateX(245%); opacity: .9; } }`}</style>
          </div>
        )}
        {step === 5 && <ReviewStep data={data} setField={setField} selectedCourse={selectedCourse} documents={documents} />}
        {step === 6 && <PaymentStep data={data} setField={setField} selectedCourse={selectedCourse} feeQrUrl={feeQrUrl} uploading={uploading} uploadFile={uploadFile} inputClass={inputClass} labelClass={labelClass} />}

        {error && <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}

        <div className="mt-8 flex items-center justify-between border-t border-[#e6edf0] pt-6">
          <button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1 || busy} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#04415f] transition hover:bg-[#f1f5f7] disabled:invisible">
            <ArrowLeft size={16} /> Back
          </button>
          <button type="button" onClick={saveAndContinue} disabled={busy || Boolean(uploading)} className="inline-flex items-center gap-2 rounded-xl bg-[#04415f] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#011e2c] disabled:opacity-60">
            {busy && <Loader2 size={16} className="animate-spin" />}
            {step === 6 ? "Submit Application" : "Continue"}
            {!busy && <ArrowRight size={16} />}
          </button>
        </div>
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-[#010608]/45"><LockKeyhole size={13} /> Your information and documents are handled securely.</p>
    </div>
  );
}

type SetField = <K extends keyof WizardData>(key: K, value: WizardData[K]) => void;

function StepHeading({ title, description }: { title: string; description: string }) {
  return <div className="mb-6"><h2 className="text-xl font-bold text-[#011e2c] sm:text-2xl">{title}</h2><p className="mt-1 text-sm text-[#010608]/55">{description}</p></div>;
}

function CourseContactStep({ courses, data, setField, selectedCourse, inputClass, labelClass }: { courses: CourseOption[]; data: WizardData; setField: SetField; selectedCourse?: CourseOption; inputClass: string; labelClass: string }) {
  return <div><StepHeading title="Choose Your Course" description="Select a programme and share your contact details so our admissions team can assist you." /><div className="grid gap-4 sm:grid-cols-2">{courses.map((course) => <button key={course.id} type="button" onClick={() => { setField("courseId", course.id); setField("batchId", ""); }} className={`relative overflow-hidden rounded-2xl border-2 p-5 text-left shadow-sm transition-all duration-200 ${data.courseId === course.id ? "border-[#0878ad] bg-[#e5f6fd] shadow-md ring-4 ring-[#2086b8]/15" : "border-[#c6dce6] bg-white hover:-translate-y-0.5 hover:border-[#3ca6ce] hover:shadow-md"}`}><span className={`mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${data.courseId === course.id ? "bg-[#0878ad] text-white" : "bg-[#e8f4f8] text-[#07577b]"}`}>{data.courseId === course.id ? "Selected" : `${course.durationMonths} month course`}</span><p className="text-base font-extrabold text-[#011e2c]">{course.title}</p><p className="mt-3 font-bold text-[#07577b]">₹{course.fees.toLocaleString("en-IN")}</p><p className="mt-2 text-sm leading-relaxed text-[#294956]">{course.eligibility}</p></button>)}</div>{selectedCourse?.batches.length ? <div className="mt-5"><label className={labelClass}>Preferred batch</label><select className={inputClass} value={data.batchId} onChange={(event) => setField("batchId", event.target.value)}><option value="">Select a batch</option>{selectedCourse.batches.map((batch) => <option key={batch.id} value={batch.id}>{batch.label} — starts {new Date(batch.startDate).toLocaleDateString("en-IN")}</option>)}</select></div> : null}<div className="mt-7 grid gap-4 sm:grid-cols-3"><Field label="Full name *" value={data.name} onChange={(value) => setField("name", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="Mobile number *" value={data.phone} onChange={(value) => setField("phone", value)} inputClass={inputClass} labelClass={labelClass} type="tel" /><Field label="Email" value={data.email} onChange={(value) => setField("email", value)} inputClass={inputClass} labelClass={labelClass} type="email" /></div></div>;
}

function PersonalStep({ data, setField, inputClass, labelClass }: { data: WizardData; setField: SetField; inputClass: string; labelClass: string }) {
  return <div><StepHeading title="Personal & Guardian Details" description="Enter information exactly as it appears on your official documents." /><div className="grid gap-4 sm:grid-cols-2"><Field label="Date of birth *" value={data.dateOfBirth} onChange={(value) => setField("dateOfBirth", value)} inputClass={inputClass} labelClass={labelClass} type="date" /><SelectField label="Gender *" value={data.gender} options={["Male", "Female", "Other"]} onChange={(value) => setField("gender", value)} inputClass={inputClass} labelClass={labelClass} /><div className="sm:col-span-2"><Field label="Residential address *" value={data.addressLine} onChange={(value) => setField("addressLine", value)} inputClass={inputClass} labelClass={labelClass} /></div><Field label="City / Village *" value={data.city} onChange={(value) => setField("city", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="District *" value={data.district} onChange={(value) => setField("district", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="State *" value={data.state} onChange={(value) => setField("state", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="PIN code *" value={data.pinCode} onChange={(value) => setField("pinCode", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="Parent / guardian name *" value={data.guardianName} onChange={(value) => setField("guardianName", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="Relationship" value={data.guardianRelation} onChange={(value) => setField("guardianRelation", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="Guardian mobile *" value={data.guardianPhone} onChange={(value) => setField("guardianPhone", value)} inputClass={inputClass} labelClass={labelClass} type="tel" /><Field label="Emergency contact" value={data.emergencyPhone} onChange={(value) => setField("emergencyPhone", value)} inputClass={inputClass} labelClass={labelClass} type="tel" /></div></div>;
}

function EducationStep({ data, setField, inputClass, labelClass }: { data: WizardData; setField: SetField; inputClass: string; labelClass: string }) {
  return <div><StepHeading title="Educational Details" description="Provide your SSC examination information for eligibility verification." /><div className="grid gap-4 sm:grid-cols-2"><Field label="Board *" value={data.board} onChange={(value) => setField("board", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="School name *" value={data.schoolName} onChange={(value) => setField("schoolName", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="Passing year *" value={data.passingYear} onChange={(value) => setField("passingYear", value)} inputClass={inputClass} labelClass={labelClass} type="number" /><Field label="Seat / roll number *" value={data.seatNumber} onChange={(value) => setField("seatNumber", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="Percentage *" value={data.percentage} onChange={(value) => setField("percentage", value)} inputClass={inputClass} labelClass={labelClass} type="number" /><SelectField label="Category" value={data.category} options={["OPEN", "OBC", "SC", "ST", "VJNT", "EWS", "OTHER"]} onChange={(value) => setField("category", value)} inputClass={inputClass} labelClass={labelClass} /></div><label className="mt-5 flex items-start gap-3 rounded-xl border border-[#b8dfea] bg-[#edf8fc] p-4 text-sm font-medium text-[#04415f]"><input type="checkbox" checked={data.scienceConfirmed} onChange={(event) => setField("scienceConfirmed", event.target.checked)} className="mt-1" /><span>I confirm that Science was one of my SSC subjects.</span></label></div>;
}

function ReviewStep({ data, setField, selectedCourse, documents }: { data: WizardData; setField: SetField; selectedCourse?: CourseOption; documents: UploadedDocument[] }) {
  const items = [["Course", selectedCourse?.title], ["Student", data.name], ["Mobile", data.phone], ["Date of birth", data.dateOfBirth], ["Address", `${data.addressLine}, ${data.city}, ${data.district}`], ["School", data.schoolName], ["SSC result", `${data.percentage}% (${data.passingYear})`], ["Documents", `${documents.length} uploaded`]];
  return <div><StepHeading title="Review Your Application" description="Check the information below before proceeding to payment." /><div className="grid gap-3 sm:grid-cols-2">{items.map(([label, value]) => <div key={label} className="rounded-xl bg-[#f1f5f7] p-4"><p className="text-xs uppercase tracking-wide text-[#010608]/40">{label}</p><p className="mt-1 text-sm font-semibold text-[#011e2c]">{value || "—"}</p></div>)}</div><label className="mt-6 flex items-start gap-3 rounded-xl border border-[#b8dfea] bg-[#edf8fc] p-4 text-sm text-[#04415f]"><input type="checkbox" checked={data.declarationAccepted} onChange={(event) => setField("declarationAccepted", event.target.checked)} className="mt-1" /><span>I declare that the information and documents provided are genuine and understand that admission is subject to verification.</span></label></div>;
}

function PaymentStep({ data, setField, selectedCourse, feeQrUrl, uploading, uploadFile, inputClass, labelClass }: { data: WizardData; setField: SetField; selectedCourse?: CourseOption; feeQrUrl?: string; uploading: string; uploadFile: (file: File, type: string, label: string, payment?: boolean) => void; inputClass: string; labelClass: string }) {
  return <div><StepHeading title="Payment & Final Submission" description="Scan the QR code, complete payment, and upload the successful transaction screenshot." /><div className="grid gap-6 lg:grid-cols-[300px_1fr]"><div className="rounded-2xl border border-[#b8dfea] bg-[#edf8fc] p-5 text-center"><QrCode size={24} className="mx-auto text-[#04415f]" /><p className="mt-2 text-sm font-bold text-[#011e2c]">Course Fee</p><p className="font-display text-3xl font-bold text-[#04415f]">₹{selectedCourse?.fees.toLocaleString("en-IN")}</p>{feeQrUrl ? <Image src={feeQrUrl} alt="Scan to pay admission fee" width={176} height={176} className="mx-auto mt-4 h-44 w-44 rounded-xl border bg-white p-2" /> : <p className="mt-4 rounded-lg bg-amber-100 p-3 text-xs text-amber-800">Payment QR is not configured. Contact admissions before submitting.</p>}</div><div className="space-y-4"><Field label="UPI transaction / reference number *" value={data.paymentTxnRef} onChange={(value) => setField("paymentTxnRef", value)} inputClass={inputClass} labelClass={labelClass} /><Field label="Payment date *" value={data.paymentDate} onChange={(value) => setField("paymentDate", value)} inputClass={inputClass} labelClass={labelClass} type="date" /><label className={`block rounded-xl border p-5 ${data.paymentProofUrl ? "border-emerald-200 bg-emerald-50" : "border-dashed border-[#8ccfe7] bg-[#f8fafb]"}`}><span className="flex items-center gap-3">{uploading === "PAYMENT_PROOF" ? <Loader2 size={20} className="animate-spin text-[#2086b8]" /> : data.paymentProofUrl ? <CheckCircle2 size={20} className="text-emerald-600" /> : <UploadCloud size={20} className="text-[#2086b8]" />}<span><span className="block text-sm font-bold text-[#011e2c]">Payment screenshot *</span><span className="text-xs text-[#010608]/45">{data.paymentProofUrl ? "Uploaded successfully" : "Choose a clear image or PDF"}</span></span></span><input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" className="hidden" disabled={Boolean(uploading)} onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadFile(file, "PAYMENT_PROOF", "payment screenshot", true); }} /></label><p className="rounded-xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-800"><strong>Important:</strong> Your payment will remain under review until verified by the admissions team. Keep the original transaction receipt.</p></div></div></div>;
}

function Field({ label, value, onChange, inputClass, labelClass, type = "text" }: { label: string; value: string; onChange: (value: string) => void; inputClass: string; labelClass: string; type?: string }) {
  return <label><span className={labelClass}>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} /></label>;
}

function SelectField({ label, value, options, onChange, inputClass, labelClass }: { label: string; value: string; options: string[]; onChange: (value: string) => void; inputClass: string; labelClass: string }) {
  return <label><span className={labelClass}>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className={inputClass}><option value="">Select</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
