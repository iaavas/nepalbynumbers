"use client";

import React from "react";
import FeatureBox from "./FeatureBox";
import Head from "next/head";

import { motion } from "framer-motion";

function FeaturesSection() {
  const features = [
    {
      image: "/features/data.png",
      title: "Enter Your Data",
      description:
        "Easily input your data or upload directly from an Excel file.",
    },
    {
      image: "/features/theme.png",
      title: "Style Your Map",
      description: "Customize your map using a variety of color palettes.",
    },
    {
      image: "/features/export.png",
      title: "Export & Save",
      description: "Export as a high-quality PNG, or save your project.",
    },
  ];

  return (
    <>
      <Head>
        <title>
          How to Create Your Nepal Infographic | Easy 3-Step Process
        </title>
        <meta
          name="description"
          content="Learn how to create stunning infographics for Nepal in just three simple steps: Enter Your Data, Style Your Map, and Export & Save. Visualize Nepal's data easily."
        />
      </Head>
      <motion.section
        className="py-10 sm:px-12 px-2 bg-gradient-to-b from-white"
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
            <h2 className="text-5xl mb-4 text-gray-900 font-quincy font-bold tracking-wide ">
              How to Create Your Infographic?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow these 3 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
              >
                <FeatureBox image={feature.image} n={index + 1}>
                  <h3 className="text-2xl mb-3 text-black drop-shadow-sm capitalize font-sans  ">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed tracking-wide">
                    {feature.description}
                  </p>
                </FeatureBox>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Create Your Nepal Infographic",
          description:
            "Learn how to create stunning infographics for Nepal in just three simple steps.",
          step: features.map((feature, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: feature.title,
            text: feature.description,
          })),
        })}
      </script>
    </>
  );
}

export default FeaturesSection;
