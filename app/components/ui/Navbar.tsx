"use client";

import Signin from "./Signin";
import Link from "next/link";

import useUser from "@/app/hooks/useUser";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const currentUser = useUser();
  return (
    <div className="py-3  sm:px-6 px-4   flex justify-between items-center  bg-transparent border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <Link
          href={"/"}
          className=" text-2xl  font-sans font-bold   uppercase "
        >
          Nepal By Numbers
        </Link>
      </div>
      {!currentUser ? (
        <div className=" md:hidden block ">
          <Signin />
        </div>
      ) : (
        <div className="">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default Navbar;
