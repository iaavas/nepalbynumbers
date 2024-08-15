import React from "react";
import {
  Sheet,
  SheetContent,
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
import { FaMap } from "react-icons/fa6";

function Sidebar({ css }: { css?: string }) {
  const router = useRouter();
  const currentUser = useUser();

  const menuItems = [
    {
      label: "Projects",
      icon: <GrProjects />,
      action: () => router.push("/projects"),
    },
    {
      label: "Templates",
      icon: <FaMap />,
      action: () => router.push("/templates"),
    },
    {
      label: "Sign Out",
      icon: <PiSignOutLight />,
      action: async () => {
        await signOutWithGoogle();
        await removeSession();
        router.push("/");
      },
    },
  ];

  return (
    <Sheet>
      <SheetTrigger className={css}>
        {currentUser?.photoURL && (
          <Image
            src={currentUser.photoURL}
            alt={currentUser.displayName || "User"}
            className="h-10 w-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
            width={48}
            height={48}
          />
        )}
      </SheetTrigger>
      <SheetContent className="w-80 bg-white shadow-lg p-0 mb-0">
        <SheetHeader className="border-b border-gray-200">
          <SheetTitle className="m-0">
            <div className="flex items-center p-4">
              {currentUser?.photoURL && (
                <Image
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "User"}
                  className="h-12 w-12 rounded-full mr-4"
                  width={48}
                  height={48}
                />
              )}
              <div className="flex flex-col">
                <p className=" text-lg text-gray-800 font-normal">
                  {currentUser?.displayName}
                </p>
                <p className="font-normal text-sm text-gray-500">
                  {currentUser?.email}
                </p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="text-base font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
