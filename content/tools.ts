// COMPLIANCE: Copy stays in functional-medicine scope — "investigate," "identify,"
// "support," "retrain," "rebuild." Never phrase as diagnosis or cure guarantee.
//
// TODO(client): sector cross-links per tool are TENTATIVE and need clinical
// sign-off. Assignments below were made from the blueprint's own tool copy
// (e.g. Violet Laser mentions "nerve and tissue repair" and "brain regions
// affected by injury or decline" → concussion, brain-brightening,
// autoimmune-investigation). Flag for Justin/client review before publish.

export interface Tool {
  slug: string;
  name: string;
  /** Short mono-caps label used above the title on the tool's /tools/[slug] page. */
  kicker: string;
  description: string;
  /** Slugs from conditions.ts — parent sectors this tool most directly serves. */
  sectorSlugs: string[];
  media: ToolMedia;
  /** Optional supporting explainer graphics rendered below the lead media asset. */
  gallery?: {
    src: string;
    alt: string;
    caption: string;
    /** Native pixel dimensions, used so the image renders uncropped. */
    width: number;
    height: number;
  }[];
  /** Optional downloadable PDF resource rendered alongside the gallery. */
  resource?: { href: string; label: string };
  /** Optional short factual blurbs rendered as a grid below the gallery. */
  explainer?: { title: string; body: string }[];
}

/**
 * Lead media asset per the brief's Media Asset Catalog. Vimeo/YouTube videos
 * are embedded via their standard oEmbed/iframe player, never re-hosted.
 * `placeholder` means no asset was supplied yet — see the TODO in the tools
 * array below for what's pending per tool.
 */
export type ToolMedia =
  | { kind: "vimeo"; vimeoId: string; title: string }
  | { kind: "youtube"; youtubeId: string; title: string }
  | { kind: "placeholder" };

export const tools: Tool[] = [
  {
    slug: "violet-laser",
    name: "Violet Laser Therapy",
    kicker: "Photobiomodulation",
    description:
      "Photobiomodulation: specific wavelengths absorbed by mitochondria to boost ATP and reduce inflammation at the source. Used to accelerate nerve and tissue repair and, applied transcranially, to support brain regions affected by injury or decline. Non-invasive, painless, drug-free.",
    sectorSlugs: [
      "concussion-post-trauma",
      "brain-brightening",
      "autoimmune-investigation",
      "erchonia",
    ],
    // Lead asset per Media Asset Catalog: "Electron Transport Chain" (Erchonia),
    // directly illustrates the mitochondrial USP of the therapy.
    media: {
      kind: "vimeo",
      vimeoId: "802831140",
      title: "Electron Transport Chain (Erchonia)",
    },
  },
  {
    slug: "neurofeedback",
    name: "Neurofeedback",
    kicker: "qEEG-Guided Training",
    description:
      "Real-time, qEEG-guided EEG training that shows the brain its own activity and rewards healthier patterns. Over a course of sessions the brain learns to self-regulate (attention, sleep, emotional regulation, stress resilience) with no medication. Every protocol is individualized to the patient's brain map, then re-mapped to measure change. Home and remote options available (Myndlift).",
    sectorSlugs: [
      "brain-brightening",
      "concussion-post-trauma",
      "autoimmune-investigation",
    ],
    media: {
      kind: "youtube",
      youtubeId: "Jr4iwULgxTs",
      title: "What is Neurofeedback?",
    },
    gallery: [
      {
        src: "/images/neurofeedback/what-is-neurofeedback.jpg",
        alt: "How neurofeedback works: sensors read brain activity, software scores it, and the patient gets real-time feedback that rewards healthier patterns",
        caption: "How it works: sense, score, feed back, reward.",
        width: 1740,
        height: 1051,
      },
      {
        src: "/images/neurofeedback/brainwave-chart.jpg",
        alt: "Chart of brainwave frequency bands from Delta to Gamma and the states each is associated with",
        caption: "The brainwave bands every protocol trains against.",
        width: 1150,
        height: 1074,
      },
      {
        src: "/images/neurofeedback/sqeeg-brain-mapping.jpg",
        alt: "Sample sequential qEEG brain map comparing pre- and post-training brainwave activity across frequency bands",
        caption: "qEEG brain mapping: how change gets measured, band by band.",
        width: 1616,
        height: 2362,
      },
      {
        src: "/images/neurofeedback/training-results.jpg",
        alt: "Before and after brain map comparison alongside the Myndlift home training device and app",
        caption: "A course of home training sessions, mapped and re-mapped.",
        width: 1036,
        height: 600,
      },
    ],
    resource: {
      href: "/downloads/what-is-neurofeedback-guide.pdf",
      label: "Download the Full Neurofeedback Guide (PDF)",
    },
    explainer: [
      {
        title: "The feedback loop",
        body: "Sensors read real-time brain activity, software scores it against your own brain map, and you see or hear the results as they happen. No conscious effort required — the brain learns to nudge itself toward the healthier pattern on its own.",
      },
      {
        title: "EEG, in plain terms",
        body: "An electroencephalogram (EEG) measures the brain's electrical rhythms, from slow Delta waves to fast Gamma waves. A dysregulated brain often runs too hot or too slow in specific bands; training nudges it back toward balance.",
      },
      {
        title: "Built on repetition",
        body: "Self-regulation is a skill, and skills strengthen with practice. Consistent sessions are what turn a momentary reward inside a session into a lasting new pattern outside of it.",
      },
      {
        title: "What it's used for",
        body: "Attention and focus, sleep and stress resilience, mood regulation, memory and cognitive performance, and recovery support after concussion or head injury.",
      },
      {
        title: "An evidence base, not just theory",
        body: "Neurofeedback for attention regulation has been studied in multiple randomized controlled trials, and professional bodies have rated it among the better-supported behavioral interventions available.",
      },
      {
        title: "No medication required",
        body: "Every protocol is individualized to your own qEEG brain map, then re-mapped over the course of training so progress is measured, not assumed.",
      },
    ],
  },
  {
    slug: "regenerative-solutions",
    name: "Regenerative Solutions",
    kicker: "Non-Surgical Repair",
    description:
      "Advanced, non-surgical therapies (including PRP and exosome-supported approaches) that stimulate the body's own repair in joints, connective tissue, and peripheral nerves. Frequently paired with neurofeedback and functional-neurology work so structural repair and nervous-system retraining progress together.",
    sectorSlugs: ["concussion-post-trauma", "longevity-science"],
    // TODO(client): no media asset supplied for this tool yet — placeholder
    // slot only. Swap for real clinic/procedure media before launch.
    media: { kind: "placeholder" },
  },
  {
    slug: "functional-neurology",
    name: "Functional Neurology",
    kicker: "Circuit-Level Rehab",
    description:
      "Computerized assessment (eye-movement tracking, posturography and balance, reaction-time and heart-rate-variability testing) pinpoints which neural circuits underperform, followed by targeted hands-on rehab that retrains those exact pathways.",
    sectorSlugs: ["concussion-post-trauma", "brain-brightening"],
    // TODO(client): no media asset supplied for this tool yet — placeholder
    // slot only. Swap for real clinic/procedure media before launch.
    media: { kind: "placeholder" },
  },
  {
    slug: "longevity-testing",
    name: "Longevity Testing",
    kicker: "Beyond the Standard Physical",
    description:
      "A panel far beyond a standard physical: Real Age (biological-age) testing, IntellxxDNA cognitive genomics, comprehensive DNA, neurotransmitter testing, and specialized labs, delivering an objective, data-driven picture of how you're aging and functioning.",
    sectorSlugs: ["longevity-science", "idiopathic-unexplained"],
    // TODO(client): no media asset supplied for this tool yet — placeholder
    // slot only. Swap for real clinic/procedure media before launch.
    media: { kind: "placeholder" },
  },
  {
    slug: "detoxification",
    name: "Detoxification",
    kicker: "Removing the Trigger",
    description:
      "Targeted support for the body's own detox pathways once a metals, mold, or environmental-toxin trigger is identified, clearing the load that's driving inflammation rather than only treating the downstream symptoms.",
    sectorSlugs: ["autoimmune-investigation", "environmental-toxins"],
    // TODO(client): no media asset supplied for this tool yet — placeholder
    // slot only. Swap for real clinic/procedure media before launch.
    media: { kind: "placeholder" },
  },
];

/** Look up the tools whose sectorSlugs include the given parent sector slug. */
export function toolsForSector(sectorSlug: string): Tool[] {
  return tools.filter((t) => t.sectorSlugs.includes(sectorSlug));
}
