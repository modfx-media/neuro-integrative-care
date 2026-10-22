"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const SCRIPT_SRC = "https://cdn.practicebetter.io/assets/js/booking.widget.js";

declare global {
  interface Window {
    __bcmWidgetInitialized?: boolean;
  }
}

function revealIframe(iframe: HTMLIFrameElement) {
  if (iframe.id.startsWith("ghl_embed")) iframe.removeAttribute("id");
  iframe.style.removeProperty("opacity");
  iframe.style.removeProperty("visibility");
  iframe.style.removeProperty("pointer-events");
  iframe.style.removeProperty("left");
}

function useSameOriginBooking(iframe: HTMLIFrameElement) {
  if (!iframe.src.includes("practicebetter.io")) return;
  try {
    const remote = new URL(iframe.src);
    iframe.src = `/pb-booking${remote.search}${remote.hash}`;
  } catch {
    // Ignore malformed src; the official widget will retry.
  }
}

function applyBookingHeight(host: HTMLDivElement, height: number) {
  if (height < 120 || height > 900) return;
  host.style.height = `${Math.round(height)}px`;
}

function isBookingHeightMessage(
  data: unknown,
): data is { source: "nic-pb-booking"; height: number } {
  return (
    typeof data === "object" &&
    data !== null &&
    "source" in data &&
    data.source === "nic-pb-booking" &&
    "height" in data &&
    typeof data.height === "number"
  );
}

export default function BookingWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = widgetRef.current;
    if (!host) return;

    window.__bcmWidgetInitialized = false;
    host.querySelectorAll("iframe").forEach((frame) => frame.remove());

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = false;
    document.body.appendChild(script);

    const syncIframe = () => {
      host.querySelectorAll("iframe").forEach((frame) => {
        revealIframe(frame);
        useSameOriginBooking(frame);
      });
    };
    const onMessage = (event: MessageEvent) => {
      if (!isBookingHeightMessage(event.data)) return;
      const frame = host.querySelector("iframe");
      if (frame && event.source !== frame.contentWindow) return;
      applyBookingHeight(host, event.data.height);
    };
    const observer = new MutationObserver(syncIframe);
    observer.observe(host, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "style", "id"],
    });
    window.addEventListener("message", onMessage);
    syncIframe();

    return () => {
      observer.disconnect();
      window.removeEventListener("message", onMessage);
      window.__bcmWidgetInitialized = false;
      script.remove();
    };
  }, []);

  return (
    <>
      <style>{`.better-inline-booking-widget{position:relative;overflow:hidden;width:100%;max-width:520px;height:800px;margin-inline:auto;transition:height .2s ease}.better-inline-booking-widget iframe{position:absolute;inset:0;width:100%;height:100%;border:0}`}</style>
      <div
        ref={widgetRef}
        className="better-inline-booking-widget"
        data-url="https://neurointegrativecareoflosgatos6882.practicebetter.io"
        data-booking-page="6ad259bc7878e362545ad7bf"
        data-hash="69482a6e4f5f366b24e31491"
        data-theme="32a363"
        data-theme-accent="e74c3c"
        data-scrollbar-visible="false"
      />
      <Script
        id="practice-better-booking-widget"
        src={SCRIPT_SRC}
        strategy="afterInteractive"
      />
    </>
  );
}
