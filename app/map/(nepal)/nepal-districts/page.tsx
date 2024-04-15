import React from "react";

import Map from "@/app/components/map/Map";
import StateValueTable from "@/app/components/ui/StateValueTable";
import Menubar from "@/app/components/ui/Menubar";

function Page() {
  return (
    <main className="flex">
      <Map mapType="district" />

      <div className="px-4 ">
        <Menubar content="district" />
      </div>
    </main>
  );
}

export default Page;
