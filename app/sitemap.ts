import type { MetadataRoute } from "next";
import { conditions } from "@/content/conditions";
import { tools } from "@/content/tools";
import { conditionArticles } from "@/content/conditionArticles";
import { cityLocations } from "@/content/locations";
import { blogPosts } from "@/content/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about/dr-thomas-santucci`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/conditions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/programs`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/programs/virtual`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/out-of-town`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/results`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/start`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/sitemap`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  cityLocations.forEach((city) => {
    entries.push({
      url: `${SITE_URL}/locations/${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  tools.forEach((tool) => {
    entries.push({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  });

  conditions.forEach((parent) => {
    entries.push({
      url: `${SITE_URL}/conditions/${parent.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    parent.subConditions?.forEach((sub) => {
      // Skip legacy sub-condition pages superseded by a fuller condition
      // article — they carry a canonical tag elsewhere and shouldn't be
      // listed as a separate indexable URL.
      const superseded = conditionArticles.some(
        (article) =>
          article.supersedes?.parentSlug === parent.slug &&
          article.supersedes?.subSlug === sub.slug,
      );
      if (superseded) return;
      entries.push({
        url: `${SITE_URL}/conditions/${parent.slug}/${sub.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  conditionArticles.forEach((article) => {
    entries.push({
      url: `${SITE_URL}/conditions/${article.parentSlug}/${article.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  });

  blogPosts.forEach((post) => {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  });

  return entries;
}
