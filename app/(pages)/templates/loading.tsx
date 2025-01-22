"use client";
import React from "react";

import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <ClipLoader size={100} color="blue" />
    </div>
  );
}

export default Loading;
