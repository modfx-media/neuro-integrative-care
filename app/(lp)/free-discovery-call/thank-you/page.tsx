import type { Metadata } from "next";
import ThankYouLeadTracker from "@/components/analytics/ThankYouLeadTracker";
import ThankYouSection from "@/components/lp/ThankYouSection";
import PatientReviewsSection from "@/components/lp/PatientReviewsSection";
import CMSRoute from "@/components/cms/CMSRoute";
import { withCMSMetadata } from "@/lib/cms/metadata";


// Confirmation destination for the free-discovery-call funnel's lead
// form. Noindexed for the same reason as the offer page itself: it's a
// funnel-only step, not a page meant to rank on its own.
const metadataFallback: Metadata = {
  title: "Thank You",
  description: "Your free discovery call request has been received.",
  robots: { index: false, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCMSMetadata("/free-discovery-call/thank-you", metadataFallback);
}

export default function BrainAssessmentThankYouPage() {
  return (
    <CMSRoute path={"/free-discovery-call/thank-you"}>
    <>
      <ThankYouSection />
      <PatientReviewsSection />
      <ThankYouLeadTracker />
    </>
  
    </CMSRoute>);
}
