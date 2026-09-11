import Link from "next/link";
import { conditions } from "@/content/conditions";

// Same seven sectors and copy as components/home/SixDoorsGrid.tsx, restyled flat/minimal.
export default function Home2ConditionGrid() {
  return (
    <section id="six-doors" className="bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-sans text-sm font-semibold uppercase tracking-wide text-amber-b">
            Seven Doors In
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Where does your story start?
          </h2>
          <p className="mt-4 font-sans text-lg leading-relaxed text-muted">
            Most of our patients arrive with a physical problem, and discover
            the real driver was somewhere no one had looked. Start where your
            symptoms point. The investigation goes deeper from there.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition, i) => (
            <li key={condition.slug}>
              <Link
                href={`/conditions/${condition.slug}`}
                className="group flex h-full flex-col rounded-xl border border-rule bg-paper p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-soft font-sans text-xs font-semibold text-amber-b">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-sans text-lg font-semibold leading-tight text-ink">
                  {condition.name}
                </h3>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-muted">
                  {condition.heroLine}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-amber-b">
                  Explore
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
