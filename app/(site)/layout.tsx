import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import DocumentShell, { siteMetadata } from "@/components/cms/DocumentShell";
import { getFooterQuickLinks, getHeaderNavItems } from "@/lib/cms/query";

export const metadata = siteMetadata;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navItems, quickLinks] = await Promise.all([
    getHeaderNavItems(),
    getFooterQuickLinks(),
  ]);

  return (
    <DocumentShell>
      <OrganizationJsonLd />
      <Nav items={navItems} />
      <main className="flex-1">{children}</main>
      <Footer quickLinks={quickLinks} />
      <Script id="knock-knock-widget" strategy="afterInteractive">
        {`
          window.company_id = '6a9169788db2cbf50c5c2258';
          var newScript = document.createElement('script');
          newScript.src = 'https://api.knock-knockapp.com/widget/widget.js';
          document.getElementsByTagName('HEAD')[0].appendChild(newScript);
        `}
      </Script>
    </DocumentShell>
  );
}
