import type { Condition } from "@/content/conditions";
import { SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonLd";

interface SectorJsonLdProps {
  condition: Condition;
  url: string;
}

export default function SectorJsonLd({ condition, url }: SectorJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${condition.name} | NeuroIntegrative Care of Los Gatos`,
    description: condition.heroLine,
    url,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "NeuroIntegrative Care of Los Gatos",
      url: `${SITE_URL}/`,
    },
    about: {
      "@type": "MedicalCondition",
      name: condition.name,
    },
    specialty: {
      "@type": "MedicalSpecialty",
      name: "Neurology",
    },
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    },
    lastReviewed: new Date().toISOString().split("T")[0],
    reviewedBy: {
      "@type": "Physician",
      name: "Dr. Thomas Santucci",
    },
    mainContentOfPage: {
      "@type": "WebPageElement",
      description: condition.whatWeInvestigate,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
    />
  );
}
