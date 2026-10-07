import type { GlobalConfig } from "payload";
import { authenticated } from "../collections/access";

const navItemFields = [
  { name: "label", type: "text" as const },
  { name: "href", type: "text" as const },
];

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: navItemFields,
    },
  ],
};

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "quickLinks",
      type: "array",
      fields: navItemFields,
    },
    {
      name: "phoneDisplay",
      type: "text",
    },
    {
      name: "phoneHref",
      type: "text",
    },
  ],
};

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "siteTitle",
      type: "text",
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};
