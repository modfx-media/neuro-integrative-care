import type { Metadata } from "next";
import Link from "next/link";
import { resourceGuides } from "@/content/resources";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import CMSRoute from "@/components/cms/CMSRoute";
import { withCMSMetadata } from "@/lib/cms/metadata";


const metadataFallback: Metadata = {
  title: "Patient Resources & Guides",
  description:
    "Straight answers to common questions about brain fog, neurofeedback, PEMF therapy, mold exposure, chronic fatigue, and heavy metal detox.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Patient Resources & Guides | NeuroIntegrative Care of Los Gatos",
    description:
      "Straight answers to common questions about brain fog, neurofeedback, PEMF therapy, mold exposure, chronic fatigue, and heavy metal detox.",
    url: "/resources",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCMSMetadata("/resources", metadataFallback);
}

export default function ResourcesHubPage() {
  return (
    <CMSRoute path={"/resources"}>
    <>
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
            Resources
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Straight answers to the questions patients actually ask.
            </h1>
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Guides grid */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {resourceGuides.map((guide, i) => (
              <Reveal
                key={guide.slug}
                as="li"
                delay={100 + i * 60}
                offset={20}
                className="h-full"
              >
                <Link
                  href={`/resources/${guide.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-rule/60 bg-paper-2 p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[0_30px_60px_-40px_rgba(11,18,32,0.4)]"
                >
                  <div>
                    <p className="font-mono font-medium text-[11px] uppercase tracking-[0.18em] text-amber">
                      {guide.kicker}
                    </p>
                    <h2 className="mt-3 font-serif text-xl leading-tight text-ink">
                      {guide.question}
                    </h2>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink">
                    Read More
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
    </>
  
    </CMSRoute>);
}
