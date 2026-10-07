import type { FieldHook } from "payload";
import { emptyToNull, normalizePath } from "@/lib/cms/path";

export const uniqueEmptyToNull: FieldHook = ({ value }) => emptyToNull(value);

export const normalizePathHook: FieldHook = ({ value, siblingData, data, originalDoc }) => {
  const raw = emptyToNull(value);
  if (raw) return normalizePath(String(raw));

  const slug =
    (siblingData as { slug?: string })?.slug ??
    (data as { slug?: string })?.slug ??
    (originalDoc as { slug?: string } | undefined)?.slug;

  if (!slug || String(slug).trim() === "") return null;
  if (slug === "home" || slug === "index") return "/";
  return normalizePath(`/${String(slug).replace(/^\/+/, "")}`);
};

export const blogPathFromSlug: FieldHook = ({ value, siblingData, data, originalDoc }) => {
  const raw = emptyToNull(value);
  if (raw) return normalizePath(String(raw));

  const slug =
    (siblingData as { slug?: string })?.slug ??
    (data as { slug?: string })?.slug ??
    (originalDoc as { slug?: string } | undefined)?.slug;

  if (!slug || String(slug).trim() === "") return null;
  return normalizePath(`/blog/${String(slug).replace(/^\/+/, "")}`);
};
