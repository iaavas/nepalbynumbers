import React from "react";
import DistrictMap from "@/app/components/DistrictMap";
import SideBar from "@/app/components/Sidebar";
function page() {
  return (
    <div className="flex gap-x-32">
      <div className="flex-1">
        <SideBar />
      </div>
      <div className="bg-white">
        <DistrictMap />
      </div>
    </div>
  );
}

export default page;
