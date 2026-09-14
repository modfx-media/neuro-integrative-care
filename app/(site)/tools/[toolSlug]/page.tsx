import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { conditions } from "@/content/conditions";
import { tools } from "@/content/tools";
import { articlesForTool } from "@/content/conditionArticles";
import Reveal from "@/components/Reveal";
import ToolMediaEmbed from "@/components/tools/ToolMediaEmbed";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";

const conditionsBySlug = new Map(conditions.map((c) => [c.slug, c]));

export function generateStaticParams() {
  return tools.map((tool) => ({ toolSlug: tool.slug }));
}

interface PageProps {
  params: Promise<{ toolSlug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { toolSlug } = await params;
  const tool = tools.find((t) => t.slug === toolSlug);
  if (!tool) return {};
  return {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.name} | NeuroIntegrative Care of Los Gatos`,
      description: tool.description,
      url: `/tools/${tool.slug}`,
      type: "article",
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { toolSlug } = await params;
  const tool = tools.find((t) => t.slug === toolSlug);
  if (!tool) notFound();

  const index = tools.findIndex((t) => t.slug === tool.slug);
  const otherTools = tools.filter((t) => t.slug !== tool.slug);
  const sectors = tool.sectorSlugs
    .map((slug) => conditionsBySlug.get(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const relatedArticles = articlesForTool(tool.slug);

  const pageUrl = `${SITE_URL}/tools/${tool.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${tool.name} | NeuroIntegrative Care of Los Gatos`,
    description: tool.description,
    url: pageUrl,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "NeuroIntegrative Care of Los Gatos",
      url: `${SITE_URL}/`,
    },
    specialty: { "@type": "MedicalSpecialty", name: "Neurology" },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    mainEntity: {
      "@type": "MedicalProcedure",
      name: tool.name,
      description: tool.description,
      procedureType: {
        "@type": "MedicalProcedureType",
        name: "TherapeuticProcedure",
      },
    },
    ...(tool.media.kind !== "placeholder" && {
      video: {
        "@type": "VideoObject",
        name: tool.media.title,
        description: tool.description,
        thumbnailUrl:
          tool.media.kind === "vimeo"
            ? `https://vumbnail.com/${tool.media.vimeoId}.jpg`
            : `https://i.ytimg.com/vi/${tool.media.youtubeId}/hqdefault.jpg`,
        embedUrl:
          tool.media.kind === "vimeo"
            ? `https://player.vimeo.com/video/${tool.media.vimeoId}`
            : `https://www.youtube.com/embed/${tool.media.youtubeId}`,
      },
    }),
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
            <Link href="/how-it-works" className="transition-colors hover:text-amber-b">
              How It Works
            </Link>
            <span aria-hidden="true" className="mx-3 text-paper/30">
              /
            </span>
            <span className="text-paper">{tool.name}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            {String(index + 1).padStart(2, "0")} · {tool.kicker}
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {tool.name}
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-[1.4] text-paper/80 sm:text-[1.55rem] lg:text-[1.75rem]"
          >
            {tool.description}
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* See It In Action — lead media asset */}
      <section className="bg-paper-2 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              See It In Action
            </p>
          </Reveal>
          <Reveal delay={100} offset={24} className="mt-8">
            <ToolMediaEmbed media={tool.media} toolName={tool.name} />
          </Reveal>
        </div>
      </section>

      {/* Explainer graphics */}
      {tool.gallery && tool.gallery.length > 0 && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal className="max-w-2xl">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                How It Works
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                {tool.name}, illustrated.
              </h2>
            </Reveal>
            <ul className="mt-14 grid gap-8 sm:grid-cols-2">
              {tool.gallery.map((item, i) => (
                <Reveal key={item.src} as="li" delay={100 + i * 80} offset={20}>
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-rule/60 bg-paper-2 p-4">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {item.caption}
                  </p>
                </Reveal>
              ))}
            </ul>

            {tool.resource && (
              <Reveal delay={100} offset={20} className="mt-14">
                <a
                  href={tool.resource.href}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.85)]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
                  </svg>
                  {tool.resource.label}
                </a>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Explainer facts, drawn from the client's "What is Neurofeedback" guide */}
      {tool.explainer && tool.explainer.length > 0 && (
        <section className="bg-paper-2 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal className="max-w-2xl">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                The Science, Explained
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                What is {tool.name.toLowerCase()}, exactly?
              </h2>
            </Reveal>
            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tool.explainer.map((item, i) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={100 + i * 60}
                  offset={20}
                  className="rounded-2xl border border-rule/60 bg-white p-6 lg:p-7"
                >
                  <h3 className="font-serif text-xl leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Conditions we treat with this tool */}
      {relatedArticles.length > 0 && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-4">
                <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                  Conditions We Treat With This
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                  Where {tool.name.toLowerCase()} makes the difference.
                </h2>
                <p className="mt-6 text-[15px] leading-relaxed text-muted">
                  Every protocol starts with your qEEG brain map, so the
                  specific conditions below are where this tool most often
                  shows up in a patient&apos;s plan — not a one-size-fits-all
                  prescription.
                </p>
              </Reveal>
              <Reveal delay={120} offset={24} className="lg:col-span-8">
                <ul className="flex flex-wrap gap-3">
                  {relatedArticles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/conditions/${article.parentSlug}/${article.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-rule/70 bg-white px-5 py-3 text-[14px] text-ink transition-all hover:border-ink/30 hover:shadow-[0_10px_30px_-20px_rgba(11,18,32,0.4)]"
                      >
                        <span>{article.name}</span>
                        <span
                          aria-hidden="true"
                          className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-amber"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Applied In */}
      {sectors.length > 0 && (
        <section className="bg-paper-2 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-4">
                <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                  Applied In
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                  Where this tool is used.
                </h2>
                <p className="mt-6 text-[15px] leading-relaxed text-muted">
                  These are the broader investigation tracks {tool.name.toLowerCase()} gets folded into once a pattern shows up in your brain map.
                </p>
              </Reveal>
              <Reveal delay={120} offset={24} className="lg:col-span-8">
                <ul className="flex flex-wrap gap-3">
                  {sectors.map((sector) => (
                    <li key={sector.slug}>
                      <Link
                        href={`/conditions/${sector.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-rule/70 bg-paper px-5 py-3 text-[14px] text-ink transition-all hover:border-ink/30 hover:bg-white hover:shadow-[0_10px_30px_-20px_rgba(11,18,32,0.4)]"
                      >
                        <span>{sector.name}</span>
                        <span
                          aria-hidden="true"
                          className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-amber"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Other tools */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              The Investigation Toolkit
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              The other tools we bring together.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {otherTools.map((other, i) => (
              <Reveal
                key={other.slug}
                as="li"
                delay={140 + i * 70}
                offset={20}
                className="h-full"
              >
                <Link
                  href={`/tools/${other.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-rule/60 bg-paper-2 p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[0_30px_60px_-40px_rgba(11,18,32,0.4)]"
                >
                  <div>
                    <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                      {String(tools.findIndex((t) => t.slug === other.slug) + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-serif text-xl leading-tight text-ink">
                      {other.name}
                    </h3>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink">
                    Explore
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
              Every workup starts the same way.
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
