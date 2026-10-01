import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";
import { LeadFormModalProvider } from "@/components/lp/LeadFormModal";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Analytics live in the root layout rather than the site layout so the
// landing pages under app/(lp) are measured too.
const GA_MEASUREMENT_ID = "G-FYBZCG4XTR";
const CLARITY_PROJECT_ID = "yj6lxdpllg";
const META_PIXEL_ID = "1221065142560069";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: "variable",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const SITE_TITLE = "NeuroIntegrative Care of Los Gatos";
const SITE_TAGLINE =
  "Functional Medicine & Root-Cause Investigation in Los Gatos, CA";
const SITE_DESCRIPTION =
  "Dr. Santucci's 30-year root-cause investigation of brain, metabolism, and nervous system, for people whose labs read \u201Cnormal\u201D but who don't feel right.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TITLE} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_TITLE,
    title: `${SITE_TITLE} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Must mount before any page content: pages (e.g. the thank-you
            page's Lead event) call fbq() directly and assume it already
            exists. Scripts placed after </body> mount after this subtree,
            which left fbq undefined when a nested page tried to use it. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            // Explicitly opt out of restricted data processing — without this,
            // Meta's SDK silently suppressed Lead events ("restricted event" warning).
            fbq('dataProcessingOptions', []);
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height={1}
            width={1}
            alt=""
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <MotionProvider>
          <LeadFormModalProvider>{children}</LeadFormModalProvider>
        </MotionProvider>
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `}
      </Script>
    </html>
  );
}
