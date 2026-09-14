import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";

// Landing-page footer. Carries the contact block, compliance disclaimer, and
// one CTA — no quick-links grid, no locations list, no social row, so the
// page keeps a single conversion path.
const PHONE_DISPLAY = "(408) 871-8222";
const PHONE_HREF = "tel:+14088718222";
const BOOK_HREF = "/brain-assessment";

export default function LpFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-20">
        <Reveal className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
              Visit
            </p>
            <h2 className="mt-4 font-serif text-2xl leading-tight text-paper">
              NeuroIntegrative Care
              <br />
              <span className="text-paper/70">of Los Gatos</span>
            </h2>

            <address className="mt-7 space-y-4 not-italic text-paper/85">
              <div className="flex items-start gap-3">
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
              <div className="flex items-start gap-3">
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
              <div className="flex items-start gap-3">
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

          <div className="sm:text-right">
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
              Next Step
            </p>
            <p className="mt-4 max-w-xs font-serif text-xl leading-snug text-paper/85">
              Bring your case to someone who investigates it properly.
            </p>
            <Link
              href={BOOK_HREF}
              className="mt-7 inline-flex items-center rounded-full bg-gradient-to-r from-amber to-amber-b px-6 py-3 text-sm font-medium tracking-tight text-ink shadow-[0_10px_28px_-14px_rgba(248,180,43,0.5)] transition-shadow duration-300 hover:shadow-[0_18px_44px_-14px_rgba(248,180,43,0.8)]"
            >
              Take Your Free Brain Assessment
            </Link>
          </div>
        </Reveal>

        <Reveal
          delay={160}
          className="mt-14 flex flex-col gap-4 border-t border-rule-d pt-8 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between"
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
      </div>
    </footer>
  );
}
