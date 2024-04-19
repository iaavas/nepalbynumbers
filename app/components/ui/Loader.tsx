import Image from "next/image";
import React from "react";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Image src="/loading.gif" width={500} height={500} alt="loader" />
    </div>
  );
}

export default Loader;
