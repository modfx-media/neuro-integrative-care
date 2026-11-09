import type { Metadata } from "next";
import ThankYouLeadTracker from "@/components/analytics/ThankYouLeadTracker";
import DetoxDetectiveVsl from "@/components/lp/DetoxDetectiveVsl";
import CMSRoute from "@/components/cms/CMSRoute";
import { withCMSMetadata } from "@/lib/cms/metadata";
import { LP_VIDEO_PATH } from "@/lib/ghl-form";

// Second step in the free-discovery-call funnel: watch the Detox Detective
// video before picking a time on thank-you. Noindexed like the rest of the
// funnel — this page is not meant to rank on its own.
const metadataFallback: Metadata = {
  title: "Detox Detective Program",
  description:
    "Watch Dr. Santucci introduce the Detox Detective Program, then choose a time for a free discovery call.",
  robots: { index: false, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  return withCMSMetadata(LP_VIDEO_PATH, metadataFallback);
}

export default function DetoxDetectiveVideoPage() {
  return (
    <CMSRoute path={LP_VIDEO_PATH}>
      <>
        <DetoxDetectiveVsl />
        <ThankYouLeadTracker />
      </>
    </CMSRoute>
  );
}
