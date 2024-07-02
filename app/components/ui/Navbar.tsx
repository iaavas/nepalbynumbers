import React, { useState } from "react";

import Hamburger from "../assets/hamburgerMenu.svg";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "../../libs/firebase/auth";
import { createSession } from "@/app/actions/auth-actions";
import { useUserSession } from "@/app/hooks/use-user-session";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="w-full h-[96px] bg-white shadow-sm border-b">
      <div className="p-2 md:max-w-[1080px] max-w-[400px] m-auto w-full h-full flex justify-between items-center">
        {/* <Image src={Logo} alt="logo" className="h-[25px] cursor-pointer" /> */}
        <div className="flex items-center">
          <h1 className="font-semibold text-4xl capitalize ">
            Nepal by Numbers
          </h1>
        </div>
        <div className="md:flex hidden">
          <button
            className="px-4 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 ease-in-out"
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
