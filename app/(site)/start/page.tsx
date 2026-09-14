// COMPLIANCE + TODOs:
//
// (1) Booking system NOT yet chosen by client. The "Book my New-Patient
//     Investigation" button uses a mailto placeholder (BOOKING_PLACEHOLDER_HREF
//     below) and the real practice phone as a fallback. Swap the placeholder
//     for a real booking widget (Calendly, Jane, etc.) once the client picks
//     one — the constant is the single source of truth. Do NOT hard-code a
//     booking URL anywhere else on the page.
//
// (2) No dollar figures are published anywhere on the site per CO — pricing
//     is discussed only after the investigation, directly with the patient.

import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/jsonLd";
import Link from "next/link";
import Script from "next/script";
import { Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import BrainAssessmentButton from "@/components/BrainAssessmentButton";
import { SITE_URL } from "@/lib/site";

// Live intake form (GoHighLevel/LeadConnector embed) provided by the client.
const LEAD_FORM_ID = "USqbUJSbAufJeRRap7Z9";

const PAGE_URL = `${SITE_URL}/start`;

const PHONE_DISPLAY = "(408) 871-8222";
const PHONE_HREF = "tel:+14088718222";

// TODO: replace with real booking system URL once client selects one.
const BOOKING_PLACEHOLDER_HREF =
  "mailto:contact@neurointegrativecareoflosgatos.com?subject=New-Patient%20Investigation";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "Book your New-Patient Investigation with Dr. Santucci. Full consultation, complete history review, and a clinical impression that finally fits.",
  alternates: { canonical: "/start" },
  openGraph: {
    title: "Start Here | NeuroIntegrative Care of Los Gatos",
    description:
      "Book the New-Patient Investigation with Dr. Santucci. The beginning of an actual answer.",
    url: "/start",
    type: "article",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "NeuroIntegrative Care of Los Gatos",
  url: PAGE_URL,
  telephone: "+1-408-871-8222",
  address: {
    "@type": "PostalAddress",
    streetAddress: "20 S Santa Cruz Ave, Suite 101",
    addressLocality: "Los Gatos",
    addressRegion: "CA",
    postalCode: "95030",
    addressCountry: "US",
  },
  medicalSpecialty: { "@type": "MedicalSpecialty", name: "Neurology" },
  makesOffer: {
    "@type": "Offer",
    url: PAGE_URL,
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: "New-Patient Investigation",
      description:
        "A full consultation with Dr. Santucci. He reviews your complete history, isolates likely causes, and gives you a clinical impression that finally fits.",
      provider: {
        "@type": "MedicalClinic",
        name: "NeuroIntegrative Care of Los Gatos",
        url: `${SITE_URL}/`,
      },
    },
  },
  potentialAction: {
    "@type": "ReserveAction",
    name: "Book a New-Patient Investigation",
    target: {
      "@type": "EntryPoint",
      // TODO: swap for real booking system when client picks one.
      urlTemplate: BOOKING_PLACEHOLDER_HREF,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "New-Patient Investigation Consult",
    },
  },
};

export default function StartPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink py-28 text-paper lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(11,18,32,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal
            as="p"
            delay={50}
            offset={12}
            className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b"
          >
            Start Here
          </Reveal>
          <Reveal as="span" delay={180} offset={28} className="mt-6 block">
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Start with the investigation.{" "}
              <span className="italic text-amber-b">
                Everything follows from a real answer.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={400} offset={16} className="mt-10 flex justify-center">
            <BrainAssessmentButton />
          </Reveal>
        </div>
      </section>

      {/* What you get from your investigation */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
            <Reveal>
              <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber">
                What You Get From Your Investigation
              </p>
              <p className="mt-8 font-serif text-[2rem] leading-tight text-ink lg:text-[2.5rem]">
                A full consultation with Dr. Santucci.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink">
                A full consultation with Dr. Santucci. He reviews your complete
                history, takes your own account seriously as real evidence,
                isolates the likely causes, and gives you a clinical impression
                that finally fits. You leave understanding what&apos;s actually
                being investigated and why.
              </p>
            </Reveal>
            <Reveal delay={120} offset={24}>
              <div className="rounded-2xl border border-rule/70 bg-paper-2 p-4 shadow-[0_2px_18px_-14px_rgba(11,18,32,0.25)] sm:p-6">
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/form/${LEAD_FORM_ID}`}
                  style={{ width: "100%", height: "839px", border: "none", borderRadius: "8px" }}
                  id={`inline-${LEAD_FORM_ID}`}
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Form 0"
                  data-height="839"
                  data-layout-iframe-id={`inline-${LEAD_FORM_ID}`}
                  data-form-id={LEAD_FORM_ID}
                  data-cookie-consent="true"
                  data-cookie-consent-provider="auto"
                  title="New-Patient Investigation intake form"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What to expect next */}
      <section className="bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <div className="flex items-center gap-4">
                <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber">
                  What To Expect Next
                </p>
              </div>
              <p className="mt-8 font-serif text-[2rem] leading-tight text-ink lg:text-[2.5rem]">
                From investigation to program.
              </p>
              <p className="mt-6 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-ink">
                Priced after the investigation
              </p>
            </Reveal>
            <Reveal delay={120} offset={24} className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-ink">
                If it&apos;s a fit, your investigation moves into testing, brain
                mapping, lab and toxin panels, to confirm the path. Programs
                are built around what we find, whether
                <span className="font-medium"> in-clinic</span> or through
                the{" "}
                <span className="font-medium">at-home virtual program.</span>
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/programs"
                  className="group inline-flex items-center gap-2 rounded-full border border-rule/70 bg-paper px-5 py-2.5 text-[13px] text-ink transition-all hover:border-ink/30 hover:bg-white"
                >
                  See the programs
                  <span
                    aria-hidden="true"
                    className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-amber"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/programs/virtual"
                  className="group inline-flex items-center gap-2 rounded-full border border-rule/70 bg-paper px-5 py-2.5 text-[13px] text-ink transition-all hover:border-ink/30 hover:bg-white"
                >
                  The Virtual Program
                  <span
                    aria-hidden="true"
                    className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-amber"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Honest fit note */}
      <section className="bg-ink py-24 text-paper lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber-b">
              An Honest Fit Note
            </p>
          </Reveal>
          <Reveal delay={120} offset={24} className="mt-6">
            <div className="rounded-2xl border border-rule-d bg-ink-2 p-8 lg:p-12">
              <p className="font-serif text-[1.4rem] leading-[1.4] text-paper sm:text-[1.65rem] lg:text-[1.85rem]">
                We don&apos;t take insurance, and we don&apos;t offer one-off
                chiropractic visits, we work in programs, because{" "}
                <span className="italic text-amber-b">
                  complex problems aren&apos;t solved in a single appointment.
                </span>{" "}
                If you&apos;re looking for a quick insurance-covered adjustment,
                we&apos;re not the right clinic, and we&apos;ll say so.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="book" className="relative overflow-hidden bg-paper-2 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber">
              Ready
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Book your investigation.
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-muted">
              Fill out the form above, or reach us directly.
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-10 flex justify-center">
            <a
              href={PHONE_HREF}
              className="group flex w-full max-w-sm flex-col items-center justify-center rounded-2xl border border-rule/70 bg-paper p-8 transition-all hover:border-ink/30 hover:shadow-[0_20px_60px_-30px_rgba(11,18,32,0.3)]"
            >
              <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber">
                Or Call
              </p>
              <p className="mt-4 font-serif text-[1.35rem] leading-tight text-ink">
                {PHONE_DISPLAY}
              </p>
              <p className="mt-3 font-mono font-medium text-[13px] uppercase tracking-[0.16em] text-muted">
                Tue &amp; Thu, 9:30–3:00
              </p>
              <span
                aria-hidden="true"
                className="mt-6 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>
      </section>
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
