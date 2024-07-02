import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-gray-50/10 py-24 px-4">
      <div className="md:max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col justify-start gap-6">
          <p className="text-7xl text-blue-600 font-extrabold leading-tight">
            Visualize Nepal in Maps
          </p>
          <h1 className="text-3xl text-gray-800 font-semibold leading-relaxed">
            Access over <span className="text-cyan-700 font-bold">9</span> maps,
            including individual maps of{" "}
            <span className="text-cyan-700 font-bold">7</span> provinces.
          </h1>
          <p className="text-lg text-gray-700">
            Explore various versions that have evolved over the years.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/3.jpg"
            alt="Map of Nepal"
            className="rounded-lg "
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
