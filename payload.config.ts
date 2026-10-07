import path from "path";
import { fileURLToPath } from "url";
import { buildConfig, type Plugin } from "payload";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Header, Footer, SiteSettings } from "./globals/Site";
import { getCorsOrigins, getServerURL } from "./lib/cms/serverURL";
import { normalizePath } from "./lib/cms/path";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const disablePush =
  Boolean(process.env.VERCEL) ||
  process.env.CMS_IMPORT_APPLY === "1" ||
  process.env.PAYLOAD_PUSH === "false";

const plugins: Plugin[] = [
  seoPlugin({
    collections: ["pages", "posts"],
    uploadsCollection: "media",
    generateTitle: ({ doc }) =>
      typeof doc?.title === "string" ? doc.title : "NeuroIntegrative Care",
    generateURL: ({ doc }) => {
      const pathValue = normalizePath(
        typeof doc?.path === "string" ? doc.path : undefined,
      );
      if (!pathValue) return getServerURL();
      return `${getServerURL()}${pathValue === "/" ? "" : pathValue}`;
    },
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: "canonicalUrl",
        type: "text",
        admin: { description: "Must match the public path (absolute or path)." },
      },
      {
        name: "noIndex",
        type: "checkbox",
        defaultValue: false,
      },
      {
        name: "noFollow",
        type: "checkbox",
        defaultValue: false,
      },
      {
        name: "excludeFromSitemap",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  }),
];

if (process.env.BLOB_READ_WRITE_TOKEN) {
  plugins.push(
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  );
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.js"),
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Pages, Posts],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: getServerURL(),
  cors: getCorsOrigins(),
  csrf: getCorsOrigins(),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    forceUseVercelPostgres: true,
    push: !disablePush,
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  plugins,
});
