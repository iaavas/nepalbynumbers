"use client";
import React, { useRef } from "react";
import SideBar from "@/app/components/Sidebar";
import ProvinceMap from "@/app/components/ProvinceMap";
import * as htmlToImage from "html-to-image";

function Page() {
  const mapRef = useRef(null);

  const captureMapImage = () => {
    htmlToImage.toPng(document.getElementById("map")).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <main className="flex">
      <div className="">
        <ProvinceMap ref={mapRef} id="map" />
      </div>

      <div className="p-4 ">
        <button
          onClick={captureMapImage}
          className="mb-4 border p-2 border-stone-500 shadow-sm rounded-lg"
        >
          Export Image as SVG
        </button>

        <SideBar />
      </div>
    </main>
  );
}

export default Page;
