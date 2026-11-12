import type { Metadata } from "next";

export const BRAND_NAME = "NeuroIntegrative Care";
export const BRAND_NAME_LONG = "NeuroIntegrative Care of Los Gatos";
const TITLE_SUFFIX = ` | ${BRAND_NAME}`;
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 158;
const MIN_DESCRIPTION = 150;

export const DEFAULT_OG_IMAGE = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Dr. Thomas Santucci of NeuroIntegrative Care of Los Gatos",
} as const;

export function contentImageAlt(
  ...candidates: Array<string | null | undefined>
): string {
  for (const candidate of candidates) {
    const text = candidate?.replace(/\s+/g, " ").trim();
    if (text) return text;
  }
  return BRAND_NAME_LONG;
}

export function humanizeFilename(filename?: string | null): string {
  if (!filename) return "";
  const base = filename.split("/").pop()?.replace(/\.[a-z0-9]+$/i, "") ?? "";
  return base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function stripBrand(input: string): string {
  let lead = input.replace(/\s+/g, " ").trim();
  const brand = `(?:${escapeRegExp(BRAND_NAME_LONG)}|${escapeRegExp(BRAND_NAME)})`;
  lead = lead.replace(new RegExp(`(?:\\s*\\|\\s*${brand})+$`, "i"), "").trim();
  lead = lead.replace(new RegExp(`^${brand}\\s*\\|\\s*`, "i"), "").trim();
  return lead;
}

function trimAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const space = slice.lastIndexOf(" ");
  const cut = (space >= 24 ? slice.slice(0, space) : slice).replace(
    /[\s|,:;–—-]+$/g,
    "",
  );
  return cut || slice.trim();
}

/** A document title of at most 60 characters. Adds the short brand when it fits. */
export function fitTitle(input: string): { text: string; trimmed: boolean } {
  const lead = stripBrand(input);
  if (!lead) return { text: BRAND_NAME, trimmed: false };
  const withBrand = `${lead}${TITLE_SUFFIX}`;
  if (withBrand.length <= MAX_TITLE) return { text: withBrand, trimmed: false };
  if (lead.length <= MAX_TITLE) return { text: lead, trimmed: false };
  return { text: trimAtWord(lead, MAX_TITLE), trimmed: true };
}

export function titleFromMetadata(title: Metadata["title"]): string | undefined {
  if (!title) return undefined;
  if (typeof title === "string") return title;
  if ("absolute" in title && title.absolute) return title.absolute;
  if ("default" in title && typeof title.default === "string") return title.default;
  return undefined;
}

/**
 * Prefer a title that already fits. A stored CMS title that has to be chopped
 * loses to a fallback that already fits, so old long CMS titles don't beat a
 * tuned page title.
 */
export function chooseTitle(
  cmsTitle?: string | null,
  fallbackTitle?: string | null,
): string | undefined {
  const cms = cmsTitle?.trim();
  const fallback = fallbackTitle?.trim();
  if (cms) {
    const lead = stripBrand(cms);
    const brandOnly = lead === BRAND_NAME || lead === BRAND_NAME_LONG;
    if (!brandOnly) {
      const fitted = fitTitle(cms);
      if (!fitted.trimmed) return fitted.text;
    }
  }
  if (fallback) return fitTitle(fallback).text;
  if (cms) return fitTitle(cms).text;
  return undefined;
}

export function fitDescription(input: string): string {
  const text = input.replace(/\s+/g, " ").trim();
  if (text.length <= 160) return text;
  const window = text.slice(0, MAX_DESCRIPTION);
  for (let i = window.length - 1; i >= MIN_DESCRIPTION - 1; i--) {
    const char = window[i];
    if (char === "." || char === "?" || char === "!") {
      return text.slice(0, i + 1).trim();
    }
  }
  const space = window.lastIndexOf(" ");
  const cut = (space >= MIN_DESCRIPTION ? text.slice(0, space) : window).replace(
    /[\s,;:–—-]+$/g,
    "",
  );
  return cut.trim();
}

export function chooseDescription(
  cmsDescription?: string | null,
  fallbackDescription?: string | null,
): string | undefined {
  const cms = cmsDescription?.replace(/\s+/g, " ").trim();
  const fallback = fallbackDescription?.replace(/\s+/g, " ").trim();
  if (cms && cms.length <= 160) return cms;
  if (fallback && fallback.length <= 160) return fallback;
  const raw = cms || fallback;
  return raw ? fitDescription(raw) : undefined;
}

const DESCRIPTION_CLOSERS = [
  " We investigate what a standard panel often misses.",
  " We look for the driver rather than only the symptom.",
  " The workup looks for the driver, not only the symptom.",
  " We investigate the driver, not only the symptom.",
  " Focused on the driver behind the symptom.",
  " Aimed at the driver, not symptom cover.",
  " Built to find the actual driver.",
  " We look for the actual driver.",
  " Not only the symptom.",
  " Not symptom care.",
];

function shortestDrive(driveNote: string): string {
  return driveNote.split(/,| — | - /)[0]?.trim() || driveNote;
}

function bestInRange(candidates: string[]): string | undefined {
  const inRange = candidates.filter(
    (item) => item.length >= MIN_DESCRIPTION && item.length <= MAX_DESCRIPTION,
  );
  if (!inRange.length) return undefined;
  return inRange.sort(
    (a, b) => Math.abs(a.length - 154) - Math.abs(b.length - 154),
  )[0];
}

/**
 * City × condition/tool meta descriptions. Specific to the city and topic,
 * and held to 150–158 characters so the meta tag stays inside the snippet.
 * JSON-LD keeps the longer source description.
 */
export function localMetaDescription(
  cityName: string,
  driveNote: string,
  topic: string,
): string {
  const subject = topic.trim();
  const drive = driveNote.trim();
  const shortDrive = shortestDrive(drive);
  const bases =
    cityName === "Los Gatos"
      ? [
          `Root-cause care for ${subject} at our downtown Los Gatos clinic.`,
          `Downtown Los Gatos clinic offering root-cause care for ${subject}.`,
        ]
      : [
          `Root-cause ${subject} for ${cityName} patients at our Los Gatos clinic.`,
          `${cityName} patients come to our Los Gatos clinic for root-cause ${subject}.`,
        ];
  const extras =
    cityName === "Los Gatos"
      ? [
          " Patients come from anywhere in town.",
          " The workup looks for the driver, not only the symptom.",
          " We investigate the driver behind the symptom.",
        ]
      : [
          ` Most arrive ${drive}.`,
          ` Most arrive ${shortDrive}.`,
          ` Arrive ${shortDrive}.`,
          " The workup looks for the driver, not only the symptom.",
          " We investigate the driver behind the symptom.",
        ];

  const pool: string[] = [];
  for (const base of bases) {
    pool.push(base);
    for (const extra of extras) {
      if ((base + extra).length <= MAX_DESCRIPTION) pool.push(base + extra);
    }
    for (const closer of DESCRIPTION_CLOSERS) {
      if ((base + closer).length <= MAX_DESCRIPTION) pool.push(base + closer);
      for (const extra of extras) {
        const combined = base + extra + closer;
        if (combined.length <= MAX_DESCRIPTION) pool.push(combined);
      }
    }
  }

  return (
    bestInRange(pool) ??
    fitDescription(
      pool.sort((a, b) => b.length - a.length)[0] ??
        `${cityName}: root-cause care for ${subject} at our Los Gatos clinic.`,
    )
  );
}

export type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt: string;
};

type MediaLike = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  filename?: string | null;
  sizes?: {
    og?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
    } | null;
  } | null;
};

export function ogImageFromMedia(image: unknown): OgImage | null {
  if (!image || typeof image !== "object") return null;
  const media = image as MediaLike;
  const sized = media.sizes?.og;
  const url = sized?.url || media.url;
  if (!url) return null;
  return {
    url,
    width: sized?.width ?? media.width ?? undefined,
    height: sized?.height ?? media.height ?? undefined,
    alt: contentImageAlt(media.alt, humanizeFilename(media.filename), DEFAULT_OG_IMAGE.alt),
  };
}
