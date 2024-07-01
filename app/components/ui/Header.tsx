import Link from "next/link";
import React from "react";
import { InstagramOutlined } from "@ant-design/icons";
function Header() {
  return (
    <h1 className="text-center font-bold text-6xl uppercase bg-gradient-to-r from-blue-800 via-cyan-500 to-indigo-800 text-white w-full p-4 top-0 left-0 shadow flex items-center justify-center gap-x-4">
      Nepal By Numbers
      <Link
        href={"https://www.instagram.com/imaavas"}
        className="flex items-center"
        target="_blank"
      >
        <InstagramOutlined className="text-4xl font-bold" />
      </Link>
    </h1>
  );
}

export default Header;
