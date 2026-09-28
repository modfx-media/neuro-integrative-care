// COMPLIANCE: Same functional-medicine scope as the rest of content/ —
// "may support," "may help," "investigate," never a diagnosis, self-treatment
// protocol, or guaranteed outcome. These are short, honest answers to real
// "People Also Ask" questions (see /data/pseo/keyword-research.json), framed
// around getting an evaluation rather than a home-remedy or supplement list —
// matching the voice already established in content/blog.ts.

export interface ResourceGuide {
  slug: string;
  /** The PAA-style question, used as the H1. */
  question: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  intro: string[];
  answerHeading: string;
  answerParagraphs: string[];
  relatedLinks: { label: string; href: string }[];
  ctaHeading: string;
}

export const resourceGuides: ResourceGuide[] = [
  {
    slug: "brain-fog-warning-signs",
    question: "What Are the Warning Signs of Brain Fog?",
    metaTitle: "Warning Signs of Brain Fog | NeuroIntegrative Care",
    metaDescription:
      "Brain fog shows up as more than forgetfulness. Learn the common warning signs and when they're worth a root-cause evaluation.",
    kicker: "Brain Fog",
    intro: [
      "\"Brain fog\" isn't a medical diagnosis on its own, it's a catch-all for a cluster of symptoms that make thinking feel like wading through static. Most people notice it gradually, which is part of why it often goes unaddressed for months or years.",
    ],
    answerHeading: "The Signs Worth Paying Attention To",
    answerParagraphs: [
      "The most common warning signs include difficulty concentrating on tasks that used to be routine, forgetting words mid-sentence, losing the thread of a conversation, and a persistent mental fatigue that doesn't lift with rest or caffeine. Some people also notice slower processing speed, like needing more time to do simple math or follow directions.",
      "On its own, an occasional foggy day isn't unusual. It's worth a closer look when the pattern is persistent, worsening, or paired with other symptoms like fatigue, sleep disruption, or joint pain, since brain fog is frequently a downstream signal of something else, an autoimmune process, a toxin exposure, a nutrient deficiency, or a sleep and stress-hormone imbalance, rather than a standalone problem to manage on its own.",
      "Because the symptom is so nonspecific, it rarely gets investigated properly in a standard primary-care visit. A root-cause workup looks at inflammatory markers, nutrient status, toxin exposure, and sleep architecture together, rather than treating the fog as something to just push through.",
    ],
    relatedLinks: [
      { label: "Read our full guide to brain fog", href: "/conditions/brain-brightening/brain-fog" },
      { label: "See how neurofeedback supports focus and attention", href: "/tools/neurofeedback" },
    ],
    ctaHeading: "If brain fog has outlasted a few good nights of sleep, it's worth investigating.",
  },
  {
    slug: "is-neurofeedback-effective",
    question: "Is Neurofeedback Actually Effective?",
    metaTitle: "Is Neurofeedback Effective? | NeuroIntegrative Care",
    metaDescription:
      "An honest look at what neurofeedback can and can't do, what the research says, and how we measure whether it's working for you.",
    kicker: "Neurofeedback",
    intro: [
      "Neurofeedback has been studied for decades, most extensively for attention regulation, and has a reasonable evidence base compared to many behavioral interventions. That said, \"effective\" depends heavily on what's being trained, how consistently sessions happen, and whether progress is actually being measured.",
    ],
    answerHeading: "What Makes It Work, and What Doesn't",
    answerParagraphs: [
      "Neurofeedback works by showing the brain its own real-time activity and rewarding healthier patterns, essentially a repetition-based skill-training process rather than a passive treatment. Like any skill, it tends to work better with consistent sessions over time than with a handful of one-off visits.",
      "The honest caveat: results vary by person, and no legitimate protocol should promise a guaranteed outcome upfront. What separates effective use from a waste of money is measurement, mapping the brain's activity before training, tracking changes at intervals, and adjusting the protocol based on what the data actually shows, rather than running the same generic program regardless of response.",
    ],
    relatedLinks: [
      { label: "See our full neurofeedback guide", href: "/tools/neurofeedback" },
      { label: "Read about memory and cognitive support", href: "/conditions/brain-brightening/memory-and-cognitive-decline" },
    ],
    ctaHeading: "Get a qEEG brain map before deciding if neurofeedback makes sense for you.",
  },
  {
    slug: "what-does-neurofeedback-do",
    question: "What Does Neurofeedback Therapy Actually Do?",
    metaTitle: "What Does Neurofeedback Do? | NeuroIntegrative Care",
    metaDescription:
      "A plain-language explanation of how neurofeedback training works, from qEEG brain mapping to real-time feedback sessions.",
    kicker: "Neurofeedback",
    intro: [
      "Neurofeedback is often described in vague terms, \"brain training\", which doesn't explain much. Here's what actually happens, step by step.",
    ],
    answerHeading: "From Brain Map to Training Session",
    answerParagraphs: [
      "It starts with a qEEG brain map: sensors record your brain's electrical activity across different frequency bands (Delta through Gamma), and that map is compared against normative data to see where activity runs too high, too low, or poorly coordinated between regions.",
      "During a training session, sensors read your live brain activity while software scores it against your own map. You get real-time feedback, usually as a video or sound that responds to your brain state, and over repeated sessions, the brain tends to nudge itself toward the rewarded, more regulated pattern, without conscious effort on your part.",
      "Protocols are individualized to your own map, then re-mapped periodically so progress is measured rather than assumed.",
    ],
    relatedLinks: [
      { label: "See the full neurofeedback breakdown", href: "/tools/neurofeedback" },
    ],
    ctaHeading: "Start with a qEEG brain map to see what your own data shows.",
  },
  {
    slug: "neurofeedback-downsides-and-limitations",
    question: "What Is the Downside of Neurofeedback?",
    metaTitle: "Downsides of Neurofeedback | NeuroIntegrative Care",
    metaDescription:
      "An honest look at the real limitations of neurofeedback: time commitment, cost, and why it isn't the right fit for every situation.",
    kicker: "Neurofeedback",
    intro: [
      "No therapy is a fit for everyone, and neurofeedback has real limitations worth knowing before you start.",
    ],
    answerHeading: "The Honest Limitations",
    answerParagraphs: [
      "The biggest one is time: meaningful change typically requires a course of sessions over weeks to months, not a single visit. Patients looking for an immediate fix are usually better served by addressing an acute, urgent issue through standard medical care first.",
      "It also isn't a substitute for treating an underlying medical condition. If fatigue, poor focus, or emotional dysregulation is being driven by an autoimmune process, a toxin exposure, or a sleep disorder, neurofeedback works best alongside that root-cause workup, not as a stand-alone fix for a problem it wasn't designed to solve.",
      "Cost and access are real factors too. Because it isn't always covered by insurance, it's worth having a clear conversation about expected timelines and how progress will be measured before committing to a full protocol.",
    ],
    relatedLinks: [
      { label: "See how neurofeedback fits into a full workup", href: "/tools/neurofeedback" },
    ],
    ctaHeading: "Ask us directly whether neurofeedback fits your situation before starting.",
  },
  {
    slug: "what-does-pemf-therapy-do",
    question: "What Does PEMF Therapy Actually Do?",
    metaTitle: "What Does PEMF Actually Do? | NeuroIntegrative Care",
    metaDescription:
      "A plain-language explanation of pulsed electromagnetic field (PEMF) therapy and how it's used as a supporting therapy in-clinic.",
    kicker: "PEMF Therapy",
    intro: [
      "PEMF (pulsed electromagnetic field) therapy gets discussed in very different ways online, from serious clinical literature to overstated marketing claims. Here's the plain version.",
    ],
    answerHeading: "How PEMF Works",
    answerParagraphs: [
      "PEMF delivers a low-level, rhythmic magnetic pulse to tissue, which is thought to support local circulation and cellular energy production (ATP) at the level of the cell membrane. It's non-invasive, painless, and typically applied over a specific area for a set number of minutes per session.",
      "In our clinic, PEMF is used as a supporting therapy, generally alongside neurofeedback, functional neurology work, or regenerative care, rather than as a stand-alone treatment for a specific diagnosis. We don't market it as a cure for any condition; it's one tool among several used to support the body's own repair processes.",
    ],
    relatedLinks: [
      { label: "See our full PEMF therapy page", href: "/tools/pemf" },
    ],
    ctaHeading: "Ask us whether PEMF fits into your treatment plan.",
  },
  {
    slug: "pemf-therapy-side-effects-and-safety",
    question: "What Are the Side Effects of PEMF Therapy?",
    metaTitle: "PEMF Therapy Side Effects & Safety | NeuroIntegrative Care",
    metaDescription:
      "What to know about PEMF therapy's safety profile, mild side effects, and who should check with a provider before starting.",
    kicker: "PEMF Therapy",
    intro: [
      "PEMF has a strong safety record for most people, but like any therapy, it isn't universally appropriate.",
    ],
    answerHeading: "What to Know Before Starting",
    answerParagraphs: [
      "Reported side effects are generally mild and uncommon, occasional light-headedness, temporary tingling, or mild fatigue after a session. Most patients tolerate it without any noticeable reaction at all.",
      "PEMF is generally not recommended during pregnancy, for patients with an implanted electronic device (such as a pacemaker), or for those with active bleeding or certain seizure disorders, without a provider's clearance first. As with any therapy discussed on this site, this isn't a substitute for a conversation with your provider about your specific health history.",
    ],
    relatedLinks: [
      { label: "See our full PEMF therapy page", href: "/tools/pemf" },
    ],
    ctaHeading: "Talk to us about whether PEMF is appropriate for your health history.",
  },
  {
    slug: "how-often-for-pemf-therapy",
    question: "How Often Should You Do PEMF Therapy?",
    metaTitle: "How Often for PEMF Therapy? | NeuroIntegrative Care",
    metaDescription:
      "How PEMF therapy session frequency is typically structured, and why the right cadence depends on what it's supporting.",
    kicker: "PEMF Therapy",
    intro: [
      "There's no single universal schedule for PEMF, frequency depends on what it's being used to support and how a patient responds.",
    ],
    answerHeading: "How Frequency Is Typically Structured",
    answerParagraphs: [
      "In-clinic PEMF is usually built into a broader treatment plan, often paired with a same-visit therapy like neurofeedback, and scheduled at a cadence that matches the rest of that plan rather than run as an isolated, stand-alone protocol.",
      "We set the specific frequency and duration during your evaluation based on what we're supporting and how you're responding over the first few sessions, rather than applying a fixed, one-size-fits-all schedule to every patient.",
    ],
    relatedLinks: [
      { label: "See our full PEMF therapy page", href: "/tools/pemf" },
    ],
    ctaHeading: "Get an evaluation before committing to a PEMF schedule.",
  },
  {
    slug: "heavy-metal-toxicity-symptoms",
    question: "What Are the Symptoms of Having Heavy Metals in Your Body?",
    metaTitle: "Heavy Metal Toxicity Symptoms | NeuroIntegrative Care",
    metaDescription:
      "Common symptoms linked to heavy metal exposure, and why they're frequently mistaken for other, more common conditions.",
    kicker: "Detoxification",
    intro: [
      "Heavy metal exposure (lead, mercury, arsenic, and others) produces symptoms that overlap heavily with far more common conditions, which is exactly why it's so often missed.",
    ],
    answerHeading: "Common Symptoms Tied to Metal Exposure",
    answerParagraphs: [
      "Reported symptoms include persistent fatigue, brain fog, joint and muscle pain, digestive complaints, headaches, and in some cases numbness or tingling in the hands and feet. Because none of these are specific to heavy metal exposure on their own, they're routinely attributed to stress, aging, or an unrelated diagnosis without ever being tested for.",
      "Testing typically involves blood or urine panels for specific metals, sometimes with a provoked (chelation-agent-assisted) urine test in a clinical setting when clinically indicated. Symptom patterns alone aren't diagnostic, an actual lab panel is what confirms or rules out a metals-related driver.",
    ],
    relatedLinks: [
      { label: "See our detoxification support approach", href: "/tools/detoxification" },
      { label: "Read about environmental toxin exposure", href: "/conditions/environmental-toxins/toxin-mold-illness" },
    ],
    ctaHeading: "If your symptoms don't have a clear explanation, ask about a toxin panel.",
  },
  {
    slug: "how-to-flush-heavy-metals-from-the-body",
    question: "How Do You Flush Heavy Metals Out of Your Body?",
    metaTitle: "How to Flush Heavy Metals From the Body | NeuroIntegrative Care",
    metaDescription:
      "Why heavy metal detox should start with testing, and how supported detoxification works once a real exposure is confirmed.",
    kicker: "Detoxification",
    intro: [
      "There's no shortage of supplement and smoothie protocols online claiming to \"flush\" heavy metals. The responsible answer starts a step earlier than that.",
    ],
    answerHeading: "Test First, Then Support the Right Pathway",
    answerParagraphs: [
      "The body has its own detox pathways (primarily the liver and kidneys) for clearing many toxins, and supporting those pathways works best when there's a confirmed exposure to actually address, rather than a generic cleanse run on a hunch.",
      "Once a metals panel confirms an elevated level, supported detoxification is approached carefully and individually, since some methods carry real risks if used without appropriate monitoring. This isn't something we'd recommend self-directing based on an internet protocol; it should be guided by an actual lab result and a provider who's tracking your levels over time.",
    ],
    relatedLinks: [
      { label: "See our detoxification support approach", href: "/tools/detoxification" },
    ],
    ctaHeading: "Get tested before starting any detox protocol.",
  },
  {
    slug: "how-long-heavy-metals-take-to-leave-the-body",
    question: "How Long Does It Take for Heavy Metals to Leave the Body?",
    metaTitle: "How Long Do Heavy Metals Take to Leave the Body?",
    metaDescription:
      "Why heavy metal clearance timelines vary widely by metal type, exposure length, and individual health factors.",
    kicker: "Detoxification",
    intro: [
      "There's no single timeline here, it depends heavily on which metal, how long the exposure lasted, and a person's individual liver and kidney function.",
    ],
    answerHeading: "Why Timelines Vary So Much",
    answerParagraphs: [
      "Some metals clear relatively quickly once exposure stops; others, like lead, can be stored in bone and released slowly over years. A single exposure clears differently than a chronic, ongoing one, and clearance can be slower in someone with impaired kidney or liver function.",
      "Rather than estimate a generic timeline, we retest levels at intervals during supported detoxification, so progress is tracked against your own actual lab values instead of a guess.",
    ],
    relatedLinks: [
      { label: "See our detoxification support approach", href: "/tools/detoxification" },
    ],
    ctaHeading: "Track your actual levels instead of guessing at a timeline.",
  },
  {
    slug: "how-to-tell-if-mold-is-making-you-sick",
    question: "How Do You Tell If Mold Is Making You Sick?",
    metaTitle: "How to Tell If Mold Is Making You Sick | NeuroIntegrative Care",
    metaDescription:
      "The symptom patterns and testing that help distinguish mold-related illness from other chronic conditions with overlapping symptoms.",
    kicker: "Mold & Toxin Illness",
    intro: [
      "Mold-related illness is one of the most commonly missed diagnoses in chronic, unexplained symptom cases, largely because its symptoms overlap with dozens of other conditions.",
    ],
    answerHeading: "Signs Worth Investigating",
    answerParagraphs: [
      "Common patterns include chronic fatigue, brain fog, sinus and respiratory irritation, headaches, joint pain, and symptoms that noticeably worsen in a specific building (home or workplace) and improve when away from it. That last pattern, symptoms tied to a specific environment, is one of the more telling clues.",
      "A real answer requires testing, both environmental (checking the suspected space for mold and moisture) and clinical (inflammatory and mycotoxin markers), rather than relying on symptoms alone. We investigate both sides together as part of a full workup.",
    ],
    relatedLinks: [
      { label: "Read our full guide to mold and toxin illness", href: "/conditions/environmental-toxins/toxin-mold-illness" },
    ],
    ctaHeading: "If your symptoms track a specific building, it's worth investigating.",
  },
  {
    slug: "mold-toxicity-warning-signs",
    question: "What Are the Warning Signs of Mold Toxicity?",
    metaTitle: "Warning Signs of Mold Toxicity | NeuroIntegrative Care",
    metaDescription:
      "The most commonly reported warning signs of mold-related illness, and why they're so frequently misattributed to other conditions.",
    kicker: "Mold & Toxin Illness",
    intro: [
      "Mold toxicity symptoms are wide-ranging, which is part of why they're so often missed or misattributed to unrelated conditions.",
    ],
    answerHeading: "Reported Warning Signs",
    answerParagraphs: [
      "Frequently reported signs include chronic fatigue, brain fog and short-term memory issues, chronic sinus congestion, unexplained joint or muscle pain, headaches, mood changes, and heightened sensitivity to other chemicals or smells. Digestive symptoms and unusual sweating patterns are also commonly reported.",
      "None of these are exclusive to mold exposure on their own, which is exactly why a proper workup pairs symptom review with actual environmental and lab testing rather than relying on a symptom checklist alone.",
    ],
    relatedLinks: [
      { label: "Read our full guide to mold and toxin illness", href: "/conditions/environmental-toxins/toxin-mold-illness" },
    ],
    ctaHeading: "Get tested rather than guess at a mold connection.",
  },
  {
    slug: "mold-exposure-recovery-timeline",
    question: "How Long Does It Take to Heal From Mold Exposure?",
    metaTitle: "Mold Exposure Recovery Timeline | NeuroIntegrative Care",
    metaDescription:
      "Why mold-related illness recovery timelines vary by exposure length, individual immune response, and how quickly the source is removed.",
    kicker: "Mold & Toxin Illness",
    intro: [
      "Recovery timelines from mold-related illness vary considerably from patient to patient, there's no fixed number of weeks that applies to everyone.",
    ],
    answerHeading: "What Affects the Timeline",
    answerParagraphs: [
      "Key factors include how long the exposure lasted, how quickly the source (the moldy building or space) is identified and remediated, and individual differences in immune and detoxification function. Continued exposure while attempting to treat symptoms tends to stall progress regardless of what else is being done.",
      "We track recovery against objective markers, inflammatory and mycotoxin levels, symptom logs, over the course of care, rather than promising a specific timeline upfront.",
    ],
    relatedLinks: [
      { label: "Read our full guide to mold and toxin illness", href: "/conditions/environmental-toxins/toxin-mold-illness" },
    ],
    ctaHeading: "Start with testing to build a realistic recovery plan.",
  },
  {
    slug: "chronic-fatigue-syndrome-symptoms",
    question: "What Are the Symptoms of Chronic Fatigue Syndrome?",
    metaTitle: "Chronic Fatigue Syndrome Symptoms | NeuroIntegrative Care",
    metaDescription:
      "The core symptoms of chronic fatigue syndrome (ME/CFS), and why a root-cause workup looks beyond fatigue alone.",
    kicker: "Chronic Fatigue & Sleep",
    intro: [
      "Chronic fatigue syndrome (also called ME/CFS) is defined by more than just feeling tired, it's a specific, recognizable symptom pattern.",
    ],
    answerHeading: "The Core Symptom Pattern",
    answerParagraphs: [
      "The hallmark symptoms include profound fatigue lasting six months or more that isn't improved by rest, post-exertional malaise (a crash in symptoms after physical or mental effort that's disproportionate to the activity), unrefreshing sleep, and often cognitive difficulties ('brain fog') and pain in muscles or joints. Some patients also experience lightheadedness on standing.",
      "Because these symptoms overlap with autoimmune disease, thyroid dysfunction, sleep disorders, and mold or toxin exposure, a proper workup looks at all of these systems rather than treating fatigue as its own isolated diagnosis.",
    ],
    relatedLinks: [
      { label: "Read our full guide to chronic fatigue and sleep", href: "/conditions/longevity-science/chronic-fatigue-and-sleep" },
    ],
    ctaHeading: "Get the full workup instead of another \"just manage your stress\" conversation.",
  },
  {
    slug: "conditions-mistaken-for-chronic-fatigue-syndrome",
    question: "What Is Mistaken for Chronic Fatigue Syndrome?",
    metaTitle: "Conditions Mistaken for Chronic Fatigue Syndrome",
    metaDescription:
      "The conditions most commonly confused with or misdiagnosed as chronic fatigue syndrome, and why a differential workup matters.",
    kicker: "Chronic Fatigue & Sleep",
    intro: [
      "Chronic fatigue syndrome is frequently a diagnosis of exclusion, and several other conditions produce a similar fatigue pattern.",
    ],
    answerHeading: "Conditions With Overlapping Symptoms",
    answerParagraphs: [
      "Thyroid dysfunction, sleep apnea, anemia, autoimmune conditions, mold or toxin exposure, and certain nutrient deficiencies (like B12 or iron) can all produce persistent fatigue that looks similar on the surface. Depression and anxiety can also present with significant fatigue, and often coexist alongside a physical driver rather than instead of one.",
      "This is exactly why a differential workup, testing broadly across these systems before settling on a diagnosis, matters more than treating the fatigue label itself.",
    ],
    relatedLinks: [
      { label: "Read our full guide to chronic fatigue and sleep", href: "/conditions/longevity-science/chronic-fatigue-and-sleep" },
    ],
    ctaHeading: "Rule out the overlapping conditions before accepting a CFS label.",
  },
];

export function findResourceGuide(slug: string) {
  return resourceGuides.find((r) => r.slug === slug);
}
