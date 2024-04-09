import React from "react";

import SideBar from "@/app/components/Sidebar";
import ProvinceMap from "@/app/components/ProvinceMap";
function page() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <ProvinceMap />
      <SideBar />
    </div>
  );
}

export default page;
