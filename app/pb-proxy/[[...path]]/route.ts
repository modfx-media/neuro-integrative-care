const PB_ORIGIN = "https://neurointegrativecareoflosgatos6882.practicebetter.io";

export const dynamic = "force-dynamic";

async function proxy(request: Request, path: string[]) {
  const incoming = new URL(request.url);
  const dest = `${PB_ORIGIN}/${path.join("/")}${incoming.search}`;
  const headers = new Headers();
  const accept = request.headers.get("accept");
  const contentType = request.headers.get("content-type");
  const userAgent = request.headers.get("user-agent");
  if (accept) headers.set("accept", accept);
  if (contentType) headers.set("content-type", contentType);
  if (userAgent) headers.set("user-agent", userAgent);

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "follow",
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(dest, init);
  const out = new Headers(upstream.headers);
  out.delete("content-security-policy");
  out.delete("content-security-policy-report-only");
  out.delete("x-frame-options");
  out.delete("content-encoding");
  out.delete("content-length");

  return new Response(upstream.body, { status: upstream.status, headers: out });
}

type Ctx = { params: Promise<{ path?: string[] }> };

export async function GET(request: Request, ctx: Ctx) {
  return proxy(request, (await ctx.params).path ?? []);
}

export async function POST(request: Request, ctx: Ctx) {
  return proxy(request, (await ctx.params).path ?? []);
}

export async function PUT(request: Request, ctx: Ctx) {
  return proxy(request, (await ctx.params).path ?? []);
}

export async function PATCH(request: Request, ctx: Ctx) {
  return proxy(request, (await ctx.params).path ?? []);
}

export async function DELETE(request: Request, ctx: Ctx) {
  return proxy(request, (await ctx.params).path ?? []);
}
