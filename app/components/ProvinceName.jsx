import React, { useRef } from "react";

const ProvinceName = ({ name, center, onDragStart, onDragEnd }) => {
  const elementRef = useRef(null);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", null);
    onDragStart(event);
  };

  const handleDragEnd = (event) => {
    onDragEnd(event);
  };

  return (
    <div
      ref={elementRef}
      style={{
        position: "absolute",
        left: `${center[0]}px`,
        top: `${center[1]}px`,
        cursor: "move",
        userSelect: "none",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {name}
    </div>
  );
};

export default ProvinceName;
