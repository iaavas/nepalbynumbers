import React from "react";
import Map from "@/app/components/map/Map";
import Menubar from "@/app/components/ui/Menubar";

function PageLayout({
  mapType,
  center,
}: {
  mapType: string;
  center?: [number, number];
}) {
  return (
    <main className="flex justify-between h-screen">
      <div className="flex-1 h-full">
        <Map mapType={mapType} ctr={center} />
      </div>

      <div className="flex-1 overflow-y-scroll items-center justify-center px-8">
        <Menubar content={mapType} />
      </div>
    </main>
  );
}

export default PageLayout;
