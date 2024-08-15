"use client";

import React from "react";
import FeatureBox from "./FeatureBox";
import { motion } from "framer-motion";

function FeaturesSection() {
  const features = [
    {
      image: "/features/data.png",
      title: "Paste your data",
      description: "Easily paste your data or upload from an Excel file",
    },
    {
      image: "/features/theme.png",
      title: "Style your Map",
      description: "Customize your map with various color palettes",
    },
    {
      image: "/features/export.png",
      title: "Export & Save",
      description: "Export as PNG or save as a project for future use",
    },
  ];

  return (
    <motion.section
      className="py-20 bg-gradient-to-b from-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Create Your Map in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Three Simple Steps
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how easy it is to bring your data to life with our
            intuitive map creation process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
            >
              <FeatureBox image={feature.image} n={index + 1}>
                <h3 className="text-2xl  mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600">{feature.description}</p>
              </FeatureBox>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default FeaturesSection;
