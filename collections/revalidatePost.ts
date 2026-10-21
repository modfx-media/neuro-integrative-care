import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

type StatusDoc = {
  slug?: string | null;
  _status?: "draft" | "published" | null;
};

async function revalidatePublishedPost(docs: Array<StatusDoc | undefined>) {
  const slugs = new Set<string>();
  for (const doc of docs) {
    if (doc?.slug) slugs.add(doc.slug);
  }

  try {
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/sitemap.xml");
    for (const slug of slugs) revalidatePath(`/blog/${slug}`);
  } catch (error) {
    console.error("[cms] blog revalidation failed", error);
  }
}

function affectsPublished(doc: StatusDoc | undefined, previousDoc: StatusDoc | undefined) {
  return doc?._status === "published" || previousDoc?._status === "published";
}

export const revalidatePost: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  if (req.context?.disableRevalidate) return doc;
  if (!affectsPublished(doc, previousDoc)) return doc;
  await revalidatePublishedPost([doc, previousDoc]);
  return doc;
};

export const revalidatePostDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc;
  await revalidatePublishedPost([doc]);
  return doc;
};
