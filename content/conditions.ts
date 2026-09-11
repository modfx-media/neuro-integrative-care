export interface Condition {
  slug: string;
  name: string;
  heroLine: string;
  whatWeInvestigate: string;
  patientStorySlug?: string;
  subConditions?: Condition[];
  /** Hero background banner image, public/images/conditions/banners/{slug}.jpg */
  heroImage?: string;
  /** Optional supporting photo rendered alongside "What We Investigate". */
  galleryImage?: string;
  galleryImageAlt?: string;
}

// TODO(client): sub-condition → parent sector pairings below are TENTATIVE.
// The blueprint doesn't specify parent sectors for the 4 sub-conditions
// (neuropathy, sleep-fatigue, balance-strength, memory-cognition). These
// assignments were chosen for clinical fit and need Justin/client confirmation
// before treating them as final. Current pairings:
//   - neuropathy       → autoimmune-investigation
//   - sleep-fatigue    → longevity-science
//   - balance-strength → concussion-post-trauma
//   - memory-cognition → brain-brightening

export const conditions: Condition[] = [
  {
    slug: "autoimmune-investigation",
    name: "Autoimmune Investigation",
    heroLine:
      "Your immune system is attacking your own tissue. We find what's driving it, instead of only quieting the flare.",
    whatWeInvestigate:
      "Autoimmune disease is rarely random. We map the triggers with predictive-antibody panels, gut-barrier and molecular-mimicry testing, food-sensitivity and microbiome analysis, then address the triggers at the source through targeted nutrition, gut repair, and environmental change. Dr. Santucci's own trademarked Autoimmune Triggers model organizes the search: food antigens, metals, stress, hormones, pesticides, trauma, now expanded to include mold/mycotoxins and post-viral triggers.",
    patientStorySlug: "ellie",
    heroImage: "/images/conditions/banners/autoimmune-investigation.jpg",
    subConditions: [
      {
        slug: "neuropathy",
        name: "Neuropathy",
        heroLine: "B12/toxin/autoimmune drivers",
        whatWeInvestigate:
          "Violet laser + Neogen therapy + nutrient repletion, targeting the specific drivers of nerve damage rather than masking pain.",
        heroImage: "/images/conditions/banners/neuropathy.jpg",
      },
    ],
  },
  {
    slug: "brain-brightening",
    name: "Brain Brightening",
    heroLine:
      "Brain fog, slipping memory, lost sharpness, with scans that don't match how you feel. We find why.",
    whatWeInvestigate:
      "Memory, focus, and clarity depend on three things working together: cerebral blood flow, mitochondrial energy, and balanced neurotransmitters. When any falter, from stress, poor sleep, blood-sugar swings, or low-grade inflammation, cognition suffers long before anything shows on a standard test. A 19-channel QEEG brain map reveals more about how your brain actually operates than you've ever seen, and shows exactly where to train. We combine neurofeedback, photobiomodulation, and targeted nutrient support to rebuild efficiency.",
    heroImage: "/images/conditions/banners/brain-brightening.jpg",
    subConditions: [
      {
        slug: "memory-cognition",
        name: "Memory & Cognition",
        heroLine: "Vascular/metabolic/inflammatory/toxin contributors",
        whatWeInvestigate:
          "Early, non-drug intervention addressing the full range of contributors to cognitive decline.",
        heroImage: "/images/conditions/banners/memory-cognition.jpg",
      },
    ],
  },
  {
    slug: "concussion-post-trauma",
    name: "Concussion & Post-Trauma Care",
    heroLine:
      "A hit you were told to rest off, and never fully recovered from. Recovery doesn't have to be left to time.",
    whatWeInvestigate:
      "A concussion disrupts vestibular-ocular reflexes, autonomic regulation, and cellular energy all at once, which is why 'rest and wait' leaves so many people with lingering symptoms years later. Our functional-neurology assessment maps exactly which circuits were affected, then builds active rehab: vestibular and oculomotor retraining, autonomic regulation, and violet-laser support for mitochondrial healing. By Dr. Santucci's estimate, up to half of men are walking around with unaddressed post-concussive syndrome.",
    patientStorySlug: "michael",
    heroImage: "/images/conditions/banners/concussion-post-trauma.jpg",
    subConditions: [
      {
        slug: "balance-strength",
        name: "Balance & Strength",
        heroLine: "Vestibular/proprioceptive workup",
        whatWeInvestigate:
          "Targeted retraining and fall-risk reduction through functional neurology assessment.",
        heroImage: "/images/conditions/banners/balance-strength.jpg",
      },
    ],
  },
  {
    slug: "environmental-toxins",
    name: "Environmental Toxins",
    heroLine:
      "Mold, metals, and chemical exposure show up first as brain fog, fatigue, and nerve pain. We test for what's actually there.",
    whatWeInvestigate:
      "Mycotoxins, heavy metals, and everyday chemical exposures accumulate silently and often surface first as neurological symptoms. We test for the exposure itself (urine mycotoxin and heavy-metal panels) and for how efficiently your body clears toxins, including genetic detox variants like MTHFR. Care then supports your own detox pathways so the burden is actually cleared. In Dr. Santucci's clinic, an all-toxin panel has yet to come back clean.",
    patientStorySlug: "seth",
    heroImage: "/images/conditions/banners/environmental-toxins.jpg",
  },
  {
    slug: "longevity-science",
    name: "Longevity Science",
    heroLine:
      "You're aging faster than you should be. We measure it, and give you a plan, not a supplement guess.",
    whatWeInvestigate:
      "Biological age tells the truth that a birthdate can't. We use epigenetic-clock testing, mitochondrial-function markers, and cellular-senescence indicators to establish where you actually stand, then build a personalized protocol (nutrition, movement, NAD+ pathway support, targeted lifestyle change) aimed at slowing cellular aging and extending healthy, functional years. Dr. Santucci's view: real longevity is interventional and brain-first, not a shelf of supplements with the word on the label.",
    heroImage: "/images/conditions/banners/longevity-science.jpg",
    subConditions: [
      {
        slug: "sleep-fatigue",
        name: "Sleep & Fatigue",
        heroLine: "Circadian, HPA-axis, and mitochondrial causes",
        whatWeInvestigate:
          "Neurofeedback + autonomic training to address the root causes of disrupted sleep and chronic fatigue.",
        heroImage: "/images/conditions/banners/sleep-fatigue.jpg",
      },
    ],
  },
  {
    slug: "idiopathic-unexplained",
    name: "Idiopathic / Unexplained Conditions",
    heroLine:
      "Every test came back 'normal', but you know something is wrong. This is what we specialize in.",
    whatWeInvestigate:
      "When standard testing is 'normal' but symptoms persist, the answer is usually that the wrong systems were tested, not that nothing is wrong. We investigate metabolic, neurological, immune, and hormonal function together rather than in isolation, which is where most 'idiopathic' cases finally reveal their driver. 'The idiopathic nature of it is not idiopathic to us.'",
    patientStorySlug: "don",
    heroImage: "/images/conditions/banners/idiopathic-unexplained.jpg",
  },
  {
    slug: "erchonia",
    name: "Erchonia",
    heroLine: "FDA-Cleared Violet Laser Therapy",
    whatWeInvestigate:
      "The FX-405 is Erchonia's FDA-cleared violet laser: photobiomodulation, meaning specific light wavelengths absorbed directly by mitochondria to boost cellular energy (ATP) and calm inflammation at the source. It's the same platform used elsewhere in this practice for nerve repair, post-concussion recovery, and autoimmune-driven inflammation, and it's also the only laser on the market FDA-cleared to treat chronic low back pain. Non-invasive, painless, and drug-free, with the added 405nm violet wavelength also supporting anti-microbial and anti-bacterial effects at the treatment site.",
    patientStorySlug: "gail",
    heroImage: "/images/conditions/banners/erchonia.jpg",
    galleryImage: "/images/conditions/erchonia-fx405-device.avif",
    galleryImageAlt: "The Erchonia FX-405 violet laser device",
    subConditions: [
      {
        slug: "chronic-acute-pain",
        name: "Chronic & Acute Pain",
        heroLine: "58% Average Pain Reduction, No Medication",
        whatWeInvestigate:
          "Chronic and acute pain usually gets managed, not addressed: medication, injections, or surgery as the only options on the table. The FX-405 violet laser is the only laser on the market FDA-cleared to treat chronic low back pain. In a double-blind, placebo-controlled, randomized clinical trial, participants averaged 58% pain reduction at a 2-month follow-up, with continued improvement through six months, no addiction potential, no harmful side effects, and no downtime.",
        patientStorySlug: "gail",
        heroImage: "/images/conditions/banners/chronic-acute-pain.jpg",
        galleryImage: "/images/conditions/chronic-acute-pain-workup.avif",
        galleryImageAlt: "Knee support brace used during chronic pain rehabilitation",
      },
    ],
  },
];
