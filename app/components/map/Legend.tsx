import React, { useState } from "react";
import Dragger from "../ui/Dragger";
import EditText from "./EditText";
import ColorBar from "./ColorBar";

function Legend({ scale }: { scale: any }) {
  const [title, setTitle] = useState<string>("Title Here");
  return (
    <Dragger>
      <div
        className="flex flex-col justify-end items-center font-sans p-2.5"
        style={{ rowGap: "1px" }}
      >
        <EditText text={title} setText={setTitle} />
        {scale && <ColorBar colorScale={scale} content={"province"} />}
      </div>
    </Dragger>
  );
}

export default Legend;
