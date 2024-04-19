import Image from "next/image";
import React from "react";

function Loader() {
  return <Image src="/loading.gif" width={500} height={500} alt="loader" />;
}

export default Loader;
