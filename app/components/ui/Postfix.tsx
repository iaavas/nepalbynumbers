import React from "react";
import TextField from "@mui/material/TextField";
import { usePostfix } from "@/app/context/PostfixContext";
function Postfix() {
  const { postfix, prefix, setPostfix, setPrefix } = usePostfix();
  return (
    <div className="flex gap-4 items-center justify-between ">
      <TextField
        id="outlined-basic"
        label="Postfix"
        variant="outlined"
        value={postfix}
        size="small"
        onChange={(e) => setPostfix(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Prefix"
        variant="outlined"
        value={prefix}
        size="small"
        onChange={(e) => setPrefix(e.target.value)}
      />
    </div>
  );
}

export default Postfix;
