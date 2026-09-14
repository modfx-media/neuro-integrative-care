import { Microscope, BrainCircuit, ShieldOff, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";

// Differentiators only — restates language already used elsewhere on the
// site (Hero stat bar, DoctorTeaser, compliance copy), no new claims.
const ITEMS = [
  {
    icon: Microscope,
    title: "Objective Testing",
    description: "Backed by lab panels and brain mapping, not guesswork.",
  },
  {
    icon: BrainCircuit,
    title: "Root-Cause Investigation",
    description:
      "We find what's driving your symptoms, not just what's masking them.",
  },
  {
    icon: ShieldOff,
    title: "Drug-Free",
    description: "Zero prescriptions. Technology and protocol-based care.",
  },
  {
    icon: MapPin,
    title: "In-Clinic or Virtual",
    description:
      "The same investigation, available locally in Los Gatos or nationwide.",
  },
] as const;

// showCta lets landing pages add a booking button after the grid; off by
// default so the homepage's usage is unchanged.
export default function WhyChooseUs({
  showCta = false,
}: {
  showCta?: boolean;
}) {
  return (
    <section className="bg-amber-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
            Why Choose Us
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            What makes the investigation different
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} as="li" delay={140 + i * 80} offset={20}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-amber shadow-[0_1px_2px_rgba(11,18,32,0.06)]">
                <item.icon size={26} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ul>

        {showCta && (
          <Reveal delay={420} className="mt-16 flex justify-center">
            <BrainAssessmentButton />
          </Reveal>
        )}
      </div>
    </section>
  );
}
