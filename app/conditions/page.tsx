import type { Metadata } from "next";
import SixDoorsGrid from "@/components/home/SixDoorsGrid";

export const metadata: Metadata = {
  title: "Conditions",
  description:
    "Seven sectors of investigation: autoimmune, brain brightening, concussion, environmental toxins, longevity, idiopathic cases, and chronic pain.",
  alternates: { canonical: "/conditions" },
};

export default function ConditionsHubPage() {
  return <SixDoorsGrid headingLevel="h1" />;
}
