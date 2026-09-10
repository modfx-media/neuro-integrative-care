// COMPLIANCE: Do not add the "90% resolution in serious/lethal conditions" stat
// anywhere on this page — held per CO-01, reserved for Alzheimer's Project /
// investor materials only. All published outcomes here are individual,
// method-attributed, and shown with the standard "Individual patient
// experiences. Results vary and are not guaranteed." disclaimer at the page
// footer.
//
// TODO (future phase — pending signed patient releases):
//   • Before/after QEEG brain-map images per patient — reserve inline slots
//     within each case journey once releases + de-identification are signed.
//     Do NOT ship placeholder image boxes.
//
// TODO (data — pending Dr. Santucci):
//   • Full objective-outcomes stat set for the Measured Outcomes grid below.
//     Currently rendering the 4 stats that exist in patientStories.ts:
//     Gail grip, Gail legs, Janice shoulder ROM, Seth qEEG 20%. Waiting on
//     the underlying qEEG comparison reports and the fuller strength / ROM /
//     biomarker set that Dr. Santucci is compiling.
//
// TODO (data — client):
//   • Richard and Beakram entries in patientStories.ts are marked as pending
//     fuller case detail. This page renders the short existing text only —
//     do NOT fabricate additional narrative for either patient.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { conditions } from "@/content/conditions";
import { patientStories } from "@/content/patientStories";
import { shortTestimonials, googleReviews } from "@/content/testimonials";
import Reveal from "@/components/Reveal";
import VideoTestimonials from "@/components/results/VideoTestimonials";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

const SITE_URL = "https://neurointegrativecareoflosgatos.com";
const PAGE_URL = `${SITE_URL}/results`;

const STANDARD_DISCLAIMER =
  "Individual patient experiences. Results vary and are not guaranteed.";

const INCOMPLETE_SLUGS = new Set(["richard", "beakram"]);

export const metadata: Metadata = {
  title: "Patient Stories",
  description:
    "Eight patient case journeys from NeuroIntegrative Care of Los Gatos: real investigations, individual outcomes across autoimmune, brain, concussion, and toxin work.",
  alternates: { canonical: "/results" },
  openGraph: {
    title: "Patient Stories | NeuroIntegrative Care of Los Gatos",
    description:
      "Eight patient case journeys: real investigations, individual outcomes.",
    url: "/results",
    type: "article",
  },
};

const conditionBySlug = new Map(conditions.map((c) => [c.slug, c]));

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Patient Stories | NeuroIntegrative Care of Los Gatos",
  description:
    "A collection of individual patient case journeys. Individual patient experiences; results vary and are not guaranteed.",
  url: PAGE_URL,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "NeuroIntegrative Care of Los Gatos",
    url: `${SITE_URL}/`,
  },
  specialty: { "@type": "MedicalSpecialty", name: "Neurology" },
  audience: { "@type": "MedicalAudience", audienceType: "Patient" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: patientStories.map((story, i) => {
      const about = story.sector
        ? {
            "@type": "MedicalCondition",
            name: conditionBySlug.get(story.sector)?.name ?? story.sector,
          }
        : undefined;
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Article",
          headline: story.headline,
          articleBody: story.body,
          ...(about ? { about } : {}),
          disclaimer: story.disclaimer,
        },
      };
    }),
  },
};

interface MeasuredCallout {
  label: string;
  value: string;
  detail?: string;
}

function calloutsForStory(slug: string): MeasuredCallout[] {
  const story = patientStories.find((s) => s.slug === slug);
  if (!story) return [];
  const callouts: MeasuredCallout[] = [];
  if (story.measuredStat) {
    callouts.push({ label: "Measured", value: story.measuredStat });
  }
  if (story.physicalStats?.grip) {
    callouts.push({ label: "Grip Strength", value: story.physicalStats.grip });
  }
  if (story.physicalStats?.legs) {
    callouts.push({ label: "Leg Strength", value: story.physicalStats.legs });
  }
  if (story.physicalStats?.shoulder) {
    callouts.push({
      label: "Shoulder ROM",
      value: story.physicalStats.shoulder,
    });
  }
  return callouts;
}

interface AggregateMeasure {
  patientName: string;
  metric: string;
  value: string;
  method?: string;
  timeframe?: string;
}

// Aggregated from patientStories.ts — see TODO at top of file re: full stat set.
const AGGREGATE_MEASURES: AggregateMeasure[] = [
  {
    patientName: "Gail",
    metric: "Grip Strength",
    value: "17 & 28 lbs → 32 & 35 lbs",
  },
  {
    patientName: "Gail",
    metric: "Leg Strength",
    value: "17 & 25 lbs → 35 & 38 lbs",
    timeframe: "In one month",
  },
  {
    patientName: "Janice",
    metric: "Shoulder ROM",
    value: "30% restriction, improved",
    method: "Trigenics",
  },
  {
    patientName: "Seth",
    metric: "qEEG",
    value: "20% gain in brain function",
    method: "Repeat brain mapping",
  },
];

export default function ResultsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink py-28 text-paper lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            Patient Stories
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Eight investigations. Eight answers.
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-[1.4] text-paper/80 sm:text-[1.55rem] lg:text-[1.75rem]"
          >
            The workup that finally named the driver, and what changed after
            it did.
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Video testimonials — patient releases signed; 6 videos (5 self-hosted + 1 YouTube). */}
      <section id="video-stories" className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              In Their Own Words
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Watch patients describe what changed.
            </h2>
          </Reveal>

          <div className="mt-14">
            <VideoTestimonials />
          </div>

          <p className="mt-10 text-center text-[12px] italic text-muted-l">
            {STANDARD_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Case journeys */}
      <section id="cases" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              The Cases
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Eight patients. Eight investigations.
            </h2>
          </Reveal>

          <ol className="mt-16 divide-y divide-rule/70">
            {patientStories.map((story, i) => {
              const sector = story.sector
                ? conditionBySlug.get(story.sector)
                : null;
              const callouts = calloutsForStory(story.slug);
              const isIncomplete = INCOMPLETE_SLUGS.has(story.slug);
              return (
                <li
                  key={story.slug}
                  id={story.slug}
                  className="scroll-mt-24"
                >
                  <Reveal
                    delay={80}
                    offset={20}
                    className="grid gap-8 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24"
                  >
                    <div className="lg:col-span-3">
                      <p
                        className="font-serif text-[3rem] leading-none text-ink/10 lg:text-[4rem]"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-6 font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-ink">
                        {story.patientName}
                      </p>
                      {sector ? (
                        <Link
                          href={`/conditions/${sector.slug}`}
                          className="group mt-3 inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-amber"
                        >
                          {sector.name}
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      ) : (
                        <p className="mt-3 text-[13px] italic text-muted-l">
                          Cross-sector case
                        </p>
                      )}
                      {isIncomplete && (
                        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber-soft/60 px-3 py-1 font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-ink">
                          <span
                            aria-hidden="true"
                            className="inline-block h-1.5 w-1.5 rounded-full bg-amber"
                          />
                          In Progress
                        </p>
                      )}
                    </div>

                    <div className="lg:col-span-9">
                      <h3 className="font-serif text-[1.85rem] leading-[1.15] text-ink lg:text-[2.4rem]">
                        {story.headline}
                      </h3>
                      <p
                        className={`mt-6 text-lg leading-relaxed ${
                          isIncomplete
                            ? "italic text-muted-l"
                            : "text-muted"
                        }`}
                      >
                        {story.body}
                      </p>

                      {callouts.length > 0 && (
                        <div className="mt-8">
                          {/* TODO: swap this stat strip for before/after QEEG image gallery
                              once releases are signed. Do NOT ship placeholder image slots. */}
                          <ul className="grid gap-3 sm:grid-cols-2">
                            {callouts.map((callout) => (
                              <li
                                key={`${story.slug}-${callout.label}`}
                                className="rounded-xl border border-amber/30 bg-amber-soft/30 p-5"
                              >
                                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                                  {callout.label}
                                </p>
                                <p className="mt-2 font-serif text-[1.1rem] leading-tight text-ink">
                                  {callout.value}
                                </p>
                                {callout.detail && (
                                  <p className="mt-2 text-[12px] leading-snug text-muted">
                                    {callout.detail}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Measured Outcomes aggregate */}
      <section id="measured-outcomes" className="bg-ink py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
              Measured Outcomes
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-paper sm:text-5xl">
              Objective numbers, plainly stated.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">
              Strength, range-of-motion, and brain-mapping measurements from
              individual patients, stated with attribution and timeframe where
              known. Every entry represents one patient&apos;s workup, not a
              typical or guaranteed outcome.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <div
              role="note"
              className="inline-flex items-center gap-3 rounded-full border border-amber-b/40 bg-ink-2 px-4 py-2 text-[12px] tracking-tight text-paper/80"
            >
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-amber-b"
              />
              <span className="font-mono uppercase tracking-[0.14em] text-amber-b">
                Draft
              </span>
              <span>
                Full stat set + underlying qEEG comparison reports pending from
                Dr. Santucci.
              </span>
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {AGGREGATE_MEASURES.map((m) => (
              <Reveal
                key={`${m.patientName}-${m.metric}`}
                as="li"
                delay={140}
                offset={20}
                className="h-full"
              >
                <article className="flex h-full flex-col justify-between rounded-2xl border border-rule-d bg-ink-2 p-6 lg:p-7">
                  <div>
                    <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
                      {m.metric}
                    </p>
                    <p className="mt-5 font-serif text-[1.3rem] leading-tight text-paper">
                      {m.value}
                    </p>
                    {(m.method || m.timeframe) && (
                      <p className="mt-3 text-[12px] leading-snug text-paper/60">
                        {[m.method, m.timeframe].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  <p className="mt-6 border-t border-rule-d pt-4 font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-paper/85">
                    {m.patientName}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials — short pull-quotes + public Google Reviews from the
          client's existing testimonials page (neurocarelg.com/testimonials). */}
      <section id="testimonials" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              In Their Words
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              What patients are saying.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {shortTestimonials.map((t, i) => (
              <Reveal
                key={t.quote}
                as="li"
                delay={100 + i * 100}
                offset={20}
                className="h-full"
              >
                <blockquote className="flex h-full flex-col rounded-2xl border border-rule/70 bg-white p-8 shadow-[0_1px_2px_rgba(11,18,32,0.04)]">
                  <p className="font-serif text-[1.15rem] leading-[1.4] text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            ))}
          </ul>

          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {googleReviews.map((r, i) => (
              <Reveal
                key={r.reviewerName}
                as="li"
                delay={140 + i * 100}
                offset={20}
                className="h-full"
              >
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between rounded-2xl border border-amber/30 bg-amber-soft/40 p-8 transition-colors duration-300 hover:border-amber/60"
                >
                  <p className="text-[15px] leading-relaxed text-ink">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <p className="mt-6 flex items-center gap-2 font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-amber">
                    {r.reviewerName}, via {r.source}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </p>
                </a>
              </Reveal>
            ))}
          </ul>

          <p className="mt-10 text-center text-[12px] italic text-muted-l">
            {STANDARD_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Disclaimer footer */}
      <section className="bg-paper-2 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <Reveal>
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Disclosure
            </p>
            <p className="mt-4 font-serif text-[1.25rem] leading-relaxed text-ink lg:text-[1.4rem]">
              {STANDARD_DISCLAIMER}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
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
              Your investigation starts the same way each of these did.
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
