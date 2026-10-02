"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// The base snippet in app/layout.tsx fires PageView once, on the first
// document load. Client-side navigations do not reload that script, so
// without this listener Meta only ever sees the landing URL.
function MetaPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const seen = useRef<string | null>(null);

  useEffect(() => {
    const key = `${pathname}?${searchParams.toString()}`;
    let cancelled = false;
    let timer = 0;
    let attempts = 0;

    const tick = () => {
      if (cancelled) return;
      // First observation is the load the base snippet already reported.
      if (seen.current === null) {
        seen.current = key;
        return;
      }
      if (seen.current === key) return;
      if (typeof window.fbq === "function") {
        seen.current = key;
        window.fbq("track", "PageView");
        return;
      }
      if (attempts++ < 40) timer = window.setTimeout(tick, 250);
    };

    timer = window.setTimeout(tick, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPageView() {
  return (
    <Suspense fallback={null}>
      <MetaPageViewTracker />
    </Suspense>
  );
}
