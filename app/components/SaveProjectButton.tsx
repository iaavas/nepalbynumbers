import React from "react";
import { useValues } from "../context/ValueContext";
import { usePostfix } from "../context/PostfixContext";
import { useColor } from "../context/ColorsContext";
import { useReference } from "../context/ReferenceContext";

function SaveProjectButton({ map }: { map: string }) {
  const { title, type, getAllEntityValues } = useValues();
  const { postfix, prefix } = usePostfix();
  const { theme } = useColor();
  const { createdBy, source, statsTitle, statsValue } = useReference();

  function save() {
    const data = {
      title,
      type,
      postfix,
      prefix,
      theme,
      data: getAllEntityValues(map),
      createdBy,
      source,
      statsTitle,
      statsValue,
    };
  }

  return (
    <button className="bg-blue-600 hover:bg-blue-700 rounded-full p-4">
      Save Project
    </button>
  );
}

export default SaveProjectButton;
