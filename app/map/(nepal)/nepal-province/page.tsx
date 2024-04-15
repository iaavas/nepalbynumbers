import React from "react";

import Map from "@/app/components/map/Map";
import Menubar from "@/app/components/ui/Menubar";

function Page() {
  return (
    <main className="flex">
      <Map mapType="province" />

      <div className="p-4 ">
        <Menubar content="province" />
      </div>
    </main>
  );
}

export default Page;
