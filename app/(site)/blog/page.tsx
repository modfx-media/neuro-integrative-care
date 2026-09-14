import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/content/blog";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on joint pain, nerve health, and drug-free regenerative care from NeuroIntegrative Care of Los Gatos — practical, root-cause insights.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | NeuroIntegrative Care of Los Gatos",
    description:
      "Articles on joint pain, nerve health, and drug-free regenerative care from NeuroIntegrative Care of Los Gatos.",
    url: "/blog",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "NeuroIntegrative Care of Los Gatos Blog",
  url: PAGE_URL,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "NeuroIntegrative Care of Los Gatos",
    url: `${SITE_URL}/`,
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    url: `${PAGE_URL}/${post.slug}`,
    image: `${SITE_URL}${post.heroImage}`,
  })),
};

export default function BlogPage() {
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
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            Blog
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Insights on joint pain,{" "}
              <span className="italic text-amber-b">
                nerve health, and drug-free recovery.
              </span>
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 mx-auto max-w-2xl text-lg leading-relaxed text-paper/80"
          >
            Articles from our team on what may be driving your symptoms, and
            the nonsurgical options worth understanding first.
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex justify-center">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Post grid */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Reveal
                key={post.slug}
                as="li"
                delay={140 + i * 90}
                offset={24}
                className="h-full"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule/60 bg-paper shadow-[0_2px_18px_-14px_rgba(11,18,32,0.25)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber/50 hover:shadow-[0_40px_80px_-32px_rgba(232,160,32,0.35)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.heroImageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <p className="font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-amber">
                      {post.kicker}
                    </p>
                    <h2 className="mt-4 font-serif text-[1.35rem] leading-tight text-ink">
                      {post.title}
                    </h2>
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-rule pt-5">
                      <time
                        dateTime={post.date}
                        className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted"
                      >
                        {post.displayDate}
                      </time>
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-amber/40 bg-amber-soft text-amber-b transition-all duration-500 group-hover:-rotate-45 group-hover:border-amber group-hover:bg-amber group-hover:text-ink"
                      >
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
