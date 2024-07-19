"use client";

import SignIn from "./Signin";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger animation on mount
    setAnimate(true);
  }, []);

  return (
    <div className={` mx-8 py-2 grid md:grid-cols-2  items-center `}>
      <div className="flex flex-col justify-start gap-6 ">
        <p className="text-6xl text-gray-900 font-extrabold leading-tight ">
          Unfold the story of{" "}
          <span className="text-blue-500 font-bold">Nepal</span> through Maps
        </p>

        <p className="text-xl text-gray-700 transition-opacity duration-700 opacity-80 hover:opacity-100">
          Explore various maps of Nepalese Provinces, Districts.
        </p>
        <SignIn />
      </div>
      <div className="flex justify-center md:justify-end ">
        <Image
          src="/3.jpg"
          alt="Map of Nepal"
          className="rounded-lg transition-all ease-in-out duration-500 grayscale hover:grayscale-0"
          width={400}
          height={400}
          priority
        />
      </div>
    </div>
  );
};

export default HeroSection;
