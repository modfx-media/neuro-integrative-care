import { normalizePath } from "@/lib/cms/path";
import { getServerURL } from "@/lib/cms/serverURL";

/**
 * Live preview / admin preview URL. Returns null when path or slug is missing
 * so Payload never opens `/null`.
 */
export function previewFromPath(
  path?: unknown,
  slug?: unknown,
): string | null {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;

  const fromPath = typeof path === "string" ? normalizePath(path) : null;
  let fromSlug: string | null = null;
  if (typeof slug === "string" && slug.trim()) {
    fromSlug =
      slug === "home" || slug === "index"
        ? "/"
        : normalizePath(`/${slug.replace(/^\/+/, "")}`);
  }

  const resolved = fromPath ?? fromSlug;
  if (!resolved) return null;

  const origin = getServerURL();
  const params = new URLSearchParams({
    path: resolved,
    previewSecret: secret,
  });
  return `${origin}/next/preview?${params.toString()}`;
}
