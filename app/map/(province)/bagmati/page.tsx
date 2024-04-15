import React from "react";

import Map from "@/app/components/map/Map";
import Menubar from "@/app/components/ui/Menubar";

function Page() {
  return (
    <main className="flex">
      <Map mapType="bagmati" />

      <div className="p-4 ">
        <Menubar content="bagmati" />
      </div>
    </main>
  );
}

export default Page;
