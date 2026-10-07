export async function withCMS<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[cms]", error);
    return fallback;
  }
}

/** True when Payload can boot (secret + pooled Neon URL present). */
export function cmsConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.PAYLOAD_SECRET);
}
