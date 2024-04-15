import React from "react";
import DistrictMap from "@/app/components/DistrictMap";
import SideBar from "@/app/components/Sidebar";
import StateValueTable from "@/app/components/StateValueTable";
import nepalDistrictData from "@/assets/data/nepal-districts.json";
function page() {
  return (
    <div className="flex gap-x-32">
      <div className="bg-white">
        <DistrictMap />
      </div>
      <div className="flex-1">
        <StateValueTable
          data={nepalDistrictData.features}
          content="provinces"
        />
      </div>
    </div>
  );
}

export default page;
