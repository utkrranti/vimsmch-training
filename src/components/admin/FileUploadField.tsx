"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Loader2, UploadCloud, CheckCircle2, ExternalLink, X, RefreshCw } from "lucide-react";

export default function FileUploadField({
  value,
  onChange,
  accept,
}: {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    setIsUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      // The previously stored file is deleted from blob storage on save.
      onChange(blob.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const inputCls = "w-full bg-[#f8fafb] border border-[#e2eaee] text-[#011e2c] placeholder-[#010608]/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:bg-white focus:ring-2 focus:ring-[#04415f]/10 transition-all";

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      className="hidden"
      disabled={isUploading}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
      }}
    />
  );

  return (
    <div className="space-y-2">
      {value ? (
        <>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
            {isUploading ? (
              <Loader2 size={15} className="text-emerald-600 shrink-0 animate-spin" />
            ) : (
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
            )}
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 text-xs font-medium truncate flex-1 hover:underline"
            >
              {value.split("/").pop()}
            </a>
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 shrink-0">
              <ExternalLink size={14} />
            </a>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-emerald-600 hover:text-red-600 shrink-0"
              aria-label="Remove file"
            >
              <X size={14} />
            </button>
          </div>
          <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#04415f] hover:text-[#2086b8] cursor-pointer transition-colors">
            {isUploading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
            {isUploading ? "Uploading…" : "Replace file"}
            {fileInput}
          </label>
          <p className="text-[#010608]/40 text-[11px] leading-snug">
            Replacing uploads the new file now; the old one is deleted from storage when you save.
          </p>
        </>
      ) : (
        <label className={`${inputCls} flex items-center gap-2 cursor-pointer text-[#010608]/40 hover:border-[#04415f] transition-colors`}>
          {isUploading ? <Loader2 size={15} className="animate-spin shrink-0" /> : <UploadCloud size={15} className="shrink-0" />}
          <span>{isUploading ? "Uploading…" : "Click to choose a file"}</span>
          {fileInput}
        </label>
      )}
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
