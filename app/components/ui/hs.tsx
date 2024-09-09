"use client";

import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Layers, Palette, Zap } from "lucide-react";

export default function Component() {
  const [templates, setTemplates] = useState(0);
  const [colorPalette, setColorPalette] = useState(0);
  const mapRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

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

    animateValue(0, 11, 1500, setTemplates);
    animateValue(0, 7, 1500, setColorPalette);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    // @ts-ignore
    const rect = mapRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 px-6 py-20 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative">
        <motion.div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="flex-1 z-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.h1
            className="text-6xl lg:text-7xl font-black text-white leading-tight mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            NEPAL BY
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {" "}
              NUMBERS
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Dive into an immersive journey through Nepal&apos;s provinces and
            districts. Craft your story with data, powered by our cutting-edge
            no-code platform.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <form className="flex gap-2 mb-8">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:from-pink-600 hover:to-yellow-600"
              >
                Get Started
              </Button>
            </form>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { value: templates, label: "Templates", icon: Layers },
              { value: colorPalette, label: "Color Palettes", icon: Palette },
              { value: "Free", label: "Starting Price", icon: Zap },
              { value: "77", label: "Districts", icon: MapPin },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.8 }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <h3 className="text-3xl font-bold text-white mb-1">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="flex-1 relative"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          ref={mapRef}
          onMouseMove={handleMouseMove}
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="relative w-full max-w-lg mx-auto"
            style={{ rotateX, rotateY }}
          >
            <Image
              src="/hero.png"
              alt="Interactive Map of Nepal"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-pink-500/30 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
