import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "./access";
import { layoutBlocks } from "./blocks";
import { blogPathFromSlug, uniqueEmptyToNull } from "./hooks";
import { previewFromPath } from "@/lib/cms/preview";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "path", "updatedAt"],
    useAsTitle: "title",
    livePreview: {
      url: ({ data }) =>
        previewFromPath(
          (data as { path?: string })?.path,
          (data as { slug?: string })?.slug
            ? `blog/${(data as { slug?: string }).slug}`
            : undefined,
        ),
    },
    preview: (data) => {
      const doc = data as { path?: string; slug?: string } | undefined;
      return previewFromPath(
        doc?.path,
        doc?.slug ? `blog/${doc.slug}` : undefined,
      );
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: { beforeValidate: [uniqueEmptyToNull] },
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: { beforeValidate: [blogPathFromSlug] },
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: { beforeValidate: [uniqueEmptyToNull] },
    },
    {
      name: "sourceUrl",
      type: "text",
      index: true,
    },
    {
      name: "sourceUpdatedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "publishedOn",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "layout",
      type: "blocks",
      blocks: layoutBlocks,
      admin: { initCollapsed: true },
    },
  ],
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
