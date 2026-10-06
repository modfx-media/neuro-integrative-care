import { SITE_URL } from "@/lib/site";

function isPublicHttpsOrigin(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname !== "localhost";
  } catch {
    return false;
  }
}

/** Public origin for Payload serverURL, CORS, preview, and canonical URLs. */
export function getServerURL(): string {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL;
  if (explicit && isPublicHttpsOrigin(explicit)) return explicit.replace(/\/$/, "");
  if (
    explicit &&
    explicit.startsWith("http://localhost") &&
    process.env.NODE_ENV !== "production"
  ) {
    return explicit.replace(/\/$/, "");
  }
  return SITE_URL.replace(/\/$/, "");
}

export function getCorsOrigins(): string[] {
  const origins = new Set<string>();
  const server = getServerURL();
  origins.add(server);
  try {
    const url = new URL(server);
    const host = url.hostname;
    if (host.startsWith("www.")) {
      origins.add(`${url.protocol}//${host.slice(4)}`);
    } else if (host !== "localhost") {
      origins.add(`${url.protocol}//www.${host}`);
    }
  } catch {
    // ignore
  }
  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }
  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
  }
  return [...origins];
}
