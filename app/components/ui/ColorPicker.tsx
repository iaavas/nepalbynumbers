import { useColor } from "@/app/context/ColorsContext";
import { ColorPicker, Tooltip } from "antd";
import React, { useState } from "react";

const ColorPickerComponent = ({
  defaultValue,
  index,
}: {
  defaultValue: string;
  index: number;
}) => {
  const { updateColor } = useColor();
  const [currentColor, setCurrentColor] = useState(defaultValue);

  function handleChange(hex: string) {
    setCurrentColor(hex);
    updateColor(index, hex);
  }

  return (
    <Tooltip title="Click to change color" placement="top">
      <div className="relative group">
        <div
          className="w-10 h-10 rounded-full cursor-pointer transition-transform transform group-hover:scale-110 shadow-lg"
          style={{ backgroundColor: currentColor }}
        >
          <ColorPicker
            value={currentColor}
            onChange={(color) => handleChange(color.toHexString())}
            trigger="click"
          >
            <div className="w-full h-full rounded-full" />
          </ColorPicker>
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium bg-gray-800 text-white px-2 py-1 rounded">
            {currentColor}
          </span>
        </div>
      </div>
    </Tooltip>
  );
};

export default ColorPickerComponent;
