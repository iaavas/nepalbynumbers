import React from "react";

import Map from "@/app/components/map/Map";
import StateValueTable from "@/app/components/ui/StateValueTable";

function Page() {
  return (
    <main className="flex">
      <Map mapType="district" />

      <div className="p-4 ">
        <StateValueTable content="district" />
      </div>
    </main>
  );
}

export default Page;
