"use client";

import { signInWithGoogle } from "../libs/firebase/auth";

import Header from "../components/ui/Header";

export default function SignIn() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center  py-2">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <button
          onClick={signInWithGoogle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In with Google
        </button>
      </div>
    </>
  );
}
