// COMPLIANCE + FACT-CHECK NOTES:
//
// (1) YEARS-IN-PRACTICE: master brief confirms "30+ years," superseding the
//     earlier "27 years" blueprint figure. Consistent with the CV founding
//     date (1996) and the homepage trust strip.
//
// (2) All copy is derived from the client-supplied blueprint + CV excerpt in
//     the request. Every credential, publication, engagement, and media
//     mention is quoted verbatim. Do not paraphrase or expand.
//
// (3) Person + MedicalOrganization schema below is written for E-E-A-T
//     signal — grounded only in the verified CV facts.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const SITE_URL = "https://neurointegrativecareoflosgatos.com";
const PAGE_URL = `${SITE_URL}/about/dr-thomas-santucci`;

const YEARS_IN_PRACTICE = "30+";

export const metadata: Metadata = {
  title: "About Dr. Thomas Santucci",
  description:
    "An informed generalist across five disciplines. 30+ years in Silicon Valley, 11 colleges, 10,000+ training hours. Author of Engineering Medical Miracles.",
  alternates: { canonical: "/about/dr-thomas-santucci" },
  openGraph: {
    title: "About Dr. Thomas Santucci | NeuroIntegrative Care of Los Gatos",
    description:
      "An informed generalist with his feet in five disciplines. 30+ years, 11 colleges, one published book.",
    url: "/about/dr-thomas-santucci",
    type: "profile",
  },
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Thomas Santucci",
  honorificPrefix: "Dr.",
  honorificSuffix: "DC",
  jobTitle: "Doctor of Chiropractic; Functional Neurology, Neurofeedback, and Regenerative Medicine",
  url: PAGE_URL,
  worksFor: {
    "@type": "MedicalOrganization",
    name: "NeuroIntegrative Care of Los Gatos",
    url: `${SITE_URL}/`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "20 S Santa Cruz Ave, Suite 101",
      addressLocality: "Los Gatos",
      addressRegion: "CA",
      postalCode: "95030",
      addressCountry: "US",
    },
    telephone: "+1-408-871-8222",
    foundingDate: "1996",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Georgetown University",
      sameAs: "https://www.georgetown.edu/",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Life Chiropractic College West",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hayward",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "International Business Policy Degree",
      credentialCategory: "degree",
      recognizedBy: { "@type": "Organization", name: "Georgetown University" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Doctor of Chiropractic (DC)",
      credentialCategory: "license",
      recognizedBy: { "@type": "Organization", name: "California Board of Chiropractic Examiners" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "American Functional Neurology Institute (AFNI) Certified, 4th Level Training",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Alzheimer's Recode II Certified Provider, Medical Based Interventions",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "The Listening Program Certified Provider, Sound Based Therapy",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Board Certified in Neurofeedback (BCN), 19 Channel QEEG Testing & Interventions",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Carrick Institute for Graduate Studies, Functional Neurology",
      credentialCategory: "training",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Childhood Developmental Delays training, Robert Melillo",
      credentialCategory: "training",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Functional Medicine Institute, Applying Clinical Excellence Series",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Institute for Functional Medicine" },
    },
  ],
  knowsAbout: [
    "Functional Medicine",
    "Functional Neurology",
    "Regenerative Medicine",
    "Neurofeedback",
    "qEEG Brain Mapping",
    "Laser Therapy",
    "PEMF Therapy",
    "Neurotransmitter Testing & Remediation",
    "Vestibular Rehabilitation",
    "Alzheimer's Disease",
    "Autoimmune Disease",
    "Concussion and Post-Trauma Care",
    "Longevity Science",
  ],
  award: [
    "Author, Engineering Medical Miracles: Return to Health (2017)",
    "Presenter, Academy of Comprehensive Integrated Medicine (ACIM): Alzheimer's Clinical Intervention (500-doctor audience)",
  ],
};

const MEDICAL_ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "NeuroIntegrative Care of Los Gatos",
  url: `${SITE_URL}/`,
  founder: {
    "@type": "Person",
    name: "Dr. Thomas Santucci",
    url: PAGE_URL,
  },
  foundingDate: "1996",
  medicalSpecialty: { "@type": "MedicalSpecialty", name: "Neurology" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "20 S Santa Cruz Ave, Suite 101",
    addressLocality: "Los Gatos",
    addressRegion: "CA",
    postalCode: "95030",
    addressCountry: "US",
  },
  telephone: "+1-408-871-8222",
};

const STAT_RIBBON = [
  { label: "Years", value: `${YEARS_IN_PRACTICE} Years` },
  { label: "Disciplines", value: "5" },
  { label: "Training Hours", value: "10,000+" },
  { label: "Published Book", value: "1", note: "a second on the way" },
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

const CREDENTIALS = [
  "International Business Policy Degree, Georgetown University, Washington, DC",
  "Doctor of Chiropractic (DC), Licensed in California, Life Chiropractic College West, Hayward, CA",
  "American Functional Neurology Institute (AFNI) Certified 4th Level Training",
  "Alzheimer's Recode II Certified Provider \u2013 Medical based Interventions",
  "The Listening Program Certified Provider \u2013 Sound based Therapy",
  "Board Certified in Neurofeedback (BCN) \u2013 19 Channel QEEG Testing & Interventions",
  "Carrick Institute for Graduate Studies, Functional Neurology (extensive postgraduate training)",
  "Childhood Developmental Delays training, Robert Melillo",
  "Functional Medicine Institute, entire Applying Clinical Excellence Series by originators of Functional Medicine",
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

const SPEAKING = [
  "Aging Summit, Silicon Valley – Alzheimer's Clinical Intervention",
  "Academy of Comprehensive Integrated Medicine (ACIM) – Integrative Tech",
  "Academy of Comprehensive Integrated Medicine (ACIM) – Effective Alzheimer's Therapies, presented to a 500-doctor audience",
  "NeuroMetabolic Group – Neurofeedback and Complex Neurological Conditions",
  "Pulse PEMF Medical Training – Operational strategies using PEMF in difficult cases",
  "Functional Neurology group presentation – Integrated Multimodal Neurology",
] as const;

const MEDIA = [
  "Vibrant Health Radio, SFO (2000)",
  "Integrative Medicine Radio, Santa Cruz (2018)",
  "The Medical Insider podcast (2022)",
] as const;

export default function AboutDrThomasSantucciPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(MEDICAL_ORG_SCHEMA) }}
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
            About Dr. Thomas Santucci
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              An informed generalist{" "}
              <span className="italic text-amber-b">with his feet in five canoes.</span>
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-[1.4] text-paper/80 sm:text-[1.55rem] lg:text-[1.75rem]"
          >
            The doctor who refuses to be one narrow thing, because complex
            cases don&apos;t reduce to one lane.
          </Reveal>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-rule">
                <Image
                  src="/images/dr-santucci.png"
                  alt="Dr. Thomas Santucci"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
            <Reveal delay={120} offset={24} className="lg:col-span-8">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                Meet Dr. Santucci
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                Founder, NeuroIntegrative Care of Los Gatos.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink">
                Dr. Thomas Santucci, DC, has spent {YEARS_IN_PRACTICE} years
                investigating the complex, unresolved cases that one lane of
                medicine alone couldn&apos;t explain. He trained across five
                disciplines, functional medicine, functional neurology,
                neurofeedback, regenerative medicine, and chiropractic, at 11
                colleges and 10,000+ hours of postgraduate study, because
                complicated presentations rarely have a single-specialty
                answer.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Before medicine, he built a career in international business
                (Georgetown University, then product management roles at IBM,
                Telenet, British Telecom, and MCI, where he oversaw the
                company&apos;s data communications initiatives across a
                20-city network). A car accident and the traumatic brain
                injury and celiac trigger it left behind changed the
                direction entirely, a decade-long personal recovery that
                became the model he now applies to patients. He is the author
                of{" "}
                <span className="italic text-ink">
                  Engineering Medical Miracles: Return to Health
                </span>{" "}
                and a presenter to a 500-doctor audience on Alzheimer&apos;s
                clinical intervention.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                His clinical toolkit spans qEEG brain mapping, neurofeedback,
                laser and PEMF therapy, and neurotransmitter testing and
                remediation, the same root-cause approach he built into two
                virtual programs,{" "}
                <Link
                  href="/programs/virtual"
                  className="text-ink underline decoration-amber/60 underline-offset-4 hover:text-amber-b"
                >
                  Mynd Transformation Blueprint
                </Link>{" "}
                and{" "}
                <Link
                  href="/conditions/brain-brightening"
                  className="text-ink underline decoration-amber/60 underline-offset-4 hover:text-amber-b"
                >
                  Brain Brightening
                </Link>
                , for cognitive optimization, longevity, and executive
                performance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stat ribbon */}
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

      {/* The Approach */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-3">
              <div className="flex items-center gap-4">
                <h2 className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber">
                  The Approach
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
                className="pointer-events-none absolute -left-3 -top-10 select-none font-serif text-[7rem] italic leading-none text-ink/[0.06] lg:-left-6 lg:-top-16 lg:text-[10rem]"
              >
                &ldquo;
              </span>
              <p className="relative font-serif text-[1.5rem] leading-[1.4] text-ink sm:text-[1.75rem] lg:text-[2.05rem]">
                Come at a complex case with one modality and you get{" "}
                <span className="italic text-amber">the wrong answer.</span>
              </p>
              <p className="mt-10 border-l-2 border-amber pl-6 font-serif text-[1.25rem] italic leading-snug text-ink lg:text-[1.4rem]">
                &ldquo;We don&apos;t diagnose anything we can&apos;t help.&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Origin */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              The Origin
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              From Georgetown to the exam room.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal delay={100} offset={20} className="lg:col-span-4">
              <div className="rounded-2xl border border-rule bg-paper p-6 lg:p-7">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                  Georgetown University · 1978
                </p>
                <p className="mt-4 font-serif text-[1.15rem] leading-tight text-ink">
                  Bachelor of Science in Business Administration
                </p>
                <p className="mt-2 text-[13px] leading-snug text-muted">
                  International Business Policy
                </p>
              </div>
            </Reveal>
            <Reveal delay={180} offset={20} className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-ink">
                Before founding his practice, Dr. Santucci held international
                product management roles at{" "}
                <span className="font-medium">IBM</span>,{" "}
                <span className="font-medium">Telenet</span>,{" "}
                <span className="font-medium">British Telecom</span>, and{" "}
                <span className="font-medium">MCI</span>, overseeing data
                communications services across a 20-city network, strategic
                business planning experience he later applied to building his
                practice.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                He became a doctor after a car accident and traumatic brain
                injury that took a decade to fully resolve, a recovery he
                personally designed and executed through functional neurology
                and regenerative protocols. His own trauma also activated his
                celiac genes.{" "}
                <span className="italic text-ink">
                  Trauma as an autoimmune trigger is autobiography, not theory.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              The Philosophy
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              How do we tackle your complex issues?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Every plausible cause on the table before narrowing, because
              complicated cases don&apos;t yield to one modality&apos;s
              default list.
            </p>
          </Reveal>

          <ol className="mt-16 grid gap-6 sm:grid-cols-3 lg:gap-8">
            {[
              {
                num: "01",
                title: "Neurologic Functions",
                body: "Neurons are the most energy-hungry cells in the body. Systemic breakdowns show up neurologically first, which is where the investigation begins.",
              },
              {
                num: "02",
                title: "Metabolic Systems",
                body: "Optimal, not merely inside a textbook window. 'Normal' labs miss what functional ranges catch.",
              },
              {
                num: "03",
                title: "Environmental Impacts",
                body: "Understand how changes in food, environmental toxins, and chronic stress are reshaping the clinical picture, often driving symptoms other lanes miss.",
              },
            ].map((principle, i) => (
              <Reveal
                key={principle.num}
                as="li"
                delay={140 + i * 90}
                offset={20}
                className="h-full"
              >
                <article className="flex h-full flex-col rounded-2xl border border-rule/60 bg-paper-2 p-8 lg:p-9">
                  <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                    {principle.num}
                  </p>
                  <h3 className="mt-5 font-serif text-[1.5rem] leading-tight text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {principle.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Plant analogy */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.22), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
              The Plant
            </p>
          </Reveal>
          <Reveal delay={120} className="relative mt-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 -top-14 select-none font-serif text-[9rem] italic leading-none text-paper/10 lg:-left-8 lg:-top-20 lg:text-[14rem]"
            >
              &ldquo;
            </span>
            <p className="relative font-serif text-[1.65rem] leading-[1.35] text-paper sm:text-[2rem] lg:text-[2.35rem]">
              Water, food, and sun each tested alone kill the plant,{" "}
              <span className="italic text-amber-b">
                &lsquo;proving&rsquo; none work.
              </span>{" "}
              They only work together. Neurology, biochemistry, and technology
              are the same.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Clinical Focus Areas */}
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

      {/* Credentials */}
      <section id="credentials" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Credentials & Licenses
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              11 colleges. 10,000+ hours.
            </h2>
          </Reveal>

          <Reveal delay={80} offset={16} className="mt-12">
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted">
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
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Board Certified in Neurofeedback
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
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

      {/* Publications */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-3">
              <div className="flex items-center gap-4">
                <h2 className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber">
                  Publications
                </h2>
                <span
                  aria-hidden="true"
                  className="hidden h-px flex-1 bg-rule lg:block"
                />
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-9">
              <article>
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                  Book · 2017
                </p>
                <h3 className="mt-4 font-serif text-[2rem] leading-tight text-ink lg:text-[2.5rem]">
                  Engineering Medical Miracles:{" "}
                  <span className="italic">Return to Health</span>
                </h3>
                <p className="mt-4 font-mono font-medium text-[13px] uppercase tracking-[0.16em] text-muted">
                  ISBN 1544232829
                </p>
              </article>
              <article className="mt-12 border-t border-rule pt-10">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                  In Progress
                </p>
                <h3 className="mt-4 font-serif text-[1.5rem] leading-tight text-ink lg:text-[1.85rem]">
                  Alzheimer&apos;s Intervention
                </h3>
                <p className="mt-3 text-[15px] italic leading-snug text-muted">
                  Second book, forthcoming.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Speaking + Media */}
      <section className="bg-paper py-24 lg:py-32">
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
                Media
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

      {/* Alzheimer's work */}
      <section className="bg-ink py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
              The Alzheimer&apos;s Work
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-paper sm:text-5xl">
              A model, and a project to validate it.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal delay={100} offset={20} className="lg:col-span-4">
              <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
                The Model
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Neural inflammation",
                  "Mitochondrial dysfunction",
                  "Decreased autophagy",
                ].map((tenet) => (
                  <li
                    key={tenet}
                    className="flex gap-3 font-serif text-[1.15rem] leading-tight text-paper"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-[3px] w-4 shrink-0 rounded-full bg-amber"
                    />
                    <span>{tenet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220} offset={20} className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-paper/80">
                Dr. Santucci&apos;s Alzheimer&apos;s model rests on three
                intersecting drivers (neural inflammation, mitochondrial
                dysfunction, and decreased autophagy) and{" "}
                <span className="italic text-amber-b">
                  the Alzheimer&apos;s Project
                </span>{" "}
                exists to validate the intervention framework built on top of
                that model. It&apos;s the work that took him from the ACIM stage
                (Alzheimer&apos;s clinical intervention presented to a
                500-doctor audience) to the second book now underway.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-paper-2 py-24 lg:py-28">
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-serif text-3xl leading-[1.2] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Ready to have your case seen this way?
            </h2>
          </Reveal>
          <Reveal delay={140} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/start"
              className="inline-flex w-[340px] max-w-full items-center justify-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-center text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.85)]"
            >
              Book a New-Patient Investigation
            </Link>
            <Link
              href="/brain-assessment"
              className="inline-flex w-[340px] max-w-full items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-center text-sm font-medium tracking-tight text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
            >
              Or take the Free Brain Assessment
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
