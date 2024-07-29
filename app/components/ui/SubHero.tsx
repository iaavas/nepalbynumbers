"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { once } from "events";

function SubHero() {
  return (
    <div className="mx-auto p-8  bg-[#1F2937] flex flex-col items-center justify-center rounded-t-3xl mb-4 w-full">
      <motion.div
        className="text-white flex items-center justify-center gap-4 flex-col"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl leading-9 text-center font-bold max-w-3xl text-stone-100 drop-shadow-lg">
          Create beautiful maps with Nepal By Numbers, in the most simplest way!
        </h2>
        <p className="text-lg font-sans tracking-wide text-gray-300 italic">
          It&apos;s easier than ordering a coffee!
        </p>
      </motion.div>
      <motion.div
        className="p-4 my-4"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Image
          src={"/hero-1.png"}
          width={800}
          height={800}
          alt="hero-1"
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
}

export default SubHero;
