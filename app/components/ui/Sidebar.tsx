import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { removeSession } from "@/app/actions/auth-actions";
import { signOutWithGoogle } from "../../libs/firebase/auth";
import useUser from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GrProjects } from "react-icons/gr";
import { PiSignOutLight } from "react-icons/pi";

function Sidebar({ css }: { css?: string }) {
  const router = useRouter();
  const currentUser = useUser();

  return (
    <Sheet>
      <SheetTrigger className={css}>
        {currentUser?.photoURL && (
          <Image
            src={currentUser.photoURL}
            alt={currentUser.displayName || "User"}
            className="h-8 w-8 rounded-full "
            width={48}
            height={48}
          />
        )}
      </SheetTrigger>
      <SheetContent className="w-80 bg-stone-100 shadow-lg p-0 mb-0">
        <SheetHeader>
          <SheetTitle className="m-0">
            <div className="flex items-center bg-gray-200/70 p-3">
              {currentUser?.photoURL && (
                <Image
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "User"}
                  className="h-8 w-8 rounded-full mr-4"
                  width={48}
                  height={48}
                />
              )}
              <div className="flex flex-col">
                <p className="font-normal text-base">
                  {currentUser?.displayName}
                </p>
                <p className="font-light text-base text-gray-500">
                  {currentUser?.email}
                </p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="p-0 ">
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center  p-3 w-full text-black hover:bg-slate-200/70  transition-colors duration-75 text-base font-thin mt-0"
          >
            <span className="text-center">Projects</span>
          </button>

          <button
            onClick={async () => {
              router.push("/templates");
            }}
            className="flex items-center  p-3 w-full text-black hover:bg-slate-200/70  transition-colors duration-75  text-base font-thin"
          >
            <span>Templates</span>
          </button>

          <button
            onClick={async () => {
              await signOutWithGoogle();
              await removeSession();
              router.push("/");
            }}
            className="flex items-center  p-3 w-full text-black hover:bg-slate-200/70  transition-colors duration-75  text-base font-thin"
          >
            <span>Sign Out</span>
          </button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
