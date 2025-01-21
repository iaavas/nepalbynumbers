import React from "react";
import Image from "next/image";
import SignIn from "./Signin";
import { Counter } from "./Counter";
import Head from "next/head";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-white overflow-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 gap-12">
          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-quincy">
                Discover <br />
                <span className="text-black">Nepal by Numbers</span>
              </h1>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Create stunning infographics and customize maps centered
                  around Nepal, with our user-friendly no-code tools.
                </p>
                <p className="text-base text-gray-600">
                  Unlock the power of data visualization for Nepal&apos;s
                  geography.
                </p>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0">
              <SignIn />
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0">
              <Counter />
            </div>
          </div>

          {/* Image Grid Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-[600px] hidden lg:block">
              <Image
                src="/hero.jpeg"
                alt="Nepal data visualization preview"
                width={400}
                height={400}
                priority
                className="absolute top-0 left-0 rounded-lg"
              />
              <Image
                src="/hero.png"
                alt="Custom Nepal maps preview"
                width={400}
                height={400}
                priority
                className="absolute top-20 left-32 rounded-lg"
              />
              <Image
                src="/hero1.jpeg"
                alt="Nepal infographics preview"
                width={400}
                height={400}
                priority
                className="absolute top-40 left-64 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
