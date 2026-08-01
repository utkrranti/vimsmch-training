"use client";

import { useTransition } from "react";
import { Check, Loader2, X } from "lucide-react";
import { reviewDocument } from "../actions";

export default function DocumentReviewButtons({ applicationId, documentId }: { applicationId: string; documentId: string }) {
  const [pending, startTransition] = useTransition();
  const review = (status: "VERIFIED" | "REJECTED") => startTransition(() => reviewDocument(applicationId, documentId, status));
  return <div className="flex gap-1"><button disabled={pending} onClick={() => review("VERIFIED")} className="rounded-lg bg-emerald-50 p-2 text-emerald-700 hover:bg-emerald-100">{pending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}</button><button disabled={pending} onClick={() => review("REJECTED")} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"><X size={14} /></button></div>;
}
