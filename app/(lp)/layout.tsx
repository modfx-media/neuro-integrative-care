import Script from "next/script";
import LpHeader from "@/components/lp/LpHeader";
import LpFooter from "@/components/lp/LpFooter";
import { LeadFormModalProvider } from "@/components/lp/LeadFormModal";
import DocumentShell from "@/components/cms/DocumentShell";
import {
  GHL_LP_POPUP_FORM_HEIGHT,
  GHL_LP_POPUP_FORM_ID,
  GHL_LP_POPUP_FORM_NAME,
  GHL_LP_POPUP_FORM_TITLE,
} from "@/lib/ghl-form";

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell>
      <LeadFormModalProvider
        formId={GHL_LP_POPUP_FORM_ID}
        formHeight={GHL_LP_POPUP_FORM_HEIGHT}
        formName={GHL_LP_POPUP_FORM_NAME}
        formTitle={GHL_LP_POPUP_FORM_TITLE}
      >
        <Script id="gtm-lp" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W7S73D9P');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W7S73D9P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LpHeader />
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
      </LeadFormModalProvider>
    </DocumentShell>
  );
}
