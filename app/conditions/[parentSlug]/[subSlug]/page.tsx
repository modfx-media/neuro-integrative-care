import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { conditions } from "@/content/conditions";
import {
  patientStories,
  DEFAULT_PATIENT_STORY_DISCLAIMER,
} from "@/content/patientStories";
import { sectorPageContent } from "@/content/sectorPageContent";
import { toolsForSector, tools } from "@/content/tools";
import {
  conditionArticles,
  findConditionArticle,
  findSupersedingArticle,
} from "@/content/conditionArticles";
import SectorPageTemplate, {
  type BreadcrumbCrumb,
  type ObjectiveMeasure,
} from "@/components/conditions/SectorPageTemplate";
import SectorJsonLd from "@/components/conditions/SectorJsonLd";
import ConditionArticleTemplate from "@/components/conditions/ConditionArticleTemplate";
import ConditionArticleJsonLd from "@/components/conditions/ConditionArticleJsonLd";
import { SITE_URL } from "@/lib/site";

interface SubParams {
  parentSlug: string;
  subSlug: string;
}

export function generateStaticParams(): SubParams[] {
  const subConditionParams = conditions.flatMap((parent) =>
    (parent.subConditions ?? []).map((sub) => ({
      parentSlug: parent.slug,
      subSlug: sub.slug,
    })),
  );
  const articleParams = conditionArticles.map((article) => ({
    parentSlug: article.parentSlug,
    subSlug: article.slug,
  }));
  return [...subConditionParams, ...articleParams];
}

interface PageProps {
  params: Promise<SubParams>;
}

function findSub(parentSlug: string, subSlug: string) {
  const parent = conditions.find((c) => c.slug === parentSlug);
  const sub = parent?.subConditions?.find((c) => c.slug === subSlug);
  if (!parent || !sub) return null;
  return { parent, sub };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { parentSlug, subSlug } = await params;

  const article = findConditionArticle(parentSlug, subSlug);
  if (article) {
    const url = `/conditions/${article.parentSlug}/${article.slug}`;
    return {
      title: article.metaTitle,
      description: article.metaDescription,
      alternates: { canonical: url },
      openGraph: {
        title: `${article.metaTitle} | NeuroIntegrative Care of Los Gatos`,
        description: article.metaDescription,
        url,
        type: "article",
      },
    };
  }

  const found = findSub(parentSlug, subSlug);
  if (!found) return {};
  const { parent, sub } = found;

  // Canonicalize the shorter legacy sub-condition page to its fuller
  // replacement article where one exists, instead of ranking both.
  const superseding = findSupersedingArticle(parentSlug, subSlug);
  const canonicalUrl = superseding
    ? `/conditions/${superseding.parentSlug}/${superseding.slug}`
    : `/conditions/${parent.slug}/${sub.slug}`;

  return {
    title: `${sub.name} · ${parent.name}`,
    description: sub.heroLine,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${sub.name} | NeuroIntegrative Care of Los Gatos`,
      description: sub.heroLine,
      url: `/conditions/${parent.slug}/${sub.slug}`,
      type: "article",
    },
  };
}

// COMPLIANCE: Objective measures below are pulled from patientStories.ts
// (Gail + Janice physicalStats) via CO-01. Displayed as measured strength/ROM
// with attribution + timeframe + disclaimer — never as diagnosis or cure.
function objectiveMeasuresFor(subSlug: string): ObjectiveMeasure[] | undefined {
  const gail = patientStories.find((s) => s.slug === "gail");
  const janice = patientStories.find((s) => s.slug === "janice");

  if (subSlug === "balance-strength") {
    const measures: ObjectiveMeasure[] = [];
    if (janice?.physicalStats?.shoulder) {
      measures.push({
        label: "Shoulder Range of Motion",
        value: janice.physicalStats.shoulder,
        patientName: janice.patientName,
        method: "Trigenics",
        disclaimer: janice.disclaimer,
      });
    }
    if (gail?.physicalStats?.legs) {
      measures.push({
        label: "Leg Strength",
        value: gail.physicalStats.legs,
        patientName: gail.patientName,
        timeframe: "In one month",
        disclaimer: gail.disclaimer,
      });
    }
    return measures.length > 0 ? measures : undefined;
  }

  if (subSlug === "neuropathy") {
    if (gail?.physicalStats?.grip) {
      return [
        {
          label: "Grip Strength",
          value: gail.physicalStats.grip,
          patientName: gail.patientName,
          disclaimer: gail.disclaimer ?? DEFAULT_PATIENT_STORY_DISCLAIMER,
        },
      ];
    }
    return undefined;
  }

  return undefined;
}

export default async function SubConditionPage({ params }: PageProps) {
  const { parentSlug, subSlug } = await params;

  const article = findConditionArticle(parentSlug, subSlug);
  if (article) {
    const parentCondition = conditions.find((c) => c.slug === article.parentSlug);
    const tool = tools.find((t) => t.slug === article.toolSlug);
    if (!parentCondition || !tool) notFound();

    const breadcrumb: BreadcrumbCrumb[] = [
      { label: "Conditions", href: "/conditions" },
      { label: parentCondition.name, href: `/conditions/${parentCondition.slug}` },
      { label: article.name },
    ];

    return (
      <>
        <ConditionArticleJsonLd
          article={article}
          url={`${SITE_URL}/conditions/${article.parentSlug}/${article.slug}`}
        />
        <ConditionArticleTemplate
          article={article}
          parentName={parentCondition.name}
          tool={tool}
          breadcrumb={breadcrumb}
        />
      </>
    );
  }

  const found = findSub(parentSlug, subSlug);
  const content = sectorPageContent[subSlug];
  if (!found || !content) notFound();
  const { parent, sub } = found;

  const patientStory = sub.patientStorySlug
    ? patientStories.find((s) => s.slug === sub.patientStorySlug)
    : undefined;

  const breadcrumb: BreadcrumbCrumb[] = [
    { label: "Conditions", href: "/conditions" },
    { label: parent.name, href: `/conditions/${parent.slug}` },
    { label: sub.name },
  ];

  const objectiveMeasures = objectiveMeasuresFor(sub.slug);

  return (
    <>
      <SectorJsonLd
        condition={sub}
        url={`${SITE_URL}/conditions/${parent.slug}/${sub.slug}`}
      />
      <SectorPageTemplate
        condition={sub}
        allConditions={conditions}
        patientStory={patientStory}
        sectorContent={content}
        breadcrumb={breadcrumb}
        toolsUsed={toolsForSector(parent.slug)}
        objectiveMeasures={objectiveMeasures}
      />
    </>
  );
}
