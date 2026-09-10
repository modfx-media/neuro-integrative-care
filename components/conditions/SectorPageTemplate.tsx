// COMPLIANCE: All condition pages must stay in functional-medicine scope —
// "investigate," "identify," "support." Never phrase as diagnosis or cure guarantee.
// Objective measures must be shown plainly with attribution + timeframe + the
// standard "Individual result; outcomes vary." disclaimer. Never present them
// as guaranteed or typical outcomes.

import Image from "next/image";
import Link from "next/link";
import type { Condition } from "@/content/conditions";
import type { PatientStory } from "@/content/patientStories";
import type { SectorPageContent } from "@/content/sectorPageContent";
import type { Tool } from "@/content/tools";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

export interface ObjectiveMeasure {
  label: string;
  value: string;
  patientName: string;
  timeframe?: string;
  method?: string;
  disclaimer: string;
}

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

interface SectorPageTemplateProps {
  condition: Condition;
  allConditions: readonly Condition[];
  patientStory?: PatientStory;
  sectorContent: SectorPageContent;
  breadcrumb?: BreadcrumbCrumb[];
  objectiveMeasures?: ObjectiveMeasure[];
  toolsUsed?: Tool[];
}

export default function SectorPageTemplate({
  condition,
  allConditions,
  patientStory,
  sectorContent,
  breadcrumb,
  objectiveMeasures,
  toolsUsed,
}: SectorPageTemplateProps) {
  const related = allConditions.filter((c) => c.slug !== condition.slug);

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-ink py-28 text-paper lg:py-36">
        {condition.heroImage && (
          <Image
            src={condition.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none select-none object-cover"
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ink/75"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          {breadcrumb && breadcrumb.length > 0 && (
            <Reveal
              as="p"
              delay={20}
              offset={8}
              className="mb-8 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-paper/70"
            >
              {breadcrumb.map((crumb, i) => (
                <span key={`${crumb.label}-${i}`}>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-amber-b"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-paper">{crumb.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <span aria-hidden="true" className="mx-3 text-paper/30">
                      /
                    </span>
                  )}
                </span>
              ))}
            </Reveal>
          )}
          <Reveal as="p" delay={50} offset={12} className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
            Sector · {condition.name}
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {condition.name}
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl break-words font-serif text-[1.5rem] leading-[1.35] text-paper/85 sm:text-[1.75rem] lg:text-[1.95rem]"
          >
            {condition.heroLine}
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* 2 — You've probably been told… */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-3">
              <div className="flex items-center gap-4">
                <h2 className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber">
                  What You&apos;ve Heard
                </h2>
                <span aria-hidden="true" className="hidden h-px flex-1 bg-rule lg:block" />
              </div>
            </Reveal>
            <Reveal delay={120} offset={24} className="relative lg:col-span-9">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-3 -top-10 select-none font-serif text-[7rem] italic leading-none text-ink/[0.06] lg:-left-6 lg:-top-14 lg:text-[10rem]"
              >
                &ldquo;
              </span>
              <p className="relative font-serif text-[1.45rem] leading-[1.4] text-ink sm:text-[1.7rem] lg:text-[1.95rem]">
                {sectorContent.dismissals}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — What we actually investigate */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                What We Investigate
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                What we actually look for.
              </h2>
            </Reveal>
            <Reveal delay={120} offset={24} className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-muted">
                {condition.whatWeInvestigate}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — How the workup works */}
      <section className="bg-ink py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
              How The Workup Works
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-paper sm:text-5xl">
              Identify. Rebuild. Sustain.
            </h2>
          </Reveal>

          <ol className="mt-20 space-y-16 lg:space-y-24">
            {sectorContent.workupSteps.map((step, i) => (
              <Reveal
                key={step.number}
                as="li"
                delay={100 + i * 120}
                offset={20}
                className="flex gap-6 lg:gap-10"
              >
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber bg-ink font-mono text-xs text-amber lg:h-14 lg:w-14 lg:text-sm">
                    {step.number}
                  </div>
                </div>
                <div className="pt-2 lg:pt-3">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-amber-b">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/80">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          {toolsUsed && toolsUsed.length > 0 && (
            <Reveal delay={200} offset={20} className="mt-20 lg:mt-24">
              <div className="border-t border-rule-d pt-10 lg:pt-12">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
                  Tools We Use
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {toolsUsed.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-rule-d bg-ink-2 px-4 py-2 text-[13px] text-paper transition-all hover:border-amber-b/70 hover:bg-ink-2 hover:text-amber-b"
                      >
                        <span>{tool.name}</span>
                        <span
                          aria-hidden="true"
                          className="text-paper/50 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-b"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* 5 — Patient story */}
      {patientStory && (
        <section className="bg-paper-2 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal className="max-w-3xl">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                Patient Story
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                One patient&apos;s investigation.
              </h2>
            </Reveal>

            <Reveal delay={140} offset={24} className="mt-14">
              <article className="rounded-lg border border-rule bg-paper p-8 shadow-[0_2px_18px_-14px_rgba(11,18,32,0.25)] lg:p-12">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-amber">
                  {condition.name}
                </p>
                <h3 className="mt-5 font-serif text-[1.75rem] leading-tight text-ink lg:text-[2.1rem]">
                  {patientStory.headline}
                </h3>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
                  {patientStory.body}
                </p>
                {patientStory.measuredStat && (
                  <p className="mt-6 max-w-3xl border-l-2 border-amber pl-4 font-serif italic text-[1.15rem] leading-snug text-ink">
                    {patientStory.measuredStat}
                  </p>
                )}
                <div className="mt-10 border-t border-rule pt-6">
                  <p className="font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-ink">
                    {patientStory.anonymizedName ?? patientStory.patientName}
                  </p>
                  <p className="mt-2 text-[11px] italic leading-snug text-muted-l">
                    {patientStory.disclaimer}
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* 5b — Objective measures (optional, sub-condition pages) */}
      {objectiveMeasures && objectiveMeasures.length > 0 && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal className="max-w-3xl">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                Objective Measures
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                Numbers that moved.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                Physical strength and range-of-motion measurements from individual
                patients, stated plainly with attribution and timeframe where known.
              </p>
            </Reveal>

            <ul
              className={`mt-14 grid gap-6 ${
                objectiveMeasures.length > 1 ? "md:grid-cols-2" : ""
              }`}
            >
              {objectiveMeasures.map((measure, i) => (
                <Reveal
                  key={`${measure.patientName}-${measure.label}`}
                  as="li"
                  delay={140 + i * 90}
                  offset={24}
                  className="h-full"
                >
                  <article className="flex h-full flex-col justify-between rounded-lg border border-rule bg-paper-2 p-8 shadow-[0_2px_18px_-14px_rgba(11,18,32,0.25)] lg:p-10">
                    <div>
                      <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                        {measure.label}
                      </p>
                      <p className="mt-6 font-serif text-[1.65rem] leading-tight text-ink lg:text-[2rem]">
                        {measure.value}
                      </p>
                      {(measure.timeframe || measure.method) && (
                        <p className="mt-4 text-[13px] leading-snug text-muted">
                          {[measure.timeframe, measure.method]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                    <div className="mt-10 border-t border-rule pt-5">
                      <p className="font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-ink">
                        {measure.patientName}
                      </p>
                      <p className="mt-2 text-[11px] italic leading-snug text-muted-l">
                        {measure.disclaimer}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 6 — Related conditions */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Related Sectors
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              The investigation doesn&apos;t stop at one door.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {related.map((rel, i) => (
              <Reveal
                key={rel.slug}
                as="li"
                delay={140 + i * 70}
                offset={20}
                className="h-full"
              >
                <Link
                  href={`/conditions/${rel.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-rule/60 bg-paper p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[0_30px_60px_-40px_rgba(11,18,32,0.4)]"
                >
                  <div>
                    <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                      {String(allConditions.findIndex((c) => c.slug === rel.slug) + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-serif text-xl leading-tight text-ink">
                      {rel.name}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted">
                      {rel.heroLine}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink">
                    Explore
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 — CTA */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-serif text-3xl leading-[1.2] tracking-tight text-paper sm:text-4xl lg:text-5xl">
              Ready to start the investigation?
            </h2>
          </Reveal>
          <Reveal delay={140} className="mt-10 flex justify-center">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>
    </>
  );
}
