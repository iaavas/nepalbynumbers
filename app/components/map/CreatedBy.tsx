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
          right: "20px",
          padding: "0px 2px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="font-sans "
      >
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: "",
            padding: "",
            fontStyle: "italic",
            cursor: "move",
            textAlign: "center",
            width: "200px",
          }}
          className="font-sans text-lg w-full "
        >
          Created By
        </div>

        <EditText text={author} setText={setAuthor} />
      </div>
    </Dragger>
  );
}

export default CreatedBy;
