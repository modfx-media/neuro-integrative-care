import { getPayload } from "payload";
import config from "@payload-config";
import { cmsConfigured, withCMS } from "@/lib/cms/safe";

export type CmsListedPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
  imageAlt: string;
  date: string | null;
};

type PayloadLike = Awaited<ReturnType<typeof getPayload>>;

async function findPublishedDocs(payload: PayloadLike, depth: number) {
  const docs: unknown[] = [];
  let page = 1;
  for (;;) {
    const res = await payload.find({
      collection: "posts",
      draft: false,
      overrideAccess: false,
      depth,
      limit: 100,
      page,
      sort: "-publishedOn",
      where: { _status: { equals: "published" } },
    });
    docs.push(...res.docs);
    if (!res.hasNextPage || page >= 50) break;
    page += 1;
  }
  return docs;
}

/** Published posts from Payload (card image = the post's SEO meta image). Future calendar dates are hidden by the scheduled-publish guard. */
export async function getCmsPublishedPosts(): Promise<CmsListedPost[]> {
  if (!cmsConfigured()) return [];
  return withCMS(async () => {
    const payload = await getPayload({ config });
    let docs: unknown[];
    try {
      docs = await findPublishedDocs(payload, 1);
    } catch (error) {
      // A broken media relation (for example a missing media._objectkey column)
      // must not drop every published post back to the hardcoded list.
      console.error("[cms] published posts query failed while populating media; retrying without relations", error);
      docs = await findPublishedDocs(payload, 0);
    }
    return docs
      .map((doc) => {
        const d = doc as unknown as {
          slug?: string | null;
          title?: string | null;
          excerpt?: string | null;
          publishedOn?: string | null;
          featuredImage?: { url?: string | null; alt?: string | null } | number | null;
          meta?: { description?: string | null; image?: { url?: string | null } | number | null } | null;
        };
        const fi = d.featuredImage && typeof d.featuredImage === "object" ? d.featuredImage : null;
        const mi = d.meta?.image && typeof d.meta.image === "object" ? d.meta.image : null;
        return {
          slug: d.slug ?? "",
          title: d.title ?? "",
          excerpt: d.excerpt ?? d.meta?.description ?? "",
          image: fi?.url ?? mi?.url ?? null,
          imageAlt: fi?.alt ?? d.title ?? "",
          date: d.publishedOn ?? null,
        };
      })
      .filter((p) => p.slug && p.title);
  }, [] as CmsListedPost[]);
}
