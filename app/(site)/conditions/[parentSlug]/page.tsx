import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { conditions } from "@/content/conditions";
import { patientStories } from "@/content/patientStories";
import { sectorPageContent } from "@/content/sectorPageContent";
import { toolsForSector } from "@/content/tools";
import SectorPageTemplate from "@/components/conditions/SectorPageTemplate";
import SectorJsonLd from "@/components/conditions/SectorJsonLd";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return conditions.map((c) => ({ parentSlug: c.slug }));
}

interface PageProps {
  params: Promise<{ parentSlug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { parentSlug } = await params;
  const condition = conditions.find((c) => c.slug === parentSlug);
  if (!condition) return {};
  return {
    title: condition.name,
    description: condition.heroLine,
    alternates: { canonical: `/conditions/${condition.slug}` },
    openGraph: {
      title: `${condition.name} | NeuroIntegrative Care of Los Gatos`,
      description: condition.heroLine,
      url: `/conditions/${condition.slug}`,
      type: "article",
    },
  };
}

export default async function ConditionPage({ params }: PageProps) {
  const { parentSlug } = await params;
  const condition = conditions.find((c) => c.slug === parentSlug);
  const content = sectorPageContent[parentSlug];
  if (!condition || !content) notFound();

  const patientStory = condition.patientStorySlug
    ? patientStories.find((s) => s.slug === condition.patientStorySlug)
    : undefined;

  return (
    <>
      <SectorJsonLd
        condition={condition}
        url={`${SITE_URL}/conditions/${condition.slug}`}
      />
      <SectorPageTemplate
        condition={condition}
        allConditions={conditions}
        patientStory={patientStory}
        toolsUsed={toolsForSector(condition.slug)}
        sectorContent={content}
      />
    </>
  );
}
