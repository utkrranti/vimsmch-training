"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { revokeCertificate } from "./actions";

export default function RevokeCertButton({ id, certNo }: { id: string; certNo: string }) {
  const [isPending, startTransition] = useTransition();
  const handle = () => {
    if (!confirm(`Revoke certificate ${certNo}? This will remove it from the system.`)) return;
    startTransition(async () => { await revokeCertificate(id); });
  };
  return (
    <button onClick={handle} disabled={isPending} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40" title="Revoke">
      <Trash2 size={14} />
    </button>
  );
}
