import Script from "next/script";
import LpHeader from "@/components/lp/LpHeader";
import LpFooter from "@/components/lp/LpFooter";
import { LeadFormModalProvider } from "@/components/lp/LeadFormModal";
import {
  GHL_LP_POPUP_FORM_HEIGHT,
  GHL_LP_POPUP_FORM_ID,
  GHL_LP_POPUP_FORM_NAME,
  GHL_LP_POPUP_FORM_TITLE,
} from "@/lib/ghl-form";

// Meta (Facebook) Pixel for this funnel only, scoped to the (lp) route
// group rather than the root layout.
const META_PIXEL_ID = "1221065142560069";

// Chrome for standalone campaign landing pages: no site nav, no site footer.
// Nests its own LeadFormModalProvider so CTAs under this route group open
// the LP-specific popup form instead of the sitewide one from app/layout.tsx.
export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <LeadFormModalProvider
      formId={GHL_LP_POPUP_FORM_ID}
      formHeight={GHL_LP_POPUP_FORM_HEIGHT}
      formName={GHL_LP_POPUP_FORM_NAME}
      formTitle={GHL_LP_POPUP_FORM_TITLE}
    >
      <LpHeader />
      {/* lp-mobile-center: see globals.css — centers this page's content on mobile only. */}
      <main className="lp-mobile-center flex-1">{children}</main>
      <LpFooter />
      <Script id="knock-knock-widget" strategy="afterInteractive">
        {`
          window.company_id = '6a9169788db2cbf50c5c2258';
          var newScript = document.createElement('script');
          newScript.src = 'https://api.knock-knockapp.com/widget/widget.js';
          document.getElementsByTagName('HEAD')[0].appendChild(newScript);
        `}
      </Script>
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
    </LeadFormModalProvider>
  );
}
