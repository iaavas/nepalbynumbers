"use client";
import React, { useRef } from "react";
import SideBar from "@/app/components/Sidebar";
import ProvinceMap from "@/app/components/ProvinceMap";
import * as htmlToImage from "html-to-image";

function Page() {
  return (
    <main className="flex">
      <div className="">
        <ProvinceMap id="map" />
      </div>

      <div className="p-4 ">
        <SideBar />
      </div>
    </main>
  );
}

export default Page;
