import HeroSection from "./components/ui/HeroSection";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

export default function Page() {
  return (
    <main className="p-0  ">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
