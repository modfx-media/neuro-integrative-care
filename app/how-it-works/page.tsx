import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import Image from "next/image";
import Link from "next/link";
import { tools } from "@/content/tools";
import Reveal from "@/components/Reveal";
import DoctorVideos from "@/components/home/DoctorVideos";
import Home2VideoHero from "@/components/home2/Home2VideoHero";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import {
  CURRICULUM_TAGLINE,
  FOUNDATIONAL_INTRO,
  CURRICULUM_MODEL_NOTE,
  FOUNDATIONAL_SUBNOTE,
  PROGRAM_ARC,
  FOUNDATIONAL_MODULES,
  FOUNDATIONAL_TIPS,
  CURRICULUM_CLOSING,
  type CurriculumModule,
} from "@/content/howItWorks";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/how-it-works`;

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Neurometabolic Rejuvenation: five non-invasive, drug-free tools plus the 10-week Brain Brightening curriculum paired with home neurofeedback.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How It Works | NeuroIntegrative Care of Los Gatos",
    description:
      "Neurometabolic Rejuvenation: five non-invasive, drug-free tools, plus the 10-week Brain Brightening support curriculum.",
    url: "/how-it-works",
    type: "article",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "How It Works | NeuroIntegrative Care of Los Gatos",
  description:
    "Neurometabolic Rejuvenation: the brain and metabolism as one system, investigated with objective testing and rebuilt with five non-invasive, drug-free tools, plus the 10-week Brain Brightening neurological support curriculum.",
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
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "MedicalProcedure",
        name: tool.name,
        url: `${SITE_URL}/tools/${tool.slug}`,
        description: tool.description,
        procedureType: {
          "@type": "MedicalProcedureType",
          name: "TherapeuticProcedure",
        },
      },
    })),
  },
};

function ModuleAccordion({
  modules,
  actionsLabel,
  startDelay = 100,
}: {
  modules: CurriculumModule[];
  actionsLabel: string;
  startDelay?: number;
}) {
  return (
    <div className="mt-12 divide-y divide-rule/70 border-t border-rule/70">
      {modules.map((mod, i) => (
        <Reveal key={mod.num} delay={startDelay + i * 40} offset={16}>
          <details className="group py-7">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 marker:content-none">
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-[13px] font-medium text-amber">
                  {mod.num}
                </span>
                <span className="font-serif text-[1.1rem] leading-snug text-ink lg:text-[1.25rem]">
                  {mod.title}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber/40 text-amber-b transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>

            <div className="mt-5 max-w-2xl space-y-5 pl-0 lg:pl-[52px]">
              <p className="text-[15px] leading-relaxed text-ink">
                {mod.focus}
              </p>

              <div>
                <p className="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-muted">
                  Objectives
                </p>
                <ul className="mt-2 space-y-1.5">
                  {mod.objectives.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[14px] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-[3px] w-3 shrink-0 rounded-full bg-amber/60"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-muted">
                  {actionsLabel}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {mod.actions.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[14px] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-[3px] w-3 shrink-0 rounded-full bg-amber/60"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {mod.callout && (
                <div className="rounded-xl border border-amber/30 bg-amber-soft/40 p-4">
                  <p className="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-amber">
                    {mod.calloutLabel}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink/85">
                    {mod.callout}
                  </p>
                </div>
              )}

              {mod.tracking && (
                <div>
                  <p className="font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-muted">
                    {mod.trackingLabel ?? "Tracking"}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink/85">
                    {mod.tracking}
                  </p>
                </div>
              )}

              {mod.note && (
                <p className="text-[13px] italic leading-relaxed text-[#E9A221]">
                  {mod.noteLabel ?? "Myndlift Note"}: {mod.note}
                </p>
              )}
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />

      <Home2VideoHero />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper py-28 lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(255,255,255,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            Our Approach
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Neurometabolic Rejuvenation.
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-[1.4] text-muted sm:text-[1.55rem] lg:text-[1.75rem]"
          >
            The brain and metabolism as one system, investigated with
            objective testing, rebuilt with non-invasive, drug-free technology.
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* 3.1 — Philosophy */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-3">
              <div className="flex items-center gap-4">
                <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber">
                  Our Philosophy
                </p>
                <span
                  aria-hidden="true"
                  className="hidden h-px flex-1 bg-rule lg:block"
                />
              </div>
            </Reveal>
            <Reveal delay={120} offset={24} className="relative lg:col-span-9">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-3 -top-10 select-none font-serif text-[7rem] italic leading-none text-ink/[0.06] lg:-left-6 lg:-top-16 lg:text-[12rem]"
              >
                &ldquo;
              </span>
              <p className="relative font-serif text-[1.5rem] leading-[1.4] text-ink sm:text-[1.75rem] lg:text-[2.05rem]">
                Every neurological symptom, brain fog, imbalance, fatigue,
                slow concussion recovery, an autoimmune flare, an
                &ldquo;idiopathic&rdquo; diagnosis, has a{" "}
                <span className="text-amber">metabolic engine</span> underneath
                it. Neurons are the most energy-hungry cells in the body, so
                when energy production, inflammation, detox, blood sugar, or
                hormones break down, the brain and nervous system are the first
                to show it. We treat the brain and the metabolism as{" "}
                <span className="italic text-amber">one system</span>, and we
                use advanced, non-invasive technology, not medication, to
                find where that system broke down and to retrain, repair, and
                rebuild it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3.2 — Five tools hub */}
      <section id="tools" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              The Investigation Toolkit
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Five tools. Non-invasive. Drug-free.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Advanced technology used together, matched to what the workup
              actually surfaces, so structural repair and nervous-system
              retraining progress at the same time.
            </p>
          </Reveal>

          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {tools.map((tool, i) => (
              <Reveal
                key={tool.slug}
                as="li"
                delay={140 + i * 90}
                offset={24}
                className="h-full"
              >
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-rule/60 bg-paper-2 p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[0_30px_60px_-40px_rgba(11,18,32,0.4)]"
                >
                  <div>
                    <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                      {String(i + 1).padStart(2, "0")} · {tool.kicker}
                    </p>
                    <h3 className="mt-4 font-serif text-xl leading-tight text-ink lg:text-[1.4rem]">
                      {tool.name}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted">
                      {tool.description}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink">
                    Explore
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works — section intro (formerly its own page hero) */}
      <section id="how-it-works" className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
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
            How It Works
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              A 10-week curriculum, built to change how your brain works.
            </h2>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-[1.4] text-paper/80 sm:text-[1.55rem] lg:text-[1.75rem]"
          >
            The Brain Brightening curriculum, a progressive lifestyle
            foundation for everyone, designed to run alongside home
            neurofeedback like Myndlift.
          </Reveal>
        </div>
      </section>

      {/* Assessment-to-treatment-plan flow */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              The Process
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              From assessment to treatment plan.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              qEEG brain mapping and psychological testing feed one treatment
              plan, reassessed periodically to confirm the plan is working.
            </p>
          </Reveal>
          <Reveal delay={120} offset={24} className="mt-10 overflow-hidden rounded-2xl border border-rule/60">
            <Image
              src="/images/brain-assessment/assessment-flow.jpg"
              alt="Flow diagram: patient intake leads to an initial assessment (qEEG brain mapping and psychological testing), which produces a treatment plan of CBT, DBT, VR, biofeedback, or neurofeedback, reassessed periodically over the treatment period"
              width={1511}
              height={600}
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Neurological support curriculum */}
      <section id="curriculum" className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              10-Week Neurological Support Curriculum
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              The Brain Brightening curriculum.
            </h2>
            <p className="mt-3 font-serif text-[1.05rem] italic leading-snug text-muted">
              {CURRICULUM_TAGLINE}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {FOUNDATIONAL_INTRO}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {CURRICULUM_MODEL_NOTE}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-l">
              {FOUNDATIONAL_SUBNOTE}
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-rule/70 bg-rule/70 sm:grid-cols-2">
            {PROGRAM_ARC.map((phase) => (
              <div key={phase.weeks} className="bg-paper p-6">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-amber">
                  {phase.weeks}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/85">
                  {phase.description}
                </p>
              </div>
            ))}
          </Reveal>

          <ModuleAccordion
            modules={FOUNDATIONAL_MODULES}
            actionsLabel="Core Actions"
          />

          <Reveal delay={100} className="mt-14 rounded-2xl border border-rule bg-paper p-6 lg:p-8">
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
              Implementation Tips
            </p>
            <ul className="mt-4 space-y-2">
              {FOUNDATIONAL_TIPS.map((tip) => (
                <li
                  key={tip}
                  className="flex gap-3 text-[14px] leading-relaxed text-ink/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-[3px] w-3 shrink-0 rounded-full bg-amber"
                  />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="mt-8 max-w-3xl text-[13px] italic leading-relaxed text-muted-l">
            {CURRICULUM_CLOSING}
          </Reveal>
        </div>
      </section>

      <DoctorVideos />

      {/* Final CTA */}
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
              This curriculum runs alongside the Virtual Program.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-paper/80">
              Start with the investigation, then layer in the modules that
              fit your workup, remote or in-clinic.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/programs/virtual"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.85)]"
            >
              Explore the Virtual Program
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center rounded-full border border-paper/25 px-6 py-3.5 text-sm text-paper/85 transition-colors hover:border-amber-b hover:text-amber-b"
            >
              Schedule Your Consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
