import {
  Activity,
  Bone,
  Brain,
  Droplets,
  Search,
  Sparkles,
  Wheat,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { LP_THANK_YOU_PATH } from "@/lib/ghl-form";

const STEPS = [
  {
    number: "01",
    title: "Find it",
    detail: "Urine testing for five categories of toxin exposure.",
  },
  {
    number: "02",
    title: "Trace it",
    detail:
      "Review results together and investigate possible sources in your home, food, water, or workplace.",
  },
  {
    number: "03",
    title: "Clear it",
    detail:
      "Create a personalized plan to reduce exposure and support the body’s detox processes.",
  },
] as const;

const TRIGGERS = [
  { n: 1, label: "Food Antigens", isNew: false },
  { n: 2, label: "Metals", isNew: false },
  { n: 3, label: "Stress", isNew: false },
  { n: 4, label: "Hormones – Pregnancy", isNew: false },
  { n: 5, label: "Pesticides & Poisons", isNew: false },
  { n: 6, label: "Trauma", isNew: false },
  { n: 7, label: "Mold & Mycotoxins", isNew: true },
  { n: 8, label: "Microplastics & Perfumes / Fragrance", isNew: true },
] as const;

const TISSUES: {
  title: string;
  items: readonly string[];
  icon: LucideIcon;
  accent: string;
  panel: string;
}[] = [
  {
    title: "Thyroid & Endocrine Disruption",
    items: [
      "Type 1 Diabetes",
      "Hashimoto’s Thyroiditis",
      "Graves’ Disease",
    ],
    icon: Activity,
    accent: "text-[#c2185b]",
    panel: "border-[#f8bbd0] bg-[#fce4ec]",
  },
  {
    title: "Brain",
    items: [
      "Alzheimer’s Disease",
      "Multiple Sclerosis",
      "Autism",
      "Guillain-Barré Syndrome",
    ],
    icon: Brain,
    accent: "text-[#5e35b1]",
    panel: "border-[#d1c4e9] bg-[#ede7f6]",
  },
  {
    title: "Blood",
    items: ["Dysglycemia", "Leukemia", "Lupus", "Hemolytic Anemia"],
    icon: Droplets,
    accent: "text-[#c62828]",
    panel: "border-[#ffcdd2] bg-[#ffebee]",
  },
  {
    title: "Bones & Joints",
    items: [
      "Rheumatoid Arthritis",
      "Ankylosing Spondylitis",
      "Polymyalgia Rheumatica",
    ],
    icon: Bone,
    accent: "text-[#1565c0]",
    panel: "border-[#bbdefb] bg-[#e3f2fd]",
  },
  {
    title: "GI Tract",
    items: [
      "Gluten & Dairy Intolerance",
      "Celiac",
      "Crohn’s Disease",
      "Ulcerative Colitis",
    ],
    icon: Wheat,
    accent: "text-[#ef6c00]",
    panel: "border-[#ffe0b2] bg-[#fff3e0]",
  },
  {
    title: "Muscles",
    items: ["Fibromyalgia", "Muscular Dystrophy"],
    icon: Activity,
    accent: "text-[#d84315]",
    panel: "border-[#ffccbc] bg-[#fbe9e7]",
  },
  {
    title: "Nerves",
    items: ["Peripheral Neuropathy", "Diabetic Neuropathy"],
    icon: Zap,
    accent: "text-[#f9a825]",
    panel: "border-[#fff59d] bg-[#fffde7]",
  },
  {
    title: "Lungs",
    items: ["Asthma", "Granulomatosis with Polyangiitis (Wegener’s)"],
    icon: Wind,
    accent: "text-[#00838f]",
    panel: "border-[#b2ebf2] bg-[#e0f7fa]",
  },
  {
    title: "Skin",
    items: ["Eczema", "Psoriasis", "Scleroderma", "Vitiligo"],
    icon: Sparkles,
    accent: "text-[#2e7d32]",
    panel: "border-[#c8e6c9] bg-[#e8f5e9]",
  },
];

function BookCta({
  className = "",
  align = "center",
}: {
  className?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex flex-col ${align === "start" ? "items-center lg:items-start" : "items-center"} ${className}`}
    >
      <BrainAssessmentButton href={LP_THANK_YOU_PATH} />
      <p
        className={`mt-4 max-w-md text-sm leading-relaxed text-muted ${align === "start" ? "text-center lg:text-left" : "text-center"}`}
      >
        Choose a time on the next page. He accepts only five new patients per
        month.
      </p>
    </div>
  );
}

export default function DetoxDetectiveVsl() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink pt-28 text-paper lg:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(243,180,42,0.16),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-28 text-center lg:px-10 lg:pb-32">
          <Reveal>
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
              Detox Detective Program
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Watch This Video to Discover the Detox Detective Program
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-paper/80">
              For people experiencing fatigue, brain fog, memory issues,
              stubborn weight, or other unexplained symptoms despite normal
              routine labs.
            </p>
          </Reveal>

          <Reveal delay={120} offset={24} className="mt-10">
            <div className="overflow-hidden rounded-[1.6rem] border border-paper/10 bg-ink shadow-[0_40px_80px_-28px_rgba(0,0,0,0.65)]">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/videos/detox-detective-poster.jpg"
                className="aspect-video h-full w-full bg-ink object-contain"
              >
                <source src="/videos/detox-detective.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-10">
            <p className="font-serif text-3xl leading-tight tracking-tight text-amber-b sm:text-4xl">
              Can&apos;t find it, can&apos;t fix it.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-paper/80">
              &ldquo;I want you to be the detective of your own health.&rdquo;
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-paper/70">
              Book a FREE discovery call with Dr. Santucci to discuss symptoms,
              history, and whether the program is a fit.
            </p>
            <div className="mt-7">
              <BrainAssessmentButton href={LP_THANK_YOU_PATH} />
              <p className="mt-4 text-sm text-paper/60">
                Choose a time on the next page. He accepts only five new
                patients per month.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal className="text-center lg:text-left">
                <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                  Three-Step Approach
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                  Find it. Trace it. Clear it.
                </h2>
              </Reveal>

              <ol className="mt-8 space-y-4">
                {STEPS.map((step, i) => (
                  <Reveal
                    key={step.title}
                    as="li"
                    delay={120 + i * 80}
                    offset={20}
                  >
                    <article className="flex h-full flex-col rounded-2xl border border-amber/30 bg-amber-soft p-6 text-left shadow-[0_16px_36px_-22px_rgba(232,160,32,0.7)] sm:p-7">
                      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-amber">
                        {step.number}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl leading-tight text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                        {step.detail}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div className="lg:border-l lg:border-rule lg:pl-16">
              <Reveal className="text-center lg:text-left">
                <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                  His Own Experience
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                  Finding toxin exposures
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Dr. Santucci shares his own experience finding toxin
                  exposures. Living in a 1930s home, urine testing found
                  arsenic, mercury, and mycotoxins. He then looked at food,
                  water, cookware, and environment.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  If you don&apos;t know, you can&apos;t heal.
                </p>
              </Reveal>
              <BookCta align="start" className="mt-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Tissues Affected
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Tissues Affected by Autoimmunity
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-12">
            <div className="rounded-[1.75rem] border border-ink/10 bg-paper-2 p-5 shadow-[0_24px_60px_-36px_rgba(11,18,32,0.45)] sm:p-8 lg:p-10">
              <div className="mx-auto max-w-2xl rounded-2xl border-2 border-ink/80 bg-paper px-5 py-6 text-center sm:px-8">
                <p className="font-serif text-xl text-ink">Triggers</p>
                <ol className="mt-4 grid gap-2 text-left sm:grid-cols-2">
                  {TRIGGERS.map((trigger) => (
                    <li
                      key={trigger.n}
                      className="flex items-start gap-2 text-[15px] leading-snug text-ink"
                    >
                      <span className="font-mono text-[12px] font-semibold text-amber">
                        {trigger.n}.
                      </span>
                      <span>
                        {trigger.label}
                        {trigger.isNew ? (
                          <span className="ml-2 inline-flex rounded-full bg-[#1b5e20] px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-paper">
                            New
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 flex justify-center">
                <p className="inline-flex items-center gap-2 rounded-full border-2 border-amber bg-gradient-to-r from-amber to-amber-b px-5 py-2.5 font-serif text-lg text-ink shadow-[0_12px_28px_-12px_rgba(232,160,32,0.85)]">
                  <Search size={18} aria-hidden="true" />
                  Autoimmune Disorder
                </p>
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {TISSUES.map((tissue) => (
                  <li key={tissue.title}>
                    <article
                      className={`flex h-full flex-col rounded-2xl border p-5 text-left ${tissue.panel}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full bg-paper/80 ${tissue.accent}`}
                        >
                          <tissue.icon size={18} aria-hidden="true" />
                        </span>
                        <h3
                          className={`font-serif text-[1.05rem] leading-tight ${tissue.accent}`}
                        >
                          {tissue.title}
                        </h3>
                      </div>
                      <ul className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-ink/80">
                        {tissue.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Trademark: Dr. Thomas A Santucci · May 1, 2013 · Triggers
                updated October 2026
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Two Offers
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Start with a FREE discovery call
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal offset={20}>
              <article className="flex h-full flex-col rounded-2xl border border-amber/40 bg-paper p-8 shadow-[0_18px_40px_-24px_rgba(232,160,32,0.7)]">
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-amber">
                  Free
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-ink">
                  FREE discovery call with Dr. Santucci
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Discuss symptoms, history, and whether the program is a fit.
                </p>
                <div className="mt-8">
                  <BrainAssessmentButton href={LP_THANK_YOU_PATH} />
                </div>
              </article>
            </Reveal>
            <Reveal delay={100} offset={20}>
              <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-ink p-8 text-paper shadow-[0_18px_40px_-24px_rgba(11,18,32,0.55)]">
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-amber-b">
                  Program
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-tight">
                  Detox Detective Program
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-paper/80">
                  Testing, a one-on-one results review, source investigation,
                  and a personalized plan. He accepts only five new patients
                  per month.
                </p>
              </article>
            </Reveal>
          </div>

          <BookCta className="mt-14" />
        </div>
      </section>
    </>
  );
}
