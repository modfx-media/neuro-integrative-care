// COMPLIANCE: `description` is the ONLY field safe to display on public pages.
// `internalNote` is for repo-internal reference only — never render it in any
// component. No dollar figures are published on the site; internal pricing
// detail (in-clinic-care-regenerative range) lives only in `internalNote` for
// team reference. Per the Sept 13, 2026 "Mynd Transformation Blueprint" funnel
// doc, `potentialAddOns` / `addOnPrograms` follow the same rule: structure and
// included items only, no $ figures.

export interface EntryProgram {
  slug: string;
  name: string;
  /** Public-safe copy — this is what renders on the site. */
  description: string;
  /** NEVER RENDER PUBLICLY. Internal pricing detail for repo/team reference only. */
  internalNote?: string;
  fullCopy?: string;
  duration?: string;
  whatItIncludes?: string[];
  includedItems?: { title: string; description: string }[];
  /** Optional add-ons offered alongside this program, no pricing. */
  potentialAddOns?: string[];
}

export interface OutOfTownServiceItem {
  name: string;
  description: string;
}

export interface OutOfTownServices {
  description: string;
  items: OutOfTownServiceItem[];
}

export interface AddOnProgram {
  slug: string;
  name: string;
  description: string;
}

export interface Programs {
  entryPrograms: EntryProgram[];
  outOfTownServices: OutOfTownServices;
  addOnPrograms: AddOnProgram[];
}

export const programs: Programs = {
  entryPrograms: [
    {
      slug: "new-patient-investigation",
      name: "New-Patient Investigation",
      description:
        "Consultation, history, and clinical impression. The starting point for everyone.",
      fullCopy:
        "Everything starts with an investigation, a full consultation where Dr. Santucci reviews your complex history, isolates likely causes, and gives you a clinical impression that finally makes sense. The beginning of an actual answer.",
      includedItems: [
        {
          title: "Two Industry-Leading Cognitive Assessments",
          description:
            "Trusted by top neurology clinics and research institutions, we evaluate key aspects of your cognitive health, like memory, attention, processing speed, and executive function.",
        },
        {
          title: "30-Minute 1-on-1 Phone Consultation",
          description:
            "You'll meet via phone with a provider who walks you through your results, what they mean, and next steps tailored to you.",
        },
        {
          title: "Personalized Brain Health Insights",
          description:
            "Get clear answers about where your brain stands today and whether early signs of decline are present, even before they show up in everyday life.",
        },
        {
          title: "Educational Handout + Brain Health EBook",
          description:
            "A take-home handout and eBook of evidence-based strategies to protect and improve your cognitive function, plus an email series to help put them into action and ongoing access to the MyndLift app for continued guidance.",
        },
      ],
    },
    {
      slug: "virtual-program",
      // SPELLING: "Mynd" per Master Build Brief v1.0 (Aug 12), supersedes earlier "Mind" spelling from CO-01.
      // Still flagged as needing final client confirmation per brief's pre-launch checklist item 5 —
      // do not treat as 100% final until confirmed by Justin.
      name: "The Virtual Program (Mynd Transformation Blueprint)",
      description:
        "A 10-week at-home neurometabolic program: remote QEEG unit tuned to your own healing frequencies, a weekly neurological support program, and clinician review calls with Dr. Santucci every 4 weeks. National.",
      duration: "10 weeks",
      whatItIncludes: [
        "Remote QEEG brain-training unit, tuned to your healing frequencies",
        "Initial brain assessment to set your baseline",
        "Weekly neurological support program",
        "Guided video series",
        "Welcome packet with program terms, contacts, and full 10-week schedule",
        "Clinician review calls with Dr. Santucci every 4 weeks",
        "Optional toxicity, DNA, and functional testing as needed",
      ],
      // Per the new funnel doc: optional add-ons offered alongside the 10-week
      // program. No pricing here — see `addOnPrograms` below for descriptions.
      potentialAddOns: ["Detox Detective", "The Listening Program (TLP)"],
    },
    {
      slug: "in-clinic-care-regenerative",
      name: "In-Clinic Care & Regenerative",
      // Public-safe description per CO — never publish the internal range.
      description:
        "Programs are tailored after your investigation, based on what your workup requires.",
      internalNote:
        "Internal only — DO NOT RENDER. Consult-based, typically $3,500–$7,200 per program (neurofeedback $3,500, regenerative $7,000). Priced after the investigation.",
      // Menu of in-clinic tracks, from the Sept 13, 2026 funnel doc — no pricing.
      includedItems: [
        {
          title: "Clinical Option",
          description:
            "For more difficult cases: comprehensive history, in-depth neurological examination, and an advanced report of findings.",
        },
        {
          title: "Neurofeedback",
          description:
            "19-channel QEEG brain map paired with 4-channel neurofeedback sessions.",
        },
        {
          title: "Advanced Rehab",
          description:
            "Violet laser therapy and pulse wave treatment.",
        },
        {
          title: "Regenerative Solutions",
          description: "PRP, exosomes, and cell therapy.",
        },
      ],
    },
  ],
  addOnPrograms: [
    {
      slug: "detox-detective",
      name: "Detox Detective",
      description:
        "A deeper toxicity workup for the 10-week program: full toxicology testing plus specialized autoimmune testing, added when the picture points to a toxic or immune driver.",
    },
    {
      slug: "listening-program",
      name: "The Listening Program (TLP)",
      description:
        "Research-backed, music-based auditory training done at home, supervised remotely.",
    },
  ],
  outOfTownServices: {
    description:
      "A dedicated tab for patients who travel in: many do, including a referral network flying down from Washington. Three remotely-delivered services, framed around Continuity, Access, and Oversight.",
    items: [
      {
        name: "Myndlift Virtual Neurofeedback",
        description:
          "A take-home EEG system, remotely programmed and reviewed, with the same individualized progression as in-office.",
      },
      {
        name: "Remote Laboratory Testing",
        description:
          "Advanced functional panels via national labs and mobile phlebotomy near the patient.",
      },
      {
        name: "The Listening Program (TLP)",
        description:
          "Research-backed, music-based auditory training done at home, supervised remotely.",
      },
    ],
  },
};
