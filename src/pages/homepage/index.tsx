import MainLayout from "../../components/layout/MainLayout";
import HeroSection from "../../components/home/HeroSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import CTASection from "../../components/home/CTASection";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <CTASection />

    </MainLayout>
  );
}