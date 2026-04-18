import HeroSection from "@/components/Home/HeroSection";
import TrustSection from "@/components/Home/TrustSection";
import FeaturedGlass from "@/components/Home/FeaturedGlass";
import PricingTicker from "@/components/Home/PricingTicker";
import Testimonials from "@/components/Home/Testimonials";
import CTASection from "@/components/Home/CTASection";

export default function Home() {
  return (
    <>
      <PricingTicker />
      <HeroSection />
      <TrustSection />
      <FeaturedGlass />
      <Testimonials />
      <CTASection />
    </>
  );
}
