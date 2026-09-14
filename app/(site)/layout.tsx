import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";

// Chrome for the main marketing site. Landing pages live in app/(lp) and
// supply their own stripped-down header and footer instead. The chat widget
// is mounted here rather than in the root layout so landing pages stay free
// of it.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrganizationJsonLd />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <Script id="knock-knock-widget" strategy="afterInteractive">
        {`
          window.company_id = '6a9169788db2cbf50c5c2258';
          var newScript = document.createElement('script');
          newScript.src = 'https://api.knock-knockapp.com/widget/widget.js';
          document.getElementsByTagName('HEAD')[0].appendChild(newScript);
        `}
      </Script>
    </>
  );
}
