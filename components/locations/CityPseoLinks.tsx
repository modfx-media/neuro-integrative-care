import Link from "next/link";
import { conditionArticles } from "@/content/conditionArticles";
import { tools } from "@/content/tools";
import Reveal from "@/components/Reveal";

interface CityPseoLinksProps {
  citySlug: string;
  cityName: string;
}

/** Links to the condition x city and service x city pSEO pages for this specific city. */
export default function CityPseoLinks({ citySlug, cityName }: CityPseoLinksProps) {
  return (
    <section className="bg-ink py-24 text-paper lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
                Conditions
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-paper sm:text-3xl">
                Conditions we investigate for {cityName} patients
              </h2>
            </Reveal>
            <ul className="mt-6 space-y-3">
              {conditionArticles.map((article, i) => (
                <Reveal key={article.slug} as="li" delay={80 + i * 40} offset={12}>
                  <Link
                    href={`/conditions/${article.parentSlug}/${article.slug}/${citySlug}`}
                    className="text-[15px] text-paper/80 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-amber-b"
                  >
                    {article.name} in {cityName}
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal>
              <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
                Treatments
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-paper sm:text-3xl">
                Treatments available near {cityName}
              </h2>
            </Reveal>
            <ul className="mt-6 space-y-3">
              {tools.map((tool, i) => (
                <Reveal key={tool.slug} as="li" delay={80 + i * 40} offset={12}>
                  <Link
                    href={`/tools/${tool.slug}/${citySlug}`}
                    className="text-[15px] text-paper/80 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-amber-b"
                  >
                    {tool.name} near {cityName}
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
