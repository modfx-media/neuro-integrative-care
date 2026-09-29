"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import Script from "next/script";
import {
  GHL_LEAD_FORM_HEIGHT,
  GHL_LEAD_FORM_ID,
  GHL_LEAD_FORM_NAME,
  GHL_LEAD_FORM_TITLE,
} from "@/lib/ghl-form";

interface LeadFormModalContextValue {
  open: () => void;
}

const LeadFormModalContext = createContext<LeadFormModalContextValue | null>(
  null,
);

// Site-wide CTAs open this GoHighLevel form instead of navigating away.
export function useLeadFormModal() {
  return useContext(LeadFormModalContext);
}

// Props default to the sitewide form; the (lp) layout nests a second
// provider with the popup-specific form so only landing pages under it pick
// up the different form (nested context overrides the root one for that
// subtree, sitewide CTAs elsewhere are unaffected).
export function LeadFormModalProvider({
  children,
  formId = GHL_LEAD_FORM_ID,
  formHeight = GHL_LEAD_FORM_HEIGHT,
  formName = GHL_LEAD_FORM_NAME,
  formTitle = GHL_LEAD_FORM_TITLE,
}: {
  children: ReactNode;
  formId?: string;
  formHeight?: number;
  formName?: string;
  formTitle?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <LeadFormModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book a free discovery call"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />
          <div className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-paper shadow-[0_40px_100px_-20px_rgba(11,18,32,0.55)]">
            <div className="flex items-center justify-between gap-4 border-b border-rule px-6 py-5">
              <div>
                <p className="font-mono font-medium text-[11px] uppercase tracking-[0.18em] text-amber">
                  Free Discovery Call
                </p>
                <p className="mt-1 font-serif text-lg font-bold leading-tight text-ink">
                  Book a FREE Discovery Call
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="shrink-0 rounded-full p-2 text-ink/50 transition-colors hover:bg-paper-2 hover:text-ink"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-paper-2 p-2 sm:p-4">
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
                style={{
                  width: "100%",
                  height: `${formHeight}px`,
                  border: "none",
                  borderRadius: "8px",
                }}
                id={`inline-${formId}`}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name={formName}
                data-height={String(formHeight)}
                data-layout-iframe-id={`inline-${formId}`}
                data-form-id={formId}
                data-cookie-consent="true"
                data-cookie-consent-provider="auto"
                title={formTitle}
              />
            </div>
          </div>
        </div>
      )}

      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </LeadFormModalContext.Provider>
  );
}
