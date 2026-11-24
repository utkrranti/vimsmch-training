"use server";

import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";

const blobToken = () =>
  process.env.BLOB_READ_WRITE_TOKEN ?? process.env.ADMISSION_BLOB_READ_WRITE_TOKEN;

function isBlobUrl(value: string) {
  try {
    return new URL(value).hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

/**
 * Deletes blobs that a save has just superseded — when a file setting (fee QR,
 * prospectus, admission form) is replaced with a new upload or cleared, the old
 * blob is removed so repeated edits don't leave orphans in the store.
 * Best-effort: a failed delete never fails the save.
 */
async function deleteSupersededBlobs(previous: Map<string, string>, entries: Record<string, string>) {
  const keys = Object.keys(entries);

  const superseded = [
    ...new Set(
      keys
        .map((key) => previous.get(key))
        .filter((old): old is string => !!old && isBlobUrl(old))
        .filter((old) => !keys.some((key) => entries[key] === old)),
    ),
  ];
  if (superseded.length === 0) return;

  // Never delete a blob some other setting still points at.
  const stillReferenced = await prisma.setting.findMany({
    where: { value: { in: superseded }, key: { notIn: keys } },
    select: { value: true },
  });
  const referenced = new Set(stillReferenced.map((r) => r.value));
  const removable = superseded.filter((url) => !referenced.has(url));
  if (removable.length === 0) return;

  const token = blobToken();
  if (!token) {
    console.warn("[settings] Blob token missing — skipped deleting superseded files:", removable);
    return;
  }

  await Promise.all(
    removable.map(async (url) => {
      try {
        await del(url, { token });
      } catch (error) {
        console.error("[settings] Failed to delete superseded blob", url, error);
      }
    }),
  );
}

export async function saveSettings(entries: Record<string, string>) {
  const keys = Object.keys(entries);

  const existing = await prisma.setting.findMany({ where: { key: { in: keys } } });
  const previous = new Map(existing.map((row) => [row.key, row.value]));

  await Promise.all(
    Object.entries(entries).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  await deleteSupersededBlobs(previous, entries);

  revalidatePath("/admin/settings");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admission");
  revalidatePath("/placements");
  revalidatePath("/");
}
