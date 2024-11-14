"use client";

import Signin from "./Signin";
import Link from "next/link";

import useUser from "@/app/hooks/useUser";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const Navbar = () => {
  const currentUser = useUser();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`py-3  sm:px-6 px-4   flex justify-between items-center   border-b border-gray-200 shadow-sm fixed  z-10 w-full mb-8 ${
        hasScrolled ? "bg-white/95" : "bg-white"
      }`}
    >
      <div className="flex items-center">
        <Link
          href={"/"}
          className=" text-2xl  font-sans font-bold   uppercase "
        >
          Nepal By Numbers
        </Link>
      </div>
      {!currentUser ? (
        <div className=" md:hidden block ">
          <Signin />
        </div>
      ) : (
        <div className="">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default Navbar;
