import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  chooseDescription,
  chooseTitle,
  localMetaDescription,
  resolvePublishedDescription,
  resolvePublishedTitle,
} from "./seo";

const HOME_TITLE = "Functional Medicine in Los Gatos | NeuroIntegrative Care";
const HOME_DESCRIPTION =
  "Dr. Santucci's 30-year root-cause investigation of brain, metabolism, and nervous system, for people whose labs read \u201Cnormal\u201D but who don't feel right.";

const ABOUT_TITLE = "About Dr. Thomas Santucci";
const ABOUT_DESCRIPTION =
  "Thomas A. Santucci, DC, AFNI — Founder & Clinical Director, NeuroIntegrative Care of Los Gatos. 30+ years in neurometabolic, functional medicine.";

const LOCATION_TITLE = "Functional Medicine in Los Gatos | NeuroIntegrative Care";
const LOCATION_DESCRIPTION =
  "Functional medicine, functional neurology, and regenerative care in downtown Los Gatos for people whose labs look normal but who still don't feel right.";

const GENERATED_TITLE = "Neuropathy & Nerve Pain Treatment Near Los Gatos, CA";
const GENERATED_DESCRIPTION = localMetaDescription(
  "Los Gatos",
  "with a short walk or drive from anywhere in downtown Los Gatos",
  "neuropathy & nerve pain",
);

const BLOG_TITLE = "Understanding DNA Testing for Personalized Wellness";
const BLOG_DESCRIPTION =
  "Learn how DNA testing in Los Gatos may inform wellness planning while understanding its limits for diagnosing health conditions and guiding care";

const LONG_CMS_TITLE =
  "Neuropathy & Nerve Pain | Non-Diabetic Nerve Workup | Los Gatos";
const BRANDED_CMS_TITLE = "How It Works | NeuroIntegrative Care of Los Gatos";
const LONG_CMS_DESCRIPTION =
  "Root-cause investigation of neuropathy and non-diabetic nerve pain for Los Gatos patients, covering metabolic, toxic, and inflammatory drivers that a standard panel often misses entirely.";

describe("published CMS meta title", () => {
  it("renders a set meta.title verbatim, including titles chooseTitle would rewrite", () => {
    assert.equal(
      resolvePublishedTitle(LONG_CMS_TITLE, "Neuropathy", GENERATED_TITLE),
      LONG_CMS_TITLE,
    );
    assert.notEqual(chooseTitle(LONG_CMS_TITLE, GENERATED_TITLE), LONG_CMS_TITLE);

    assert.equal(
      resolvePublishedTitle(BRANDED_CMS_TITLE, "How It Works", "How It Works"),
      BRANDED_CMS_TITLE,
    );
    assert.equal(
      chooseTitle(BRANDED_CMS_TITLE, "How It Works"),
      "How It Works | NeuroIntegrative Care",
    );

    assert.equal(
      resolvePublishedTitle("Conditions", "Conditions", "Conditions"),
      "Conditions",
    );
    assert.equal(
      chooseTitle("Conditions", "Conditions"),
      "Conditions | NeuroIntegrative Care",
    );

    assert.equal(
      resolvePublishedTitle("Conditions ", "Conditions", "Conditions"),
      "Conditions ",
    );
    assert.equal(
      resolvePublishedTitle("NeuroIntegrative Care", "Home", HOME_TITLE),
      "NeuroIntegrative Care",
    );
  });

  it("keeps today's title when meta.title is empty", () => {
    const cases: Array<{
      name: string;
      docTitle?: string;
      fallback: string;
      expected: string;
    }> = [
      {
        name: "home, no doc",
        fallback: HOME_TITLE,
        expected: "Functional Medicine in Los Gatos | NeuroIntegrative Care",
      },
      {
        name: "home, brand-only doc title",
        docTitle: "NeuroIntegrative Care of Los Gatos",
        fallback: HOME_TITLE,
        expected: "Functional Medicine in Los Gatos | NeuroIntegrative Care",
      },
      {
        name: "about page, no doc",
        fallback: ABOUT_TITLE,
        expected: "About Dr. Thomas Santucci | NeuroIntegrative Care",
      },
      {
        name: "about page, doc title",
        docTitle: "Dr. Thomas Santucci",
        fallback: ABOUT_TITLE,
        expected: "Dr. Thomas Santucci | NeuroIntegrative Care",
      },
      {
        name: "location page, no doc",
        fallback: LOCATION_TITLE,
        expected: "Functional Medicine in Los Gatos | NeuroIntegrative Care",
      },
      {
        name: "location page, doc title",
        docTitle: "Los Gatos",
        fallback: LOCATION_TITLE,
        expected: "Los Gatos | NeuroIntegrative Care",
      },
      {
        name: "generated city condition, no doc",
        fallback: GENERATED_TITLE,
        expected: "Neuropathy & Nerve Pain Treatment Near Los Gatos, CA",
      },
      {
        name: "generated city condition, long doc title loses to the designed title",
        docTitle: LONG_CMS_TITLE,
        fallback: GENERATED_TITLE,
        expected: "Neuropathy & Nerve Pain Treatment Near Los Gatos, CA",
      },
      {
        name: "blog post, no doc",
        fallback: BLOG_TITLE,
        expected: "Understanding DNA Testing for Personalized Wellness",
      },
      {
        name: "blog post, doc title",
        docTitle: BLOG_TITLE,
        fallback: BLOG_TITLE,
        expected: "Understanding DNA Testing for Personalized Wellness",
      },
    ];

    for (const item of cases) {
      for (const metaTitle of [undefined, null, ""] as const) {
        const resolved = resolvePublishedTitle(
          metaTitle,
          item.docTitle,
          item.fallback,
        );
        assert.equal(resolved, item.expected, item.name);
        assert.equal(
          resolved,
          chooseTitle(metaTitle || item.docTitle, item.fallback),
          item.name,
        );
      }
    }

    assert.equal(
      resolvePublishedTitle("   ", "Dr. Thomas Santucci", ABOUT_TITLE),
      "About Dr. Thomas Santucci | NeuroIntegrative Care",
    );
    assert.equal(
      resolvePublishedTitle("   ", "Dr. Thomas Santucci", ABOUT_TITLE),
      chooseTitle("   ", ABOUT_TITLE),
    );
  });
});

describe("published CMS meta description", () => {
  it("renders a set meta.description verbatim, including text chooseDescription would drop", () => {
    assert.equal(
      resolvePublishedDescription(LONG_CMS_DESCRIPTION, BLOG_DESCRIPTION),
      LONG_CMS_DESCRIPTION,
    );
    assert.equal(chooseDescription(LONG_CMS_DESCRIPTION, BLOG_DESCRIPTION), BLOG_DESCRIPTION);

    const spaced = "Line one.\n\nLine two stays.  Double space.";
    assert.equal(resolvePublishedDescription(spaced, HOME_DESCRIPTION), spaced);
    assert.notEqual(chooseDescription(spaced, HOME_DESCRIPTION), spaced);
  });

  it("keeps today's description when meta.description is empty", () => {
    const cases: Array<{ name: string; fallback: string }> = [
      { name: "home", fallback: HOME_DESCRIPTION },
      { name: "about page", fallback: ABOUT_DESCRIPTION },
      { name: "location page", fallback: LOCATION_DESCRIPTION },
      { name: "generated city condition", fallback: GENERATED_DESCRIPTION },
      { name: "blog post", fallback: BLOG_DESCRIPTION },
    ];

    assert.equal(
      GENERATED_DESCRIPTION,
      "Root-cause care for neuropathy & nerve pain at our downtown Los Gatos clinic. Patients come from anywhere in town. Aimed at the driver, not symptom cover.",
    );

    for (const item of cases) {
      for (const metaDescription of [undefined, null, "", "   "] as const) {
        const resolved = resolvePublishedDescription(metaDescription, item.fallback);
        assert.equal(resolved, item.fallback, item.name);
        assert.equal(
          resolved,
          chooseDescription(metaDescription, item.fallback),
          item.name,
        );
      }
    }
  });
});
