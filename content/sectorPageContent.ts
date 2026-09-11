// COMPLIANCE: All condition pages must stay in functional-medicine scope —
// "investigate," "identify," "support." Never phrase as diagnosis or cure guarantee.
//
// The "dismissals" copy names things patients commonly report having heard
// elsewhere — it is not a clinical claim about any specific provider. Keep it
// empathetic, general, and rooted in what the site can actually offer:
// an investigation, not a promise.

export interface SectorWorkupStep {
  number: "01" | "02" | "03";
  title: "IDENTIFY" | "REBUILD" | "SUSTAIN";
  body: string;
}

export interface SectorPageContent {
  /** 2-3 sentences naming the dismissals a patient has commonly already heard. */
  dismissals: string;
  /** IDENTIFY / REBUILD / SUSTAIN — sector-tailored language. */
  workupSteps: SectorWorkupStep[];
}

// TODO: All copy in this file is draft — flag for client sign-off before publishing.
export const sectorPageContent: Record<string, SectorPageContent> = {
  "autoimmune-investigation": {
    dismissals:
      "You've probably been told it's stress. Or that your bloodwork looks normal, so there's nothing to worry about. Or that flares are just something you'll have to manage. None of those answers named a driver, because no one was looking for one.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "We run the panels standard care skips (predictive-antibody markers, gut-barrier and molecular-mimicry testing, food-sensitivity and microbiome analysis, and a review of environmental exposure) to name the actual triggers behind the flare.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Care is targeted at what the investigation surfaced: nutrition matched to your triggers, gut repair where the barrier has broken down, and environmental change to lower the immune load, instead of only quieting symptoms.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We re-run the same markers to confirm the immune system is actually calming down, then protect the gains with an ongoing plan, so the flare pattern doesn't drift back.",
      },
    ],
  },

  "brain-brightening": {
    dismissals:
      "You've probably been told it's just aging. Or that your MRI came back clean, so there's nothing to worry about. Or to sleep more and try to relax. Meanwhile the sharpness you knew is still missing, because standard imaging doesn't measure how your brain is actually operating.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "A 19-channel QEEG brain map shows how your brain is actually running, alongside markers for cerebral blood flow, mitochondrial energy, neurotransmitter balance, blood sugar, and inflammation, the systems cognition depends on.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Care is targeted at what the map shows: neurofeedback to retrain the specific regions that fell out of pattern, photobiomodulation to restore cellular energy, and nutrient support matched to the deficits we found.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We repeat the brain map to confirm the changes are real and ongoing, then protect the gains with a personalized cognitive-health plan (sleep, movement, nutrition, and continued training as needed).",
      },
    ],
  },

  "concussion-post-trauma": {
    dismissals:
      "You've probably been told to rest it off. Or that too much time has passed for recovery to still be on the table. Or that your CT scan was normal, so the hit couldn't be the cause. The systems concussion actually disrupts don't show up on a CT.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "A functional-neurology exam maps exactly which circuits the hit disrupted (vestibular and ocular reflexes, autonomic regulation, cognitive processing), alongside brain mapping and, where relevant, neurotransmitter and adrenal panels.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Active rehab replaces 'rest and wait': vestibular and oculomotor retraining, autonomic regulation work, violet-laser support for cellular energy, and hands-on functional-neurology therapy tuned to the affected circuits.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We retest the same circuits to confirm they're actually holding, then set a maintenance plan so the recovery you rebuilt doesn't quietly regress under the next stress.",
      },
    ],
  },

  "environmental-toxins": {
    dismissals:
      "You've probably been told everyone's exposed to some level of these things, so it can't be the driver. Or that detox is a fad. Or that your standard labs are fine. What was never tested is the actual exposure, or how well your body is clearing it.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "We test the exposure itself (urine mycotoxin and heavy-metal panels) alongside how your body clears toxins, including genetic detox variants like MTHFR and other pathway markers.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Care supports your own drainage and detox pathways so the burden is actually cleared, alongside changes that reduce ongoing exposure, instead of chasing symptoms downstream.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We retest the burden to confirm it's coming down, then protect the clearance you built with a maintenance plan matched to your genetics and environment.",
      },
    ],
  },

  "longevity-science": {
    dismissals:
      "You've probably been told you're fine for your age. Or handed a bag of supplements. Or told to eat well and exercise. What no one measured is where you actually stand, biologically, cellularly, in the systems that age fastest.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "We measure biological age directly: epigenetic-clock testing, mitochondrial-function markers, and cellular-senescence indicators, a picture of where your systems actually stand versus your birthdate.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Care is personalized to what the panels show: nutrition, movement, NAD+ pathway support, and targeted lifestyle change aimed at slowing cellular aging, brain-first, evidence-anchored.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We re-run the biological-age markers to confirm the direction has actually changed, then adjust the plan against measured results instead of guessing.",
      },
    ],
  },

  "idiopathic-unexplained": {
    dismissals:
      "You've probably been told the tests came back normal, so nothing must be wrong. Or that it's stress, or anxiety, or in your head. Or that you'll have to learn to live with it. None of those are an investigation, they're a shrug.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "We investigate the systems standard care checks in isolation (metabolic, neurological, immune, and hormonal) together, which is where 'idiopathic' cases usually reveal their actual driver.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Once the driver is named, care is aimed directly at it, with the same drug-free toolkit used across the rest of the practice, matched to what the workup surfaced.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We retest the same markers to confirm the change is measurable, not just symptomatic, then set the ongoing plan that keeps the finding from drifting back.",
      },
    ],
  },

  // Sub-condition entries. Same interface, one tier down. Copy is draft — see
  // TODO at top of file. Parent-sector pairings are tracked in conditions.ts.

  erchonia: {
    dismissals:
      "You've probably seen cheap 'cold laser' pens marketed for everything from pain to wrinkles, and assumed photobiomodulation was more wellness fad than real medicine. The FX-405 is FDA-cleared clinical technology, backed by published trial data, not a gadget.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "We evaluate where photobiomodulation actually fits your care: nerve repair, post-concussion recovery, autoimmune-driven inflammation, or chronic and acute pain, applied where the evidence supports it, not as a blanket add-on.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "The violet and infrared wavelengths are absorbed directly by mitochondria, boosting cellular energy (ATP) and reducing inflammation at the treatment site, non-invasive, painless, and drug-free.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We track the objective markers tied to whatever it's treating (nerve function, pain and mobility, inflammatory markers) to confirm the laser is producing real, measurable change, not just a feeling of relief.",
      },
    ],
  },

  "chronic-acute-pain": {
    dismissals:
      "You've probably been told to manage it with medication, live with it, or consider surgery as the only real option. Opioids blunt the signal without addressing the tissue, and many patients are looking for a non-invasive option before taking that route.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "We evaluate where the pain originates and whether the FX-405 violet laser, an FDA-cleared option for chronic and acute pain, including chronic low back pain, is a fit alongside the rest of your care.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Photobiomodulation from the violet and infrared wavelengths is absorbed directly by mitochondria, boosting cellular energy and reducing local inflammation at the site of injury, non-invasive, painless, and drug-free.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We track your pain and function over the course of care to confirm the improvement is holding, then set a maintenance plan so relief doesn't quietly fade.",
      },
    ],
  },

  neuropathy: {
    dismissals:
      "You've probably been told nerve damage doesn't reverse. Or that pain meds are the only option. Or that there's nothing else to try. What was never done was a real workup for the driver (B12 status, toxin load, autoimmune activity) instead of chasing the symptom.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "B12 and methylation panels, heavy-metal and toxin exposure testing, autoimmune markers, and a functional nerve assessment, to name what's actually driving the nerve damage.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Care is matched to the driver: violet laser and Neogen therapy to support cellular repair, targeted nutrient repletion, and immune or detox work where the workup points there.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We retest the same markers and objective strength measures to confirm the pattern is actually changing, then protect nerve health with an ongoing plan.",
      },
    ],
  },

  "sleep-fatigue": {
    dismissals:
      "You've probably been told to try melatonin. Or that your labs are fine. Or that everyone your age is tired. What was never investigated is which system is actually failing (circadian, HPA-axis, or mitochondrial) and treating the wrong one keeps the pattern in place.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "Cortisol rhythm across the day (HPA-axis panel), circadian and sleep-architecture assessment, mitochondrial-function markers, and neurotransmitter panels, to see which system is actually running the pattern.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Neurofeedback and autonomic training aimed at the specific driver we surfaced (not a generic 'sleep hygiene' handout), supported by nutrient work matched to the deficits.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We retest the markers to confirm the sleep-wake pattern is actually resetting, then set the ongoing routine that keeps it stable.",
      },
    ],
  },

  "balance-strength": {
    dismissals:
      "You've probably been told it's just aging. Or that a walker or a fall plan is the best option. Or to be more careful on stairs. What was never done was a functional-neurology exam to see which balance system is actually offline, and to retrain it.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "A vestibular exam, proprioceptive testing, gait and balance assessment, and a functional strength baseline (including objective grip and leg-strength measures) so the deficits are named, not guessed.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Targeted retraining of the specific system that surfaced (vestibular, proprioceptive, or motor) plus strength work matched to the measured deficits and hands-on functional-neurology therapy.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We remeasure the same objective markers to confirm the gains are holding, then protect them with an ongoing home program and periodic reassessment.",
      },
    ],
  },

  "memory-cognition": {
    dismissals:
      "You've probably been told it's normal aging. Or that your imaging looks clean. Or that there's nothing to do until symptoms get worse. What no one investigated is the full range of contributors (vascular, metabolic, inflammatory, toxin) while there's still room to intervene.",
    workupSteps: [
      {
        number: "01",
        title: "IDENTIFY",
        body: "Cognitive testing alongside vascular markers, metabolic and blood-sugar workup, inflammatory panels, and toxin and heavy-metal assessment, the full range of contributors, checked together.",
      },
      {
        number: "02",
        title: "REBUILD",
        body: "Early, non-drug intervention aimed at whichever contributors surfaced, neurofeedback and photobiomodulation where relevant, alongside nutrition and lifestyle work matched to the panels.",
      },
      {
        number: "03",
        title: "SUSTAIN",
        body: "We retest the cognitive markers to confirm the trajectory has actually changed, then protect gains with an ongoing plan tuned to the same measured markers.",
      },
    ],
  },
};
