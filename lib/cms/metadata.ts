import type { Metadata } from "next";
import { queryRoutedContentByPath } from "@/lib/cms/query";
import { normalizePath } from "@/lib/cms/path";
import {
  chooseDescription,
  chooseTitle,
  DEFAULT_OG_IMAGE,
  ogImageFromMedia,
  titleFromMetadata,
  type OgImage,
} from "@/lib/seo";

function fallbackImages(openGraph: Metadata["openGraph"]): OgImage[] {
  const images = openGraph && "images" in openGraph ? openGraph.images : undefined;
  if (!images) return [];
  const list = Array.isArray(images) ? images : [images];
  return list.flatMap((image): OgImage[] => {
    if (typeof image === "string") {
      return [{ url: image, alt: DEFAULT_OG_IMAGE.alt }];
    }
    if (image instanceof URL) {
      return [{ url: image.toString(), alt: DEFAULT_OG_IMAGE.alt }];
    }
    if (image && typeof image === "object" && "url" in image && image.url) {
      const url = image.url instanceof URL ? image.url.toString() : image.url;
      return [
        {
          url,
          width: typeof image.width === "number" ? image.width : undefined,
          height: typeof image.height === "number" ? image.height : undefined,
          alt: typeof image.alt === "string" && image.alt ? image.alt : DEFAULT_OG_IMAGE.alt,
        },
      ];
    }
    return [];
  });
}

export async function withCMSMetadata(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  const routed = await queryRoutedContentByPath(path);
  const meta = routed?.doc.meta;
  const title = chooseTitle(
    meta?.title || routed?.doc.title,
    titleFromMetadata(fallback.title),
  );
  const description = chooseDescription(
    meta?.description,
    typeof fallback.description === "string" ? fallback.description : undefined,
  );
  const canonicalRaw = meta?.canonicalUrl;
  const canonical = canonicalRaw
    ? canonicalRaw.startsWith("http")
      ? canonicalRaw
      : normalizePath(canonicalRaw) ?? path
    : path;
  const noIndex = Boolean(meta?.noIndex);
  const noFollow = Boolean(meta?.noFollow);
  const cmsImage = ogImageFromMedia(meta?.image);
  const images = cmsImage
    ? [cmsImage]
    : fallbackImages(fallback.openGraph).length
      ? fallbackImages(fallback.openGraph)
      : [DEFAULT_OG_IMAGE];

  return {
    ...fallback,
    ...(title ? { title: { absolute: title } } : {}),
    ...(description ? { description } : {}),
    alternates: {
      ...fallback.alternates,
      canonical,
    },
    openGraph: {
      ...fallback.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url: typeof canonical === "string" ? canonical : path,
      images,
    },
    twitter: {
      ...fallback.twitter,
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: images.map((image) => image.url),
    },
    robots: routed
      ? {
          index: !noIndex,
          follow: !noFollow,
        }
      : fallback.robots,
  };
}
