"use client";
import { useState } from "react";
import DataInput from "./DataInput";
import DataDisplay from "./DataDisplay";

function SideBar() {
  const [data, setData] = useState({});

  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <div className="flex justify-end">
      <div className="w-1/2">
        {" "}
        {/* Adjust width as needed */}
        <DataInput onDataChange={handleDataChange} />
        {/* <DataDisplay data={data} /> */}
      </div>
    </div>
  );
}

export default SideBar;
