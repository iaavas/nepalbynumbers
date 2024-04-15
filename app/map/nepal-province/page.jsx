import React from "react";
import SideBar from "@/app/components/ui/Sidebar";
import ProvinceMap from "@/app/components/map/ProvinceMap";

function Page() {
  return (
    <main className="flex">
      <ProvinceMap />

      <div className="p-4 ">
        <SideBar />
      </div>
    </main>
  );
}

export default Page;
