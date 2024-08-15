"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import SignIn from "./Signin";

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

    animateValue(0, 11, 800, setTemplates);
    animateValue(0, 7, 800, setColorPalette);
  }, []);

  return (
    <motion.section
      className="min-h-screen flex items-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 px-6 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          className="flex-1 "
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-8 ">
            NEPAL BY NUMBERS
          </h1>
          <p className="text-xl text-gray-700 mb-10">
            Explore and customize maps of Nepalese provinces and districts with
            our intuitive no-code system.
          </p>
          <SignIn />
          <div className="flex items-center justify-between mt-16">
            {[
              { value: templates, label: "Templates" },
              { value: colorPalette, label: "Color Palettes" },
              { value: "Free", label: "Starting Price" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-800">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-600 uppercase tracking-wide">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className="flex-1 relative">
          <motion.div
            className="relative w-full max-w-lg mx-auto mix-blend-multiply"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Image
              src="/hero.png"
              alt="Map of Nepal"
              className="relative rounded-lg  mix-blend-multiply"
              width={500}
              height={500}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
