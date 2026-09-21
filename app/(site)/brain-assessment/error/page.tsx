import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Assessment Unavailable",
  robots: { index: false, follow: false },
};

export default async function BrainAssessmentErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error_msg?: string }>;
}) {
  const { error_msg } = await searchParams;
  const expired = error_msg?.toLowerCase().includes("expired");

  return (
    <section className="bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
        <Reveal
          as="p"
          className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber"
        >
          Free Brain Assessment
        </Reveal>
        <Reveal delay={80} className="mt-4">
          <h1 className="font-serif text-4xl text-ink sm:text-5xl">
            We couldn&apos;t open that assessment.
          </h1>
        </Reveal>
        <Reveal as="p" delay={160} className="mt-6 text-lg leading-relaxed text-muted">
          {expired
            ? "That link has expired. Start a new assessment and you'll get a fresh session."
            : "Something went wrong starting your session. Please try again, or call the office if it keeps happening."}
        </Reveal>
        <Reveal delay={240} className="mt-10">
          <Link
            href="/brain-assessment"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink"
          >
            Start a New Assessment
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
