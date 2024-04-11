"use client";
import { useState } from "react";
import DataInput from "./DataInput";

function SideBar() {
  const [data, setData] = useState({});

  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <div className="bg-black  w-96">
      {/* Adjust width as needed */}
      <DataInput onDataChange={handleDataChange} />
      {/* <DataDisplay data={data} /> */}
    </div>
  );
}

export default SideBar;
