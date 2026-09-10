import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cityLocations } from "@/content/locations";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

const SITE_URL = "https://neurointegrativecareoflosgatos.com";

export const metadata: Metadata = {
  title: "Locations We Serve",
  description:
    "NeuroIntegrative Care of Los Gatos serves patients from Los Gatos, Campbell, San Jose, Morgan Hill, Santa Cruz, and Aptos with root-cause functional medicine and neurology.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Locations We Serve | NeuroIntegrative Care of Los Gatos",
    description:
      "Root-cause functional medicine and neurology for patients across the South Bay and Santa Cruz County.",
    url: "/locations",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: cityLocations.map((city, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/locations/${city.slug}`,
    name: `${city.name} | NeuroIntegrative Care of Los Gatos`,
  })),
};

export default function LocationsHubPage() {
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
            Locations We Serve
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              One clinic in Los Gatos. Patients from all over the Bay.
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/80 lg:text-xl"
          >
            Our practice is based in downtown Los Gatos, but the drive is
            rarely the deciding factor for patients who&apos;ve run out of answers
            elsewhere. Find your city below for the specifics on getting here.
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Cities grid */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {cityLocations.map((city, i) => (
              <Reveal
                key={city.slug}
                as="li"
                delay={140 + i * 80}
                offset={24}
                className="h-full"
              >
                <Link
                  href={`/locations/${city.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-rule/60 bg-paper-2 p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[0_30px_60px_-40px_rgba(11,18,32,0.4)]"
                >
                  <div>
                    <MapPin
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="h-8 w-8 text-amber"
                    />
                    <h2 className="mt-5 font-serif text-2xl leading-tight text-ink">
                      {city.name}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {city.servingLine}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink">
                    Visit This Page
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
              Every workup starts the same way, wherever you&apos;re driving from.
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
