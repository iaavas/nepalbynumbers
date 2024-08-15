import React from "react";
import Map from "@/app/components/map/Map";
import Menubar from "@/app/components/ui/Menubar";
import Sidebar from "../ui/Sidebar";

function PageLayout({
  mapType,
  center,
}: {
  mapType: string;
  center?: [number, number];
}) {
  return (
    <main className="grid grid-cols-6 md:h-screen     ">
      <div className=" h-full  col-span-4 bg-red-700">
        <Map mapType={mapType} ctr={center} />
      </div>

      <div className="  overflow-y-scroll   relative col-span-2 bg-cyan-100/5 ">
        <Menubar content={mapType} />
        <Sidebar css="absolute top-2 right-10 h-0" />
      </div>
    </main>
  );
}

export default PageLayout;
