import type { Metadata } from "next";
import SixDoorsGrid from "@/components/home/SixDoorsGrid";
import CMSRoute from "@/components/cms/CMSRoute";
import { withCMSMetadata } from "@/lib/cms/metadata";


const metadataFallback: Metadata = {
  title: "Conditions",
  description:
    "Seven sectors of investigation: autoimmune, brain brightening, concussion, environmental toxins, longevity, idiopathic cases, and chronic pain.",
  alternates: { canonical: "/conditions" },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCMSMetadata("/conditions", metadataFallback);
}

export default function ConditionsHubPage() {
  return (
    <CMSRoute path="/conditions">
      <SixDoorsGrid headingLevel="h1" />
    </CMSRoute>
  );
}
