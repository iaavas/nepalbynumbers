"use client";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "../firebase/auth";
import { saveUser } from "../services/firestore";
import Header from "../components/ui/Header";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      const res = await saveUser(user);
      console.log(res);
      router.push("/");
    } catch (error) {
      console.error("Error during sign-in: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center  py-2">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In with Google
        </button>
      </div>
    </>
  );
}
