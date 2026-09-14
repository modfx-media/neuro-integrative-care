import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

// A short, urgency-driven mid-page nudge for anyone who's already decided
// and doesn't want to keep scrolling to find the button — sits between the
// program details and the closing FinalCTA section.
export default function ReadyNowCtaSection() {
  return (
    <section className="bg-paper-2 py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
            No Need to Wait
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            Already know you&apos;re ready?
            <br />
            <span className="text-amber-b">Go ahead and grab your spot.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            No referral, no waiting room, no obligation. Just a few minutes
            to get your assessment on the calendar.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-8 flex justify-center">
          <BrainAssessmentButton />
        </Reveal>
      </div>
    </section>
  );
}
