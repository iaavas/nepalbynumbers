"use client";

import { useRouter } from "next/navigation";
import { signOutWithGoogle } from "../../libs/firebase/auth";

import Signin from "./Signin";
import Link from "next/link";

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
        <Link href={"/"} className="font-semibold text-2xl lowercase ">
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
                  <div className="flex justify-start gap-x-4 items-center">
                    {currentUser?.photoURL && (
                      <Image
                        src={currentUser!.photoURL}
                        alt={currentUser!.displayName || "User"}
                        className="h-[50px] w-[50px] rounded-full mr-4"
                        width={50}
                        height={50}
                      />
                    )}
                    <div className="flex flex-col">
                      <p className="font-normal">{currentUser?.displayName}</p>
                      <p className="font-normal text-sm text-gray-400">
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
                    className="text-lg my-2 text-stone-900  hover:border-b-2   "
                  >
                    Projects
                  </button>
                </SheetDescription>
                <SheetDescription>
                  <button
                    onClick={async () => {
                      await signOutWithGoogle();
                      await removeSession();
                      router.push("/");
                    }}
                    className="text-lg mb-2 text-stone-900  hover:border-b-2   "
                  >
                    Sign Out
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
