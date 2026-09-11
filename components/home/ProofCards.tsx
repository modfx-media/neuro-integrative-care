// COMPLIANCE: Do NOT add or display the "90% resolution in serious/lethal conditions"
// stat anywhere on this site. Client-approved hold per CO-01 — legal/liability risk.
// Only individual, measured, method-attributed results are approved for public pages.

import Image from "next/image";
import { patientStories } from "@/content/patientStories";
import { conditions } from "@/content/conditions";
import Reveal from "@/components/Reveal";

const FEATURED_SLUGS = ["ellie", "gail", "seth", "janice"] as const;

export default function ProofCards() {
  const featured = FEATURED_SLUGS.map((slug) =>
    patientStories.find((s) => s.slug === slug),
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section className="bg-paper-2 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Proof
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              When the workup is right, the results are measurable.
            </h2>
          </Reveal>

          <Reveal delay={100} offset={24}>
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-rule/60"
            >
              <Image
                src="/images/proof-patients.webp"
                alt="Patients whose symptoms were investigated and resolved through the program"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/*
         * Layout reserves space for future video testimonials and before/after
         * QEEG images — swap in once patient releases are signed. Current cards
         * are text-only proof.
         */}
        <div className="relative mt-20 lg:mt-24">
          <span
            aria-hidden="true"
            className="timeline-line pointer-events-none absolute inset-y-6 left-4 w-px bg-gradient-to-b from-amber via-rule to-transparent md:left-1/2"
          />
          <span
            aria-hidden="true"
            className="timeline-beam pointer-events-none absolute left-4 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_18px_4px_rgba(232,160,32,0.55)] md:left-1/2"
          />

          <ul className="relative space-y-10 lg:space-y-16">
            {featured.map((story, i) => {
              const sectorName = story.sector
                ? conditions.find((c) => c.slug === story.sector)?.name ?? null
                : null;
              const isEven = i % 2 === 0;
              return (
                <Reveal
                  key={story.slug}
                  as="li"
                  delay={140 + i * 120}
                  offset={24}
                  className="relative pl-14 md:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full border border-amber/30 bg-amber-soft font-mono text-[12px] md:text-[13px] font-medium tracking-[0.05em] text-amber shadow-sm md:left-1/2 md:-translate-x-1/2"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber/30"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                    <span className="relative">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>

                  <div className="md:grid md:grid-cols-2 md:gap-10 lg:gap-16">
                    <div
                      className={
                        isEven
                          ? "md:col-start-1 md:row-start-1 md:pr-6 lg:pr-10"
                          : "md:col-start-2 md:row-start-1 md:pl-6 lg:pl-10"
                      }
                    >
                      <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-rule/70 border-l-4 border-l-amber bg-white shadow-[0_20px_50px_-30px_rgba(11,18,32,0.25)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-l-amber-b hover:shadow-[0_40px_80px_-30px_rgba(11,18,32,0.3)]">
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 bg-gradient-to-r from-amber to-amber-b transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                        <div className="p-8 lg:p-9">
                          <p className="font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-amber">
                            {sectorName ?? "Patient Story"}
                          </p>
                          <h3 className="mt-5 font-serif text-[1.6rem] leading-[1.15] text-ink lg:text-[1.85rem]">
                            {story.headline}
                          </h3>
                          <p className="mt-5 text-[15px] leading-relaxed text-muted">
                            {story.body}
                          </p>
                        </div>
                        <div className="border-t border-amber/20 bg-amber-soft/50 px-8 py-5 lg:px-9">
                          <p className="font-mono font-medium text-[12px] uppercase tracking-[0.14em] text-ink">
                            {story.patientName}
                          </p>
                          <p className="mt-2 text-[11px] italic leading-snug text-muted-l">
                            {story.disclaimer}
                          </p>
                        </div>
                      </article>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
