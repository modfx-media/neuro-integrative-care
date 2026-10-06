import { readFileSync } from "fs";
import { conditions } from "../content/conditions";
import { tools } from "../content/tools";
import { conditionArticles } from "../content/conditionArticles";
import { cityLocations } from "../content/locations";
import { blogPosts } from "../content/blog";
import { resourceGuides } from "../content/resources";

type ExportFile = {
  records: Array<{ sourceUrl: string }>;
};

function collectSitemapPaths(): string[] {
  const paths = new Set<string>([
    "/",
    "/about/dr-thomas-santucci",
    "/conditions",
    "/how-it-works",
    "/technology",
    "/programs",
    "/programs/virtual",
    "/out-of-town",
    "/locations",
    "/results",
    "/start",
    "/blog",
    "/sitemap",
    "/resources",
    "/brain-assessment",
    "/free-discovery-call",
    "/free-discovery-call/thank-you",
  ]);

  cityLocations.forEach((city) => paths.add(`/locations/${city.slug}`));
  tools.forEach((tool) => {
    paths.add(`/tools/${tool.slug}`);
    cityLocations.forEach((city) => paths.add(`/tools/${tool.slug}/${city.slug}`));
  });
  conditions.forEach((parent) => {
    paths.add(`/conditions/${parent.slug}`);
    parent.subConditions?.forEach((sub) => {
      paths.add(`/conditions/${parent.slug}/${sub.slug}`);
    });
  });
  conditionArticles.forEach((article) => {
    paths.add(`/conditions/${article.parentSlug}/${article.slug}`);
    cityLocations.forEach((city) =>
      paths.add(`/conditions/${article.parentSlug}/${article.slug}/${city.slug}`),
    );
  });
  resourceGuides.forEach((guide) => paths.add(`/resources/${guide.slug}`));
  blogPosts.forEach((post) => paths.add(`/blog/${post.slug}`));
  return [...paths];
}

const exported = JSON.parse(
  readFileSync("data/content-export.json", "utf8"),
) as ExportFile;
const exportedPaths = new Set(exported.records.map((record) => record.sourceUrl));
const required = collectSitemapPaths();
const missing = required.filter((path) => !exportedPaths.has(path));

if (missing.length) {
  console.error(`Missing ${missing.length} paths:`);
  missing.slice(0, 50).forEach((path) => console.error(`  ${path}`));
  process.exit(1);
}

console.log(`Export covers ${required.length} required public/LP paths (${exported.records.length} records).`);
