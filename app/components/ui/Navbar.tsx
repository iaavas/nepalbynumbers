"use client";

import Signin from "./Signin";
import Link from "next/link";

import useUser from "@/app/hooks/useUser";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const currentUser = useUser();
  return (
    <div className="py-3  sm:px-20 px-4   flex justify-between items-center ">
      <div className="flex items-center">
        <Link
          href={"/"}
          className="font-semibold text-2xl lowercase tracking-wide "
        >
          Nepal.by.Numbers
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
