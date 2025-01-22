"use client"; // Error components must be Client Components

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col justify-center items-center gap-6">
      <h2 className="text-4xl">Something went wrong!</h2>
      <Image src={"/error.jpg"} alt="error" height={500} width={500} />
      <button
        onClick={() => router.push("/")}
        className="border-2 border-black p-1.5 rounded-xl"
      >
        Go Back!
      </button>
    </div>
  );
}
