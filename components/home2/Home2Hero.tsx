import Image from "next/image";
import Link from "next/link";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

// Copy is reused word-for-word from components/home/HeroSection.tsx.
const STATS = [
  { value: "30", label: "Years in Silicon Valley" },
  { value: "11", label: "Colleges, 10,000+ Hrs of Training" },
  { value: "Zero", label: "Prescriptions Written" },
  { value: "CA", label: "Based in Los Gatos" },
] as const;

export default function Home2Hero() {
  return (
    <section className="relative overflow-hidden border-b border-rule bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 h-96 w-[42rem] rounded-full bg-amber-soft blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-28">
        <div>
          <p className="inline-flex items-center rounded-full bg-amber-soft px-4 py-1.5 font-sans text-sm font-semibold uppercase tracking-wide text-amber-b">
            NeuroIntegrative Care · Los Gatos
          </p>

          <h1 className="mt-6 font-sans text-4xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
            You&apos;re not imagining it. You&apos;ve just never been{" "}
            <em className="italic text-amber-b">fully investigated</em>.
          </h1>

          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-muted">
            For people who&apos;ve seen specialist after specialist, whose
            labs keep coming back &ldquo;normal,&rdquo; and who still
            don&apos;t feel right, a 30-year, root-cause investigation into
            the brain, metabolism, and nervous system. Drug-free. Backed by
            objective testing, not guesswork.
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <BrainAssessmentButton />
            <Link
              href="#how-it-works"
              className="font-sans text-sm text-muted underline underline-offset-4 transition-colors hover:text-ink"
            >
              See how the investigation works
            </Link>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-amber-soft px-4 py-5"
              >
                <dt className="font-sans text-2xl font-semibold leading-none tracking-tight text-ink">
                  {stat.value}
                </dt>
                <dd className="mt-2 font-sans text-[11px] uppercase leading-snug tracking-wide text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] bg-amber-soft"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/images/homepage-images/dr.png"
              alt="Dr. Thomas Santucci"
              fill
              priority
              sizes="(min-width: 1024px) 32rem, 24rem"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-5 left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2 rounded-xl bg-paper px-5 py-3.5 text-center shadow-md">
            <p className="font-sans text-sm font-semibold text-ink">
              Dr. Thomas Santucci
            </p>
            <p className="font-sans text-xs text-muted">
              30 years · Functional &amp; Regenerative Medicine
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
