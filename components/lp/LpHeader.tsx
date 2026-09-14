import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

// Landing-page header. Deliberately has no site navigation — the only ways
// out are the phone number and the booking CTA. Sits transparently over the
// dark hero rather than reserving layout space, so the hero renders exactly
// as it does on the homepage.
const PHONE_DISPLAY = "(408) 871-8222";
const PHONE_HREF = "tel:+14088718222";
const BOOK_HREF = "/brain-assessment";

export default function LpHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-10 lg:py-5">
        <div className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
          <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-paper/25 sm:h-10 sm:w-10">
            <Image
              src="/images/logo/mark-square.webp"
              alt=""
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-serif text-[10px] tracking-normal text-paper sm:text-[13px] sm:tracking-[0.02em] xl:text-[15px]">
              NEUROINTEGRATIVE CARE
            </span>
            <span className="mt-1 whitespace-nowrap font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-amber-b sm:text-[12px] sm:tracking-[0.18em]">
              Los Gatos
            </span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-sm text-paper/85 transition-colors hover:text-amber-b sm:inline-flex"
          >
            <Phone size={16} aria-hidden="true" className="text-amber-b" />
            {PHONE_DISPLAY}
          </a>
          <Link
            href={BOOK_HREF}
            className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-gradient-to-r from-amber to-amber-b px-3.5 py-2 text-[12px] font-medium tracking-tight text-ink shadow-[0_6px_18px_-10px_rgba(232,160,32,0.75)] transition-shadow duration-300 hover:shadow-[0_14px_32px_-10px_rgba(232,160,32,0.9)] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Take Your Free Brain Assessment
          </Link>
        </div>
      </div>
    </header>
  );
}
