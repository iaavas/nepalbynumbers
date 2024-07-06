"use client";
import { createSession } from "@/app/actions/auth-actions";
import { useSession } from "@/app/context/SessionContext";
import { signInWithGoogle } from "@/app/libs/firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

function Signin() {
  const router = useRouter();
  const { setUser } = useSession();
  return (
    <button
      className="px-4 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 ease-in-out  max-w-sm "
      onClick={async () => {
        const user = await signInWithGoogle();
        if (user) {
          await createSession(user.uid);
          setUser(user);

          router.push("/templates");
        }
      }}
    >
      Create your Map
    </button>
  );
}

export default Signin;
