"use client";
import SignIn from "./Signin";
import { motion } from "framer-motion";

import Image from "next/image";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [templates, setTemplates] = useState(0);
  const [colorPalette, setColorPalette] = useState(0);

  useEffect(() => {
    const animateValue = (
      start: number,
      end: number,
      duration: number,
      setter: React.Dispatch<React.SetStateAction<number>>
    ) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setter(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, 11, 500, setTemplates);
    animateValue(0, 7, 500, setColorPalette);
  }, []);

  return (
    <motion.section
      className={`   grid md:grid-cols-2  items-center  bg-[#f9fafc] sm:px-20 px-4 pt-20   sm:pb-24 pb-32`}
    >
      <div className="flex flex-col justify-start gap-6 ">
        <motion.h1 className="text-3xl md:text-6xl text-gray-900 font-bold leading-tight md:max-w-lg  max-w-full">
          Unfold the story of{" "}
          <span className="text-blue-800 font-bold">Nepal 🇳🇵</span> through
          Maps.
        </motion.h1>

        <p className="md:text-xl text-md text-stone-900 transition-opacity duration-700 opacity-80 hover:opacity-100 font-thin">
          Explore various maps 🗺️ of Nepalese Provinces, Districts.
        </p>

        <SignIn />

        <div className="flex items-center justify-between my-8 ">
          <div>
            <h3 className="text-center text-xl sm:text-2xl font-bold text-blue-900">
              {templates}
            </h3>
            <h3 className="text-center text-sm sm:text-md text-[#706a6a] uppercase">
              Templates
            </h3>
          </div>
          <div>
            <h3 className="text-center text-xl sm:text-2xl font-bold  text-blue-900">
              {colorPalette}
            </h3>
            <h3 className="text-center text-sm sm:text-md text-[#706a6a] uppercase">
              Color Palette
            </h3>
          </div>
          <div>
            <h3 className="text-center text-xl sm:text-2xl font-bold  text-blue-900">
              Free
            </h3>
            <h3 className="text-center text-sm sm:text-md text-[#706a6a] uppercase">
              Pricing
            </h3>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-end mt-8 ">
        <Image
          src="/hero.png"
          alt="Map of Nepal"
          className="rounded-lg mix-blend-multiply	"
          width={400}
          height={400}
          priority
        />
      </div>
    </motion.section>
  );
};

export default HeroSection;
