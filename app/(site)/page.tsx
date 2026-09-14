import HeroSection from "@/components/home/HeroSection";
import SixDoorsGrid from "@/components/home/SixDoorsGrid";
import ProofCards from "@/components/home/ProofCards";
import GoogleReviewsMarquee from "@/components/home/GoogleReviewsMarquee";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import VirtualProgramBand from "@/components/home/VirtualProgramBand";
import RecognitionSection from "@/components/home/RecognitionSection";
import DoctorTeaser from "@/components/home/DoctorTeaser";
import DoctorVideos from "@/components/home/DoctorVideos";
import FinalCTA from "@/components/home/FinalCTA";
import VisitUsSection from "@/components/home/VisitUsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SixDoorsGrid />
      <ProofCards />
      <GoogleReviewsMarquee />
      <WhyChooseUs />
      <HowItWorks />
      <VirtualProgramBand />
      <RecognitionSection />
      <DoctorTeaser />
      <DoctorVideos />
      <FinalCTA />
      <VisitUsSection />
    </>
  );
}
