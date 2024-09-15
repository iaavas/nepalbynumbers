import React, { useState } from "react";
import { useColor } from "@/app/context/ColorsContext";
import { Modal } from "antd";
import { colors as colorPalettes } from "@/app/constants/Colors";

import ColorPickerComponent from "./ColorPicker";
import { useValues } from "@/app/context/ValueContext";

const ColorPalette = ({
  paletteName,
  colors,
  type = "reg",
}: {
  paletteName: string;
  colors: string[];
  type?: "reg" | "class";
}) => {
  const { colors: tcolor, setTheme, theme } = useColor();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderColorDisplay = () => {
    if (type === "reg") {
      const gradient = `linear-gradient(to right, ${colors.join(", ")})`;
      return (
        <div
          style={{
            width: "100px",
            height: "100px",
            background: gradient,
          }}
          className="shadow-2xl"
        />
      );
    } else if (type === "class") {
      return (
        <div className="flex">
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                width: "22px",
                height: "80px",
                backgroundColor: color,
              }}
              className="shadow-md"
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div
      className={`flex justify-center flex-col items-center cursor-pointer ease-in transition-all ${
        theme === paletteName &&
        "border border-gray-500 border-dotted rounded-xl p-1 transition-all ease-in-out"
      }`}
      onClick={() => setTheme(paletteName)}
      onDoubleClick={handleOpen}
    >
      <Modal
        title="Customize Color"
        open={open}
        className="font-sans text-center p-1.5 font-normal"
        onCancel={handleClose}
        onOk={handleClose}
        footer={null}
        width={300}
      >
        <div className="grid grid-cols-6 z-50 ">
          {tcolor.map((_c, i) => (
            <ColorPickerComponent defaultValue={_c} key={i} index={i} />
          ))}
        </div>
      </Modal>

      {renderColorDisplay()}
      <h3 className="font-sans font-normal mt-2">{paletteName}</h3>
    </div>
  );
};

const Theme = () => {
  const { type } = useValues();
  return (
    <>
      <h1 className="font-sans font-bold text-lg mb-8">Select a Theme.</h1>
      <div className="flex items-center gap-6 flex-wrap w-96">
        {Object.entries(colorPalettes).map(([paletteName, palette], index) => (
          <ColorPalette
            key={index}
            paletteName={paletteName}
            colors={palette.colors}
            type={type}
          />
        ))}
      </div>
    </>
  );
};

export default Theme;
