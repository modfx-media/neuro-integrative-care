/**
 * Per-client Google review types + fallback.
 * Fallback quotes are real 5-star Google reviews for THIS business,
 * copied verbatim from the public listing / previously published site copy.
 */
export const googleReviewsMeta = {
  rating: 4.6, // Google's overall, all stars
  reviewCount: 29, // Google's total review count, all stars
  fiveStarCount: 14,
  placeId: "ChIJa6A-0JQ1joARYi3ZGc56iNg",
  reviewsUrl: "https://maps.google.com/?cid=15602855934640598370",
} as const;

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  placeId: string;
  reviewsUrl: string;
};

export const googleReviews: GoogleReview[] = [
  {
    quote:
      "Aloha, As an Elite Sports Performance Coach and Master Personal Trainer who has also been in the health, fitness and regenerative therapies for over 3 decades, I was very impressed with the offerings and technologies that were available at Advanced Regen Medical. The Stem Cell and Exosome procedures are cutting edge as well!! In health-sustainability-excellence, Coach Holland",
    name: "Michael Holland",
    rating: 5,
    relativeTime: "6 years ago",
  },
  {
    quote:
      "Excellent experience! The entire staff are incredibly supportive and friendly. Dr Santucci is absolutely fantastic doctor with a genuine desire to help the patient. The treatments suggested were explained well and made sense. My mother was suffering from a constant pain in her knee which was impacting her daily activities. After receiving the treatment not only the pain has significantly decreased, she also could get back to walking and exercising without constant discomfort. I highly recommend this place for anyone who is looking into regenerative medicine treatments.",
    name: "Anna Hawkins",
    rating: 5,
  },
  {
    quote:
      "I have not seen Dr Santucci in while. I haven't had too! Something popped into my head today as a reminder of how bad I was when I first started working with him and the team, as apposed to how well I am doing now. Retroactive thank you! Dr Santucci is hands down the best medical professional I have every worked with - smart, not afraid to stand his ground, meditative, inquisitive, and possibly super human.",
    name: "Chris Prendergast",
    rating: 5,
  },
  {
    quote:
      "Staff members are awesome and very helpful. Took my Dad for an appointment and he said he was impressed with the knowledge and the explanation the doctor provided him regarding his pain and how best to treat it without surgery. He is looking forward to his follow up.",
    name: "Mike Nguyen",
    rating: 5,
  },
  {
    quote:
      "The staff are very friendly, always very helpful and knowledgeable. Dr Santucci is always working to keep up on current and new alternative treatments. I recommend Advance Regen Medical. I give them 5 Stars.",
    name: "Roger Martin",
    rating: 5,
  },
  {
    quote:
      "Advanced Regen Medical are Absolute Leaders in Their Field. Everyone in the Office is Professional and Friendly. Dr. Santucci's Practice should definitely be on the Top of Your List. Can't Wait for My Next Appointment. Thank You! Advanced Regen Medical",
    name: "Dwayne Martinez",
    rating: 5,
  },
  {
    quote:
      "Dr. Santucci offers a unique opportunity to find a solution for your medical issues. Especially concerning joints, nerve systems and traumatic brain injurys. Very nice people, also.",
    name: "R. Gregory Lombard",
    rating: 5,
  },
  {
    quote:
      "My initial visit was interesting and the staff spent time running through tests to understand my condition. They were thorough and I have made an appointment to follow through on these suggestions and will update once the results are obtained",
    name: "Leslie Alan Cezar",
    rating: 5,
  },
  {
    quote:
      "I'm so glad I've found this clinic. They have a great staff, explained the treatment to me clearly and above all ive had great results. Thanks!",
    name: "Chau Nguyen",
    rating: 5,
  },
  {
    quote:
      "Definitely recommend Advanced Regen Medical! What an honest and knowledgeable group they are, and such friendly staff! Better price than anyone else.",
    name: "Toku H",
    rating: 5,
  },
  {
    quote: "Friendly and awesome staff! My dad avoided shoulder surgery by getting treated here.",
    name: "Matt Day",
    rating: 5,
  },
  {
    quote: "Friendly and knowledgeable people. Looking forward to working with them.",
    name: "Tom Powell",
    rating: 5,
  },
  {
    quote: "Friendly and knowledgeable staff",
    name: "Ken Benson",
    rating: 5,
  },
  {
    quote: "Amazing service!",
    name: "Linda Tran",
    rating: 5,
  },
];

/** The only acceptance test for a card or a JSON-LD review. */
export function isFiveStarReview(review: GoogleReview): boolean {
  return review.rating === 5 && review.quote.trim().length > 0 && review.name.trim().length > 0;
}

export const fiveStarReviews = googleReviews.filter(isFiveStarReview);
