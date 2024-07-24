"use client";
import SignIn from "./Signin";
import { motion } from "framer-motion";

import Image from "next/image";

const HeroSection = () => {
  return (
    <motion.section
      className={`   grid md:grid-cols-2  items-center  bg-[#f9fafc] sm:px-20 px-4 pt-20   sm:pb-48 pb-24`}
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
        <div className="">
          <SignIn />
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
