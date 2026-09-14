import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import Link from "next/link";
import { conditions } from "@/content/conditions";
import { conditionArticles } from "@/content/conditionArticles";
import { tools } from "@/content/tools";
import { cityLocations } from "@/content/locations";
import { blogPosts } from "@/content/blog";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/sitemap`;

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Every page on the NeuroIntegrative Care of Los Gatos site: conditions, tools, programs, locations, and patient resources.",
  alternates: { canonical: "/sitemap" },
  openGraph: {
    title: "Sitemap | NeuroIntegrative Care of Los Gatos",
    description:
      "Every page on the NeuroIntegrative Care of Los Gatos site: conditions, tools, programs, locations, and patient resources.",
    url: "/sitemap",
    type: "website",
  },
};

interface LinkItem {
  label: string;
  href: string;
}

interface LinkGroup {
  heading: string;
  items: LinkItem[];
}

const MAIN_PAGES: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About Dr. Thomas Santucci", href: "/about/dr-thomas-santucci" },
  { label: "Blog", href: "/blog" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Conditions", href: "/conditions" },
  { label: "Programs", href: "/programs" },
  { label: "The Virtual Program", href: "/programs/virtual" },
  { label: "Out-of-Town Services", href: "/out-of-town" },
  { label: "Patient Stories", href: "/results" },
  { label: "Locations We Serve", href: "/locations" },
  { label: "Start Here", href: "/start" },
];

const CONDITION_GROUPS: LinkGroup[] = conditions.map((sector) => {
  const subItems: LinkItem[] = (sector.subConditions ?? []).map((sub) => ({
    label: sub.name,
    href: `/conditions/${sector.slug}/${sub.slug}`,
  }));
  const articleItems: LinkItem[] = conditionArticles
    .filter((article) => article.parentSlug === sector.slug)
    .map((article) => ({
      label: article.name,
      href: `/conditions/${article.parentSlug}/${article.slug}`,
    }));
  return {
    heading: sector.name,
    items: [
      { label: `${sector.name} (overview)`, href: `/conditions/${sector.slug}` },
      ...articleItems,
      ...subItems,
    ],
  };
});

const TOOL_ITEMS: LinkItem[] = tools.map((tool) => ({
  label: tool.name,
  href: `/tools/${tool.slug}`,
}));

const LOCATION_ITEMS: LinkItem[] = cityLocations.map((city) => ({
  label: city.name,
  href: `/locations/${city.slug}`,
}));

const BLOG_ITEMS: LinkItem[] = blogPosts.map((post) => ({
  label: post.title,
  href: `/blog/${post.slug}`,
}));

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sitemap | NeuroIntegrative Care of Los Gatos",
  url: PAGE_URL,
  itemListElement: [
    ...MAIN_PAGES,
    ...CONDITION_GROUPS.flatMap((group) => group.items),
    ...TOOL_ITEMS,
    ...LOCATION_ITEMS,
    ...BLOG_ITEMS,
  ].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}${item.href}`,
    name: item.label,
  })),
};

function LinkList({ items }: { items: LinkItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group inline-flex items-center gap-2 text-[15px] leading-relaxed text-ink transition-colors hover:text-amber-b"
          >
            <span
              aria-hidden="true"
              className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-amber"
            >
              →
            </span>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SitemapPage() {
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
            Sitemap
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Every page, in one place.
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/80 lg:text-xl"
          >
            A full index of the site: conditions we investigate, the tools we
            use, our programs, and every location we serve.
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Main pages */}
      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                Main Pages
              </p>
            </Reveal>
            <Reveal delay={100} offset={20} className="lg:col-span-8">
              <LinkList items={MAIN_PAGES} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Conditions, grouped by sector */}
      <section className="bg-paper-2 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Conditions
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
              By sector.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {CONDITION_GROUPS.map((group, i) => (
              <Reveal
                key={group.heading}
                delay={100 + i * 80}
                offset={24}
                className="rounded-2xl border border-rule/60 bg-white p-7 lg:p-8"
              >
                <h3 className="font-serif text-xl leading-tight text-ink">
                  {group.heading}
                </h3>
                <div className="mt-5">
                  <LinkList items={group.items} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools + Locations */}
      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                  Tools
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                  The investigation toolkit.
                </h2>
              </Reveal>
              <Reveal delay={100} offset={20} className="mt-8">
                <LinkList items={TOOL_ITEMS} />
              </Reveal>
            </div>

            <div>
              <Reveal delay={80}>
                <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                  Locations
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                  Areas we serve.
                </h2>
              </Reveal>
              <Reveal delay={160} offset={20} className="mt-8">
                <LinkList items={LOCATION_ITEMS} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Blog posts */}
      <section className="bg-paper-2 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                Blog Posts
              </p>
            </Reveal>
            <Reveal delay={100} offset={20} className="lg:col-span-8">
              <LinkList items={BLOG_ITEMS} />
            </Reveal>
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
              Can&apos;t find what you&apos;re looking for?
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
