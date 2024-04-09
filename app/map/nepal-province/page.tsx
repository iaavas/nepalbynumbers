import React from "react";
import MapContainer from "@/app/components/MapContainer";
import SideBar from "@/app/components/Sidebar";
function page() {
  return (
    <div className="flex gap-x-32">
      <div className="flex-1">
        <SideBar />
      </div>
      <div className="bg-white">
        <MapContainer />
      </div>
    </div>
  );
}

export default page;
