import Link from "next/link";
import React from "react";
import { InstagramOutlined } from "@ant-design/icons";
function Header({ t }: { t: string }) {
  return (
    <h1 className="text-center font-bold text-6xl uppercase bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-800 text-white w-full p-4 top-0 left-0 shadow flex items-center justify-center gap-x-4">
      {t}
    </h1>
  );
}

export default Header;
