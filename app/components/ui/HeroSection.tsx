"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SignIn from "./Signin";
import Image from "next/image";

const HeroSection = () => {
  const [templateCount, setTemplateCount] = useState(0);
  const [paletteCount, setPaletteCount] = useState(0);

  useEffect(() => {
    const animateNumbers = (
      start: number,
      end: number,
      duration: number,
      setValue: React.Dispatch<React.SetStateAction<number>>
    ) => {
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setValue(Math.floor(progress * (end - start) + start));
        if (progress < 1) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    };

    animateNumbers(0, 9, 1000, setTemplateCount);
    animateNumbers(0, 9, 1000, setPaletteCount);
  }, []);

  return (
    <section className="min-h-screen flex sm:flex-row flex-col-reverse justify-center items-center px-8 py-16 gap-10 border-b border-gray-200 shadow-sm sm:px-12 ">
      <div className="flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Discover <span className="text-blue-600">Nepal by Numbers</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Customize maps and create stunning infographics centered around
            Nepal, with no coding required.
          </p>
          <p className="text-lg text-gray-500 mb-8 italic ">
            Use the best tools for no-code map customization.
          </p>

          <SignIn />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex flex-col md:flex-row justify-center gap-12 mt-12"
        >
          <StatisticCard value={templateCount} label="Map Templates" />
          <StatisticCard value={paletteCount} label="Color Palettes" />
          <StatisticCard value={"Free"} label="Starting Price" />
        </motion.div>
      </div>
      <div>
        <Image
          src="/hero.png"
          alt="Visualization of Nepal data with custom maps and templates"
          width={600}
          height={600}
        />
      </div>
    </section>
  );
};

const StatisticCard = ({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-8 text-center"
    >
      <h3 className="text-3xl font-semibold text-gray-800 mb-2">{value}</h3>
      <p className="text-sm text-gray-500 tracking-wider uppercase">{label}</p>
    </motion.div>
  );
};

export default HeroSection;
