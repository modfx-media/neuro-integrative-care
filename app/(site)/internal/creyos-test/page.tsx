import type { Metadata } from "next";
import CreyosTestPanel from "@/components/home/CreyosTestPanel";

export const metadata: Metadata = {
  title: "Creyos Integration Test",
  robots: { index: false, follow: false },
};

export default function CreyosTestPage() {
  return (
    <main className="pt-24">
      <CreyosTestPanel />
    </main>
  );
}
