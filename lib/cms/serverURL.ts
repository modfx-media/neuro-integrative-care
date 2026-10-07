import { SITE_URL } from "@/lib/site";

const LOCALHOST = /localhost|127\.0\.0\.1/i;

function stripSlash(value: string): string {
  return value.replace(/\/$/, "");
}

function isPublicHttpsOrigin(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !LOCALHOST.test(url.hostname);
  } catch {
    return false;
  }
}

/** Public origin for Payload serverURL, CORS, preview, and canonical URLs. */
export function getServerURL(): string {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL;
  if (explicit && isPublicHttpsOrigin(explicit)) return stripSlash(explicit);

  const site = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  if (site && isPublicHttpsOrigin(site)) return stripSlash(site);

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  if (
    explicit &&
    LOCALHOST.test(explicit) &&
    process.env.NODE_ENV !== "production"
  ) {
    return stripSlash(explicit);
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  return stripSlash(SITE_URL);
}

export function getCorsOrigins(): string[] {
  const origins = new Set<string>();
  const add = (value?: string | null) => {
    if (!value) return;
    try {
      origins.add(stripSlash(value.startsWith("http") ? value : `https://${value}`));
    } catch {
      // ignore invalid
    }
  };

  const server = getServerURL();
  add(server);

  try {
    const url = new URL(server);
    const host = url.hostname;
    if (host.startsWith("www.")) {
      add(`${url.protocol}//${host.slice(4)}`);
    } else if (!LOCALHOST.test(host)) {
      add(`${url.protocol}//www.${host}`);
    }
  } catch {
    // ignore
  }

  add(process.env.NEXT_PUBLIC_SITE_URL);
  add(process.env.NEXT_PUBLIC_SERVER_URL);
  if (process.env.VERCEL_URL) add(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV !== "production") {
    add("http://localhost:3000");
  }

  return [...origins];
}
