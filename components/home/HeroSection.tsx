"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import StatBar from "@/components/home/StatBar";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

/*
 * Compliance note: convey "finally understood" through empathy — never
 * diagnostic or curative guarantees. Language stays in functional-medicine
 * scope: investigate, identify, support.
 *
 * LCP note: entrance animations on the H1 and hero copy use the CSS
 * `.reveal` keyframe (animation-fill-mode: both) via the <Reveal> component,
 * not framer-motion `initial`+`animate`. This guarantees the text renders on
 * paint even if the JS bundle is slow or blocked, and is disabled under
 * prefers-reduced-motion.
 */

const STATS = [
  { value: "30", label: "Years in Silicon Valley" },
  { value: "11", label: "Colleges, 10,000+ Hrs of Training" },
  { value: "Zero", label: "Prescriptions Written" },
  { value: "CA", label: "Based in Los Gatos" },
] as const;

// The secondary link jumps to the page's own "How It Works" section.
// Landing pages that don't render that section switch it off.
// eyebrow/heading/subtitle let landing pages swap copy while keeping the
// exact same hero structure, video, stats, and animation timings.
// stats lets landing pages swap the stat bar without touching the homepage.
// statsClassName lets landing pages keep the bar centered at every breakpoint
// instead of the homepage's left-aligned-on-desktop default.
export default function HeroSection({
  showSecondaryLink = true,
  eyebrow = "NeuroIntegrative Care · Los Gatos",
  heading = (
    <>
      <Reveal as="span" delay={180} offset={28} className="block">
        You&apos;re not imagining it.
      </Reveal>
      <Reveal as="span" delay={400} offset={28} className="block">
        You&apos;ve just never been{" "}
        <span className="italic text-amber-b">fully investigated</span>.
      </Reveal>
    </>
  ),
  subtitle = "For people who've seen specialist after specialist, whose labs keep coming back \u201cnormal,\u201d and who still don't feel right, a 30-year, root-cause investigation into the brain, metabolism, and nervous system. Drug-free. Backed by objective testing, not guesswork.",
  stats = STATS,
  statsClassName = "mx-auto max-w-2xl justify-items-center text-center sm:justify-items-start sm:text-left",
  statsMobileColsClassName,
}: {
  showSecondaryLink?: boolean;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  subtitle?: ReactNode;
  stats?: readonly { value: string; label: string }[];
  statsClassName?: string;
  statsMobileColsClassName?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden text-paper">
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark scrim so text stays legible over the video. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/45"
      />

      <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-40 text-center lg:px-10 lg:pb-32 lg:pt-52">
        <Reveal
          as="p"
          delay={50}
          offset={12}
          className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
        >
          {eyebrow}
        </Reveal>

        <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
          {heading}
        </h1>

        <Reveal
          as="p"
          delay={850}
          offset={16}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-paper/75"
        >
          {subtitle}
        </Reveal>

        <Reveal
          delay={1050}
          offset={16}
          className="mt-10 flex justify-center"
        >
          <BrainAssessmentButton />
        </Reveal>

        {showSecondaryLink && (
          <Reveal delay={1200} offset={12} className="mt-6">
            <Link
              href="#how-it-works"
              className="group inline-flex items-center gap-2 text-sm text-paper/80 transition-colors hover:text-amber-b"
            >
              See how the investigation works
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        )}

        <Reveal delay={1300} offset={12} className="mt-16">
          <StatBar
            stats={stats}
            tone="onDark"
            className={statsClassName}
            mobileColsClassName={statsMobileColsClassName}
          />
        </Reveal>
      </div>
    </section>
  );
}
