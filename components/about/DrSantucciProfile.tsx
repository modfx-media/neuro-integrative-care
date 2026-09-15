// COMPLIANCE + FACT-CHECK NOTES:
//
// (1) All copy in this component is sourced directly from Dr. Santucci's
//     supplied CV. Credentials, licenses, education, experience bullets,
//     publications, speaking engagements, and media mentions are quoted
//     verbatim from that document — do not paraphrase, expand, or invent
//     additional detail.
//
// (2) YEARS-IN-PRACTICE: CV confirms "30+ years," consistent with the
//     founding date (1996).
//
// Rendered by /about/dr-thomas-santucci (below its hero) and by the
// brain-assessment-offer landing page, which has no hero of its own.

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

export const YEARS_IN_PRACTICE = "30+";

const STAT_RIBBON = [
  { label: "Years in Practice", value: `${YEARS_IN_PRACTICE} Years` },
  { label: "Practice Founded", value: "1996" },
  { label: "Licenses & Certifications", value: "8" },
  { label: "Published Book", value: "1", note: "a second in progress" },
] as const;

const CLINICAL_FOCUS = [
  "Cognitive Decline & Neurodegenerative Support",
  "Metabolic & Toxic Load Recovery",
  "Performance Optimization for Executives & Athletes",
  "Concussion / Post-Concussion Syndrome",
  "Stroke & Vestibular Rehabilitation",
  "Chronic Pain & Spinal Conditions",
  "Autoimmune & Chronic Conditions",
] as const;

// Licenses & Certifications — verbatim from the CV.
const CREDENTIALS = [
  "Doctor of Chiropractic (DC) \u2014 Licensed in California",
  "American Functional Neurology Institute (AFNI) Certified",
  "Alzheimer's Recode II Certified Provider",
  "The Listening Program Certified Provider",
  "Board Certified in Neurofeedback (BCN)",
  "Carrick Institute Neurology Programs \u2014 Extensive Postgraduate Training",
  "Developmental Delays \u2013 Robert Melillo Neurology Training",
  "Functional Medicine Institute \u2014 Applying Clinical Excellence Series",
] as const;

// Education — verbatim from the CV.
const EDUCATION = [
  {
    period: "Georgetown University \u00b7 1978",
    title: "Bachelor of Science in Business Administration (BSBA)",
    detail: "International Business Policy",
  },
  {
    period: "Doctor of Chiropractic (DC)",
    title: "Life Chiropractic College West",
    detail: "Hayward, California",
  },
] as const;

const ADVANCED_POSTGRAD = [
  "Carrick Institute for Graduate Studies \u2014 Functional Neurology",
  "Functional Medicine Institute \u2014 Clinical Excellence Series",
  "American Functional Neurology Institute (AFNI)",
] as const;

// Advanced Training & Specializations — verbatim from the CV.
const ADVANCED_TRAINING = [
  {
    title: "Neurofeedback & qEEG Brain Mapping",
    detail: "Comprehensive clinical training and application",
  },
  {
    title: "Functional Neurology (Carrick Institute)",
    detail: "Hemisphericity, vestibular, and autonomic protocols",
  },
  {
    title: "Neurotransmitter Testing & Remediation",
    detail: "Clinical application for cognitive and mood disorders",
  },
  {
    title: "PEMF (Pulsed Electromagnetic Field) Therapy",
    detail: "Cellular recharge and neurological recovery",
  },
  {
    title: "Regenerative Medicine & Stem Cell Protocols",
    detail: "Neuroprotective and longevity applications",
  },
  {
    title: "Biochemistry & Functional Lab Analysis",
    detail: "Blood chemistry, genomics, mycotoxins, heavy metals",
  },
  {
    title: "TBI & Post-Concussion Syndrome Rehabilitation",
    detail: "Personal recovery + clinical protocols",
  },
  {
    title: "Vestibular Rehabilitation & Stroke Recovery",
    detail: "",
  },
] as const;

// Professional Experience bullets — verbatim from the CV.
const EXPERIENCE_BULLETS = [
  "Built and led a multidisciplinary neurometabolic and functional neurology practice integrating Neurofeedback, Laser Therapy, Regenerative Medicine and advanced Functional Medicine.",
  "Developed and scaled virtual programs: Brain Brightening\u2122 and Mynd Transformation Blueprint for cognitive optimization, longevity, and executive performance.",
  "Personally designed and executed decade-long intensive rehabilitation protocol following severe motor vehicle accident and traumatic brain injury \u2014 achieving full cognitive and functional restoration.",
] as const;

// Key Skills — verbatim from the CV.
const KEY_SKILLS = [
  "Functional Neurology",
  "Neurofeedback & qEEG",
  "Laser, PEMF & Regenerative Modalities",
  "Root-Cause Functional Medicine",
  "Traumatic Brain Injury Rehabilitation",
  "Clinical Education & Training",
  "Biomarker Interpretation",
  "Patient-Centered Outcome Measurement",
] as const;

// Carrick, Apex, and Melillo have no usable logo file supplied yet (Apex's
// source file is a full marketing banner, not a standalone mark; Melillo's
// is a generic unrelated icon) — those three stay as text badges.
interface InstitutionBadge {
  name: string;
  logo?: { src: string; width: number; height: number; dark?: boolean };
}

const INSTITUTION_BADGES: InstitutionBadge[] = [
  { name: "Carrick" },
  {
    name: "IFM",
    logo: { src: "/images/institution-logos/ifm.svg", width: 268, height: 82 },
  },
  {
    name: "Erchonia",
    logo: {
      src: "/images/institution-logos/erchonia.svg",
      width: 282,
      height: 69,
    },
  },
  {
    name: "NewMind",
    logo: {
      src: "/images/institution-logos/newmind.png",
      width: 3001,
      height: 900,
    },
  },
  {
    name: "ReCODE",
    logo: {
      src: "/images/institution-logos/recode.webp",
      width: 839,
      height: 207,
      dark: true,
    },
  },
  {
    name: "Advanced Brain Technologies",
    logo: {
      src: "/images/institution-logos/advanced-brain-technologies.svg",
      width: 220,
      height: 45,
    },
  },
  {
    name: "AAIM",
    logo: { src: "/images/institution-logos/aaim.png", width: 400, height: 400 },
  },
  { name: "Melillo" },
  {
    name: "Board-Cert Nutrition",
    logo: {
      src: "/images/institution-logos/board-cert-nutrition.png",
      width: 426,
      height: 167,
    },
  },
  { name: "Apex" },
  {
    name: "CNCB",
    logo: { src: "/images/institution-logos/cncb.png", width: 566, height: 125 },
  },
];

// Speaking Engagements — verbatim from the CV.
const SPEAKING = [
  "Ageing Summit \u2013 Silicon Valley: Presentation on Alzheimer's Clinical Intervention",
  "Academy of Comprehensive Integrated Medicine (ACIM): Presentation on Integrative Tech",
  "NeuroMetabolic Group: Presentation on Neurofeedback and Complex Neurological Conditions",
  "Pulse PEMF: Medical Training on operational strategies using PEMF in difficult cases",
  "Functional Neurology group presentation on Integrated Multimodal Neurology",
  "Academy of Comprehensive Integrated Medicine: Presentation on Effective Alzheimer's Therapies given to 500 doctor meeting",
] as const;

// Outreach Media — verbatim from the CV.
const MEDIA = [
  "2000 \u2013 Vibrant Health Radio Show in SFO",
  "2018 \u2013 Integrative Medicine Radio in Santa Cruz",
  "2022 \u2013 New Podcast: The Medical Insider",
] as const;

function ProgramMention({
  href,
  linked,
  children,
}: {
  href: string;
  linked: boolean;
  children: React.ReactNode;
}) {
  if (!linked) return <span className="font-medium text-ink">{children}</span>;
  return (
    <Link
      href={href}
      className="text-ink underline decoration-amber/60 underline-offset-4 hover:text-amber-b"
    >
      {children}
    </Link>
  );
}

// linkProgramNames turns the two program mentions in the bio into links.
// Landing pages switch it off so no body copy leads away from the page.
// afterStats is a slot for content that belongs after the stats and before the
// credentials run — landing pages drop their offer section in here.
// statsPlacement moves the four stats out of their own full-width ribbon and
// into amber cards under the photo, which keeps landing pages from putting a
// whole section between the bio and the offer.
// amberEducation paints the education section a light amber instead of paper.
// showEducation/showExperience/showClinicalFocus/showKeySkills let landing
// pages drop the CV-length sections that don't fit a short conversion page.
// showName prints the name + credentials in the bio — off by default because
// /about/dr-thomas-santucci already states the name in its own hero above
// this component; landing pages that skip that hero turn it on.
// centerHeadings centers and enlarges the section headers (training,
// publications, credentials) so landing pages read as a sequence of centered
// statements rather than the left-aligned CV layout of the about page.
export default function DrSantucciProfile({
  linkProgramNames = true,
  afterStats,
  statsPlacement = "ribbon",
  amberEducation = false,
  centerHeadings = false,
  darkTraining = false,
  showEducation = true,
  showExperience = true,
  showClinicalFocus = true,
  showSpeakingMedia = true,
  showKeySkills = true,
  showName = false,
  showCta = true,
  centerKeySkills = false,
  showTrainingCta = false,
}: {
  linkProgramNames?: boolean;
  afterStats?: React.ReactNode;
  statsPlacement?: "ribbon" | "under-photo";
  amberEducation?: boolean;
  centerHeadings?: boolean;
  darkTraining?: boolean;
  showEducation?: boolean;
  showExperience?: boolean;
  showClinicalFocus?: boolean;
  showSpeakingMedia?: boolean;
  showKeySkills?: boolean;
  showName?: boolean;
  showCta?: boolean;
  centerKeySkills?: boolean;
  showTrainingCta?: boolean;
}) {
  const headerBlock = centerHeadings
    ? "mx-auto max-w-3xl text-center"
    : "max-w-3xl";
  const headingSize = centerHeadings
    ? "text-[2.75rem] sm:text-[3.5rem]"
    : "text-4xl sm:text-5xl";

  return (
    <>
      {/* Bio */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-rule">
                <Image
                  src="/images/dr-santucci.webp"
                  alt="Dr. Thomas Santucci"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              {statsPlacement === "under-photo" && (
                <ul className="mt-4 grid grid-cols-2 gap-3">
                  {STAT_RIBBON.map((stat) => (
                    <li
                      key={stat.label}
                      className="rounded-2xl bg-gradient-to-br from-amber to-amber-b px-4 py-4 shadow-[0_14px_34px_-18px_rgba(232,160,32,0.95)]"
                    >
                      <span className="block font-serif text-[1.3rem] leading-none tracking-tight text-ink">
                        {stat.value}
                      </span>
                      <span className="mt-2 block font-mono font-medium text-[10px] uppercase leading-snug tracking-[0.12em] text-ink/75">
                        {stat.label}
                      </span>
                      {"note" in stat && (
                        <span className="mt-1 block text-[11px] italic leading-snug text-ink/65">
                          ({stat.note})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
            <Reveal delay={120} offset={24} className="lg:col-span-8">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                Professional Summary
              </p>
              {/* When this component prints the name (landing pages, which have
                  no hero above it), the name and the role read as one bold
                  heading rather than a label stacked on a title. */}
              <h2
                className={`mt-4 font-serif leading-tight tracking-tight text-ink ${
                  showName
                    ? "text-[2rem] font-bold sm:text-[2.5rem]"
                    : "text-4xl sm:text-5xl"
                }`}
              >
                {showName && (
                  <>
                    Dr. Thomas Santucci, DC, AFNI
                    <br />
                  </>
                )}
                Founder, NeuroIntegrative Care of Los Gatos.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink">
                Board-certified Doctor of Chiropractic with advanced
                certifications in nutrition, functional neurology, and
                neurofeedback. Founder of a 30-year multidisciplinary
                neurometabolic practice specializing in complex neurological
                conditions. Personally recovered from severe traumatic brain
                injury and post-concussion syndrome through self-designed
                functional neurology and regenerative protocols, providing
                unique clinical insight and validated methodology. Expert in
                brain mapping, neurofeedback, LASER, PEMF, neurotransmitter
                remediation, and root-cause functional medicine.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Prior to building his practice, Dr. Santucci served in
                international product management roles at{" "}
                <span className="font-medium text-ink">IBM</span>,{" "}
                <span className="font-medium text-ink">Telenet</span>,{" "}
                <span className="font-medium text-ink">British Telecom</span>{" "}
                and as Product Manager for{" "}
                <span className="font-medium text-ink">MCI&apos;s</span> Data
                Communications initiatives, overseeing complex data services
                across a 20-city network. These roles involved strategic
                business planning which he applies to the development of
                advanced interventional therapies.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                He is the author of{" "}
                <span className="italic text-ink">
                  Engineering Medical Miracles: Return to Health
                </span>{" "}
                (2017) and developed the virtual programs{" "}
                <ProgramMention
                  href="/programs/virtual"
                  linked={linkProgramNames}
                >
                  Mynd Transformation Blueprint
                </ProgramMention>{" "}
                and{" "}
                <ProgramMention
                  href="/conditions/brain-brightening"
                  linked={linkProgramNames}
                >
                  Brain Brightening™
                </ProgramMention>
                , for cognitive optimization, longevity, and executive
                performance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stat ribbon */}
      {statsPlacement === "ribbon" && (
        <section className="bg-paper-2 py-14 lg:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:gap-8">
                {STAT_RIBBON.map((stat) => (
                  <li
                    key={stat.label}
                    className="flex flex-col border-l border-amber/50 pl-4"
                  >
                    <span className="font-serif text-[1.65rem] leading-none text-ink lg:text-[2rem]">
                      {stat.value}
                    </span>
                    <span className="mt-3 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted">
                      {stat.label}
                    </span>
                    {"note" in stat && (
                      <span className="mt-1 text-[13px] italic leading-snug text-muted">
                        ({stat.note})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {afterStats}

      {/* Education */}
      {showEducation && (
      <section
        className={`py-24 lg:py-32 ${
          amberEducation ? "bg-amber-soft" : "bg-paper-2"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p
              className={`font-mono font-medium text-[13px] uppercase tracking-[0.18em] ${
                amberEducation ? "text-ink/70" : "text-amber"
              }`}
            >
              Education
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              From Georgetown to the exam room.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {EDUCATION.map((item, i) => (
              <Reveal
                key={item.title}
                delay={100 + i * 90}
                offset={20}
              >
                <div
                  className={`h-full rounded-2xl bg-paper p-6 lg:p-7 ${
                    amberEducation
                      ? "border border-ink/10 shadow-[0_16px_40px_-24px_rgba(11,18,32,0.45)]"
                      : "border border-rule"
                  }`}
                >
                  <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                    {item.period}
                  </p>
                  <p className="mt-4 font-serif text-[1.15rem] leading-tight text-ink">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-muted">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240} offset={16} className="mt-10">
            <p
              className={`font-mono font-medium text-[12px] uppercase tracking-[0.18em] ${
                amberEducation ? "text-ink/70" : "text-muted"
              }`}
            >
              Advanced Postgraduate Studies
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {ADVANCED_POSTGRAD.map((item) => (
                <li
                  key={item}
                  className={`rounded-full bg-paper px-5 py-2.5 text-[14px] leading-snug text-ink ${
                    amberEducation ? "border border-ink/10" : "border border-rule/60"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      )}

      {/* Advanced Training & Specializations */}
      <section
        className={`py-24 lg:py-32 ${
          darkTraining ? "bg-[#12181F]" : "bg-paper"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className={headerBlock}>
            <p
              className={`font-mono font-medium text-[13px] uppercase tracking-[0.18em] ${
                darkTraining ? "text-amber-b" : "text-amber"
              }`}
            >
              Advanced Training & Specializations
            </p>
            <h2
              className={`mt-4 font-serif leading-tight tracking-tight ${headingSize} ${
                darkTraining ? "text-paper" : "text-ink"
              }`}
            >
              Where the clinical depth comes from.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANCED_TRAINING.map((item, i) => (
              <Reveal
                key={item.title}
                as="li"
                delay={80 + i * 60}
                offset={20}
                className="h-full"
              >
                <article
                  className={`flex h-full flex-col rounded-2xl p-6 lg:p-7 ${
                    darkTraining
                      ? "border border-paper/12 bg-paper/[0.05]"
                      : "border border-rule/60 bg-paper-2"
                  }`}
                >
                  <h3
                    className={`font-serif text-[1.1rem] leading-tight ${
                      darkTraining ? "text-paper" : "text-ink"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.detail && (
                    <p
                      className={`mt-3 text-[14px] leading-relaxed ${
                        darkTraining ? "text-paper/65" : "text-muted"
                      }`}
                    >
                      {item.detail}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </ul>

          {showTrainingCta && (
            <Reveal delay={420} className="mt-14 flex justify-center">
              <BrainAssessmentButton />
            </Reveal>
          )}
        </div>
      </section>

      {/* Professional Experience */}
      {showExperience && (
      <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.22), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
              Professional Experience
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-paper sm:text-5xl">
              Founder & Clinical Director
            </h2>
            <p className="mt-4 font-mono font-medium text-[13px] uppercase tracking-[0.16em] text-paper/70">
              NeuroIntegrative Care of Los Gatos, California (Est. 1996 —{" "}
              {YEARS_IN_PRACTICE} Years)
            </p>
          </Reveal>

          <ul className="mt-12 space-y-6">
            {EXPERIENCE_BULLETS.map((item, i) => (
              <Reveal
                key={item}
                as="li"
                delay={100 + i * 90}
                offset={16}
                className="flex gap-4 border-l border-amber/50 pl-5"
              >
                <p className="font-serif text-[1.15rem] leading-relaxed text-paper/90">
                  {item}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      )}

      {/* Clinical Focus Areas */}
      {showClinicalFocus && (
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Clinical Focus Areas
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Where his cases concentrate.
            </h2>
          </Reveal>
          <ul className="mt-12 flex flex-wrap gap-3">
            {CLINICAL_FOCUS.map((area, i) => (
              <Reveal
                key={area}
                as="li"
                delay={80 + i * 40}
                offset={12}
                className="rounded-full border border-rule/60 bg-paper px-5 py-2.5 text-[14px] leading-snug text-ink"
              >
                {area}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      )}

      {/* Publications */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className={headerBlock}>
            {/* This section has no headline of its own, so on landing pages the
                label carries the section at heading scale. */}
            <p
              className={`font-mono font-medium uppercase text-amber ${
                centerHeadings
                  ? "text-[20px] tracking-[0.16em] sm:text-[26px]"
                  : "text-[13px] tracking-[0.18em]"
              }`}
            >
              Publications
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:gap-16">
            <Reveal delay={100} offset={24}>
              <div className="relative mx-auto aspect-[450/744] w-full max-w-[360px] overflow-hidden rounded-xl border border-rule shadow-[0_20px_50px_-20px_rgba(11,18,32,0.35)]">
                <Image
                  src="/images/publications/engineering-medical-miracles-cover.png"
                  alt="Engineering Medical Miracles: Return to Health, book cover by Dr. Thomas A. Santucci, DC"
                  fill
                  sizes="(min-width: 640px) 360px, 90vw"
                  className="object-cover"
                />
              </div>
              <article className="mt-6 text-center">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                  Book · 2017
                </p>
                <h3 className="mt-3 font-serif text-[1.6rem] leading-tight text-ink">
                  Engineering Medical Miracles:{" "}
                  <span className="italic">Return to Health</span>
                </h3>
                <p className="mt-3 font-mono font-medium text-[13px] uppercase tracking-[0.16em] text-muted">
                  ISBN 1544232829
                </p>
              </article>
            </Reveal>

            <Reveal delay={200} offset={24}>
              <div className="relative mx-auto flex aspect-[450/744] w-full max-w-[360px] flex-col overflow-hidden rounded-xl border border-rule bg-ink shadow-[0_20px_50px_-20px_rgba(11,18,32,0.35)]">
                <div className="flex flex-1 flex-col px-8 pt-11">
                  <p className="font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-amber-b">
                    A Neurometabolic Framework
                  </p>
                  <h3 className="mt-5 font-serif text-[2.35rem] italic leading-[1.1] text-paper">
                    Deconstructing Alzheimer&apos;s
                  </h3>
                  <p className="mt-5 font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] text-paper/60">
                    Explore Neurometabolic Therapies Available Now · Going
                    Beyond Convention
                  </p>
                  <p className="mt-7 font-serif text-[16px] italic leading-relaxed text-paper/75">
                    A defensible working framework for families and
                    clinicians, integrating Functional Medicine, Functional
                    Neurology, and advanced diagnostics to provide realistic,
                    actionable interventions for Alzheimer&apos;s and cognitive
                    decline.
                  </p>
                </div>
                <div className="border-t border-paper/10 px-8 py-6">
                  <p className="font-serif text-[18px] text-paper">
                    Dr. Thomas A. Santucci
                  </p>
                  <p className="mt-1 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-paper/60">
                    DC · AFNI
                  </p>
                </div>
                <div className="flex h-3">
                  <span className="flex-1 bg-emerald-700" />
                  <span className="flex-1 bg-sky-700" />
                  <span className="flex-1 bg-teal-400" />
                </div>
              </div>
              <article className="mt-6 text-center">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                  In Progress
                </p>
                <h3 className="mt-3 font-serif text-[1.6rem] leading-tight text-ink">
                  Alzheimer&apos;s Intervention
                </h3>
                <p className="mt-3 text-[14px] leading-snug text-muted">
                  Educational content and interventions for neurodegenerative
                  conditions.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section id="credentials" className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className={headerBlock}>
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Licenses & Certifications
            </p>
            <h2
              className={`mt-4 font-serif leading-tight tracking-tight text-ink ${headingSize}`}
            >
              Licensed, certified, and continuously trained.
            </h2>
          </Reveal>

          <Reveal delay={80} offset={16} className="mt-12">
            <p
              className={`font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted ${
                centerHeadings ? "text-center" : ""
              }`}
            >
              Trained &amp; Certified By
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {INSTITUTION_BADGES.map((badge) => (
                <li
                  key={badge.name}
                  className={`flex h-20 items-center justify-center rounded-xl border border-rule/60 px-4 text-center ${
                    badge.logo?.dark ? "bg-ink" : "bg-paper-2"
                  }`}
                >
                  {badge.logo ? (
                    <Image
                      src={badge.logo.src}
                      alt={badge.name}
                      width={badge.logo.width}
                      height={badge.logo.height}
                      className="h-auto max-h-10 w-auto max-w-[85%] object-contain"
                    />
                  ) : (
                    <span className="font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink/80">
                      {badge.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className="mt-14 grid gap-4 border-t border-rule pt-14 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-5">
            {CREDENTIALS.map((cred, i) => (
              <Reveal
                key={cred}
                as="li"
                delay={80 + i * 30}
                offset={12}
                className="border-l border-amber/50 pl-5"
              >
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink">
                  {cred}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Video: Neurofeedback explainer */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal
            className={
              centerHeadings ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
            }
          >
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Board Certified in Neurofeedback
            </p>
            <h2
              className={`mt-4 font-serif leading-tight tracking-tight text-ink ${headingSize}`}
            >
              What is neurofeedback?
            </h2>
          </Reveal>
          <Reveal delay={120} offset={20} className="mt-10">
            {/* THIRD-PARTY MEDIA — embedded via YouTube, not re-hosted. */}
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-rule/60 bg-ink">
              <iframe
                src="https://www.youtube.com/embed/Jr4iwULgxTs"
                title="What is Neurofeedback?"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Speaking + Media */}
      {showSpeakingMedia && (
        <section className="bg-paper-2 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal offset={20}>
                <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                  Speaking Engagements
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                  Where he&apos;s presented.
                </h2>
                <ul className="mt-8 space-y-5">
                  {SPEAKING.map((item) => (
                    <li
                      key={item}
                      className="border-l border-amber/50 pl-4 text-[15px] leading-relaxed text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal offset={20} delay={140}>
                <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                  Outreach Media
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                  Community reach-out authored by Dr. Santucci.
                </h2>
                <ul className="mt-8 space-y-5">
                  {MEDIA.map((item) => (
                    <li
                      key={item}
                      className="border-l border-amber/50 pl-4 text-[15px] leading-relaxed text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Key Skills */}
      {showKeySkills && (
        <section className="bg-ink py-24 text-paper lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal className="max-w-3xl">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
                Key Skills
              </p>
            </Reveal>
            <ul
              className={`mt-10 flex flex-wrap gap-3 ${centerKeySkills ? "justify-center" : ""}`}
            >
              {KEY_SKILLS.map((skill, i) => (
                <Reveal
                  key={skill}
                  as="li"
                  delay={80 + i * 40}
                  offset={12}
                  className="rounded-full border border-paper/20 px-5 py-2.5 text-[14px] leading-snug text-paper/90"
                >
                  {skill}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      {showCta && (
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
      )}
    </>
  );
}
