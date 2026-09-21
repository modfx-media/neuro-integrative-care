import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Assessment Complete",
  robots: { index: false, follow: false },
};

export default function BrainAssessmentCompletePage() {
  return (
    <section className="bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
        <Reveal
          as="p"
          className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber"
        >
          Free Brain Assessment
        </Reveal>
        <Reveal delay={80} className="mt-4">
          <h1 className="font-serif text-4xl text-ink sm:text-5xl">
            You&apos;ve finished the assessment.
          </h1>
        </Reveal>
        <Reveal as="p" delay={160} className="mt-6 text-lg leading-relaxed text-muted">
          Your results are scored against your age group and sent to the
          clinic. If you&apos;d like someone to walk through them with you,
          book a consultation — no obligation.
        </Reveal>
        <Reveal delay={240} className="mt-10">
          <Link
            href="/start"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink"
          >
            Book a Consultation
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
