import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function loading() {
  return (
    <div className="animate-spin h-screen flex items-center justify-center overflow-clip">
      <ClipLoader color={"#00BFFF"} size={150} />
    </div>
  );
}

export default loading;
