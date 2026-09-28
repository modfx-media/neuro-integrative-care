// Generates locally-flavored copy for /conditions/[parentSlug]/[slug]/[city]
// pages. Reuses the vetted clinical paragraphs from conditionArticles.ts
// verbatim (accuracy/compliance already reviewed there) and adds a short,
// factually-varied local paragraph built from each city's real driveNote —
// never a pure "same sentence, city swapped" template. See
// content/locations.ts's own compliance note for the same rule.

import type { ConditionArticle } from "@/content/conditionArticles";
import type { CityLocation } from "@/content/locations";

const INTRO_TEMPLATES = [
  (cityName: string, driveNote: string, conditionLower: string) =>
    `${cityName} patients dealing with ${conditionLower} usually reach our Los Gatos clinic ${driveNote}. Rather than another round of the same symptom-management playbook, we start with an actual workup.`,
  (cityName: string, driveNote: string, conditionLower: string) =>
    `If you're in ${cityName} and ${conditionLower} hasn't improved with the usual approach, our clinic is ${driveNote} away. We start by investigating what's actually driving it.`,
  (cityName: string, driveNote: string, conditionLower: string) =>
    `Patients from ${cityName} make the trip ${driveNote} for one reason: a workup that investigates ${conditionLower} instead of just naming it.`,
];

export interface CityConditionCopy {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  localIntro: string;
}

export function buildCityConditionCopy(
  article: ConditionArticle,
  city: CityLocation,
  cityIndex: number,
): CityConditionCopy {
  const conditionLower = article.name.toLowerCase();
  const template = INTRO_TEMPLATES[cityIndex % INTRO_TEMPLATES.length];
  return {
    h1: `${article.name} Care for ${city.name} Patients`,
    metaTitle: `${article.name} Treatment Near ${city.name}, CA`,
    metaDescription: `${city.name} patients reach our Los Gatos clinic ${city.driveNote} for a root-cause workup on ${conditionLower}, not just symptom management.`,
    localIntro: template(city.name, city.driveNote, conditionLower),
  };
}
