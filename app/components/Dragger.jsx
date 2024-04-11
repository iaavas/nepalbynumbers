import React from "react";
import Draggable from "react-draggable";

function Dragger({ children }) {
  const screenWidth = window.innerWidth;
  const bounds = {
    right: 300, // 66% of the total width
    bottom: window.innerHeight, // 100% of the total height
  };

  return (
    <div className="cursor-move">
      <Draggable>{children}</Draggable>
    </div>
  );
}

export default Dragger;
