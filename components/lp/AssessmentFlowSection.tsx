import Image from "next/image";
import Reveal from "@/components/Reveal";
import { PROGRAM_ARC } from "@/content/howItWorks";

// Mirrors the "From assessment to treatment plan" section on the site's
// own /how-it-works page, reusing the same flow diagram, week-arc box, and
// copy so the funnel doesn't introduce new claims.
export default function AssessmentFlowSection() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
            How It Works
          </p>
          <h2 className="mt-4 font-serif text-[2.75rem] leading-tight tracking-tight text-ink sm:text-[3.5rem]">
            From assessment to treatment plan.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            qEEG brain mapping and psychological testing feed one treatment
            plan, reassessed periodically to confirm the plan is working.
          </p>
        </Reveal>
        <Reveal
          delay={120}
          offset={24}
          className="mt-10 overflow-hidden rounded-2xl border border-rule/60"
        >
          <Image
            src="/images/brain-assessment/assessment-flow.jpg"
            alt="Flow diagram: patient intake leads to an initial assessment (qEEG brain mapping and psychological testing), which produces a treatment plan of CBT, DBT, VR, biofeedback, or neurofeedback, reassessed periodically over the treatment period"
            width={1511}
            height={600}
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </Reveal>
        <Reveal
          delay={180}
          className="mt-6 grid gap-3 sm:grid-cols-2"
        >
          {PROGRAM_ARC.map((phase) => (
            <div
              key={phase.weeks}
              className="rounded-2xl border border-amber/35 bg-amber-soft p-6 text-left shadow-[0_12px_28px_-18px_rgba(232,160,32,0.85)]"
            >
              <p className="inline-flex rounded-full bg-gradient-to-r from-amber to-amber-b px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                {phase.weeks}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">
                {phase.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
