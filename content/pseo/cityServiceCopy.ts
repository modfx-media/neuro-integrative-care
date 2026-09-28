// Generates locally-flavored copy for /tools/[slug]/[city] pages. Reuses the
// vetted tool description verbatim and adds a short, factually-varied local
// paragraph built from each city's real driveNote — see
// content/pseo/cityConditionCopy.ts for the same pattern/rationale.

import type { Tool } from "@/content/tools";
import type { CityLocation } from "@/content/locations";

const INTRO_TEMPLATES = [
  (cityName: string, driveNote: string, toolLower: string) =>
    `${cityName} patients reach our Los Gatos clinic ${driveNote} for ${toolLower}, alongside the rest of a full root-cause workup.`,
  (cityName: string, driveNote: string, toolLower: string) =>
    `If you're in ${cityName}, our clinic is ${driveNote} away — close enough to make ${toolLower} a routine part of care, not a special trip.`,
  (cityName: string, driveNote: string, toolLower: string) =>
    `Patients from ${cityName} typically add ${toolLower} to their treatment plan after the initial workup, a trip of ${driveNote} to our Los Gatos clinic.`,
];

export interface CityServiceCopy {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  localIntro: string;
}

export function buildCityServiceCopy(
  tool: Tool,
  city: CityLocation,
  cityIndex: number,
): CityServiceCopy {
  const toolLower = tool.name.toLowerCase();
  const template = INTRO_TEMPLATES[cityIndex % INTRO_TEMPLATES.length];
  return {
    h1: `${tool.name} for ${city.name} Patients`,
    metaTitle: `${tool.name} Near ${city.name}, CA | NeuroIntegrative Care`,
    metaDescription: `${city.name} patients reach our Los Gatos clinic ${city.driveNote} for ${toolLower} as part of a full root-cause workup.`,
    localIntro: template(city.name, city.driveNote, toolLower),
  };
}
