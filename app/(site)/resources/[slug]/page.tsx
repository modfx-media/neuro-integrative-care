import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import Link from "next/link";
import { resourceGuides, findResourceGuide } from "@/content/resources";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";
import CMSRoute from "@/components/cms/CMSRoute";
import { withCMSMetadata } from "@/lib/cms/metadata";


export function generateStaticParams() {
  return resourceGuides.map((guide) => ({ slug: guide.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = findResourceGuide(slug);
  if (!guide) return {};
  return withCMSMetadata(`/resources/${slug}`, {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `/resources/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `/resources/${guide.slug}`,
      type: "article",
    },
  });
}

export default async function ResourceGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = findResourceGuide(slug);
  if (!guide) notFound();

  const pageUrl = `${SITE_URL}/resources/${guide.slug}`;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: guide.metaTitle,
    description: guide.metaDescription,
    url: pageUrl,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "NeuroIntegrative Care of Los Gatos",
      url: `${SITE_URL}/`,
    },
    specialty: { "@type": "MedicalSpecialty", name: "Neurology" },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: guide.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: guide.answerParagraphs.join(" "),
        },
      },
    ],
  };

  return (
    <CMSRoute path={`/resources/${slug}`}>
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal
            as="p"
            delay={20}
            offset={8}
            className="mb-8 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-paper/70"
          >
            <Link href="/resources" className="transition-colors hover:text-amber-b">
              Resources
            </Link>
            <span aria-hidden="true" className="mx-3 text-paper/30">
              /
            </span>
            <span className="text-paper">{guide.kicker}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            {guide.kicker}
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-paper sm:text-5xl">
              {guide.question}
            </h1>
          </Reveal>
          <Reveal delay={450} offset={16} className="mt-8 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-6">
            {guide.intro.map((paragraph, i) => (
              <Reveal
                key={i}
                as="p"
                delay={80 + i * 80}
                offset={16}
                className="text-lg leading-relaxed text-ink"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} offset={16} className="mt-12">
            <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
              {guide.answerHeading}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-6">
            {guide.answerParagraphs.map((paragraph, i) => (
              <Reveal
                key={i}
                as="p"
                delay={260 + i * 80}
                offset={16}
                className="text-lg leading-relaxed text-ink"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          {guide.relatedLinks.length > 0 && (
            <Reveal delay={420} offset={16} className="mt-12 border-t border-rule/60 pt-8">
              <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted">
                Related Reading
              </p>
              <ul className="mt-4 space-y-3">
                {guide.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg text-amber-b underline decoration-amber/40 underline-offset-4 transition-colors hover:text-amber"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
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
              {guide.ctaHeading}
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
