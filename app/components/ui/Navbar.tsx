"use client";

import { useRouter } from "next/navigation";
import { signOutWithGoogle } from "../../libs/firebase/auth";
import { PiSignOutLight } from "react-icons/pi";

import Signin from "./Signin";
import Link from "next/link";
import { GrProjects } from "react-icons/gr";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { removeSession } from "@/app/actions/auth-actions";
import useUser from "@/app/hooks/useUser";

const Navbar = () => {
  const router = useRouter();
  const currentUser = useUser();
  return (
    <div className="p-2  mx-8  flex justify-between items-center">
      <div className="flex items-center">
        <Link href={"/"} className="font-semibold text-2xl lowercase  ">
          Nepal.by.Numbers
        </Link>
      </div>
      {!currentUser ? (
        <div className="md:flex hidden">
          <Signin />
        </div>
      ) : (
        <div className="">
          <Sheet>
            <SheetTrigger>
              {currentUser?.photoURL && (
                <Image
                  src={currentUser!.photoURL}
                  alt={currentUser!.displayName || "User"}
                  className="h-[50px] w-[50px] rounded-full mr-4"
                  width={50}
                  height={50}
                />
              )}
            </SheetTrigger>
            <SheetContent className="w-[300px]">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex justify-start  items-center border-b border-stone-400 pb-4 font-onest ">
                    {currentUser?.photoURL && (
                      <Image
                        src={currentUser!.photoURL}
                        alt={currentUser!.displayName || "User"}
                        className="h-[50px] w-[50px] rounded-full mr-4"
                        width={50}
                        height={50}
                      />
                    )}
                    <div className="flex flex-col ">
                      <p className="font-normal">{currentUser?.displayName}</p>
                      <p className="font-thin text-sm text-gray-400">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <button
                    onClick={() => {
                      router.push("/projects");
                    }}
                    className="text-base  text-stone-900  hover:bg-stone-100 p-2.5 w-full flex items-center  gap-x-8  transition-all duration-75 ease-in-out font-onest font-normal"
                  >
                    <GrProjects />
                    <span>Projects</span>
                  </button>
                </SheetDescription>
                <SheetDescription>
                  <button
                    onClick={async () => {
                      await signOutWithGoogle();
                      await removeSession();
                      router.push("/");
                    }}
                    className="text-base	  text-stone-900  hover:bg-stone-100 p-2.5 w-full flex items-center   gap-x-8 transition-all duration-75 ease-in-out font-onest font-normal"
                  >
                    <PiSignOutLight />
                    <span>Sign Out</span>
                  </button>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
};

export default Navbar;
