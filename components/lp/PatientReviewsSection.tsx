import { Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import { homepageGoogleReviews } from "@/content/testimonials";

// Quotes come verbatim from content/testimonials.ts (published,
// client-approved Google Reviews) and are rendered unlinked.
const FEATURED_REVIEWERS = [
  "Chris Prendergast",
  "Leslie Alan Cezar",
  "R. Gregory Lombard",
];

const TESTIMONIALS = homepageGoogleReviews.filter((review) =>
  FEATURED_REVIEWERS.includes(review.reviewerName),
);

export default function PatientReviewsSection() {
  return (
    <section className="bg-paper-2 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
            Patient Reviews
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            What patients say after being properly looked at.
          </h2>
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
                  className="flex items-center justify-center gap-0.5 text-amber lg:justify-start"
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

        <Reveal delay={280} className="mt-8 text-center">
          <p className="text-[13px] italic leading-snug text-muted">
            Individual results; outcomes vary.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
