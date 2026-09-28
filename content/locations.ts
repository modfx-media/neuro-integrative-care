// COMPLIANCE + SEO: each entry's h1/metaTitle/metaDescription/intro must stay
// meaningfully distinct in sentence structure (not the same template string
// with only the city swapped) — see instructions_and_brief.md's
// "no templated duplication" rule for /locations/[city] pages.

export interface CityLocation {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Short line used in the trust-signals block, e.g. "Serving Campbell and surrounding areas." */
  servingLine: string;
  /** Short factual clause on how patients from this city reach the clinic — reused to build varied sentences on condition/service city pages without a pure city-name swap. */
  driveNote: string;
}

export const cityLocations: CityLocation[] = [
  {
    slug: "los-gatos",
    name: "Los Gatos",
    h1: "Root-Cause Care, Right Here in Los Gatos",
    metaTitle: "Los Gatos Functional Medicine & Neurometabolic Care",
    metaDescription:
      "NeuroIntegrative Care is based in downtown Los Gatos, CA: functional medicine, functional neurology, and regenerative care for local patients who want an actual answer.",
    intro:
      "Our clinic sits on Santa Cruz Ave in downtown Los Gatos, a few steps from the plaza. For Los Gatos residents, that means no highway, no bridge traffic, just a short walk or drive to a practice built around finding what's actually driving a symptom, not managing it indefinitely.",
    servingLine: "Serving Los Gatos and the greater West Valley.",
    driveNote: "with a short walk or drive from anywhere in downtown Los Gatos",
  },
  {
    slug: "campbell",
    name: "Campbell",
    h1: "Root-Cause Neurometabolic Care for Campbell Patients, Minutes Away",
    metaTitle: "Functional Medicine Near Campbell, CA | NeuroIntegrative Care",
    metaDescription:
      "Campbell patients reach our Los Gatos clinic in about ten minutes via Hamilton Ave or Winchester Blvd: root-cause functional medicine and neurology, no referral needed.",
    intro:
      "From most of Campbell, it's a straight shot down Hamilton Ave or Winchester Blvd to our door in downtown Los Gatos. Call it ten minutes without traffic. Close enough that patients who've bounced between specialists in the Pruneyard area often make us their next stop rather than their last resort.",
    servingLine: "Serving Campbell and surrounding areas.",
    driveNote: "in about ten minutes via Hamilton Ave or Winchester Blvd",
  },
  {
    slug: "san-jose",
    name: "San Jose",
    h1: "San Jose Patients Drive a Few Exits for a Different Kind of Workup",
    metaTitle: "Root-Cause Care for San Jose Patients | NeuroIntegrative Care",
    metaDescription:
      "San Jose patients, from Willow Glen to Almaden, reach our Los Gatos clinic in 15–20 minutes for functional medicine, functional neurology, and regenerative care.",
    intro:
      "San Jose is a big city, so the drive varies: Willow Glen and Almaden Valley patients are 15 minutes out via 880/17, while those further north or east budget closer to 25–30. Either way, it's a familiar trip for patients who've already worked through San Jose's larger hospital systems without a clear answer and want a different approach.",
    servingLine: "Serving San Jose, Almaden Valley, Willow Glen, and Cambrian Park.",
    driveNote: "in 15–30 minutes via 880/17, depending on the neighborhood",
  },
  {
    slug: "morgan-hill",
    name: "Morgan Hill",
    h1: "From Morgan Hill to Los Gatos: One Trip North for Root-Cause Answers",
    metaTitle: "Morgan Hill Patients: Functional Neurology & Root-Cause Medicine",
    metaDescription:
      "Morgan Hill patients travel roughly 25 minutes north on Highway 101/85 to our Los Gatos clinic for functional medicine, neurofeedback, and regenerative therapies.",
    intro:
      "Morgan Hill patients typically take 101 north to 85, arriving in about 25 minutes, a single, predictable trip rather than a string of specialist referrals scattered across the South Bay. Many make a morning of it: one visit, a full workup, and a plan before heading back south.",
    servingLine: "Serving Morgan Hill, Gilroy, and South Santa Clara County.",
    driveNote: "in about 25 minutes north on Highway 101 to 85",
  },
  {
    slug: "santa-cruz",
    name: "Santa Cruz",
    h1: "Over the Hill from Santa Cruz: Root-Cause Care Worth the Drive",
    metaTitle: "Santa Cruz Patients Travel Highway 17 for This Root-Cause Practice",
    metaDescription:
      "Santa Cruz patients cross Highway 17 (about 40 minutes) to reach our Los Gatos clinic: functional medicine, functional neurology, and regenerative therapies without the Bay Area referral maze.",
    intro:
      "Highway 17 is the one road most Santa Cruz patients already know by heart, and it's the same route that brings many of them to us, about 40 minutes, mountains and all. For patients who've exhausted what's available on the coast, that drive tends to be the shortest distance to an actual explanation.",
    servingLine: "Serving Santa Cruz, Scotts Valley, and the greater Monterey Bay area.",
    driveNote: "in about 40 minutes over Highway 17",
  },
  {
    slug: "aptos",
    name: "Aptos",
    h1: "Aptos Patients Make the Highway 17 Trip for Answers Standard Care Missed",
    metaTitle: "Aptos, CA Patients | Functional Medicine in Los Gatos",
    metaDescription:
      "Aptos patients travel Highway 17 and Highway 1 (about 45–50 minutes) to our Los Gatos clinic for root-cause functional medicine, functional neurology, and regenerative care.",
    intro:
      "Coming from Aptos means Highway 1 into Highway 17, roughly 45 to 50 minutes depending on the hour, a longer trip than most, and one our Aptos patients tend to make only after the closer options ran out of ideas. It's a full day out, but for a root-cause workup instead of another round of symptom management, most say it's worth the miles.",
    servingLine: "Serving Aptos, Capitola, and Soquel.",
    driveNote: "in about 45–50 minutes via Highway 1 to Highway 17",
  },
  {
    slug: "saratoga",
    name: "Saratoga",
    h1: "Saratoga Patients Are Practically Neighbors of This Clinic",
    metaTitle: "Saratoga, CA Patients | Functional Medicine in Los Gatos",
    metaDescription:
      "Saratoga patients reach our Los Gatos clinic in about ten minutes via Saratoga-Los Gatos Road for root-cause functional medicine and functional neurology.",
    intro:
      "Saratoga-Los Gatos Road connects the two towns directly, so most Saratoga patients are at our door in about ten minutes, no freeway required. It's the kind of drive that makes a full diagnostic workup a genuinely easy errand rather than a day set aside for it.",
    servingLine: "Serving Saratoga and the surrounding foothill neighborhoods.",
    driveNote: "in about 10 minutes via Saratoga-Los Gatos Road",
  },
  {
    slug: "monte-sereno",
    name: "Monte Sereno",
    h1: "Monte Sereno Is Next Door, So the Workup Doesn't Have to Wait",
    metaTitle: "Monte Sereno, CA | Functional Medicine Next Door in Los Gatos",
    metaDescription:
      "Monte Sereno borders Los Gatos directly, so our clinic is a five-minute drive for root-cause functional medicine, functional neurology, and regenerative care.",
    intro:
      "Monte Sereno shares a border with Los Gatos, so this is about as local as the practice gets: most residents are parked outside our Santa Cruz Ave door in under five minutes. That proximity means there's rarely a good excuse to keep putting off a real investigation into a symptom that hasn't budged.",
    servingLine: "Serving Monte Sereno and the Los Gatos border neighborhoods.",
    driveNote: "in under 5 minutes — Monte Sereno borders Los Gatos directly",
  },
  {
    slug: "cupertino",
    name: "Cupertino",
    h1: "Cupertino Patients Take Highway 85 for a Different Kind of Workup",
    metaTitle: "Cupertino, CA Patients | Root-Cause Care in Los Gatos",
    metaDescription:
      "Cupertino patients reach our Los Gatos clinic in about 15–20 minutes via Highway 85 for functional medicine, functional neurology, and regenerative therapies.",
    intro:
      "Highway 85 runs almost directly from Cupertino to our exit in Los Gatos, putting most patients here in 15 to 20 minutes. For a tech-heavy community used to optimizing everything else, a single clinic that runs a full root-cause workup tends to be an easy sell.",
    servingLine: "Serving Cupertino and the West Valley tech corridor.",
    driveNote: "in about 15–20 minutes via Highway 85",
  },
  {
    slug: "santa-clara",
    name: "Santa Clara",
    h1: "Santa Clara Patients Head South on 85 for Root-Cause Answers",
    metaTitle: "Santa Clara, CA Patients | Functional Medicine in Los Gatos",
    metaDescription:
      "Santa Clara patients travel about 20–25 minutes via Highway 85 to 101 to reach our Los Gatos clinic for functional medicine and functional neurology.",
    intro:
      "From Santa Clara, it's Highway 85 south into 101, about 20 to 25 minutes depending on where you're starting. Most patients who make the trip have already been through the larger health systems nearer to home and are looking for a workup that goes further than the standard panel.",
    servingLine: "Serving Santa Clara and the surrounding tech corridor.",
    driveNote: "in about 20–25 minutes via Highway 85 to 101",
  },
  {
    slug: "sunnyvale",
    name: "Sunnyvale",
    h1: "Sunnyvale Patients Make the Highway 85 Trip South for Real Answers",
    metaTitle: "Sunnyvale, CA Patients | Root-Cause Medicine in Los Gatos",
    metaDescription:
      "Sunnyvale patients reach our Los Gatos clinic in about 20 minutes via Highway 85 for functional medicine, neurofeedback, and regenerative care.",
    intro:
      "Highway 85 south gets most Sunnyvale patients to our clinic in about 20 minutes, a short trip for a workup that's built to go past the standard panel most local urgent-care and hospital systems already ran.",
    servingLine: "Serving Sunnyvale and the surrounding Peninsula tech corridor.",
    driveNote: "in about 20 minutes via Highway 85",
  },
  {
    slug: "mountain-view",
    name: "Mountain View",
    h1: "Mountain View Patients Drive South for a Workup That Goes Further",
    metaTitle: "Mountain View, CA Patients | Functional Medicine in Los Gatos",
    metaDescription:
      "Mountain View patients travel about 25 minutes via Highway 85 to 101 to reach our Los Gatos clinic for root-cause functional medicine and neurology.",
    intro:
      "Mountain View patients typically take 85 south into 101, about 25 minutes door to door. It's a familiar commute-length drive, just headed toward an actual diagnostic workup instead of an office.",
    servingLine: "Serving Mountain View and the surrounding Peninsula.",
    driveNote: "in about 25 minutes via Highway 85 to 101",
  },
  {
    slug: "palo-alto",
    name: "Palo Alto",
    h1: "Palo Alto Patients Travel South for a Practice Built Around Evidence",
    metaTitle: "Palo Alto, CA Patients | Functional Medicine in Los Gatos",
    metaDescription:
      "Palo Alto patients travel about 30 minutes via Highway 85 to 101 to reach our Los Gatos clinic for functional medicine, neurofeedback, and root-cause care.",
    intro:
      "From Palo Alto, it's 85 south into 101, roughly 30 minutes. For patients who've already had extensive workups at nearby academic medical centers without a clear answer, the extra half hour tends to be a small price for a different diagnostic angle.",
    servingLine: "Serving Palo Alto and the surrounding Peninsula.",
    driveNote: "in about 30 minutes via Highway 85 to 101",
  },
  {
    slug: "los-altos",
    name: "Los Altos",
    h1: "Los Altos Patients Take Highway 85 South for Root-Cause Care",
    metaTitle: "Los Altos, CA Patients | Functional Medicine in Los Gatos",
    metaDescription:
      "Los Altos patients reach our Los Gatos clinic in about 25 minutes via Highway 85 for functional medicine, functional neurology, and regenerative care.",
    intro:
      "Highway 85 runs straight from Los Altos to our Los Gatos exit, about 25 minutes most times of day. It's an easy add-on to a Peninsula patient's week, not a special trip.",
    servingLine: "Serving Los Altos and the surrounding foothill communities.",
    driveNote: "in about 25 minutes via Highway 85",
  },
  {
    slug: "milpitas",
    name: "Milpitas",
    h1: "Milpitas Patients Cross the Valley for a Different Kind of Workup",
    metaTitle: "Milpitas, CA Patients | Functional Medicine in Los Gatos",
    metaDescription:
      "Milpitas patients travel about 30–35 minutes via Highway 85/101 or 880/17 to reach our Los Gatos clinic for functional medicine and functional neurology.",
    intro:
      "Milpitas is the longest of the South Bay drives, about 30 to 35 minutes via 85/101 or across on 880 to 17 depending on traffic. Patients who make the trip are usually past the point of wanting another referral and are ready for a single, thorough workup instead.",
    servingLine: "Serving Milpitas and the North San Jose corridor.",
    driveNote: "in about 30–35 minutes via Highway 85/101 or 880/17",
  },
  {
    slug: "scotts-valley",
    name: "Scotts Valley",
    h1: "Scotts Valley Patients Take Highway 17 Before It Reaches Santa Cruz",
    metaTitle: "Scotts Valley, CA Patients | Functional Medicine in Los Gatos",
    metaDescription:
      "Scotts Valley patients travel about 30–35 minutes via Highway 17 to reach our Los Gatos clinic for root-cause functional medicine and functional neurology.",
    intro:
      "Scotts Valley sits just over the summit on Highway 17, about 30 to 35 minutes from our door, a shorter version of the same mountain drive Santa Cruz patients already make. Many treat it as the natural first stop before the rest of the coast.",
    servingLine: "Serving Scotts Valley and the San Lorenzo Valley.",
    driveNote: "in about 30–35 minutes via Highway 17, just before Santa Cruz",
  },
];

export function findCityLocation(slug: string) {
  return cityLocations.find((c) => c.slug === slug);
}
