import type { Metadata } from "next";
import Script from "next/script";
import ThankYouSection from "@/components/lp/ThankYouSection";
import PatientReviewsSection from "@/components/lp/PatientReviewsSection";

// Confirmation destination for the brain-assessment-offer funnel's lead
// form. Noindexed for the same reason as the offer page itself: it's a
// funnel-only step, not a page meant to rank on its own.
export const metadata: Metadata = {
  title: "Thank You",
  description: "Your free discovery call request has been received.",
  robots: { index: false, follow: true },
};

export default function BrainAssessmentThankYouPage() {
  return (
    <>
      <ThankYouSection />
      <PatientReviewsSection />
      {/* Meta Pixel Lead event — this is the funnel's conversion page. */}
      <Script id="meta-pixel-lead" strategy="afterInteractive">
        {`fbq('track', 'Lead');`}
      </Script>
    </>
  );
}
