import { SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonLd";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { isFiveStarReview } from "@/lib/reviews";

const NAME = "NeuroIntegrative Care of Los Gatos";
const TELEPHONE = "+1-408-871-8222";
const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "20 S Santa Cruz Ave, Suite 101",
  addressLocality: "Los Gatos",
  addressRegion: "CA",
  postalCode: "95030",
  addressCountry: "US",
} as const;
const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Tuesday",
    opens: "09:30",
    closes: "15:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Thursday",
    opens: "09:30",
    closes: "15:00",
  },
] as const;

// Organization schema — brand/entity signal.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo/mark-square.webp`,
  telephone: TELEPHONE,
  address: ADDRESS,
  founder: {
    "@type": "Person",
    name: "Dr. Thomas Santucci",
    url: `${SITE_URL}/about/dr-thomas-santucci`,
  },
  foundingDate: "1996",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: TELEPHONE,
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
};

// LocalBusiness schema — physical-location signal (hours, NAP, geo).
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: NAME,
  url: `${SITE_URL}/`,
  telephone: TELEPHONE,
  address: ADDRESS,
  openingHoursSpecification: OPENING_HOURS,
  priceRange: "$$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card",
  areaServed: {
    "@type": "City",
    name: "Los Gatos",
    sameAs: "https://en.wikipedia.org/wiki/Los_Gatos,_California",
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=20+S+Santa+Cruz+Ave,+Suite+101,+Los+Gatos,+CA+95030",
};

// MedicalClinic schema — the specific medical-business type. Kept because it
// carries the medical-specialty + service catalog Google uses for medical
// SERP features; and because it's the sitewide entity most other page-level
// schemas reference via @id.
const medicalClinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}/#medicalclinic`,
  name: NAME,
  description:
    "Functional medicine, functional neurology, and regenerative medicine practice specializing in root-cause investigation of complex chronic conditions.",
  url: `${SITE_URL}/`,
  telephone: TELEPHONE,
  priceRange: "$$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card",
  medicalSpecialty: {
    "@type": "MedicalSpecialty",
    name: "Neurology",
  },
  founder: {
    "@type": "Physician",
    name: "Dr. Thomas Santucci",
  },
  address: ADDRESS,
  openingHoursSpecification: OPENING_HOURS,
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=20+S+Santa+Cruz+Ave,+Suite+101,+Los+Gatos,+CA+95030",
  areaServed: {
    "@type": "City",
    name: "Los Gatos",
    sameAs: "https://en.wikipedia.org/wiki/Los_Gatos,_California",
  },
  availableService: [
    { "@type": "MedicalTherapy", name: "Functional Medicine" },
    { "@type": "MedicalTherapy", name: "Functional Neurology" },
    { "@type": "MedicalTherapy", name: "Regenerative Medicine" },
    { "@type": "MedicalTherapy", name: "Chronic Condition Management" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: TELEPHONE,
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
};

export default async function OrganizationJsonLd() {
  const { reviews, meta } = await getDisplayedGoogleReviews();
  const visible = reviews.filter(isFiveStarReview);
  const aggregateRating =
    meta.rating > 0 && meta.reviewCount > 0
      ? {
          "@type": "AggregateRating" as const,
          ratingValue: String(meta.rating),
          reviewCount: meta.reviewCount,
          bestRating: "5",
        }
      : undefined;
  const review =
    visible.length > 0
      ? visible.map((item) => ({
          "@type": "Review" as const,
          author: { "@type": "Person" as const, name: item.name },
          reviewRating: {
            "@type": "Rating" as const,
            ratingValue: "5",
            bestRating: "5",
          },
          reviewBody: item.quote,
        }))
      : undefined;

  const localBusiness = {
    ...localBusinessSchema,
    ...(aggregateRating ? { aggregateRating } : {}),
  };
  const medicalClinic = {
    ...medicalClinicSchema,
    ...(aggregateRating ? { aggregateRating } : {}),
    ...(review ? { review } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(localBusiness),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(medicalClinic),
        }}
      />
    </>
  );
}
