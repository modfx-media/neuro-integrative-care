import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { programs } from "@/content/programs";
import {
  FOUNDATIONAL_CURRICULUM,
  CURRICULUM_HOW_TO_USE,
} from "@/content/neurologicalSupportProgram";

// Where the free assessment leads, if a program is a fit: the 10-week
// virtual program (Mynd Transformation Blueprint), reusing the same
// public-safe content as /programs/virtual and /programs — no pricing here,
// see content/programs.ts COMPLIANCE note.
const virtualProgram = programs.entryPrograms.find(
  (p) => p.slug === "virtual-program",
);

const addOns = (virtualProgram?.potentialAddOns ?? [])
  .map((name) => programs.addOnPrograms.find((a) => a.name === name))
  .filter((a): a is (typeof programs.addOnPrograms)[number] => Boolean(a));

export default function TenWeekProgramSection() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
            If It&apos;s a Fit
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            A 10-week curriculum, built to change how your brain works.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {virtualProgram?.description}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal offset={24} className="lg:col-span-5">
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted">
              What&apos;s Included
            </p>
            <ul className="mt-6 space-y-4">
              {virtualProgram?.whatItIncludes?.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 text-[15px] leading-relaxed text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-[3px] w-3 shrink-0 rounded-full bg-amber"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {addOns.length > 0 && (
              <div className="mt-8 rounded-2xl border border-rule/70 bg-paper-2 p-6">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                  Potential Add-Ons
                </p>
                <ul className="mt-4 space-y-3">
                  {addOns.map((addOn) => (
                    <li key={addOn.slug}>
                      <p className="font-serif text-[1rem] leading-tight text-ink">
                        {addOn.name}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">
                        {addOn.description}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[12px] italic leading-snug text-muted-l">
                  Added when your workup calls for it. Discussed and priced
                  during your consultation.
                </p>
              </div>
            )}

            <BrainAssessmentButton className="mt-8" />
          </Reveal>

          <Reveal delay={120} offset={24} className="lg:col-span-7">
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted">
              10-Week Curriculum · Brain Brightening
            </p>
            <ul className="mt-6 divide-y divide-rule/70 rounded-2xl border border-rule/70 bg-paper-2 px-6">
              {FOUNDATIONAL_CURRICULUM.map((mod) => (
                <li key={mod.num} className="py-4">
                  <p className="font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-amber">
                    {mod.num} · {mod.title}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink/85">
                    {mod.body}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-muted">
              <span className="font-medium text-ink">How to use: </span>
              {CURRICULUM_HOW_TO_USE}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
