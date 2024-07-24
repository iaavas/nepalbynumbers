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
      className="px-4 py-3 bg-blue-800 text-white rounded-3xl hover:bg-blue-700 ease-in-out  w-40 "
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
