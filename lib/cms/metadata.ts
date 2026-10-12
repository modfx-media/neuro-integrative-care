import type { Metadata } from "next";
import { queryRoutedContentByPath } from "@/lib/cms/query";
import { normalizePath } from "@/lib/cms/path";

export async function withCMSMetadata(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  const routed = await queryRoutedContentByPath(path);
  if (!routed) return fallback;
  const meta = routed.doc.meta;
  const title = meta?.title || routed.doc.title;
  const description = meta?.description || undefined;
  const canonicalRaw = meta?.canonicalUrl;
  const canonical = canonicalRaw
    ? canonicalRaw.startsWith("http")
      ? canonicalRaw
      : normalizePath(canonicalRaw) ?? path
    : path;
  const noIndex = Boolean(meta?.noIndex);
  const noFollow = Boolean(meta?.noFollow);

  return {
    ...fallback,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      ...fallback.alternates,
      canonical,
    },
    openGraph: {
      ...fallback.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url: typeof canonical === "string" ? canonical : path,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
  };
}
