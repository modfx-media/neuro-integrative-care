import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import Link from "next/link";
import { conditions } from "@/content/conditions";
import { conditionArticles } from "@/content/conditionArticles";
import { cityLocations, findCityLocation } from "@/content/locations";
import { buildCityConditionCopy } from "@/content/pseo/cityConditionCopy";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";
import CMSRoute from "@/components/cms/CMSRoute";
import { withCMSMetadata } from "@/lib/cms/metadata";


interface CityConditionParams {
  parentSlug: string;
  subSlug: string;
  city: string;
}

export function generateStaticParams(): CityConditionParams[] {
  return conditionArticles.flatMap((article) =>
    cityLocations.map((city) => ({
      parentSlug: article.parentSlug,
      subSlug: article.slug,
      city: city.slug,
    })),
  );
}

interface PageProps {
  params: Promise<CityConditionParams>;
}

function findAll(parentSlug: string, subSlug: string, citySlug: string) {
  const article = conditionArticles.find(
    (a) => a.parentSlug === parentSlug && a.slug === subSlug,
  );
  const parent = conditions.find((c) => c.slug === parentSlug);
  const city = findCityLocation(citySlug);
  if (!article || !parent || !city) return null;
  return { article, parent, city };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { parentSlug, subSlug, city: citySlug } = await params;
  const found = findAll(parentSlug, subSlug, citySlug);
  if (!found) return {};
  const { article, city } = found;
  const cityIndex = cityLocations.findIndex((c) => c.slug === city.slug);
  const copy = buildCityConditionCopy(article, city, cityIndex);
  const url = `/conditions/${article.parentSlug}/${article.slug}/${city.slug}`;
  return withCMSMetadata(url, {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${copy.metaTitle} | NeuroIntegrative Care of Los Gatos`,
      description: copy.metaDescription,
      url,
      type: "article",
    },
  });
}

export default async function CityConditionPage({ params }: PageProps) {
  const { parentSlug, subSlug, city: citySlug } = await params;
  const found = findAll(parentSlug, subSlug, citySlug);
  if (!found) notFound();
  const { article, parent, city } = found;

  const cityIndex = cityLocations.findIndex((c) => c.slug === city.slug);
  const copy = buildCityConditionCopy(article, city, cityIndex);
  const pageUrl = `${SITE_URL}/conditions/${article.parentSlug}/${article.slug}/${city.slug}`;

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
    about: { "@type": "MedicalCondition", name: article.name },
    specialty: { "@type": "MedicalSpecialty", name: "Neurology" },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    areaServed: { "@type": "City", name: city.name },
  };

  return (
    <CMSRoute path={`/conditions/${article.parentSlug}/${article.slug}/${city.slug}`}>
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
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
            delay={20}
            offset={8}
            className="mb-8 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-paper/70"
          >
            <Link href="/conditions" className="transition-colors hover:text-amber-b">
              Conditions
            </Link>
            <span aria-hidden="true" className="mx-3 text-paper/30">/</span>
            <Link
              href={`/conditions/${parent.slug}/${article.slug}`}
              className="transition-colors hover:text-amber-b"
            >
              {article.name}
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
            {article.heroKicker} · {city.name}, CA
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

      {/* What's going on */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                {article.whatsGoingOn.heading}
              </p>
            </Reveal>
            <div className="space-y-6 lg:col-span-8">
              {article.whatsGoingOn.paragraphs.slice(0, 1).map((paragraph, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={120 + i * 100}
                  offset={24}
                  className="text-lg leading-relaxed text-ink"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How we treat */}
      <section className="bg-ink py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
                {article.howWeTreat.heading}
              </p>
            </Reveal>
            <div className="space-y-6 lg:col-span-8">
              {article.howWeTreat.paragraphs.map((paragraph, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={120 + i * 100}
                  offset={24}
                  className="text-lg leading-relaxed text-paper/80"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Read the full clinical guide */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <Link
              href={`/conditions/${parent.slug}/${article.slug}`}
              className="font-mono font-semibold text-[13px] uppercase tracking-[0.18em] text-amber-b underline decoration-amber/40 underline-offset-4 transition-colors hover:text-amber"
            >
              Read the complete {article.name} guide →
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
              {article.ctaHeading}
            </h2>
          </Reveal>
          <Reveal delay={140} className="mt-10 flex justify-center">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>
    </>
  
    </CMSRoute>);
}
