import React from "react";
import Map from "@/app/components/map/Map";
import Menubar from "@/app/components/ui/Menubar";
import Loader from "../ui/Loader";

function PageLayout({
  mapType,
  center,
}: {
  mapType: string;
  center?: [number, number];
}) {
  return (
    <main className="flex justify-between xl:h-screen xl:flex-row h-full flex-col gap-y-8 xl:gap-0  ">
      <div className="flex-1 h-full w-screen  ">
        <Map mapType={mapType} ctr={center} />
      </div>

      <div className="sm:flex-1  overflow-y-scroll items-center justify-center px-8  ">
        <Menubar content={mapType} />
      </div>
    </main>
  );
}

export default PageLayout;
