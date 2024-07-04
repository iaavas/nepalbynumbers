import React, { useState } from "react";

import Hamburger from "../assets/hamburgerMenu.svg";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "../../libs/firebase/auth";
import { createSession } from "@/app/actions/auth-actions";
import { useUserSession } from "@/app/hooks/use-user-session";
import { useSession } from "@/app/context/SessionContext";
import Signin from "./Signin";

const Navbar = () => {
  const router = useRouter();
  const { setUser } = useSession();
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
          <Signin />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
