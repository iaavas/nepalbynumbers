"use client";
import SignIn from "./Signin";
import { motion } from "framer-motion";

import Image from "next/image";

const HeroSection = () => {
  return (
    <motion.section
      className={`   grid md:grid-cols-2  items-center  bg-[#f9fafc] px-20 pt-20   pb-48`}
    >
      <div className="flex flex-col justify-start gap-6 ">
        <motion.h1
          className="text-6xl text-gray-900 font-bold leading-tight max-w-lg "
          initial={{ opacity: 0.8, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          Unfold the story of{" "}
          <span className="text-blue-800 font-bold">Nepal 🇳🇵</span> through
          Maps.
        </motion.h1>

        <p className="text-xl text-stone-900 transition-opacity duration-700 opacity-80 hover:opacity-100 font-thin">
          Explore various maps 🗺️ of Nepalese Provinces, Districts.
        </p>

        <SignIn />
      </div>
      <div className="flex justify-center md:justify-end ">
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
