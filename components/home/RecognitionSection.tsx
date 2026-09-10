import Link from "next/link";
import { Users, ClipboardX, HeartHandshake, BatteryLow, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

interface RecognitionCard {
  label: string;
  body: string;
  Icon: LucideIcon;
}

const CARDS: RecognitionCard[] = [
  {
    label: "The One Everyone Depends On",
    body: "If you went down for a week, several other people's plans would fall apart, so you keep going, and your own health stays at the bottom of the list.",
    Icon: Users,
  },
  {
    label: 'Told Everything\u2019s "Normal"',
    body: "Years of fatigue, fog, or gut trouble, and a folder of normal labs. You know something's wrong before any test confirms it.",
    Icon: ClipboardX,
  },
  {
    label: "Caring for Everyone but You",
    body: "You track a parent's care and a child's schedule at once, remember everyone's medications, and can't recall your own last checkup.",
    Icon: HeartHandshake,
  },
  {
    label: "Still Performing, Running on Fumes",
    body: "Still hitting the numbers on caffeine and willpower, while sleep, recovery, and mood quietly erode. The tank is closer to empty than you admit.",
    Icon: BatteryLow,
  },
];

export default function RecognitionSection() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
            Who This Is For
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            You hold something together. And lately, you&apos;re the one
            running on empty.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Most of our patients aren&apos;t looking for themselves when they
            arrive; they&apos;re the ones everyone else depends on. See if
            this sounds familiar.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.label}
              as="li"
              delay={140 + i * 90}
              offset={24}
              className="h-full"
            >
              <div className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-amber/20 bg-white p-7 shadow-[0_20px_45px_-30px_rgba(232,160,32,0.45)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber/50 hover:shadow-[0_40px_80px_-32px_rgba(232,160,32,0.55)] lg:p-8">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-100 bg-gradient-to-r from-amber-b via-amber to-amber-b opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-100"
                />

                <div className="relative flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber/50 bg-amber-soft font-mono text-[13px] font-semibold tracking-[0.1em] text-amber-b transition-colors duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-amber/40 bg-amber-soft text-amber-b transition-all duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink"
                  >
                    <card.Icon size={20} strokeWidth={1.5} />
                  </span>
                </div>

                <div className="relative mt-6 flex-1">
                  <p className="font-mono font-medium text-[12px] uppercase tracking-[0.16em] text-amber-b">
                    {card.label}
                  </p>
                  <p className="mt-4 font-serif text-[1.2rem] leading-[1.4] text-ink lg:text-[1.3rem]">
                    {card.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={560} offset={20} className="mt-16 text-center">
          <p className="mx-auto max-w-2xl font-serif text-[1.35rem] italic leading-relaxed text-ink lg:text-[1.55rem]">
            Whichever one you are, you&apos;re not imagining it, and
            you&apos;re not the problem. You&apos;ve just never been fully
            investigated.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/start"
              className="inline-flex w-[300px] max-w-full items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-center text-sm font-medium tracking-tight text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
            >
              Schedule Your Consultation
            </Link>
            <Link
              href="/brain-assessment"
              className="inline-flex w-[300px] max-w-full items-center justify-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-center text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.85)]"
            >
              Or take the Free Brain Assessment
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
