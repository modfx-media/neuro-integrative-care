import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/content/programs";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

const SITE_URL = "https://neurointegrativecareoflosgatos.com";
const PAGE_URL = `${SITE_URL}/out-of-town`;

const FRAMING_LABELS = ["Continuity", "Access", "Oversight"] as const;

export const metadata: Metadata = {
  title: "Out-of-Town Services",
  description: programs.outOfTownServices.description,
  alternates: { canonical: "/out-of-town" },
  openGraph: {
    title: "Out-of-Town Services | NeuroIntegrative Care of Los Gatos",
    description: programs.outOfTownServices.description,
    url: "/out-of-town",
    type: "article",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Out-of-Town Services | NeuroIntegrative Care of Los Gatos",
  description: programs.outOfTownServices.description,
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
    itemListElement: programs.outOfTownServices.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        provider: {
          "@type": "MedicalClinic",
          name: "NeuroIntegrative Care of Los Gatos",
          url: `${SITE_URL}/`,
        },
        areaServed: { "@type": "Country", name: "United States" },
      },
    })),
  },
};

export default function OutOfTownPage() {
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
            <Link href="/programs" className="transition-colors hover:text-amber-b">
              Programs
            </Link>
            <span aria-hidden="true" className="mx-3 text-paper/30">
              /
            </span>
            <span className="text-paper">Out-of-Town Services</span>
          </Reveal>
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            Out-of-Town Services
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Fly in for Detailed Assessment and Regenerative Services.
              Continue the support from home.
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-[1.4] text-paper/80 sm:text-[1.55rem] lg:text-[1.75rem]"
          >
            {programs.outOfTownServices.description}
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Framing + services */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {FRAMING_LABELS.map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-3 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-ink"
                >
                  <span aria-hidden="true" className="inline-block h-px w-6 bg-amber" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.outOfTownServices.items.map((item, i) => (
              <Reveal
                key={item.name}
                as="li"
                delay={140 + i * 90}
                offset={24}
                className="h-full"
              >
                <article className="flex h-full flex-col rounded-2xl border border-rule/60 bg-paper-2 p-8 lg:p-9">
                  <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-5 font-serif text-[1.4rem] leading-tight text-ink">
                    {item.name}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </article>
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
              Every workup starts with you, wherever you live.
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
