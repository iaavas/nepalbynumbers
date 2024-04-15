import React, { useState } from "react";
import Dragger from "../ui/Dragger";
import EditText from "./EditText";

function DataSource() {
  const [source, setSource] = useState<string>("https://www.");
  return (
    <Dragger>
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          left: "100px",
          padding: "10px",
          fontStyle: "italic",
          cursor: "move",
        }}
        className="font-sans text-lg cursor-move"
      >
        <p>Source</p>
        <EditText text={source} setText={setSource} s={"20"} />
      </div>
    </Dragger>
  );
}

export default DataSource;
