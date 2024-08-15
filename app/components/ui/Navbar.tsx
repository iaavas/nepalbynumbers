"use client";

import Signin from "./Signin";
import Link from "next/link";

import useUser from "@/app/hooks/useUser";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const currentUser = useUser();
  return (
    <div className="py-3  sm:px-20 px-4   flex justify-between items-center  bg-transparent">
      <div className="flex items-center">
        <Link href={"/"} className=" text-2xl uppercase font-bold  ">
          nbn
        </Link>
      </div>
      {!currentUser ? (
        <div className="md:flex ">
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
