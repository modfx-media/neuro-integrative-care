import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import BrainAssessmentOfferSection from "@/components/lp/BrainAssessmentOfferSection";
import AssessmentFlowSection from "@/components/lp/AssessmentFlowSection";
import WarningSignsSection from "@/components/lp/WarningSignsSection";
import TenWeekProgramSection from "@/components/lp/TenWeekProgramSection";
import DrSantucciProfile from "@/components/about/DrSantucciProfile";
import PublicationsSection from "@/components/about/PublicationsSection";
import PatientReviewsSection from "@/components/lp/PatientReviewsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Reveal from "@/components/Reveal";

// Patient-focused stat bar for the funnel hero — swaps the homepage's
// career-history stats (Silicon Valley, colleges) for what a prospective
// patient cares about. Only reuses claims already verified elsewhere on the
// site (5-star Google rating, 30+ years founded 1996, drug-free care).
const PATIENT_STATS = [
  { value: "5★", label: "Google Reviews" },
  { value: "30+", label: "Years Treating Patients" },
  { value: "1:1", label: "Doctor-Led Care" },
] as const;

// Campaign landing page for the free brain assessment offer, assembled from
// the site's own sections (hero, investigation process, bio, offer, 10-week
// program) so copy and claims stay in lockstep with the rest of the site.
// Each section appears exactly once — noindexed because it's a funnel
// variant of pages that are already indexed on their own.
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
      <HeroSection
        eyebrow="Free Brain Assessment · NeuroIntegrative Care of Los Gatos"
        heading={
          <>
            <Reveal as="span" delay={180} offset={28} className="block">
              You&apos;re not imagining it.
            </Reveal>
            <Reveal as="span" delay={400} offset={28} className="block">
              You&apos;ve just never been{" "}
              <span className="italic text-amber-b">fully investigated</span>.
            </Reveal>
          </>
        }
        subtitle="Take your free, objective cognitive assessment now. Scored against your age group, done in minutes. Drug-free. No obligation. Limited spots."
        stats={PATIENT_STATS}
        statsClassName="mx-auto max-w-2xl justify-items-center text-center"
        statsMobileColsClassName="grid-cols-3"
        showSecondaryLink={false}
      />
      <WarningSignsSection />
      <BrainAssessmentOfferSection />
      <AssessmentFlowSection />
      <DrSantucciProfile
        linkProgramNames={false}
        statsPlacement="under-photo"
        amberEducation
        centerHeadings
        darkTraining
        showEducation={false}
        showExperience={false}
        showClinicalFocus={false}
        showSpeakingMedia={false}
        showKeySkills={false}
        showCredentials={false}
        showName
        showCta={false}
        showTrainingCta
        showPublications={false}
        showRecoveryStory={false}
        afterTraining={<TenWeekProgramSection />}
      />
      <WhyChooseUs showCta centered />
      <PublicationsSection centerHeadings />
      <PatientReviewsSection />
    </>
  );
}

