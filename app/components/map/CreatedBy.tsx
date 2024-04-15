import React, { useState } from "react";
import EditText from "./EditText";
import Dragger from "../ui/Dragger";

function CreatedBy() {
  const [author, setAuthor] = useState<string>("@nepal.by.numbers");
  return (
    <Dragger>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          padding: "8px",
        }}
        className="font-sans"
      >
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: "100px",
            padding: "10px",
            fontStyle: "italic",
            cursor: "move",
          }}
          className="font-sans text-lg "
        >
          Created By
        </div>

        <EditText text={author} setText={setAuthor} />
      </div>
    </Dragger>
  );
}

export default CreatedBy;
