"use client";
import { createSession } from "@/app/actions/auth-actions";
import { useSession } from "@/app/context/SessionContext";
import useUser from "@/app/hooks/useUser";
import { signInWithGoogle } from "@/app/libs/firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

function Signin() {
  const router = useRouter();
  const user = useUser();
  return (
    <button
      className="px-4 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 ease-in-out  max-w-sm "
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
