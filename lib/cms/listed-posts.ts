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

/** Published posts from Payload (card image = the post's SEO meta image) (future-dated ones are hidden by the scheduled-publish guard). */
export async function getCmsPublishedPosts(): Promise<CmsListedPost[]> {
  if (!cmsConfigured()) return [];
  return withCMS(async () => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "posts",
      draft: false,
      overrideAccess: false,
      depth: 1,
      limit: 200,
      sort: "-publishedOn",
      where: { _status: { equals: "published" } },
    });
    return res.docs
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
