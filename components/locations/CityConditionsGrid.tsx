import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ShieldAlert,
  Brain,
  Activity,
  Leaf,
  Hourglass,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { conditions } from "@/content/conditions";
import Reveal from "@/components/Reveal";

const CONDITION_ICONS: Record<string, LucideIcon> = {
  "autoimmune-investigation": ShieldAlert,
  "brain-brightening": Brain,
  "concussion-post-trauma": Activity,
  "environmental-toxins": Leaf,
  "longevity-science": Hourglass,
  "idiopathic-unexplained": HelpCircle,
};

const CONDITION_IMAGES: Record<string, string> = {
  "autoimmune-investigation": "/images/conditions/autoimmune-investigation.webp",
  "brain-brightening": "/images/conditions/brain-brightening.webp",
  "concussion-post-trauma": "/images/conditions/concussion-post-trauma.webp",
  "environmental-toxins": "/images/conditions/environmental-toxins.webp",
  "longevity-science": "/images/conditions/longevity-science.webp",
  "idiopathic-unexplained": "/images/conditions/idiopathic-unexplained.webp",
};

interface CityConditionsGridProps {
  cityName: string;
}

/** Same card grid/hover treatment as SixDoorsGrid, with a city-specific heading. */
export default function CityConditionsGrid({ cityName }: CityConditionsGridProps) {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
            Where To Start
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            How we help {cityName} patients.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            The same six-sector investigation we run for every patient,
            wherever the appointment starts.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {conditions.map((condition, i) => {
            const ConditionIcon = CONDITION_ICONS[condition.slug] ?? HelpCircle;
            return (
              <Reveal
                key={condition.slug}
                as="li"
                delay={140 + i * 80}
                offset={24}
                className="h-full"
              >
                <Link
                  href={`/conditions/${condition.slug}`}
                  className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-amber/20 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(232,160,32,0.45)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber/50 hover:shadow-[0_40px_80px_-32px_rgba(232,160,32,0.55)] lg:p-7"
                >
                  <div
                    aria-hidden="true"
                    className="relative -mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden lg:-mx-7 lg:-mt-7"
                  >
                    {CONDITION_IMAGES[condition.slug] ? (
                      <>
                        <Image
                          src={CONDITION_IMAGES[condition.slug]}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-soft via-paper-2 to-white transition-transform duration-700 ease-out group-hover:scale-105" />
                        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_25%_20%,rgba(232,160,32,0.28),transparent_70%)]" />
                      </>
                    )}
                    <ConditionIcon
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="absolute bottom-4 right-4 h-11 w-11 text-amber/50"
                    />
                  </div>

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
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-amber/40 bg-amber-soft text-amber-b transition-all duration-500 group-hover:-rotate-45 group-hover:border-amber group-hover:bg-amber group-hover:text-ink"
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  <div className="relative mt-6 flex-1">
                    <h3 className="font-serif text-[1.4rem] leading-[1.15] text-ink lg:text-[1.6rem]">
                      {condition.name}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {condition.heroLine}
                    </p>
                  </div>

                  <div className="relative mt-6 flex items-center gap-2 border-t border-amber/25 pt-5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-amber-b transition-colors group-hover:text-amber">
                    Explore
                    <span
                      aria-hidden="true"
                      className="h-px w-4 bg-current transition-all duration-500 group-hover:w-6"
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
