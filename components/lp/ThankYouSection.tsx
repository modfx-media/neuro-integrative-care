import { CheckCircle2, Mail, PhoneCall } from "lucide-react";
import Reveal from "@/components/Reveal";

// Confirmation copy shown after the GHL lead form on the brain-assessment
// funnel is submitted. No claims beyond "we received your request" — the
// actual call/booking confirmation comes from the care team, not this page.
const PHONE_DISPLAY = "669-257-6940";
const PHONE_HREF = "tel:+16692576940";

const NEXT_STEPS = [
  {
    icon: PhoneCall,
    title: "We'll call you shortly.",
    detail:
      "A member of our care team reaches out within one business day to confirm your free discovery call.",
  },
  {
    icon: Mail,
    title: "Check your inbox.",
    detail:
      "You'll get a confirmation email with everything you need for the call.",
  },
  {
    icon: CheckCircle2,
    title: "Come ready to talk.",
    detail:
      "No paperwork required yet — just be ready to describe what's been going on.",
  },
] as const;

export default function ThankYouSection() {
  return (
    <section className="bg-ink py-24 text-paper lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal
          as="p"
          className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
        >
          You&apos;re Booked In
        </Reveal>
        <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-paper sm:text-5xl">
          <Reveal as="span" delay={120} offset={24} className="block">
            Thank you. We&apos;ll be in touch shortly.
          </Reveal>
        </h1>
        <Reveal
          as="p"
          delay={260}
          offset={16}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/75"
        >
          Your request for a free discovery call has been received. Here&apos;s
          what happens next.
        </Reveal>
      </div>

      <Reveal
        delay={380}
        offset={20}
        className="mx-auto mt-14 grid max-w-5xl gap-6 px-6 sm:grid-cols-3 lg:px-10"
      >
        {NEXT_STEPS.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-rule-d bg-ink-2 p-6 text-left"
          >
            <step.icon size={22} className="text-amber-b" aria-hidden="true" />
            <p className="mt-4 font-serif text-lg leading-tight text-paper">
              {step.title}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-paper/70">
              {step.detail}
            </p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={500} className="mt-14 text-center">
        <p className="text-sm text-paper/70">
          Need to reach us sooner?{" "}
          <a
            href={PHONE_HREF}
            className="font-medium text-amber-b underline-offset-4 hover:underline"
          >
            Call {PHONE_DISPLAY}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
