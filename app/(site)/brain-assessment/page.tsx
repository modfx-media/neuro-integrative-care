import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import Reveal from "@/components/Reveal";
import BrainAssessmentForm from "@/components/home/BrainAssessmentForm";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/brain-assessment`;

export const metadata: Metadata = {
  title: "Free Brain Assessment",
  description:
    "Take a free, objective cognitive assessment powered by Creyos. See how your memory, attention, and reasoning perform today — no obligation.",
  alternates: { canonical: "/brain-assessment" },
  openGraph: {
    title: "Free Brain Assessment | NeuroIntegrative Care of Los Gatos",
    description:
      "A free, objective cognitive assessment powered by Creyos. See how your brain is performing today.",
    url: "/brain-assessment",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Free Brain Assessment | NeuroIntegrative Care of Los Gatos",
  description:
    "A free, objective cognitive assessment powered by Creyos. See how memory, attention, and reasoning are performing today.",
  url: PAGE_URL,
};

export default function BrainAssessmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />

      <section className="relative overflow-hidden bg-ink py-28 text-paper lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-6 lg:px-10">
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="text-center font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            Free Brain Assessment
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="text-center font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl">
              See how your brain is{" "}
              <span className="italic text-amber-b">performing today.</span>
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={380}
            offset={16}
            className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-paper/80"
          >
            A short, objective cognitive assessment (memory, attention, and
            reasoning) scored against your age group. Enter your name and
            date of birth to begin.
          </Reveal>

          <Reveal delay={520} offset={24} className="mt-12">
            <BrainAssessmentForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              What You&apos;ll Do
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
              A short set of tasks. An account created for you. Results scored
              against your age.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                n: "01",
                title: "Enter your name and date of birth",
                detail:
                  "Your name is stored as the patient identifier on Creyos. Date of birth is needed so memory, attention, and reasoning can be scored against your age group.",
              },
              {
                n: "02",
                title: "Start a secure session",
                detail:
                  "The first visit creates your assessment account. Later visits reopen the same one — you don't register twice.",
              },
              {
                n: "03",
                title: "Complete the tasks",
                detail:
                  "A short, objective cognitive assessment on a secure platform. When you finish, you return here.",
              },
            ].map((step) => (
              <Reveal key={step.n} as="li" className="rounded-2xl border border-rule bg-paper-2 p-6">
                <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                  {step.n}
                </p>
                <h3 className="mt-3 font-serif text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {step.detail}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
