import React, { useState } from "react";
import { colors as colorPalettes } from "@/app/constants/Colors";
import { useColor } from "@/app/context/ColorsContext";
import { Modal } from "antd";

import ColorPickerComponent from "./ColorPicker";

const ColorPalette = ({
  paletteName,
  colors,
}: {
  paletteName: string;
  colors: string[];
}) => {
  const { colors: tcolor } = useColor();

  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;
  const { setTheme, theme } = useColor();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div
      className={`flex justify-center flex-col items-center cursor-pointer ease-in transition-all ${
        theme === paletteName &&
        "border border-gray-500 border-dotted rounded-xl  p-1 transition-all ease-in-out"
      }`}
      onClick={() => {
        setTheme(() => paletteName);
      }}
      onDoubleClick={handleOpen}
    >
      <Modal
        title="Customize Color"
        open={open}
        className="font-sans text-center p-1.5"
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

      <div
        style={{
          width: "100px",
          height: "100px",
          background: gradient,
          marginBottom: "10px",
        }}
        className={`shadow-2xl `}
      ></div>
      <h3 className="font-sans font-normal ">{paletteName}</h3>
    </div>
  );
};

const Theme = () => {
  return (
    <>
      <h1 className="font-sans font-bold text-lg mb-8">Select a Theme.</h1>
      <div className="flex items-center gap-6 flex-wrap w-96  ">
        {Object.entries(colorPalettes).map(([paletteName, palette], index) => (
          <ColorPalette
            key={index}
            paletteName={paletteName}
            colors={palette.colors}
          />
        ))}
      </div>
    </>
  );
};

export default Theme;
