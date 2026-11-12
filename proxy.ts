import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Indexed URLs from the previous site. Each unsashed path 301s once to a
// live page. Next.js still normalizes a trailing slash with its own 308
// before this proxy runs.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/mission": "/about/dr-thomas-santucci",
  "/contact": "/start",
  "/pemf": "/tools/pemf",
  "/pulse-wave": "/technology",
  "/sanexas": "/conditions/autoimmune-investigation/neuropathy",
  "/regen": "/tools/regenerative-solutions",
  "/prp": "/tools/regenerative-solutions",
  "/hips": "/tools/regenerative-solutions",
  "/knees": "/tools/regenerative-solutions",
  "/longevity-project": "/conditions/longevity-science",
  "/projects-8": "/results",
  "/laser": "/tools/violet-laser",
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  const destination = LEGACY_REDIRECTS[pathname];
  if (!destination) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    "/mission",
    "/mission/",
    "/contact",
    "/contact/",
    "/pemf",
    "/pemf/",
    "/pulse-wave",
    "/pulse-wave/",
    "/sanexas",
    "/sanexas/",
    "/regen",
    "/regen/",
    "/prp",
    "/prp/",
    "/hips",
    "/hips/",
    "/knees",
    "/knees/",
    "/longevity-project",
    "/longevity-project/",
    "/projects-8",
    "/projects-8/",
    "/laser",
    "/laser/",
  ],
};
