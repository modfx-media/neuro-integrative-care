"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Fires once the pixel stub exists. An inline next/script on this page
// races the layout snippet (fbq is not defined) and does not re-run when
// the thank-you route is reached by client-side navigation.
export default function ThankYouLeadTracker() {
  useEffect(() => {
    let cancelled = false;
    let timer = 0;
    let attempts = 0;

    const tick = () => {
      if (cancelled) return;
      if (typeof window.fbq === "function") {
        // The funnel now hits the video page and then thank-you. Track the
        // lead once per session so both steps can mount this without a
        // double fire.
        const key = "nic-lead-tracked";
        if (window.sessionStorage.getItem(key) === "1") return;
        window.fbq("track", "Lead", { content_name: "Lead Submitted" });
        window.sessionStorage.setItem(key, "1");
        return;
      }
      if (attempts++ < 40) timer = window.setTimeout(tick, 250);
    };

    timer = window.setTimeout(tick, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
