"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { firebaseAuth } from "@/app/libs/firebase/config";

function UserNav() {
  const router = useRouter();

  const currentUser = firebaseAuth.currentUser;

  return (
    <div className="w-full h-20 bg-white shadow-sm border-b ">
      <div className="p-2 md:max-w-[1080px] max-w-[400px] m-auto w-full h-full flex justify-between items-center">
        {/* Left part: User profile */}
        <div className="flex items-center">
          {currentUser?.photoURL ? (
            <Image
              src={currentUser.photoURL}
              alt={currentUser.displayName || "User"}
              className="h-[50px] w-[50px] rounded-full mr-4"
              width={50}
              height={50}
            />
          ) : (
            <div className="h-[50px] w-[50px] rounded-full bg-gray-200 mr-4"></div>
          )}
          <h1 className="text-lg capitalize">
            {`Hello, ${currentUser?.displayName?.split(" ")[0] || "Username"}`}
          </h1>
        </div>
        {/* Right part: Projects button */}
        <div className="md:flex hidden">
          <button
            className="p-1.5 border-gray-600 border text-gray-500 rounded-sm ease-in-out hover:border-blue-500 hover:text-blue-500"
            onClick={() => {
              router.push("/projects");
            }}
          >
            Projects
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserNav;
