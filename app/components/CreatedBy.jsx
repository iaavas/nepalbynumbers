import React, { useState } from "react";
import EditText from "./EditText";
import Dragger from "./Dragger";

function CreatedBy() {
  const [author, setAuthor] = useState("@nepalbynumbers");
  return (
    <>
      <EditText text={author} setText={setAuthor} />
    </>
  );
}

export default CreatedBy;
