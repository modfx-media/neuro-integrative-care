import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Zap,
  Brain,
  Waves,
  Activity,
  Radio,
  Thermometer,
} from "lucide-react";
import Link from "next/link";
import { jsonLdScript } from "@/lib/jsonLd";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/technology`;

// Per client request (Sept 16 2026): a name-only grid. Descriptions weren't
// supplied for the four new items, so nothing clinical is invented here —
// only the icon/kicker/href are set, and only where that detail already
// exists elsewhere on the site (Violet Laser Therapy + qEEG & Neurofeedback
// have full write-ups at /tools; their kicker text is copied verbatim from
// content/tools.ts, not authored here).
interface TechnologyItem {
  name: string;
  kicker: string;
  icon: LucideIcon;
  href?: string;
}

const TECHNOLOGY_ITEMS: TechnologyItem[] = [
  {
    name: "Violet Laser Therapy",
    kicker: "Photobiomodulation",
    icon: Zap,
    href: "/tools/violet-laser",
  },
  {
    name: "qEEG & Neurofeedback",
    kicker: "qEEG-Guided Training",
    icon: Brain,
    href: "/tools/neurofeedback",
  },
  { name: "Miracle Wave", kicker: "In-Clinic Technology", icon: Waves },
  {
    name: "Neogen Neuropathy Treatment",
    kicker: "In-Clinic Technology",
    icon: Activity,
  },
  { name: "Pulse PEMF", kicker: "In-Clinic Technology", icon: Radio },
  {
    name: "Thermal Photography",
    kicker: "In-Clinic Technology",
    icon: Thermometer,
  },
];

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The non-invasive, drug-free technology used at NeuroIntegrative Care of Los Gatos: Violet Laser Therapy, qEEG & Neurofeedback, Miracle Wave, Neogen Neuropathy Treatment, Pulse PEMF, and Thermal Photography.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Technology | NeuroIntegrative Care of Los Gatos",
    description:
      "The non-invasive, drug-free technology used at NeuroIntegrative Care of Los Gatos.",
    url: "/technology",
    type: "article",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Technology | NeuroIntegrative Care of Los Gatos",
  description: metadata.description,
  url: PAGE_URL,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "NeuroIntegrative Care of Los Gatos",
    url: `${SITE_URL}/`,
  },
  specialty: { "@type": "MedicalSpecialty", name: "Neurology" },
  audience: { "@type": "MedicalAudience", audienceType: "Patient" },
};

export default function TechnologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink py-28 text-paper lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[15%] bottom-[-30%] h-[60vh] w-[60vh] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.22), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber"
          >
            Our Technology
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Non-invasive. Drug-free.
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-2xl font-serif text-[1.35rem] leading-[1.4] text-paper/80 sm:text-[1.55rem]"
          >
            The instruments behind the investigation, used together and
            matched to what your workup actually surfaces.
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* Boxes */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {TECHNOLOGY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              const cardClassName = `group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-rule/60 bg-paper-2 p-7 transition-all duration-500 ease-out ${
                item.href
                  ? "hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-[0_30px_60px_-40px_rgba(11,18,32,0.4)]"
                  : ""
              }`;
              const cardContent = (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-100 bg-gradient-to-r from-amber-b via-amber to-amber-b opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber/50 bg-amber-soft font-mono text-[13px] font-semibold tracking-[0.1em] text-amber-b transition-colors duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="h-8 w-8 text-amber/50"
                      />
                    </div>
                    <p className="mt-6 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                      {item.kicker}
                    </p>
                    <h2 className="mt-3 font-serif text-xl leading-tight text-ink lg:text-[1.4rem]">
                      {item.name}
                    </h2>
                  </div>
                  <div className="relative mt-8 flex items-center gap-2 border-t border-amber/25 pt-5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-amber-b transition-colors group-hover:text-amber">
                    {item.href ? (
                      <>
                        Explore
                        <ArrowUpRight
                          aria-hidden="true"
                          size={16}
                          className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </>
                    ) : (
                      <span className="text-muted">Part of your care plan</span>
                    )}
                  </div>
                </>
              );
              return (
                <Reveal
                  key={item.name}
                  as="li"
                  delay={140 + i * 90}
                  offset={24}
                  className="h-full"
                >
                  {item.href ? (
                    <Link href={item.href} className={cardClassName}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div className={cardClassName}>{cardContent}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>

          <Reveal
            delay={100 + TECHNOLOGY_ITEMS.length * 80}
            className="mt-16 flex justify-center"
          >
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>
    </>
  );
}

