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
      className="px-6 py-3 text-white hover:text-black rounded-full border-2 bg-blue-600 hover:bg-white  transition ease-in-out duration-300 border-blue-600  text-lg   "
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
