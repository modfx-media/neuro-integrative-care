import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { cmsConfigured, withCMS } from "@/lib/cms/safe";
import { normalizePath } from "@/lib/cms/path";

export type RoutedContent = {
  collection: "pages" | "posts";
  doc: {
    id: string | number;
    title?: string | null;
    path?: string | null;
    slug?: string | null;
    layout?: unknown;
    meta?: {
      title?: string | null;
      description?: string | null;
      canonicalUrl?: string | null;
      noIndex?: boolean | null;
      noFollow?: boolean | null;
      excludeFromSitemap?: boolean | null;
      image?: unknown;
    } | null;
    updatedAt?: string;
    sourceUpdatedAt?: string | null;
  };
};

export async function queryRoutedContentByPath(
  path: string,
): Promise<RoutedContent | null> {
  const normalized = normalizePath(path);
  if (!normalized) return null;
  if (!cmsConfigured()) return null;

  return withCMS(async () => {
    const payload = await getPayload({ config });
    const draft = await draftMode();
    const isDraft = draft.isEnabled;
    const common = {
      limit: 1,
      depth: 2,
      draft: isDraft,
      overrideAccess: isDraft,
    } as const;

    const pages = await payload.find({
      collection: "pages",
      where: { path: { equals: normalized } },
      ...common,
    });
    const page = pages.docs[0];
    if (page) {
      return { collection: "pages", doc: page as RoutedContent["doc"] };
    }

    const posts = await payload.find({
      collection: "posts",
      where: { path: { equals: normalized } },
      ...common,
    });
    const post = posts.docs[0];
    if (post) {
      return { collection: "posts", doc: post as RoutedContent["doc"] };
    }

    return null;
  }, null);
}

export type SitemapDoc = {
  path?: string | null;
  updatedAt?: string;
  sourceUpdatedAt?: string | null;
  meta?: { noIndex?: boolean; excludeFromSitemap?: boolean };
};

export async function querySitemapEntries(): Promise<SitemapDoc[]> {
  if (!cmsConfigured()) return [];
  return withCMS(async () => {
    const payload = await getPayload({ config });
    const [pages, posts] = await Promise.all([
      payload.find({
        collection: "pages",
        limit: 10000,
        depth: 0,
        where: {
          and: [
            { _status: { equals: "published" } },
            { path: { exists: true } },
          ],
        },
      }),
      payload.find({
        collection: "posts",
        limit: 10000,
        depth: 0,
        where: {
          and: [
            { _status: { equals: "published" } },
            { path: { exists: true } },
          ],
        },
      }),
    ]);

    return [...pages.docs, ...posts.docs]
      .filter((doc) => {
        const meta = doc.meta as
          | { noIndex?: boolean; excludeFromSitemap?: boolean }
          | undefined;
        if (meta?.noIndex || meta?.excludeFromSitemap) return false;
        return Boolean(doc.path);
      })
      .map((doc) => ({
        path: doc.path as string | null | undefined,
        updatedAt: doc.updatedAt,
        sourceUpdatedAt: (doc as { sourceUpdatedAt?: string | null }).sourceUpdatedAt,
        meta: doc.meta as SitemapDoc["meta"],
      }));
  }, []);
}

export async function getHeaderNavItems() {
  if (!cmsConfigured()) return [] as { label: string; href: string }[];
  return withCMS(async () => {
    const payload = await getPayload({ config });
    const header = await payload.findGlobal({ slug: "header" });
    const items = (header as { navItems?: { label?: string; href?: string }[] })
      .navItems;
    return (items ?? []).filter(
      (item): item is { label: string; href: string } =>
        Boolean(item.label && item.href),
    );
  }, [] as { label: string; href: string }[]);
}

export async function getFooterQuickLinks() {
  if (!cmsConfigured()) return [] as { label: string; href: string }[];
  return withCMS(async () => {
    const payload = await getPayload({ config });
    const footer = await payload.findGlobal({ slug: "footer" });
    const items = (
      footer as { quickLinks?: { label?: string; href?: string }[] }
    ).quickLinks;
    return (items ?? []).filter(
      (item): item is { label: string; href: string } =>
        Boolean(item.label && item.href),
    );
  }, [] as { label: string; href: string }[]);
}
