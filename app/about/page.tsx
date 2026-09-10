import type { Metadata } from "next";
import Home2Hero from "@/components/home2/Home2Hero";
import Home2ConditionGrid from "@/components/home2/Home2ConditionGrid";
import Home2Proof from "@/components/home2/Home2Proof";
import Home2WhyChooseUs from "@/components/home2/Home2WhyChooseUs";
import Home2HowItWorks from "@/components/home2/Home2HowItWorks";
import Home2VirtualProgram from "@/components/home2/Home2VirtualProgram";
import Home2Recognition from "@/components/home2/Home2Recognition";
import Home2FinalCTA from "@/components/home2/Home2FinalCTA";
import Home2VisitUs from "@/components/home2/Home2VisitUs";

export const metadata: Metadata = {
  title: "About",
  description:
    "About NeuroIntegrative Care of Los Gatos: a drug-free, root-cause investigation into the brain, metabolism, and nervous system.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | NeuroIntegrative Care of Los Gatos",
    description:
      "About NeuroIntegrative Care of Los Gatos: a drug-free, root-cause investigation into the brain, metabolism, and nervous system.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Home2Hero />
      <Home2ConditionGrid />
      <Home2Proof />
      <Home2WhyChooseUs />
      <Home2HowItWorks />
      <Home2VirtualProgram />
      <Home2Recognition />
      <Home2FinalCTA />
      <Home2VisitUs />
    </>
  );
}
