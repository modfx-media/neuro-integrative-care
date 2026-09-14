"use client";

import { DoorOpen, HelpCircle, KeyRound, Quote, Compass, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLeadFormModal } from "@/components/lp/LeadFormModal";

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
  const modal = useLeadFormModal();

  return (
    <section className="bg-ink py-24 text-paper lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
            Sound Familiar?
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-paper sm:text-5xl">
            The moments you&apos;ve been calling &ldquo;just stress.&rdquo;
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/75">
            One moment like this doesn&apos;t mean anything on its own. But if
            more than one sounds familiar, it deserves more than another
            excuse about stress, sleep, or getting older.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map((sign, i) => (
            <Reveal key={sign.title} as="li" delay={120 + i * 70} offset={20}>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-amber-b">
                <sign.icon size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-serif text-lg leading-snug text-paper">
                {sign.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-paper/70">
                {sign.detail}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={560} offset={16} className="mt-14 max-w-2xl">
          <p className="text-lg leading-relaxed text-paper/80">
            This isn&apos;t about assuming the worst. It&apos;s about not
            waiting until the changes become impossible to ignore.
          </p>
        </Reveal>

        <Reveal delay={640} className="mt-8">
          <button
            type="button"
            onClick={modal?.open}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.85)]"
          >
            Take Your Free Brain Assessment
          </button>
        </Reveal>
      </div>
    </section>
  );
}
