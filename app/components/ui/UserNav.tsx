"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { firebaseAuth } from "@/app/libs/firebase/config";
import { User } from "firebase/auth";
import { MoreOutlined } from "@ant-design/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutWithGoogle } from "@/app/libs/firebase/auth";
import { removeSession } from "@/app/actions/auth-actions";

function UserNav() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreOutlined size={1} className="text-2xl font-bold" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  onClick={() => {
                    router.push("/projects");
                  }}
                >
                  Projects
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={async () => {
                    await signOutWithGoogle();
                    await removeSession();
                    router.push("/");
                  }}
                >
                  Sign Out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default UserNav;
