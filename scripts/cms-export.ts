import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { blogPosts } from "../content/blog";
import { conditionArticles } from "../content/conditionArticles";
import { conditions } from "../content/conditions";
import { cityLocations } from "../content/locations";
import { resourceGuides } from "../content/resources";
import { tools } from "../content/tools";
import { sectorPageContent } from "../content/sectorPageContent";
import { programs } from "../content/programs";

type LayoutBlock =
  | { blockType: "heading"; tag: "h1" | "h2" | "h3"; text: string }
  | { blockType: "copy"; body: string }
  | {
      blockType: "cta";
      heading?: string;
      lead?: string;
      label?: string;
      href?: string;
    };

type RecordDoc = {
  collection: "pages" | "posts";
  legacyId: string;
  sourceUrl: string;
  data: {
    title: string;
    slug: string;
    path: string;
    legacyId: string;
    sourceUrl: string;
    excerpt?: string;
    publishedOn?: string;
    layout: LayoutBlock[];
    meta: {
      title?: string;
      description?: string;
      canonicalUrl?: string;
      noIndex?: boolean;
      noFollow?: boolean;
      excludeFromSitemap?: boolean;
    };
    _status: "draft";
  };
};

function blocks(title: string, copy: string[], extra: LayoutBlock[] = []): LayoutBlock[] {
  return [
    { blockType: "heading", tag: "h1", text: title },
    ...copy.filter(Boolean).map((body) => ({ blockType: "copy" as const, body })),
    ...extra,
  ];
}

function page(
  urlPath: string,
  title: string,
  copy: string[],
  meta: RecordDoc["data"]["meta"] = {},
  extra: LayoutBlock[] = [],
): RecordDoc {
  const slug =
    urlPath === "/"
      ? "home"
      : urlPath.replace(/^\//, "").replace(/\//g, "--");
  return {
    collection: "pages",
    legacyId: `page:${urlPath}`,
    sourceUrl: urlPath,
    data: {
      title,
      slug,
      path: urlPath,
      legacyId: `page:${urlPath}`,
      sourceUrl: urlPath,
      layout: blocks(title, copy, extra),
      meta: {
        title,
        canonicalUrl: urlPath,
        ...meta,
      },
      _status: "draft",
    },
  };
}

const STATIC: RecordDoc[] = [
  page("/", "NeuroIntegrative Care of Los Gatos", [
    "Functional medicine and root-cause investigation in Los Gatos, CA.",
  ]),
  page("/about/dr-thomas-santucci", "Dr. Thomas Santucci", [
    "Dr. Santucci's 30-year root-cause investigation of brain, metabolism, and nervous system.",
  ]),
  page("/conditions", "Conditions", [
    "Seven sectors of investigation, from autoimmune and brain brightening to concussion, toxins, longevity, idiopathic cases, and chronic pain.",
  ]),
  page("/how-it-works", "How It Works", [
    "A structured investigation, then a plan you can follow — not a stack of guesswork.",
  ]),
  page("/technology", "Technology", [
    "Tools used alongside the investigation, including violet laser, neurofeedback, and regenerative support.",
  ]),
  page("/programs", "Programs", [
    programs.entryPrograms.map((p) => p.name).join(", "),
  ]),
  page("/programs/virtual", "Virtual Program", [
    "A remote neurological support program led from the Los Gatos clinic.",
  ]),
  page("/out-of-town", "Regenerative Services", [
    "In-clinic regenerative care for patients who travel to Los Gatos.",
  ]),
  page("/locations", "Locations", [
    "NeuroIntegrative Care is based in downtown Los Gatos and serves nearby cities.",
  ]),
  page("/results", "Patient Stories", [
    "Individual patient experiences. Results vary and are not guaranteed.",
  ]),
  page("/start", "Start Here", [
    "Begin with a free discovery call. No obligation.",
  ]),
  page("/blog", "Blog", [
    "Articles on joint pain, nerve health, and drug-free regenerative care.",
  ]),
  page("/sitemap", "Sitemap", ["A full index of public pages on this site."], {
    excludeFromSitemap: false,
  }),
  page("/resources", "Resources", [
    "Short answers to common questions, written to support an evaluation rather than self-treatment.",
  ]),
  page("/brain-assessment", "Book a Free Discovery Call", [
    "Book a free discovery call with NeuroIntegrative Care of Los Gatos.",
  ]),
  page(
    "/brain-assessment/complete",
    "Assessment Complete",
    ["Your assessment is complete. Book a discovery call if you would like to walk through the results."],
    { noIndex: true, noFollow: true, excludeFromSitemap: true },
  ),
  page(
    "/brain-assessment/error",
    "Assessment Unavailable",
    ["The assessment could not be loaded. You can still book a discovery call."],
    { noIndex: true, noFollow: true, excludeFromSitemap: true },
  ),
  page(
    "/free-discovery-call",
    "Free Discovery Call",
    ["A campaign landing page for the free discovery call offer."],
    { noIndex: true, excludeFromSitemap: true },
  ),
  page(
    "/free-discovery-call/thank-you",
    "Thank You",
    ["Your free discovery call request has been received."],
    { noIndex: true, excludeFromSitemap: true },
  ),
];

const records: RecordDoc[] = [...STATIC];

for (const parent of conditions) {
  const content = sectorPageContent[parent.slug];
  records.push(
    page(
      `/conditions/${parent.slug}`,
      parent.name,
      [parent.heroLine, parent.whatWeInvestigate, content?.dismissals ?? ""].filter(Boolean),
      { description: parent.heroLine },
    ),
  );
  for (const sub of parent.subConditions ?? []) {
    const subContent = sectorPageContent[sub.slug];
    records.push(
      page(
        `/conditions/${parent.slug}/${sub.slug}`,
        sub.name,
        [sub.heroLine, sub.whatWeInvestigate, subContent?.dismissals ?? ""].filter(Boolean),
        { description: sub.heroLine },
      ),
    );
  }
}

for (const article of conditionArticles) {
  records.push(
    page(
      `/conditions/${article.parentSlug}/${article.slug}`,
      article.h1,
      [
        article.heroLead,
        ...article.whatsGoingOn.paragraphs,
        ...article.howWeInvestigate.paragraphs,
        ...article.howWeTreat.paragraphs,
        ...article.faqs.map((faq) => `${faq.question} ${faq.answer}`),
      ],
      { title: article.metaTitle, description: article.metaDescription },
      [
        {
          blockType: "cta",
          heading: article.ctaHeading,
          label: "Book a discovery call",
          href: "/brain-assessment",
        },
      ],
    ),
  );
  for (const city of cityLocations) {
    records.push(
      page(
        `/conditions/${article.parentSlug}/${article.slug}/${city.slug}`,
        `${article.name} in ${city.name}`,
        [article.heroLead, city.intro],
        {
          title: `${article.metaTitle} | ${city.name}`,
          description: article.metaDescription,
        },
      ),
    );
  }
}

for (const tool of tools) {
  records.push(
    page(`/tools/${tool.slug}`, tool.name, [tool.description], {
      description: tool.description,
    }),
  );
  for (const city of cityLocations) {
    records.push(
      page(
        `/tools/${tool.slug}/${city.slug}`,
        `${tool.name} in ${city.name}`,
        [tool.description, city.intro],
        { description: tool.description },
      ),
    );
  }
}

for (const city of cityLocations) {
  records.push(
    page(`/locations/${city.slug}`, city.h1, [city.intro, city.servingLine], {
      title: city.metaTitle,
      description: city.metaDescription,
    }),
  );
}

for (const guide of resourceGuides) {
  records.push(
    page(
      `/resources/${guide.slug}`,
      guide.question,
      [...guide.intro, ...guide.answerParagraphs],
      { title: guide.metaTitle, description: guide.metaDescription },
      [
        {
          blockType: "cta",
          heading: guide.ctaHeading,
          label: "Book a discovery call",
          href: "/brain-assessment",
        },
      ],
    ),
  );
}

for (const post of blogPosts) {
  const urlPath = `/blog/${post.slug}`;
  const copy: string[] = [
    ...(post.intro ?? []),
    ...post.sections.flatMap((section) =>
      section.blocks.flatMap((block) => {
        if (block.type === "paragraph" && block.text) return [block.text];
        if (block.type === "list" && block.items) return block.items;
        return [];
      }),
    ),
  ];
  records.push({
    collection: "posts",
    legacyId: `post:${post.slug}`,
    sourceUrl: urlPath,
    data: {
      title: post.title,
      slug: post.slug,
      path: urlPath,
      legacyId: `post:${post.slug}`,
      sourceUrl: urlPath,
      excerpt: post.excerpt,
      publishedOn: post.date,
      layout: blocks(post.title, copy, [
        {
          blockType: "cta",
          heading: post.ctaHeading,
          lead: post.ctaLead,
          label: post.ctaLinkLabel,
          href: post.ctaLinkHref,
        },
      ]),
      meta: {
        title: post.metaTitle,
        description: post.metaDescription,
        canonicalUrl: urlPath,
      },
      _status: "draft",
    },
  });
}

const payload = {
  version: 1,
  records,
  globals: {
    header: {
      navItems: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about/dr-thomas-santucci" },
        { label: "Conditions", href: "/conditions" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Technology", href: "/technology" },
        { label: "Programs", href: "/programs" },
        { label: "Virtual Program", href: "/programs/virtual" },
      ],
    },
    footer: {
      quickLinks: [
        { label: "Conditions", href: "/conditions" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Programs", href: "/programs" },
        { label: "Virtual Program", href: "/programs/virtual" },
        { label: "Patient Stories", href: "/results" },
        { label: "Resources", href: "/resources" },
        { label: "Blog", href: "/blog" },
        { label: "About Dr. Thomas Santucci", href: "/about/dr-thomas-santucci" },
        { label: "Start Here", href: "/start" },
        { label: "Regenerative Services", href: "/out-of-town" },
        { label: "Sitemap", href: "/sitemap" },
      ],
      phoneDisplay: "(408) 871-8222",
      phoneHref: "tel:+14088718222",
    },
    "site-settings": {
      siteTitle: "NeuroIntegrative Care of Los Gatos",
      tagline: "Functional Medicine & Root-Cause Investigation in Los Gatos, CA",
      description:
        "Dr. Santucci's 30-year root-cause investigation of brain, metabolism, and nervous system.",
    },
  },
};

const outDir = path.resolve("data");
mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "content-export.json");
writeFileSync(outFile, JSON.stringify(payload, null, 2));
console.log(`Wrote ${records.length} records to ${outFile}`);
