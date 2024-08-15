"use client";

import Dragger from "../ui/Dragger";
import EditText from "./EditText";
import { useReference } from "@/app/context/ReferenceContext";

function OverallStats() {
  const { setStatsTitle, statsTitle, statsValue, setStatsValue } =
    useReference();
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
        <EditText
          text={statsValue}
          setText={setStatsValue}
          s={"60"}
          css="font-bold"
        />
      </div>
    </Dragger>
  );
}

export default OverallStats;
