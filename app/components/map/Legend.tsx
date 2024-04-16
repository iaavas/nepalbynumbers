import React, { useState } from "react";
import Dragger from "../ui/Dragger";
import EditText from "./EditText";
import ColorBar from "./ColorBar";
import { useValues } from "@/app/context/ValueContext";

function Legend({ scale, content }: { scale: any; content: string }) {
  const { title, setTitle } = useValues();
  return (
    <Dragger>
      <div
        className="flex flex-col justify-end items-center font-sans p-2.5"
        style={{ rowGap: "1px" }}
      >
        <EditText text={title} setText={setTitle} />
        {scale && <ColorBar colorScale={scale} content={content} />}
      </div>
    </Dragger>
  );
}

export default Legend;
