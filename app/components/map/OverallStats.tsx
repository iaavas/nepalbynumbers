import React, { useState } from "react";
import Dragger from "../ui/Dragger";
import EditText from "./EditText";

function OverallStats() {
  const [statsTitle, setStatsTitle] = useState<string>("Most Common");
  const [statsValue, setStatsValue] = useState<string>("0");
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
        <EditText text={statsTitle} setText={setStatsTitle} s={"20"} />
        <EditText text={statsValue} setText={setStatsValue} s={"60"} />
      </div>
    </Dragger>
  );
}

export default OverallStats;
