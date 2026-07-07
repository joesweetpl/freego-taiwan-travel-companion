import { AudienceSection } from "@/components/AudienceSection";
import { BookingSection } from "@/components/BookingSection";
import { FAQSection } from "@/components/FAQSection";
import { FleetSection } from "@/components/FleetSection";
import { FoodSpotsSection } from "@/components/FoodSpotsSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PainPointSection } from "@/components/PainPointSection";
import { PlanningCTASection } from "@/components/PlanningCTASection";
import { PremiumTrustSection } from "@/components/PremiumTrustSection";
import { SolutionSection } from "@/components/SolutionSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TravelCompanionSection } from "@/components/TravelCompanionSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PremiumTrustSection />
        <BookingSection />
        <FoodSpotsSection />
        <PainPointSection />
        <SolutionSection />
        <TravelCompanionSection />
        <FleetSection />
        <AudienceSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <PlanningCTASection />
      </main>
      <Footer />
    </>
  );
}
