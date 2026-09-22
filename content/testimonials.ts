// Sourced from the client's existing testimonials page
// (neurocarelg.com/testimonials) — short pull-quotes and public Google
// Reviews, copied verbatim. Do not paraphrase or embellish; these are
// already-published, client-approved statements.

import { fiveStarReviews, googleReviewsMeta } from "@/lib/reviews";

export interface ShortTestimonial {
  quote: string;
}

export interface GoogleReview {
  quote: string;
  reviewerName: string;
  source: string;
  url: string;
}

export const shortTestimonials: ShortTestimonial[] = [
  {
    quote:
      "I feel 30 years younger...It's your quality of life. You feel you, you feel normal but an energetic you. It's worth it! Totally worth it! Do it!",
  },
  {
    quote:
      "My knees feel much better. I used to walk up the stairs, leaning against the rail. I could go jumping up the stairs now on my own. I can kneel. I haven't been able to kneel in a long time.",
  },
  {
    quote:
      "The pain went away, within a week or so. I don't feel it now at night time anymore. The swelling has gone down. I have more movement.",
  },
];

export const GOOGLE_REVIEWS_URL = googleReviewsMeta.reviewsUrl;

export const googleReviews: GoogleReview[] = fiveStarReviews.map((review) => ({
  quote: review.quote,
  reviewerName: review.name,
  source: "Google Review",
  url: googleReviewsMeta.reviewsUrl,
}));

export const homepageGoogleReviews = googleReviews;
