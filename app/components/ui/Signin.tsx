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
      className="px-6 py-3 text-black hover:text-white rounded-full border-2 border-blue-500 hover:bg-blue-600 transition ease-in-out duration-300 shadow-lg  text-xl   "
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
