import Link from "next/link";
import { Users, ClipboardX, HeartHandshake, BatteryLow, type LucideIcon } from "lucide-react";

interface RecognitionCard {
  label: string;
  body: string;
  Icon: LucideIcon;
}

// Same four cards/copy as components/home/RecognitionSection.tsx.
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

export default function Home2Recognition() {
  return (
    <section className="bg-paper-2 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-sans text-sm font-semibold uppercase tracking-wide text-amber-b">
            Who This Is For
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            You hold something together. And lately, you&apos;re the one
            running on empty.
          </h2>
          <p className="mt-4 font-sans text-lg leading-relaxed text-muted">
            Most of our patients aren&apos;t looking for themselves when they
            arrive; they&apos;re the ones everyone else depends on. See if
            this sounds familiar.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {CARDS.map((card) => (
            <li
              key={card.label}
              className="rounded-xl bg-paper p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-soft">
                <card.Icon
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-amber-b"
                />
              </span>
              <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-wide text-amber-b">
                {card.label}
              </p>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink">
                {card.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-2xl bg-amber-soft px-6 py-12 text-center">
          <p className="mx-auto max-w-2xl font-sans text-lg italic leading-relaxed text-ink">
            Whichever one you are, you&apos;re not imagining it, and
            you&apos;re not the problem. You&apos;ve just never been fully
            investigated.
          </p>
          <div className="mt-6">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-md bg-amber px-7 py-3.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Schedule Your Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
