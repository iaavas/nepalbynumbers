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

    animateNumbers(0, 15, 1000, setTemplateCount);
    animateNumbers(0, 8, 1000, setPaletteCount);
  }, []);

  return (
    <section className="min-h-screen  flex  justify-center items-center px-8 py-16 gap-10 border-b border-gray-200 shadow-sm">
      <div className="flex flex-col  justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl "
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Nepal in Numbers
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Easily customize maps and created Nepal based Infographics.
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
        <Image src="/hero.png" alt="Hero Image" width={1500} height={1500} />
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
      className="bg-white  rounded-lg p-8 text-center"
    >
      <h3 className="text-5xl font-semibold text-gray-800 mb-2">{value}</h3>
      <p className="text-sm text-gray-500 tracking-wider uppercase">{label}</p>
    </motion.div>
  );
};

export default HeroSection;
