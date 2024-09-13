import HeroSection from "./components/ui/HeroSection";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import FeaturesSection from "./components/ui/FeaturesSection";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Nepal By Numbers | Map Visualizations & Infographics</title>
        <meta
          name="description"
          content="Discover Nepal through data with our advanced map visualization and infographic tools. Choose from 9 map templates, 9 themes, and export in high quality. Optimized for desktop."
        />
        <meta
          name="keywords"
          content="Nepal, Data Visualization, Map Templates, Infographics, High Quality Exports, Nepal By Numbers"
        />
        <meta name="author" content="Aavash baral" />
        <meta property="og:title" content="Nepal By Numbers" />
        <meta
          property="og:description"
          content="Explore data for Nepal with stunning map visualizations and custom infographics."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.nepalbynumbers.vercel.app"
        />

        <link rel="canonical" href="https://www.nepalbynumbers.vercel.app" />
      </Head>
      <main className="p-0  flex flex-col gap-x-12 ">
        <Navbar />
        <HeroSection />
        {/* <SubHero /> */}
        <FeaturesSection />
        <Footer />
      </main>
    </>
  );
}
