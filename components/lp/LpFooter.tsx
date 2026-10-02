"use client";

import { usePathname } from "next/navigation";
import { MapPin, Phone, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

// Landing-page footer. Carries the contact block, compliance disclaimer, and
// one CTA — no quick-links grid, no locations list, no social row, so the
// page keeps a single conversion path.
const PHONE_DISPLAY = "669-257-6940";
const PHONE_HREF = "tel:+16692576940";

export default function LpFooter() {
  // Thank-you page already converted the lead — no "book a call" CTA there.
  const isThankYouPage = usePathname()?.endsWith("/thank-you") ?? false;

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-20">
        <Reveal
          className={
            isThankYouPage
              ? "flex justify-center text-center"
              : "flex flex-col-reverse gap-10 sm:flex-row sm:items-start sm:justify-between"
          }
        >
          <div
            className={isThankYouPage ? "text-center" : "text-center sm:text-left"}
          >
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
              Visit
            </p>
            <h2 className="mt-4 font-serif text-2xl leading-tight text-paper">
              NeuroIntegrative Care
              <br />
              <span className="text-paper/70">of Los Gatos</span>
            </h2>

            <address className="mt-7 space-y-4 not-italic text-paper/85">
              <div
                className={`flex items-start justify-center gap-3 ${isThankYouPage ? "" : "sm:justify-start"}`}
              >
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-amber-b"
                  aria-hidden="true"
                />
                <div>
                  <p>20 S Santa Cruz Ave, Suite 101</p>
                  <p>Los Gatos, CA 95030</p>
                </div>
              </div>
              <div
                className={`flex items-start justify-center gap-3 ${isThankYouPage ? "" : "sm:justify-start"}`}
              >
                <Phone
                  size={18}
                  className="mt-1 shrink-0 text-amber-b"
                  aria-hidden="true"
                />
                <a
                  href={PHONE_HREF}
                  className="transition-colors hover:text-amber-b"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div
                className={`flex items-start justify-center gap-3 ${isThankYouPage ? "" : "sm:justify-start"}`}
              >
                <Clock
                  size={18}
                  className="mt-1 shrink-0 text-amber-b"
                  aria-hidden="true"
                />
                <div>
                  <p>Tue &amp; Thu</p>
                  <p className="text-paper/70">9:30–3:00</p>
                </div>
              </div>
            </address>
          </div>

          {!isThankYouPage && (
            <div className="text-center sm:max-w-sm">
              <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
                Next Step
              </p>
              <h2 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-paper sm:text-[1.65rem]">
                Ready to go now?
              </h2>
              <div className="mt-5 flex justify-center">
                <BrainAssessmentButton />
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
                No referral, no waiting room, no obligation. Just a few
                minutes to get a discovery call on the calendar.
              </p>
            </div>
          )}
        </Reveal>

        <Reveal
          delay={160}
          className="mt-14 flex flex-col gap-4 border-t border-rule-d pt-8 text-center text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between sm:text-left"
        >
          <p>
            &copy; {new Date().getFullYear()} NeuroIntegrative Care of Los
            Gatos. All rights reserved.
          </p>
          <p className="max-w-md sm:text-right">
            Information on this page is educational and not a substitute for
            medical advice.
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-6 flex justify-center sm:justify-end">
          <a
            href="https://modfxmedia.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50 transition-colors hover:text-amber-b"
          >
            Powered by ModFXMedia
          </a>
        </Reveal>
      </div>
    </footer>
  );
}
