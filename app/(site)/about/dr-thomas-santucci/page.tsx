// COMPLIANCE + FACT-CHECK NOTES:
//
// (1) All copy on this page is sourced directly from Dr. Santucci's supplied
//     CV. Credentials, licenses, education, experience bullets, publications,
//     speaking engagements, and media mentions are quoted verbatim from that
//     document — do not paraphrase, expand, or invent additional detail.
//     Everything below the hero lives in <DrSantucciProfile />, which the
//     brain-assessment-offer landing page also renders.
//
// (2) YEARS-IN-PRACTICE: CV confirms "30+ years," consistent with the
//     founding date (1996).
//
// (3) Person + MedicalOrganization schema below is written for E-E-A-T
//     signal — grounded only in the verified CV facts.

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import DrSantucciProfile, {
  YEARS_IN_PRACTICE,
} from "@/components/about/DrSantucciProfile";
import { SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonLd";

const PAGE_URL = `${SITE_URL}/about/dr-thomas-santucci`;

export const metadata: Metadata = {
  title: "About Dr. Thomas Santucci",
  description:
    "Thomas A. Santucci, DC, AFNI — Founder & Clinical Director, NeuroIntegrative Care of Los Gatos. 30+ years in neurometabolic, functional medicine.",
  alternates: { canonical: "/about/dr-thomas-santucci" },
  openGraph: {
    title: "About Dr. Thomas Santucci | NeuroIntegrative Care of Los Gatos",
    description:
      "Functional Neurology | Neurofeedback Specialist | Regenerative Medicine Innovator. 30+ years of clinical excellence in neurometabolic and functional medicine.",
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
      name: "Doctor of Chiropractic (DC), Licensed in California",
      credentialCategory: "license",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "American Functional Neurology Institute (AFNI) Certified",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Alzheimer's Recode II Certified Provider",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "The Listening Program Certified Provider",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Board Certified in Neurofeedback (BCN)",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Carrick Institute Neurology Programs, Extensive Postgraduate Training",
      credentialCategory: "training",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Developmental Delays Training, Robert Melillo Neurology",
      credentialCategory: "training",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Functional Medicine Institute, Applying Clinical Excellence Series",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Institute for Functional Medicine" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Bachelor of Science in Business Administration (BSBA), International Business Policy",
      credentialCategory: "degree",
      recognizedBy: { "@type": "Organization", name: "Georgetown University" },
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

export default function AboutDrThomasSantucciPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(PERSON_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(MEDICAL_ORG_SCHEMA) }}
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
              Thomas A. Santucci,{" "}
              <span className="italic text-amber-b">DC, AFNI.</span>
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={300}
            offset={16}
            className="mt-6 font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-paper/70"
          >
            Functional Neurology | Neurofeedback Specialist | Regenerative
            Medicine Innovator
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-[1.4] text-paper/80 sm:text-[1.55rem] lg:text-[1.75rem]"
          >
            Founder & Clinical Director, NeuroIntegrative Care of Los Gatos,
            Los Gatos, California. {YEARS_IN_PRACTICE} Years Clinical
            Excellence in Neurometabolic & Functional Medicine.
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      <DrSantucciProfile />
    </>
  );
}
