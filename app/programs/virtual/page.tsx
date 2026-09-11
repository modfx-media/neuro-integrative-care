// COMPLIANCE + NAMING:
// SPELLING: "Mynd" per Master Build Brief v1.0 (Aug 12), supersedes earlier "Mind" spelling from CO-01.
// Still flagged as needing final client confirmation per brief's pre-launch checklist item 5 —
// do not treat as 100% final until confirmed by Justin.
// • Tier structure below is DRAFT. Blueprint hints at a near-free Myndlift-app
//   basic tier as lead magnet, up through full neurometabolic profiling — exact
//   tiers and pricing are not finalized. Placeholder tiers are labeled clearly
//   so nothing ships as "confirmed" until the client signs off.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { programs } from "@/content/programs";
import {
  FOUNDATIONAL_CURRICULUM,
  CURRICULUM_HOW_TO_USE,
} from "@/content/neurologicalSupportProgram";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

const SITE_URL = "https://neurointegrativecareoflosgatos.com";
const PAGE_URL = `${SITE_URL}/programs/virtual`;

// SPELLING: "Mynd" per Master Build Brief v1.0 (Aug 12), supersedes earlier "Mind" spelling from CO-01.
// Still flagged as needing final client confirmation per brief's pre-launch checklist item 5 —
// do not treat as 100% final until confirmed by Justin.
const PROGRAM_NAME_PUBLIC = "Mynd Transformation Blueprint";
const virtualProgram = programs.entryPrograms.find(
  (p) => p.slug === "virtual-program",
);

export const metadata: Metadata = {
  title: `The Virtual Program: ${PROGRAM_NAME_PUBLIC}`,
  description:
    "A 30-year neurometabolic method delivered to your home. Remote QEEG, neurofeedback expert review every 2 weeks, clinician review with Dr. Santucci every 4 weeks. National.",
  alternates: { canonical: "/programs/virtual" },
  openGraph: {
    title: `The Virtual Program | NeuroIntegrative Care of Los Gatos`,
    description:
      "A 30-year neurometabolic method delivered to your home. National.",
    url: "/programs/virtual",
    type: "article",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: `The Virtual Program: ${PROGRAM_NAME_PUBLIC} | NeuroIntegrative Care of Los Gatos`,
  description:
    "A 30-year neurometabolic method delivered to your home. Remote QEEG unit, a neurological support program, and clinician review calls with Dr. Santucci every 4 weeks.",
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
    "@type": "Service",
    name: `The Virtual Program (${PROGRAM_NAME_PUBLIC})`,
    serviceType: "Neurometabolic Care",
    description:
      "A 6–10 week at-home neurometabolic program: remote QEEG unit, a weekly neurological support program, and clinician review calls with Dr. Santucci every 4 weeks. National.",
    provider: {
      "@type": "MedicalClinic",
      name: "NeuroIntegrative Care of Los Gatos",
      url: `${SITE_URL}/`,
    },
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: PAGE_URL,
    },
  },
};

const FEATURE_ROWS = [
  { label: "Neurofeedback training" },
  { label: "QEEG brain map" },
  { label: "Neurological support program" },
  { label: "Optional" },
  { label: "Clinician review cadence" },
  { label: "Program duration" },
] as const;

const TIERS: Array<{
  id: "full";
  eyebrow: string;
  name: string;
  cadence: string;
  values: Record<(typeof FEATURE_ROWS)[number]["label"], string>;
  cta: { label: string; href: string };
  featured?: boolean;
  placeholder: boolean;
}> = [
  {
    id: "full",
    eyebrow: "Full Program",
    name: "Mynd Transformation Blueprint Program",
    cadence: "Every 2 weeks with Neurofeedback Expert",
    values: {
      "Neurofeedback training": "Remote QEEG unit, with your healing frequencies",
      "QEEG brain map": "Included + repeat scan",
      "Neurological support program": "Weekly support to enhance neurofeedback results",
      "Optional": "Toxicity, DNA, and functional testing as needed",
      "Clinician review cadence": "Every 4 weeks with Dr. Santucci",
      "Program duration": virtualProgram?.duration ?? "6–10 weeks",
    },
    cta: { label: "Schedule Your Consultation", href: "/start" },
    featured: true,
    placeholder: false,
  },
];

const PROTOCOLS = [
  {
    title: "Anxiety Reduction & Mood Stabilization",
    inhibit: "Alpha & High Beta",
    reward: "Mid Beta",
    src: "/images/neurofeedback/protocol-anxiety-mood.jpg",
  },
  {
    title: "Higher Attention & Focus",
    inhibit: "Theta & High Beta",
    reward: "Lo Beta (SMR)",
    src: "/images/neurofeedback/protocol-attention-focus.jpg",
  },
  {
    title: "Relaxation & Better Sleep Quality",
    inhibit: "Theta & High Beta",
    reward: "Alpha",
    src: "/images/neurofeedback/protocol-relaxation-sleep.jpg",
  },
  {
    title: "Relaxation & Meditation",
    inhibit: "High Beta",
    reward: "Theta & Alpha",
    src: "/images/neurofeedback/protocol-relaxation-meditation.jpg",
  },
] as const;

const EXECUTIVE_CONTROL_SYSTEMS = [
  {
    title: "Sleep & circadian",
    detail: "glymphatic clearance · restore",
    position: "lg:col-start-5 lg:col-span-4 lg:row-start-1",
  },
  {
    title: "Hormonal",
    detail: "thyroid · sex hormones · rhythm",
    position: "lg:col-start-1 lg:col-span-3 lg:row-start-2",
  },
  {
    title: "Adrenal / HPA",
    detail: "stress response · resilience",
    position: "lg:col-start-10 lg:col-span-3 lg:row-start-2",
  },
  {
    title: "Autonomic / mood",
    detail: "calm · focus · heart-brain",
    position: "lg:col-start-1 lg:col-span-3 lg:row-start-3",
  },
  {
    title: "Immune",
    detail: "inflammation · repair",
    position: "lg:col-start-10 lg:col-span-3 lg:row-start-3",
  },
  {
    title: "Neuroendocrine",
    detail: "brain-to-gland signaling",
    position: "lg:col-start-1 lg:col-span-3 lg:row-start-4",
  },
  {
    title: "Digestion",
    detail: "motility · enzymes · gut-brain",
    position: "lg:col-start-10 lg:col-span-3 lg:row-start-4",
  },
  {
    title: "Neuromuscular",
    detail: "tone · coordination · movement",
    position: "lg:col-start-5 lg:col-span-4 lg:row-start-5",
  },
] as const;

export default function VirtualProgramPage() {
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
          className="pointer-events-none absolute -right-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal
            as="p"
            delay={20}
            offset={8}
            className="mb-8 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-paper/70"
          >
            <Link
              href="/programs"
              className="transition-colors hover:text-amber-b"
            >
              Programs
            </Link>
            <span aria-hidden="true" className="mx-3 text-paper/30">
              /
            </span>
            <span className="text-paper">Virtual Program</span>
          </Reveal>
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            The Virtual Program
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {PROGRAM_NAME_PUBLIC}.
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-[1.4] text-paper/80 sm:text-[1.55rem] lg:text-[1.75rem]"
          >
            A 30-year neurometabolic method, delivered to your home.
            National.
          </Reveal>
          <Reveal delay={550} className="mt-10 flex flex-wrap items-center gap-3">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Method — the main copy */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-3">
              <div className="flex items-center gap-4">
                <h2 className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber">
                  The Method, Remote
                </h2>
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
              <p className="relative font-serif text-[1.45rem] leading-[1.4] text-ink sm:text-[1.7rem] lg:text-[2rem]">
                A 30-year neurometabolic method, delivered to your home. You
                start with a remote QEEG brain-training unit tuned to your own
                healing frequencies, plus a weekly neurological support
                program, with Dr. Santucci reviewing your data and adjusting
                your protocol on a call every 4 weeks. Toxicity, DNA, and
                functional testing are available as needed. No
                prescriptions. No travel. Available nationwide.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Executive control systems */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              The Idea in One Picture
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Restore the networks that run the rest.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Brain mapping shows which executive networks are under-firing,
              over-firing, or poorly timed. Neurofeedback is the targeted
              neurological exercise that helps bring those networks back
              online.
            </p>
          </Reveal>

          <Reveal delay={120} offset={24} className="mt-14">
            <div className="relative overflow-hidden rounded-2xl border border-rule bg-paper-2 px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
              <svg
                aria-hidden="true"
                viewBox="0 0 1200 620"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-10 hidden h-[calc(100%-5rem)] w-[calc(100%-5rem)] text-rule-d/35 lg:block"
              >
                <path d="M600 70V550M130 215H1070M130 310H1070M130 405L600 310L1070 405" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>

              <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto_auto_auto] lg:gap-x-10 lg:gap-y-7">
                <div className="order-first rounded-2xl border-2 border-amber/70 bg-ink px-5 py-7 text-center shadow-[0_18px_50px_-28px_rgba(18,24,31,0.65)] sm:col-span-2 lg:col-start-4 lg:col-span-6 lg:row-start-2 lg:row-end-5 lg:self-center lg:px-8 lg:py-10">
                  <p className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-amber-b sm:text-[13px]">
                    Neurological Exercise
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-paper sm:text-3xl">
                    Executive Control Systems
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-paper/75 sm:text-base">
                    Brain mapping + Neurofeedback
                    <span className="block">restore the networks that run the rest</span>
                  </p>
                </div>

                {EXECUTIVE_CONTROL_SYSTEMS.map((system) => (
                  <article
                    key={system.title}
                    className={`rounded-lg border border-ink/15 border-t-2 border-t-amber bg-paper px-4 py-5 text-center shadow-[0_10px_30px_-28px_rgba(18,24,31,0.7)] lg:self-center ${system.position}`}
                  >
                    <h3 className="font-serif text-lg leading-tight text-ink">
                      {system.title}
                    </h3>
                    <p className="mt-2 font-serif text-[14px] italic leading-snug text-muted">
                      {system.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <p className="mx-auto mt-6 max-w-4xl text-center font-serif text-lg italic leading-relaxed text-muted">
              Restore the center and the systems around it have a chance to
              follow. Train only the edges and the center stays noisy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Watch — Remote Neurofeedback (Myndlift) */}
      <section className="bg-ink py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
              See It In Action
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-paper sm:text-5xl">
              Remote neurofeedback, explained.
            </h2>
          </Reveal>
          <Reveal delay={120} offset={24} className="mt-10">
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-paper/10">
              <video
                src="/videos/myndlift-remote-neurofeedback.mp4"
                poster="/images/video/myndlift-remote-neurofeedback-thumbnail.png"
                controls
                playsInline
                preload="metadata"
                className="h-full w-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Train toward your goal — Myndlift protocol targets */}
      <section className="bg-ink py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
              Training Goals
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-paper sm:text-5xl">
              Train toward your goal.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
              Each protocol inhibits the bands driving the problem and
              rewards the bands that fix it.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {PROTOCOLS.map((protocol, i) => (
              <Reveal
                key={protocol.src}
                as="li"
                delay={100 + i * 80}
                offset={20}
                className="overflow-hidden rounded-2xl border border-paper/10"
              >
                <Image
                  src={protocol.src}
                  alt={`Myndlift protocol: ${protocol.title}, inhibit ${protocol.inhibit}, reward ${protocol.reward}`}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-auto w-full object-cover"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Tier comparison */}
      <section id="tiers" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Program Tiers
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              What&apos;s included.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              The full neurometabolic method, delivered remotely with
              clinician review every 4 weeks.
            </p>
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-md gap-6">
            {TIERS.map((tier, i) => (
              <Reveal
                key={tier.id}
                as="li"
                delay={140 + i * 90}
                offset={24}
                className="h-full"
              >
                <article
                  className={`flex h-full flex-col justify-between rounded-2xl border p-8 lg:p-9 ${
                    tier.featured
                      ? "border-amber/50 bg-paper-2 shadow-[0_20px_60px_-30px_rgba(232,160,32,0.35)]"
                      : "border-rule/60 bg-paper"
                  }`}
                >
                  <div>
                    <p
                      className={`font-mono font-medium text-[12px] uppercase tracking-[0.18em] ${
                        tier.featured ? "text-amber" : "text-muted"
                      }`}
                    >
                      {tier.eyebrow}
                    </p>
                    <h3 className="mt-5 font-serif text-[1.5rem] leading-tight text-ink lg:text-[1.7rem]">
                      {tier.name}
                    </h3>
                    <p className="mt-2 text-[12px] italic text-muted-l">
                      {tier.cadence}
                    </p>

                    <dl className="mt-8 divide-y divide-rule/70">
                      {FEATURE_ROWS.map((row) => (
                        <div key={row.label} className="py-3">
                          <dt className="font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-muted">
                            {row.label}
                          </dt>
                          <dd
                            className={`mt-1.5 text-[14px] leading-snug ${
                              tier.values[row.label] === "TBD"
                                ? "italic text-muted-l"
                                : "text-ink"
                            }`}
                          >
                            {tier.values[row.label]}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mt-10">
                    {tier.placeholder ? (
                      <span className="inline-flex items-center rounded-full border border-rule/70 bg-paper-2 px-5 py-2.5 text-xs italic text-muted-l">
                        {tier.cta.label} (pending confirmation)
                      </span>
                    ) : (
                      <Link
                        href={tier.cta.href}
                        className="inline-flex items-center rounded-full bg-gradient-to-r from-amber to-amber-b px-6 py-3 text-sm font-medium tracking-tight text-ink shadow-[0_10px_28px_-14px_rgba(248,180,43,0.5)] transition-shadow duration-300 hover:shadow-[0_18px_44px_-14px_rgba(248,180,43,0.8)]"
                      >
                        {tier.cta.label}
                        <span
                          aria-hidden="true"
                          className="ml-2 transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Neurological Support Program curricula */}
      <section id="support-program" className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              The Neurological Support Program
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              A 10-week curriculum, built to amplify neurofeedback.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Weekly modules covering the lifestyle and clinical drivers
              behind your results, the Brain Brightening curriculum, for
              everyone.
            </p>
          </Reveal>

          <div className="mt-14 max-w-2xl">
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-ink">
              10-Week Brain Brightening Curriculum
            </p>
            <p className="mt-1 text-[13px] text-muted">
              Lifestyle foundations for everyone
            </p>
            <ul className="mt-6 divide-y divide-rule/70">
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
          </div>

          <Reveal delay={100} className="mt-14 rounded-2xl border border-rule bg-paper p-6 lg:p-8">
            <p className="text-[13px] leading-relaxed text-muted">
              <span className="font-medium text-ink">How to use: </span>
              {CURRICULUM_HOW_TO_USE}
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
              Start with your assessment and bring the therapy home. Start
              where everyone starts.
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
