// Single source of truth for the production origin — used for metadataBase,
// canonical/OG URLs, JSON-LD, sitemap.xml, and robots.txt. Override via
// NEXT_PUBLIC_SITE_URL in .env.local / Vercel project settings.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://neurointegrativecareoflosgatos.com";
