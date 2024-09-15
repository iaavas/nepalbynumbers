import SignIn from "./Signin";
import Image from "next/image";
import { Counter } from "./Counter";
import Head from "next/head";

const HeroSection = () => {
  return (
    <>
      <Head>
        <title>
          Discover Nepal by Numbers: Interactive Map & Data Visualization Tools
          | NepalViz
        </title>
        <meta
          name="description"
          content="Create stunning infographics and customize interactive maps of Nepal with NepalViz's no-code tools. Explore Nepal's demographics, economy, and geography through data-driven visualizations. Start your free trial today!"
        />
        <meta
          name="keywords"
          content="Nepal, interactive maps, infographics, data visualization, no-code tools, Nepali statistics, demographic data, economic indicators, geographic analysis, NepalViz"
        />
        <meta
          property="og:title"
          content="NepalViz: Interactive Nepal Map & Data Visualization Platform"
        />
        <meta
          property="og:description"
          content="Customize Nepal maps and create infographics with ease. Explore Nepali data through interactive visualizations. No coding required!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nepalbynumbers.vercel.app/" />
        <meta property="og:image" content="https://nepalviz.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="NepalViz: Discover Nepal Through Interactive Maps & Data"
        />
        <meta
          name="twitter:description"
          content="Create custom Nepal maps and infographics. Visualize Nepali data with our user-friendly tools. Start for free!"
        />
        <meta
          name="twitter:image"
          content="https://pbs.twimg.com/profile_images/1830157049709105152/zj5ugMIN_400x400.jpg"
        />
        <link rel="canonical" href="https://nepalbynumbers.vercel.app/" />
      </Head>
      <section className="min-h-screen flex sm:flex-row flex-col-reverse justify-center  px-8 py-16 gap-10 border-b border-gray-200 shadow-sm sm:px-12">
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-2xl mx-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Discover <span className="text-blue-600">Nepal by Numbers</span>
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Create stunning infographics and customize maps centered around
              Nepal, with our user-friendly no-code tools.
            </p>
            <p className="text-sm md:text-base text-gray-500 mb-8 leading-relaxed">
              Unlock the power of data visualization for Nepal&apos;s geography.
            </p>

            <SignIn />
          </div>

          <Counter />
        </div>

        <div>
          <Image
            src="/hero.png"
            alt="Interactive visualization of Nepal's data with custom maps and infographic templates"
            width={800}
            height={800}
            priority
          />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
