import type { Block } from "payload";

export const HeadingBlock: Block = {
  slug: "heading",
  interfaceName: "HeadingBlock",
  fields: [
    {
      name: "text",
      type: "text",
      required: true,
    },
    {
      name: "tag",
      type: "select",
      defaultValue: "h2",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
      ],
    },
  ],
};

export const CopyBlock: Block = {
  slug: "copy",
  interfaceName: "CopyBlock",
  fields: [
    {
      name: "body",
      type: "textarea",
      required: true,
    },
  ],
};

export const RichTextBlock: Block = {
  slug: "richText",
  interfaceName: "RichTextBlock",
  fields: [
    {
      name: "content",
      type: "richText",
    },
  ],
};

export const CtaBlock: Block = {
  slug: "cta",
  interfaceName: "CtaBlock",
  fields: [
    { name: "heading", type: "text" },
    { name: "lead", type: "textarea" },
    { name: "label", type: "text" },
    { name: "href", type: "text" },
  ],
};

export const layoutBlocks = [HeadingBlock, CopyBlock, RichTextBlock, CtaBlock];
