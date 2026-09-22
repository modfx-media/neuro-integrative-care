import { cache } from "react";
import {
  fiveStarReviews,
  googleReviewsMeta,
  isFiveStarReview,
  type GoogleReview,
  type GoogleReviewsMeta,
} from "./reviews";

const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24;
const PLACES_FIELD_MASK = "id,rating,userRatingCount,googleMapsUri,reviews";

export type GoogleReviewsPayload = {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type PlacesDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
  error?: { message?: string; status?: string };
};

function fallbackPayload(): GoogleReviewsPayload {
  const reviews = sortMostReviewsFirst(fiveStarReviews);
  return {
    reviews,
    meta: { ...googleReviewsMeta, fiveStarCount: reviews.length },
  };
}

function mapPlaceReview(review: PlacesReview): GoogleReview | null {
  const quote = (review.text?.text ?? review.originalText?.text ?? "").trim();
  const name = review.authorAttribution?.displayName?.trim() ?? "";
  const rating = review.rating ?? 0;

  // Exact 5 only. Drop 4, 4.5, empty text, and nameless authors here.
  if (rating !== 5 || !quote || !name) return null;

  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relativePublishTimeDescription,
  };
}

function normalizeQuote(quote: string): string {
  return quote
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function reviewKey(review: GoogleReview): string {
  return `${review.name.trim().toLowerCase()}|${normalizeQuote(review.quote).slice(0, 80)}`;
}

function recencyDays(relativeTime?: string): number {
  if (!relativeTime) return Number.POSITIVE_INFINITY;
  const match = relativeTime.match(/(\d+)\s+(day|week|month|year)/i);
  if (!match) return Number.POSITIVE_INFINITY;
  const count = Number(match[1]);
  const unit = match[2].toLowerCase();
  if (unit.startsWith("day")) return count;
  if (unit.startsWith("week")) return count * 7;
  if (unit.startsWith("month")) return count * 30;
  return count * 365;
}

/** Longest written reviews first, then more recent when length is close. */
function sortMostReviewsFirst(reviews: GoogleReview[]): GoogleReview[] {
  return [...reviews].sort((a, b) => {
    const byLength = b.quote.trim().length - a.quote.trim().length;
    if (byLength !== 0) return byLength;
    return recencyDays(a.relativeTime) - recencyDays(b.relativeTime);
  });
}

/**
 * Place Details returns at most 5 most-relevant reviews. Union those with
 * the on-file 5-star quotes so every verified 5-star review still appears.
 */
function mergeFiveStarReviews(
  live: GoogleReview[],
  fallback: GoogleReview[],
): GoogleReview[] {
  const seen = new Set<string>();
  const merged: GoogleReview[] = [];

  for (const review of [...live, ...fallback]) {
    if (!isFiveStarReview(review)) continue;
    const key = reviewKey(review);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(review);
  }

  const names = new Set<string>();
  const unique = merged.filter((review) => {
    const name = review.name.trim().toLowerCase();
    if (names.has(name)) return false;
    names.add(name);
    return true;
  });

  return sortMostReviewsFirst(unique);
}

/**
 * Places API (New), then 5-star reviews with text only.
 * Google returns at most 5 most-relevant reviews. Those are merged with the
 * verified on-file 5-star quotes so the site can show the full 5-star set.
 */
export const getDisplayedGoogleReviews = cache(
  async (): Promise<GoogleReviewsPayload> => {
    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY?.trim() ||
      process.env.GOOGLE_API_KEY?.trim();
    const placeId =
      process.env.GOOGLE_PLACE_ID?.trim() || googleReviewsMeta.placeId;

    if (!apiKey || placeId.startsWith("REPLACE_")) return fallbackPayload();

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
        {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": PLACES_FIELD_MASK,
          },
          next: {
            revalidate: REVIEWS_REVALIDATE_SECONDS,
            tags: ["google-reviews"],
          },
        },
      );

      const data = (await response.json()) as PlacesDetailsResponse;

      if (!response.ok || data.error) {
        console.error(
          "Google Places reviews request failed:",
          data.error?.message ?? response.statusText,
        );
        return fallbackPayload();
      }

      const liveReviews = (data.reviews ?? [])
        .map(mapPlaceReview)
        .filter((review): review is GoogleReview => review !== null)
        .filter(isFiveStarReview);

      const reviews = mergeFiveStarReviews(liveReviews, fiveStarReviews);
      if (reviews.length === 0) return fallbackPayload();

      return {
        reviews,
        meta: {
          rating: data.rating ?? googleReviewsMeta.rating,
          reviewCount: data.userRatingCount ?? googleReviewsMeta.reviewCount,
          fiveStarCount: reviews.length,
          placeId,
          reviewsUrl: data.googleMapsUri ?? googleReviewsMeta.reviewsUrl,
        },
      };
    } catch (error) {
      console.error("Google Places reviews fetch error:", error);
      return fallbackPayload();
    }
  },
);
