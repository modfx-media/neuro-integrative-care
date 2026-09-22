"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Reveal from "@/components/Reveal";

export type GoogleReviewCard = {
  quote: string;
  name: string;
  when?: string;
};

function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.8741 2.6836-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.8591-3.0477.8591-2.3436 0-4.3282-1.5831-5.036-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2822-1.71V4.9582H.9573C.3477 6.1732 0 7.5477 0 9s.3477 2.8268.9573 4.0418L3.964 10.71z"
      />
      <path
        fill="#EA4335"
        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5814-2.5814C13.4632.9917 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6564 3.5795 9 3.5795z"
      />
    </svg>
  );
}

function ReviewStars() {
  return (
    <div className="flex items-center gap-0.5 text-amber" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReviewCard }) {
  const popupId = useId();
  const cardRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [truncated, setTruncated] = useState(false);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 360 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const check = () => setTruncated(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [review.quote]);

  const updateCoords = () => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = Math.min(440, rect.width + 16);
    const margin = 16;
    let left = rect.left - 8;
    if (left + width > window.innerWidth - margin) {
      left = window.innerWidth - width - margin;
    }
    if (left < margin) left = margin;

    const maxHeight = Math.min(window.innerHeight * 0.7, 480);
    let top = rect.top - 8;
    if (top + maxHeight > window.innerHeight - margin) {
      top = Math.max(margin, window.innerHeight - maxHeight - margin);
    }
    if (top < margin) top = margin;

    setCoords({ top, left, width });
  };

  const showPopup = () => {
    if (!truncated) return;
    clearTimeout(closeTimerRef.current);
    updateCoords();
    setOpen(true);
  };

  const hidePopup = () => {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onScroll = () => updateCoords();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <blockquote
        ref={cardRef}
        className="relative flex h-full w-[320px] shrink-0 flex-col rounded-2xl border border-rule/70 bg-white p-6 shadow-[0_1px_2px_rgba(11,18,32,0.04)] sm:w-[360px]"
      >
        <ReviewStars />
        <p
          ref={quoteRef}
          className="mt-4 flex-1 text-[14px] leading-relaxed text-ink line-clamp-6"
        >
          &ldquo;{review.quote}&rdquo;
        </p>
        {truncated ? (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={popupId}
            onMouseEnter={showPopup}
            onMouseLeave={hidePopup}
            onClick={() => {
              if (open) {
                setOpen(false);
                return;
              }
              showPopup();
            }}
            className="mt-3 self-start font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-amber transition hover:text-ink"
          >
            Read more
          </button>
        ) : null}
        <p className="mt-5 border-t border-rule pt-4 font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-muted">
          {review.name} · Google
          {review.when ? ` · ${review.when}` : ""}
        </p>
      </blockquote>
      {mounted && open && truncated
        ? createPortal(
            <div
              id={popupId}
              role="tooltip"
              onMouseEnter={showPopup}
              onMouseLeave={hidePopup}
              style={{
                top: coords.top,
                left: coords.left,
                width: coords.width,
              }}
              className="fixed z-[70] max-h-[70vh] overflow-y-auto rounded-2xl border border-rule/70 bg-white p-6 shadow-[0_16px_40px_rgba(11,18,32,0.16)]"
            >
              <ReviewStars />
              <p className="mt-4 text-[14px] leading-relaxed text-ink">
                &ldquo;{review.quote}&rdquo;
              </p>
              <p className="mt-5 border-t border-rule pt-4 font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-muted">
                {review.name} · Google
                {review.when ? ` · ${review.when}` : ""}
              </p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

// Duplicated once so the auto-scroll can loop seamlessly (scrollLeft wraps at the halfway point).
export default function GoogleReviewsMarquee({
  items,
  rating,
  reviewCount,
  reviewsUrl,
}: {
  items: GoogleReviewCard[];
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    let frame: number;
    const step = () => {
      if (!pausedRef.current) {
        track.scrollLeft += 0.6;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft -= track.scrollWidth / 2;
        }
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    pausedRef.current = true;
    track.scrollBy({ left: direction * 384, behavior: "smooth" });
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 4000);
  };

  if (items.length === 0) return null;

  return (
    <section className="overflow-hidden bg-paper-2 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Image
              src="/images/homepage-images/google-badge.png"
              alt="Google Reviews"
              width={480}
              height={135}
              className="h-20 w-auto"
            />
            {rating > 0 && reviewCount > 0 ? (
              <p className="mt-3 font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-muted">
                {rating.toFixed(1)} from {reviewCount} Google reviews
              </p>
            ) : null}
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              What patients are saying.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-rule/70 bg-white px-5 py-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink transition hover:border-ink/30 hover:bg-paper"
            >
              <GoogleLogo size={16} />
              View all Google reviews
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll reviews left"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule/70 bg-white text-ink transition hover:border-ink/30 hover:bg-paper"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Scroll reviews right"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule/70 bg-white text-ink transition hover:border-ink/30 hover:bg-paper"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120} offset={24} className="mt-12">
        <div
          ref={trackRef}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          className="flex gap-6 overflow-x-auto scroll-smooth [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {[...items, ...items].map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
