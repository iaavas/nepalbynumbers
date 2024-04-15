import React, { useState } from "react";
import Dragger from "../ui/Dragger";
import EditText from "./EditText";

function OverallStats() {
  const [overallTitle, setOverallTitle] = useState<string>("Most Common");
  const [overallValue, setOverallValue] = useState<string>("0");
  return (
    <Dragger>
      <div
        style={{
          position: "absolute",
          top: "100px",
          right: "100px",
          padding: "10px",
          fontStyle: "italic",
          cursor: "move",
          display: "flex",
          flexDirection: "column",
          rowGap: "16px",
        }}
        className="font-sans text-lg cursor-move items-center "
      >
        <EditText text={overallTitle} setText={setOverallTitle} s={"20"} />
        <EditText text={overallValue} setText={setOverallValue} s={"60"} />
      </div>
    </Dragger>
  );
}

export default OverallStats;
