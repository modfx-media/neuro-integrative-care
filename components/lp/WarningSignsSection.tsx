"use client";

import { DoorOpen, HelpCircle, KeyRound, Quote, Compass, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

// Message-match with the Meta ad set this page receives traffic from — same
// recognizable moments, same "this isn't a diagnosis" framing the ads use,
// so a visitor coming from the ad lands on language they already recognize.
const SIGNS = [
  {
    icon: Quote,
    title: "A word disappears mid-sentence.",
    detail:
      "You've used it a thousand times. Then it's just gone, and everyone's waiting for you to finish.",
  },
  {
    icon: HelpCircle,
    title: "\u201cYou already asked me that.\u201d",
    detail: "You don't remember asking. They insist you did.",
  },
  {
    icon: KeyRound,
    title: "Keys turn up somewhere that makes no sense.",
    detail:
      "Not just misplaced, you have no memory of putting them there at all.",
  },
  {
    icon: DoorOpen,
    title: "You forget why you walked into the room.",
    detail: "You stand there trying to remember what you needed, and it's gone.",
  },
  {
    icon: Compass,
    title: "A familiar road looks unfamiliar.",
    detail:
      "For a few seconds you can't remember which way to turn, then it comes back.",
  },
  {
    icon: Users,
    title: "Mom or Dad seems like a different person.",
    detail:
      "Repeating stories, forgetting conversations, more withdrawn or anxious than before.",
  },
] as const;

export default function WarningSignsSection() {
  return (
    <section className="bg-paper-2 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="rounded-[2rem] border border-amber/35 bg-amber-soft px-6 py-12 shadow-[0_24px_60px_-36px_rgba(232,160,32,0.7)] sm:px-10 lg:px-14 lg:py-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Sound Familiar?
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              The moments you&apos;ve been calling &ldquo;just stress.&rdquo;
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              One moment like this doesn&apos;t mean anything on its own. But if
              more than one sounds familiar, it deserves more than another
              excuse about stress, sleep, or getting older.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SIGNS.map((sign, i) => (
              <Reveal
                key={sign.title}
                as="li"
                delay={120 + i * 70}
                offset={20}
              >
                <article className="flex h-full flex-col rounded-2xl border border-amber/30 bg-paper p-6 shadow-[0_12px_28px_-20px_rgba(232,160,32,0.55)]">
                  <div className="flex items-center justify-center gap-3 sm:justify-start">
                    <span className="inline-flex rounded-full bg-gradient-to-r from-amber to-amber-b px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber/35 bg-amber-soft text-amber">
                      <sign.icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg leading-snug text-ink">
                    {sign.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {sign.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal
            delay={560}
            offset={16}
            className="mx-auto mt-12 max-w-2xl text-center"
          >
            <p className="text-lg leading-relaxed text-ink/80">
              This isn&apos;t about assuming the worst. It&apos;s about not
              waiting until the changes become impossible to ignore.
            </p>
          </Reveal>

          <Reveal delay={640} className="mt-8 flex justify-center">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
