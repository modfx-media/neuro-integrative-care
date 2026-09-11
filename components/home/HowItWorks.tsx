"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    number: "01",
    title: "IDENTIFY",
    body: "We go beyond standard bloodwork. Advanced lab panels and a computerized neurological exam (balance, eye movement, reaction time, brain mapping) establish an objective picture of where your system actually broke down.",
  },
  {
    number: "02",
    title: "REBUILD",
    body: "We retrain and repair with drug-free technology: neurofeedback to retune brain activity, violet laser to restore cellular energy, regenerative solutions for tissue, and hands-on functional neurology rehab.",
  },
  {
    number: "03",
    title: "SUSTAIN",
    body: "We re-measure the same markers to confirm your nervous system is actually changing, not just that symptoms went quiet, then protect the gains with a personalized longevity and lifestyle plan.",
  },
] as const;

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 55%"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <section id="how-it-works" className="bg-paper py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
            The Investigation
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            A different kind of workup, built to find the driver, not label the symptom.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div ref={containerRef} className="relative lg:col-span-7">
            <div
              className="absolute left-6 top-6 bottom-6 w-px bg-rule lg:left-7 lg:top-7 lg:bottom-7"
              aria-hidden="true"
            />
            <motion.div
              className="absolute left-6 top-6 bottom-6 w-px origin-top bg-gradient-to-b from-amber-b to-amber lg:left-7 lg:top-7 lg:bottom-7"
              style={{ scaleY: scrollYProgress }}
              aria-hidden="true"
            />

            <ol className="space-y-16 lg:space-y-24">
              {STEPS.map((step, i) => (
                <Reveal
                  key={step.number}
                  as="li"
                  delay={100 + i * 120}
                  offset={20}
                  className="flex gap-6 lg:gap-10"
                >
                  <div className="shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber bg-paper font-mono text-xs text-amber lg:h-14 lg:w-14 lg:text-sm">
                      {step.number}
                    </div>
                  </div>
                  <div className="pt-2 lg:pt-3">
                    <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-amber">
                      {step.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={140} offset={24} className="lg:col-span-5">
            <div className="relative lg:sticky lg:top-28">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-14 rounded-full bg-amber-soft/60 blur-3xl"
              />

              {/* Fixed max-width (not w-fit — that creates a circular width loop with
                  the fill image below and collapses to 0) so the pills can be
                  positioned flush against this box's real, definite edge. */}
              <div className="relative mx-auto w-full max-w-[20rem]">
                <motion.div
                  style={{ scale: imageScale, y: imageY }}
                  className="relative aspect-[864/1821] w-full overflow-hidden rounded-3xl border border-rule/60 shadow-[0_40px_80px_-40px_rgba(11,18,32,0.35)]"
                >
                  <Image
                    src="/images/investigation-steps.webp"
                    alt="A patient's investigation, rebuild, and sustain journey: QEEG brain mapping, neurofeedback and laser therapy, and a personalized lifestyle plan"
                    fill
                    sizes="(min-width: 1024px) 32vw, 90vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* Rendered outside the overflow-hidden image so they can hang half off its right edge. */}
                {STEPS.map((step, i) => (
                  <div
                    key={step.number}
                    aria-hidden="true"
                    className="absolute right-0 z-10 flex translate-x-1/2 items-center gap-2 rounded-full border border-black/10 px-3.5 py-1.5 shadow-md"
                    style={{ top: `${i * 33.33 + 6}%`, backgroundColor: "#EAA321" }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-60"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
