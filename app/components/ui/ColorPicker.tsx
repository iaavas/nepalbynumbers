import { useColor } from "@/app/context/ColorsContex";
import { ColorPicker } from "antd";
import React from "react";

const ColorPickerComponent = ({
  defaultValue,
  index,
}: {
  defaultValue: string;
  index: number;
}) => {
  const { updateColor } = useColor();

  function handleChange(value: any, hex: string) {
    updateColor(index, hex);
  }

  return (
    <ColorPicker
      defaultValue={defaultValue}
      className="z-40"
      onChange={handleChange}
    />
  );
};

export default ColorPickerComponent;
