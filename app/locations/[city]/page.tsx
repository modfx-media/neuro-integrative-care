import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { cityLocations, findCityLocation } from "@/content/locations";
import Reveal from "@/components/Reveal";
import CityConditionsGrid from "@/components/locations/CityConditionsGrid";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";

const PHONE_DISPLAY = "(408) 871-8222";
const PHONE_HREF = "tel:+14088718222";

export function generateStaticParams() {
  return cityLocations.map((city) => ({ city: city.slug }));
}

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = findCityLocation(citySlug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `/locations/${city.slug}` },
    openGraph: {
      title: `${city.metaTitle} | NeuroIntegrative Care of Los Gatos`,
      description: city.metaDescription,
      url: `/locations/${city.slug}`,
      type: "article",
    },
  };
}

export default async function CityLocationPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = findCityLocation(citySlug);
  if (!city) notFound();

  const pageUrl = `${SITE_URL}/locations/${city.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "NeuroIntegrative Care of Los Gatos",
    url: pageUrl,
    telephone: "+1-408-871-8222",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "20 S Santa Cruz Ave, Suite 101",
      addressLocality: "Los Gatos",
      addressRegion: "CA",
      postalCode: "95030",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:30", closes: "15:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:30", closes: "15:00" },
    ],
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=20+S+Santa+Cruz+Ave,+Suite+101,+Los+Gatos,+CA+95030",
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
            <Link href="/locations" className="transition-colors hover:text-amber-b">
              Locations
            </Link>
            <span aria-hidden="true" className="mx-3 text-paper/30">
              /
            </span>
            <span className="text-paper">{city.name}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            {city.name}, CA
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {city.h1}
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/80 lg:text-xl"
          >
            {city.intro}
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* How we help [City] patients */}
      <CityConditionsGrid cityName={city.name} />

      {/* Trust signals — NAP, hours, service area */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Visit Us
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              {city.servingLine}
            </h2>
          </Reveal>

          <Reveal delay={100} offset={20} className="mt-10">
            <address className="grid gap-8 not-italic sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
                <div className="text-ink">
                  <p>20 S Santa Cruz Ave, Suite 101</p>
                  <p className="text-muted">Los Gatos, CA 95030</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
                <a href={PHONE_HREF} className="text-ink transition-colors hover:text-amber-b">
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
                <div className="text-ink">
                  <p>Tue &amp; Thu</p>
                  <p className="text-muted">9:30–3:00</p>
                </div>
              </div>
            </address>
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
              Start with the same investigation, every patient, every city.
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
