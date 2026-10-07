import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "./access";
import { layoutBlocks } from "./blocks";
import { normalizePathHook, uniqueEmptyToNull } from "./hooks";
import { previewFromPath } from "@/lib/cms/preview";

export const Pages: CollectionConfig = {
  slug: "pages",
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
          (data as { slug?: string })?.slug,
        ),
    },
    preview: (data) =>
      previewFromPath(
        (data as { path?: string; slug?: string } | undefined)?.path,
        (data as { path?: string; slug?: string } | undefined)?.slug,
      ),
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
      admin: {
        position: "sidebar",
        description: "Public URL path, e.g. /conditions/brain-brightening",
      },
      hooks: { beforeValidate: [normalizePathHook] },
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
      admin: { position: "sidebar" },
    },
    {
      name: "sourceUpdatedAt",
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
