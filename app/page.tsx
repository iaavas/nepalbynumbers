import HeroSection from "./components/ui/HeroSection";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import FeaturesSection from "./components/ui/FeaturesSection";

export default function Page() {
  return (
    <main className="p-0 h-screen flex flex-col gap-x-12">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
