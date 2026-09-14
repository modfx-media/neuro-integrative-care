import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import BrainAssessmentOfferSection from "@/components/lp/BrainAssessmentOfferSection";
import DrSantucciProfile from "@/components/about/DrSantucciProfile";

// Campaign landing page for the free brain assessment offer. It reuses the
// homepage hero and the Dr. Santucci profile sections verbatim, so it is a
// near-duplicate of pages that are already indexed — keep it out of the
// sitemap and noindex so it can't compete with them in search.
//
// Every CTA points at /brain-assessment and no body copy links away, so the
// page has exactly one exit.
export const metadata: Metadata = {
  title: "Brain Assessment Offer",
  description:
    "A 30-year, root-cause investigation into the brain, metabolism, and nervous system, led by Dr. Thomas Santucci, DC, AFNI. Start with a free brain assessment.",
  robots: { index: false, follow: true },
};

export default function BrainAssessmentOfferPage() {
  return (
    <>
      <HeroSection showSecondaryLink={false} />
      <DrSantucciProfile
        linkProgramNames={false}
        statsPlacement="under-photo"
        amberEducation
        afterStats={<BrainAssessmentOfferSection />}
      />
    </>
  );
}
