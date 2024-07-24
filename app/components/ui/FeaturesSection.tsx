"use client";
import React from "react";
import FeatureBox from "./FeatureBox";
import { motion } from "framer-motion";

function FeaturesSection() {
  return (
    <motion.section className="px-20 py-4 flex flex-col gap-y-12 mt-8 font-robo ">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold ">How to create your map?</h1>
        <p className="text-lg text-gray-400">It&apos;s just three step away.</p>
      </div>
      <motion.div
        className="grid grid-cols-3 grid-rows-1 gap-x-16 mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <FeatureBox image="/features/data.png" n={1}>
          <h1 className="text-2xl ">Paste your data</h1>
          <p className="text-lg font-thin text-stone-500">
            Either paste your data or upload from a excel file
          </p>
        </FeatureBox>
        <FeatureBox image="/features/theme.png" n={2}>
          <h1 className="text-2xl ">Style your Map</h1>
          <p className="text-lg font-thin text-stone-500">
            Style your map with various color palette
          </p>
        </FeatureBox>
        <FeatureBox image="/features/export.png" n={3}>
          <h1 className="text-2xl ">Export & Save your project</h1>
          <p className="text-lg font-thin text-stone-500">
            Either export your map as png or save it as a project for future use
          </p>
        </FeatureBox>
      </motion.div>
    </motion.section>
  );
}

export default FeaturesSection;
