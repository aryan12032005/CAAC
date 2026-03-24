import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HomeHighlights from "@/components/HomeHighlights";
import HomeResearchImpact from "@/components/HomeResearchImpact";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <main className="pt-16">
      <HeroSection />
      <HomeHighlights />
      <HomeResearchImpact />
    </main>
    <Footer />
  </>
);

export default Index;
