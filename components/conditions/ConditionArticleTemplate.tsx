import Link from "next/link";
import type { ConditionArticle } from "@/content/conditionArticles";
import type { Tool } from "@/content/tools";
import type { BreadcrumbCrumb } from "@/components/conditions/SectorPageTemplate";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

interface ConditionArticleTemplateProps {
  article: ConditionArticle;
  parentName: string;
  tool: Tool;
  breadcrumb: BreadcrumbCrumb[];
}

export default function ConditionArticleTemplate({
  article,
  parentName,
  tool,
  breadcrumb,
}: ConditionArticleTemplateProps) {
  return (
    <>
      {/* 1 — Hero */}
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
            delay={20}
            offset={8}
            className="mb-8 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-paper/70"
          >
            {breadcrumb.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`}>
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-amber-b">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-paper">{crumb.label}</span>
                )}
                {i < breadcrumb.length - 1 && (
                  <span aria-hidden="true" className="mx-3 text-paper/30">
                    /
                  </span>
                )}
              </span>
            ))}
          </Reveal>
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            {article.heroKicker}
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {article.h1}
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-paper/80 lg:text-xl"
          >
            {article.heroLead}
          </Reveal>
          <Reveal delay={550} offset={16} className="mt-10 flex">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* 2 — What's Really Going On */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                {article.whatsGoingOn.heading}
              </p>
            </Reveal>
            <div className="space-y-6 lg:col-span-8">
              {article.whatsGoingOn.paragraphs.map((paragraph, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={120 + i * 100}
                  offset={24}
                  className="text-lg leading-relaxed text-ink"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — How We Investigate */}
      <section className="bg-ink py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
                {article.howWeInvestigate.heading}
              </p>
            </Reveal>
            <div className="space-y-6 lg:col-span-8">
              {article.howWeInvestigate.paragraphs.map((paragraph, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={120 + i * 100}
                  offset={24}
                  className="text-lg leading-relaxed text-paper/80"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 — How We Treat It, Drug-Free */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
                {article.howWeTreat.heading}
              </p>
            </Reveal>
            <div className="space-y-6 lg:col-span-8">
              {article.howWeTreat.paragraphs.map((paragraph, i) => (
                <Reveal
                  key={i}
                  as="p"
                  delay={120 + i * 100}
                  offset={24}
                  className="text-lg leading-relaxed text-muted"
                >
                  {paragraph}
                </Reveal>
              ))}
              <Reveal delay={320} offset={20} className="pt-2">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-rule/70 bg-paper-2 px-5 py-2.5 text-[13px] text-ink transition-all hover:border-ink/30 hover:bg-white"
                >
                  Learn more about {tool.name}
                  <span
                    aria-hidden="true"
                    className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-amber"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — FAQ */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Frequently Asked
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Common questions.
            </h2>
          </Reveal>

          <div className="mt-14 divide-y divide-rule/70 border-t border-rule/70">
            {article.faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={100 + i * 80} offset={16}>
                <details className="group py-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-[1.15rem] leading-snug text-ink marker:content-none lg:text-[1.3rem]">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber/40 text-amber-b transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Related sector */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-rule/70 bg-paper-2 p-8 sm:flex-row sm:items-center lg:p-10">
              <div>
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                  Part of
                </p>
                <p className="mt-3 font-serif text-[1.5rem] leading-tight text-ink">
                  {parentName}
                </p>
              </div>
              <Link
                href={`/conditions/${article.parentSlug}`}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-rule/70 bg-white px-5 py-2.5 text-[13px] text-ink transition-all hover:border-ink/30"
              >
                See the full sector
                <span
                  aria-hidden="true"
                  className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-amber"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 — CTA */}
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
              {article.ctaHeading}
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
