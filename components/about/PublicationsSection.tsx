import Image from "next/image";
import Reveal from "@/components/Reveal";

// Book covers and titles stay in lockstep with DrSantucciProfile — quoted
// from the CV, no extra claims. Extracted so the landing page can place
// this block independently of the rest of the bio.
export default function PublicationsSection({
  centerHeadings = false,
}: {
  centerHeadings?: boolean;
}) {
  const headerBlock = centerHeadings
    ? "mx-auto max-w-3xl text-center"
    : "max-w-3xl";

  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className={headerBlock}>
          {/* This section has no headline of its own, so on landing pages the
              label carries the section at heading scale. */}
          <p
            className={`font-mono font-medium uppercase text-amber ${
              centerHeadings
                ? "text-[20px] tracking-[0.16em] sm:text-[26px]"
                : "text-[13px] tracking-[0.18em]"
            }`}
          >
            Publications
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:gap-16">
          <Reveal delay={100} offset={24}>
            <div className="relative mx-auto aspect-[450/744] w-full max-w-[360px] overflow-hidden rounded-xl border border-rule shadow-[0_20px_50px_-20px_rgba(11,18,32,0.35)]">
              <Image
                src="/images/publications/engineering-medical-miracles-cover.png"
                alt="Engineering Medical Miracles: Return to Health, book cover by Dr. Thomas A. Santucci, DC"
                fill
                sizes="(min-width: 640px) 360px, 90vw"
                className="object-cover"
              />
            </div>
            <article className="mt-6 text-center">
              <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                Book · 2017
              </p>
              <h3 className="mt-3 font-serif text-[1.6rem] leading-tight text-ink">
                Engineering Medical Miracles:{" "}
                <span className="italic">Return to Health</span>
              </h3>
              <p className="mt-3 font-mono font-medium text-[13px] uppercase tracking-[0.16em] text-muted">
                ISBN 1544232829
              </p>
            </article>
          </Reveal>

          <Reveal delay={200} offset={24}>
            <div className="relative mx-auto flex aspect-[450/744] w-full max-w-[360px] flex-col overflow-hidden rounded-xl border border-rule bg-ink shadow-[0_20px_50px_-20px_rgba(11,18,32,0.35)]">
              <div className="flex flex-1 flex-col px-8 pt-11">
                <p className="font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-amber-b">
                  A Neurometabolic Framework
                </p>
                <h3 className="mt-5 font-serif text-[2.35rem] italic leading-[1.1] text-paper">
                  Deconstructing Alzheimer&apos;s
                </h3>
                <p className="mt-5 font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] text-paper/60">
                  Explore Neurometabolic Therapies Available Now · Going
                  Beyond Convention
                </p>
                <p className="mt-7 font-serif text-[16px] italic leading-relaxed text-paper/75">
                  A defensible working framework for families and clinicians,
                  integrating Functional Medicine, Functional Neurology, and
                  advanced diagnostics to provide realistic, actionable
                  interventions for Alzheimer&apos;s and cognitive decline.
                </p>
              </div>
              <div className="border-t border-paper/10 px-8 py-6">
                <p className="font-serif text-[18px] text-paper">
                  Dr. Thomas A. Santucci
                </p>
                <p className="mt-1 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-paper/60">
                  DC · AFNI
                </p>
              </div>
              <div className="flex h-3">
                <span className="flex-1 bg-emerald-700" />
                <span className="flex-1 bg-sky-700" />
                <span className="flex-1 bg-teal-400" />
              </div>
            </div>
            <article className="mt-6 text-center">
              <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                In Progress
              </p>
              <h3 className="mt-3 font-serif text-[1.6rem] leading-tight text-ink">
                Alzheimer&apos;s Intervention
              </h3>
              <p className="mt-3 text-[14px] leading-snug text-muted">
                Educational content and interventions for neurodegenerative
                conditions.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
