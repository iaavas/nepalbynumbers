import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <ClipLoader
        color={"#00BFFF"}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default loading;
