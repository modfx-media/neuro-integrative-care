// COMPLIANCE: `EntryProgram.description` is public-safe. Never render
// `EntryProgram.internalNote` on the page — no dollar figures are published
// on the site; pricing is only discussed after the investigation.

import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import Link from "next/link";
import { programs } from "@/content/programs";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/programs`;

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Three ways in: start with the New-Patient Investigation, then the Virtual Program or In-Clinic Care & Regenerative. Out-of-town services available.",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "Programs | NeuroIntegrative Care of Los Gatos",
    description:
      "Three ways in: starting with a New-Patient Investigation. Virtual Program (national) and In-Clinic Care & Regenerative options.",
    url: "/programs",
    type: "article",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Programs | NeuroIntegrative Care of Los Gatos",
  description:
    "Three ways in: the New-Patient Investigation, the Virtual Program (national), and In-Clinic Care & Regenerative, plus a dedicated set of remotely-delivered services for out-of-town patients.",
  url: PAGE_URL,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "NeuroIntegrative Care of Los Gatos",
    url: `${SITE_URL}/`,
  },
  specialty: { "@type": "MedicalSpecialty", name: "Neurology" },
  audience: { "@type": "MedicalAudience", audienceType: "Patient" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: programs.entryPrograms.map((program, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: program.name,
        description: program.description,
        provider: {
          "@type": "MedicalClinic",
          name: "NeuroIntegrative Care of Los Gatos",
          url: `${SITE_URL}/`,
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: `${PAGE_URL}#${program.slug}`,
        },
      },
    })),
  },
};

export default function ProgramsPage() {
  const [frontDoor, virtual] = programs.entryPrograms;

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
          className="pointer-events-none absolute -left-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            Programs
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Three ways in.
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl font-serif text-[1.35rem] leading-[1.4] text-paper/80 sm:text-[1.55rem] lg:text-[1.75rem]"
          >
            Everyone starts the same way. Where it goes from there depends on
            what your investigation surfaces.
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* 4.1 — The Front Door */}
      <section id="front-door" className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-3">
              <div className="flex items-center gap-4">
                <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber">
                  The Front Door
                </p>
                <span
                  aria-hidden="true"
                  className="hidden h-px flex-1 bg-rule lg:block"
                />
              </div>
              <p className="mt-8 font-serif text-2xl leading-tight text-ink lg:text-3xl">
                {frontDoor.name}
              </p>
            </Reveal>

            <Reveal delay={120} offset={24} className="relative lg:col-span-9">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-3 -top-10 select-none font-serif text-[7rem] italic leading-none text-ink/[0.06] lg:-left-6 lg:-top-16 lg:text-[12rem]"
              >
                &ldquo;
              </span>
              <p className="relative font-serif text-[1.5rem] leading-[1.4] text-ink sm:text-[1.75rem] lg:text-[2.05rem]">
                {frontDoor.fullCopy}
              </p>
              <div className="mt-10">
                <Link
                  href="/start"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.85)]"
                >
                  Book the Investigation
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4.2 — The Three Ways In */}
      <section id="pricing" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              The Three Ways In
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Start with one program. Grow it as the workup calls for.
            </h2>
          </Reveal>

          <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.entryPrograms.map((program, i) => (
              <Reveal
                key={program.slug}
                as="li"
                delay={140 + i * 90}
                offset={24}
                className="h-full"
              >
                <article
                  id={program.slug}
                  className="flex h-full flex-col justify-between rounded-2xl border border-rule/60 bg-paper p-8 shadow-[0_2px_18px_-14px_rgba(11,18,32,0.25)] lg:p-9"
                >
                  <div>
                    <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-5 font-serif text-[1.5rem] leading-tight text-ink lg:text-[1.65rem]">
                      {program.name}
                    </h3>
                    <p className="mt-5 text-[15px] leading-relaxed text-muted">
                      {program.description}
                    </p>
                    {program.duration && (
                      <p className="mt-4 font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-muted">
                        Duration · {program.duration}
                      </p>
                    )}
                    {program.includedItems && (
                      <div className="mt-6">
                        <p className="font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-amber">
                          What&apos;s Included
                        </p>
                        <ul className="mt-4 space-y-4">
                          {program.includedItems.map((item) => (
                            <li key={item.title} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-1.5 h-[3px] w-3 shrink-0 rounded-full bg-amber"
                              />
                              <span className="text-[14px] leading-relaxed">
                                <span className="font-medium text-ink">
                                  {item.title}
                                </span>{" "}
                                <span className="text-muted">
                                  {item.description}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 border-t border-rule pt-6">
                    <Link
                      href={
                        program.slug === "virtual-program"
                          ? "/programs/virtual"
                          : "/start"
                      }
                      className="group inline-flex items-center gap-2 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-amber"
                    >
                      {program.slug === "virtual-program"
                        ? "Explore the Virtual Program"
                        : "Schedule Your Consultation"}
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 4.3 — Virtual Program teaser */}
      <section className="relative overflow-hidden bg-ink-2 py-24 text-paper lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -right-1/4 w-2/3 opacity-30"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(17,28,46,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
            <Reveal className="lg:col-span-7">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
                The Virtual Program
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-paper sm:text-5xl">
                An investigation with many of the same elements as our
                clinical consultations, anywhere in the country.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
                {virtual.description}
              </p>
              <div className="mt-10">
                <Link
                  href="/programs/virtual"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.85)]"
                >
                  Explore the Virtual Program
                </Link>
              </div>
            </Reveal>

            <Reveal
              delay={200}
              offset={24}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl border border-rule-d bg-ink p-8 lg:p-10">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
                  What&apos;s Included
                </p>
                <ul className="mt-6 space-y-4">
                  {virtual.whatItIncludes?.map((item) => (
                    <li key={item} className="flex gap-4 text-[15px] leading-relaxed text-paper/80">
                      <span aria-hidden="true" className="mt-1.5 h-[3px] w-3 shrink-0 rounded-full bg-amber" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {virtual.potentialAddOns && virtual.potentialAddOns.length > 0 && (
                  <p className="mt-6 border-t border-paper/10 pt-5 text-[13px] leading-relaxed text-paper/60">
                    Potential add-ons: {virtual.potentialAddOns.join(", ")}.
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4.4 — Out-of-town services (teaser; full page at /out-of-town) */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Out-of-Town Services
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Travel in. Continue the work from home.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              A dedicated set of remotely-delivered services for patients who
              travel in: Myndlift Virtual Neurofeedback, Remote Lab Testing
              and The Listening Program.
            </p>
            <Link
              href="/out-of-town"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-rule/70 bg-white px-6 py-3 text-[14px] text-ink transition-all hover:border-ink/30 hover:shadow-[0_10px_30px_-20px_rgba(11,18,32,0.4)]"
            >
              <span>See regenerative services</span>
              <span
                aria-hidden="true"
                className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-amber"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-serif text-3xl leading-[1.2] tracking-tight text-paper sm:text-4xl lg:text-5xl">
              Every program starts with the investigation.
            </h2>
          </Reveal>
          <Reveal delay={140} className="mt-10 flex justify-center">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>
    </>
  );
}
