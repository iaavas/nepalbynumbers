import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
    </div>
  );
}

export default loading;
