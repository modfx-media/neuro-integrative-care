import LpHeader from "@/components/lp/LpHeader";
import LpFooter from "@/components/lp/LpFooter";

// Chrome for standalone campaign landing pages: no site nav, no site footer.
export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LpHeader />
      {/* lp-mobile-center: see globals.css — centers this page's content on mobile only. */}
      <main className="lp-mobile-center flex-1">{children}</main>
      <LpFooter />
    </>
  );
}
