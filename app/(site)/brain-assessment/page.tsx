import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";
import CMSRoute from "@/components/cms/CMSRoute";
import { withCMSMetadata } from "@/lib/cms/metadata";


const PAGE_URL = `${SITE_URL}/brain-assessment`;

const metadataFallback: Metadata = {
  title: "Book a Free Discovery Call",
  description:
    "Book a free discovery call with NeuroIntegrative Care of Los Gatos. No obligation.",
  alternates: { canonical: "/brain-assessment" },
  openGraph: {
    title: "Book a Free Discovery Call | NeuroIntegrative Care of Los Gatos",
    description:
      "Book a free discovery call with Dr. Santucci's clinic. No obligation.",
    url: "/brain-assessment",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Book a Free Discovery Call | NeuroIntegrative Care of Los Gatos",
  description:
    "Book a free discovery call with NeuroIntegrative Care of Los Gatos.",
  url: PAGE_URL,
};

export async function generateMetadata(): Promise<Metadata> {
  return withCMSMetadata("/brain-assessment", metadataFallback);
}

export default function BrainAssessmentPage() {
  return (
    <CMSRoute path={"/brain-assessment"}>
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />

      <section className="relative overflow-hidden bg-ink py-28 text-paper lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-6 lg:px-10">
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="text-center font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            Free Discovery Call
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="text-center font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl">
              Start with a conversation, not a form.
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-paper/80"
          >
            Book a free discovery call. No prescriptions, no obligation.
          </Reveal>

          <Reveal delay={520} offset={24} className="mt-12 flex justify-center">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>
    </>
  
    </CMSRoute>);
}
