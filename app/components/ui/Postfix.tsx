import React from "react";
import TextField from "@mui/material/TextField";
import { usePostfix } from "@/app/context/PostfixContext";
function Postfix() {
  const { postfix, prefix, setPostfix, setPrefix } = usePostfix();
  return (
    <div className="flex gap-4 items-center justify-between ">
      <input
        value={postfix}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Postfix"
        onChange={(e) => setPostfix(e.target.value)}
      />
      <input
        value={prefix}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Prefix"
        onChange={(e) => setPrefix(e.target.value)}
      />
    </div>
  );
}

export default Postfix;
