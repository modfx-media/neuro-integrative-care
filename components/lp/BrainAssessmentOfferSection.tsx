"use client";

import { Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import { homepageGoogleReviews } from "@/content/testimonials";
import { useLeadFormModal } from "@/components/lp/LeadFormModal";

// COMPLIANCE: the offer copy below is taken from the already-approved
// /brain-assessment page — objective testing language only, no diagnostic or
// curative claims. Review quotes come verbatim from content/testimonials.ts
// (published, client-approved Google Reviews) and are rendered unlinked, so
// nothing in this landing page's body copy leads off the page.

const WHAT_YOU_GET = [
  {
    title: "A short set of cognitive tasks",
    detail: "Memory, attention, and reasoning, measured rather than guessed.",
  },
  {
    title: "Scored against your age group",
    detail: "You see where you actually sit, not a vague impression.",
  },
  {
    title: "Run on a secure platform",
    detail: "Delivered through Creyos, our assessment partner.",
  },
] as const;

const FEATURED_REVIEWERS = [
  "Chris Prendergast",
  "Leslie Alan Cezar",
  "R. Gregory Lombard",
];

const TESTIMONIALS = homepageGoogleReviews.filter((review) =>
  FEATURED_REVIEWERS.includes(review.reviewerName),
);

export default function BrainAssessmentOfferSection() {
  const modal = useLeadFormModal();

  return (
    <section className="bg-paper-2 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
            The Offer
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            Start with a free brain assessment.
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal offset={24} className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-rule bg-ink shadow-[0_24px_60px_-30px_rgba(11,18,32,0.45)]">
              <video
                controls
                playsInline
                preload="none"
                poster="/videos/brain-assessment-offer-poster.png"
                className="aspect-square h-full w-full object-contain"
              >
                <source
                  src="/videos/brain-assessment-offer.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </Reveal>

          <Reveal delay={120} offset={24} className="lg:col-span-6">
            <ul className="space-y-6">
              {WHAT_YOU_GET.map((item, i) => (
                <li key={item.title} className="border-l border-amber/50 pl-5">
                  <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-serif text-[1.15rem] leading-tight text-ink">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={modal?.open}
              className="mt-10 inline-flex items-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.85)]"
            >
              Take Your Free Brain Assessment
            </button>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-rule pt-16">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Patient Reviews
            </p>
            <h3 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
              What patients say after being properly looked at.
            </h3>
          </Reveal>

          <ul className="mt-12 grid items-start gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((review, i) => (
              <Reveal
                key={review.reviewerName}
                as="li"
                delay={100 + i * 90}
                offset={20}
                className="h-full"
              >
                <blockquote className="flex h-full flex-col rounded-2xl border border-rule/70 bg-paper p-6 lg:p-7">
                  <div
                    className="flex items-center gap-0.5 text-amber"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        size={14}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="mt-5 border-t border-rule pt-4 font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-muted">
                    {review.reviewerName} · {review.source}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={280} className="mt-8">
            <p className="text-[13px] italic leading-snug text-muted">
              Individual results; outcomes vary.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
