import { normalizePath } from "@/lib/cms/path";

export function previewFromPath(path: string | null | undefined): string | null {
  const normalized = normalizePath(path);
  if (!normalized) return null;
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;
  const params = new URLSearchParams({
    path: normalized,
    previewSecret: secret,
  });
  return `/next/preview?${params.toString()}`;
}
