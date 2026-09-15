import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import BrainAssessmentOfferSection from "@/components/lp/BrainAssessmentOfferSection";
import AssessmentFlowSection from "@/components/lp/AssessmentFlowSection";
import WarningSignsSection from "@/components/lp/WarningSignsSection";
import TenWeekProgramSection from "@/components/lp/TenWeekProgramSection";
import ReadyNowCtaSection from "@/components/lp/ReadyNowCtaSection";
import DrSantucciProfile from "@/components/about/DrSantucciProfile";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
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
        subtitle="Book your free, objective cognitive assessment now. Scored against your age group, done in minutes. Drug-free. No obligation. Limited spots."
        stats={PATIENT_STATS}
        statsClassName="mx-auto max-w-2xl justify-items-center text-center"
        statsMobileColsClassName="grid-cols-3"
        showSecondaryLink={false}
      />
      <WarningSignsSection />
      <BrainAssessmentOfferSection />
      <HowItWorks />

      {/* Moved out of DrSantucciProfile (showCta={false} below) per request. */}
      <section className="relative overflow-hidden bg-paper-2 py-24 lg:py-28">
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-serif text-3xl leading-[1.2] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Ready to have your case seen this way?
            </h2>
          </Reveal>
          <Reveal delay={140} className="mt-10 flex justify-center">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

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
        showName
        showCta={false}
        showTrainingCta
      />
      <WhyChooseUs showCta centered />
      <TenWeekProgramSection />
      <ReadyNowCtaSection />
    </>
  );
}

