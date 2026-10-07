import type { Metadata } from "next";
import Link from "next/link";
import DocumentShell from "@/components/cms/DocumentShell";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <DocumentShell>
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-b">404</p>
        <h1 className="mt-4 font-serif text-4xl text-ink">This page is not here</h1>
        <p className="mt-4 text-lg text-ink/75">
          The URL may have moved. Head back to the homepage to keep exploring care options.
        </p>
        <Link href="/" className="mt-8 inline-flex text-sm font-medium text-ink underline">
          Return home
        </Link>
      </main>
    </DocumentShell>
  );
}
