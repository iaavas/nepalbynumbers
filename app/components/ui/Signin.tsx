"use client";

import useUser from "@/app/hooks/useUser";
import { signInWithGoogle } from "@/app/libs/firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

function Signin() {
  const router = useRouter();
  const user = useUser();

  return (
    <button
      className="sm:px-6 sm:py-3  px-3 py-1.5 text-white hover:text-black rounded-sm border-2 bg-blue-800 hover:bg-white  transition ease-in-out duration-300 border-blue-800  text-lg   "
      onClick={async () => {
        if (user) {
          router.push("/templates");
        } else {
          const currentUser = await signInWithGoogle();

          if (currentUser) {
            router.push("/templates");
          }
        }
      }}
    >
      {user ? "Explore Maps" : "Create your Map"}
    </button>
  );
}

export default Signin;
