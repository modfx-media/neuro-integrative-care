import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import Link from "next/link";
import { tools } from "@/content/tools";
import { cityLocations, findCityLocation } from "@/content/locations";
import { buildCityServiceCopy } from "@/content/pseo/cityServiceCopy";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";

interface CityServiceParams {
  toolSlug: string;
  city: string;
}

export function generateStaticParams(): CityServiceParams[] {
  return tools.flatMap((tool) =>
    cityLocations.map((city) => ({ toolSlug: tool.slug, city: city.slug })),
  );
}

interface PageProps {
  params: Promise<CityServiceParams>;
}

function findAll(toolSlug: string, citySlug: string) {
  const tool = tools.find((t) => t.slug === toolSlug);
  const city = findCityLocation(citySlug);
  if (!tool || !city) return null;
  return { tool, city };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { toolSlug, city: citySlug } = await params;
  const found = findAll(toolSlug, citySlug);
  if (!found) return {};
  const { tool, city } = found;
  const cityIndex = cityLocations.findIndex((c) => c.slug === city.slug);
  const copy = buildCityServiceCopy(tool, city, cityIndex);
  const url = `/tools/${tool.slug}/${city.slug}`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url,
      type: "article",
    },
  };
}

export default async function CityServicePage({ params }: PageProps) {
  const { toolSlug, city: citySlug } = await params;
  const found = findAll(toolSlug, citySlug);
  if (!found) notFound();
  const { tool, city } = found;

  const cityIndex = cityLocations.findIndex((c) => c.slug === city.slug);
  const copy = buildCityServiceCopy(tool, city, cityIndex);
  const pageUrl = `${SITE_URL}/tools/${tool.slug}/${city.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${copy.h1} | NeuroIntegrative Care of Los Gatos`,
    description: copy.metaDescription,
    url: pageUrl,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "NeuroIntegrative Care of Los Gatos",
      url: `${SITE_URL}/`,
    },
    specialty: { "@type": "MedicalSpecialty", name: "Neurology" },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    areaServed: { "@type": "City", name: city.name },
    mainEntity: {
      "@type": "MedicalProcedure",
      name: tool.name,
      description: tool.description,
      procedureType: { "@type": "MedicalProcedureType", name: "TherapeuticProcedure" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
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
            <Link href={`/tools/${tool.slug}`} className="transition-colors hover:text-amber-b">
              {tool.name}
            </Link>
            <span aria-hidden="true" className="mx-3 text-paper/30">/</span>
            <span className="text-paper">{city.name}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            {tool.kicker} · {city.name}, CA
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {copy.h1}
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/80 lg:text-xl"
          >
            {copy.localIntro}
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Description */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal as="p" delay={100} offset={20} className="text-lg leading-relaxed text-ink">
            {tool.description}
          </Reveal>
        </div>
      </section>

      {/* Read the full tool page */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <Link
              href={`/tools/${tool.slug}`}
              className="font-mono font-semibold text-[13px] uppercase tracking-[0.18em] text-amber-b underline decoration-amber/40 underline-offset-4 transition-colors hover:text-amber"
            >
              Read the full {tool.name} guide →
            </Link>
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
              Start with the same investigation, wherever you&apos;re driving from.
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
