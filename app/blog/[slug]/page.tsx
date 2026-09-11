import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, findBlogPost } from "@/content/blog";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      // No per-post `images` override: hero images aren't consistently
      // 1200x630, so posts fall back to the branded app/opengraph-image.tsx.
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    url: pageUrl,
    inLanguage: "en-US",
    image: `${SITE_URL}${post.heroImage}`,
    author: {
      "@type": "MedicalOrganization",
      name: "NeuroIntegrative Care of Los Gatos",
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "NeuroIntegrative Care of Los Gatos",
      url: `${SITE_URL}/`,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
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
            <Link href="/blog" className="transition-colors hover:text-amber-b">
              Blog
            </Link>
            <span aria-hidden="true" className="mx-3 text-paper/30">
              /
            </span>
            <span className="text-paper">{post.kicker}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            {post.kicker}
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-paper sm:text-5xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={340}
            offset={12}
            className="mt-6 font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-paper/60"
          >
            <time dateTime={post.date}>{post.displayDate}</time>
          </Reveal>
          <Reveal delay={450} offset={16} className="mt-8 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Hero image */}
      <section className="bg-paper">
        <div className="mx-auto -mt-14 max-w-4xl px-6 lg:-mt-20 lg:px-10">
          <Reveal delay={60} offset={20}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-rule/60 shadow-[0_30px_70px_-30px_rgba(11,18,32,0.45)]">
              <Image
                src={post.heroImage}
                alt={post.heroImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {post.intro && (
            <div className="space-y-6">
              {post.intro.map((paragraph, i) => (
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
          )}

          <div className={post.intro ? "mt-14 space-y-14" : "space-y-14"}>
            {post.sections.map((section, sIndex) => (
              <Reveal key={section.heading} delay={60} offset={20}>
                <h2 className="font-serif text-[1.75rem] leading-tight tracking-tight text-ink sm:text-[2rem]">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-6">
                  {section.blocks.map((block, bIndex) =>
                    block.type === "paragraph" ? (
                      <p
                        key={bIndex}
                        className="text-lg leading-relaxed text-ink"
                      >
                        {block.text}
                      </p>
                    ) : (
                      <ul key={bIndex} className="space-y-3">
                        {block.items?.map((item) => (
                          <li key={item} className="flex gap-3 text-lg leading-relaxed text-ink">
                            <span
                              aria-hidden="true"
                              className="mt-3 h-[3px] w-3 shrink-0 rounded-full bg-amber"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
                {sIndex < post.sections.length - 1 && (
                  <div className="mt-14 border-t border-rule/70" aria-hidden="true" />
                )}
              </Reveal>
            ))}
          </div>
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
              {post.ctaHeading}
            </h2>
          </Reveal>
          <Reveal delay={120} offset={16} className="mt-6">
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-paper/80">
              {post.ctaLead}
            </p>
          </Reveal>
          <Reveal
            delay={220}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <BrainAssessmentButton />
            <Link
              href={post.ctaLinkHref}
              className="group inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-sm text-paper/85 transition-colors hover:border-amber-b hover:text-amber-b"
            >
              {post.ctaLinkLabel}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* More articles */}
      {otherPosts.length > 0 && (
        <section className="bg-paper-2 py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal>
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                Keep Reading
              </p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                More from the blog.
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {otherPosts.map((other, i) => (
                <Reveal
                  key={other.slug}
                  as="li"
                  delay={120 + i * 100}
                  offset={20}
                >
                  <Link
                    href={`/blog/${other.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule/60 bg-paper shadow-[0_2px_18px_-14px_rgba(11,18,32,0.25)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber/50"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={other.heroImage}
                        alt={other.heroImageAlt}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-amber">
                        {other.kicker}
                      </p>
                      <h3 className="mt-3 font-serif text-[1.2rem] leading-tight text-ink">
                        {other.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
