"use client";
import { createSession } from "@/app/actions/auth-actions";
import { signInWithGoogle } from "@/app/libs/firebase/auth";
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
    <section className="w-full bg-gray-50/10 py-24 px-4">
      <div
        className={`md:max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 items-center ${
          animate ? "animate-hero" : ""
        }`}
      >
        <div className="flex flex-col justify-start gap-6 animate-fade-in-left">
          <p className="text-7xl text-blue-600 font-extrabold leading-tight transition-transform duration-700 transform hover:scale-105">
            Visualize Nepal in Maps
          </p>

          <button
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ease-in-out md:hidden max-w-md "
            onClick={async () => {
              const user = await signInWithGoogle();
              if (user) {
                await createSession(user);

                router.push("/templates");
              }
            }}
          >
            Create your Map Here
          </button>

          <h1 className="text-3xl text-gray-800 font-semibold leading-relaxed transition-transform duration-700 transform hover:scale-105">
            Access over <span className="text-cyan-700 font-bold">9</span> maps,
            including individual maps of{" "}
            <span className="text-cyan-700 font-bold">7</span> provinces.
          </h1>
          <p className="text-lg text-gray-700 transition-opacity duration-700 opacity-80 hover:opacity-100">
            Explore various versions that have evolved over the years.
          </p>
        </div>
        <div className="flex justify-center md:justify-end animate-fade-in-right">
          <Image
            src="/3.jpg"
            alt="Map of Nepal"
            className="rounded-lg transition-transform duration-700 transform hover:scale-105"
            width={400}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
