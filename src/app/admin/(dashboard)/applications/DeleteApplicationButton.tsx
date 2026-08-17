"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { deleteApplication } from "./actions";

export default function DeleteApplicationButton({
  id,
  name,
  redirectAfter,
  className,
  compact,
}: {
  id: string;
  name: string;
  redirectAfter?: string;
  className?: string;
  compact?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm(`Delete the admission application for "${name}"? This permanently removes their submitted details, documents, and callback history. This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteApplication(id);
      if (redirectAfter) router.push(redirectAfter);
    });
  };

  if (compact) {
    return (
      <button
        onClick={handleDelete}
        disabled={pending}
        title="Delete application"
        className={className ?? "p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"}
      >
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
      </button>
    );
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className={className ?? "flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"}
    >
      {pending ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
      Delete Application
    </button>
  );
}
