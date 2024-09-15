"use client";
import { centers } from "@/app/constants/Centers";
import { colors as colorPalettes } from "@/app/constants/Colors";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Counter = () => {
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
    const totalColors = Object.entries(colorPalettes).length;

    const totalTemplates = Object.entries(centers).length;

    animateNumbers(0, totalTemplates, 1000, setTemplateCount);
    animateNumbers(0, totalColors, 1000, setPaletteCount);
  }, []);

  return (
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
