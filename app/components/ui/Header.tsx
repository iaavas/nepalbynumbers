import React from "react";

function Header({ t }: { t: string }) {
  return (
    <h1 className="text-center font-bold sm:text-6xl text-3xl uppercase bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-800 text-white w-full p-4 top-0 left-0 shadow flex items-center justify-center gap-x-4">
      {t}
    </h1>
  );
}

export default Header;
