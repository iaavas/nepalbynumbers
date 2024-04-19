import React, { useState } from "react";
import { colors as colorPalettes } from "@/app/constants/Colors";
import { useColor } from "@/app/context/ColorsContex";
import Modal from "@mui/material/Modal";

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
  const { updateTheme, theme } = useColor();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cust = colors as string[];

  return (
    <div
      className={`flex justify-center flex-col items-center cursor-pointer ease-in transition-all ${
        theme === paletteName &&
        "border border-gray-500 border-dotted rounded-xl  p-1"
      }`}
      onClick={() => updateTheme(paletteName)}
      onDoubleClick={handleOpen}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" inset-0 flex items-center justify-center z-10"
      >
        <div className="bg-white rounded-lg shadow-lg w-80 h-48 p-4 flex items-center  flex-col  ">
          <h2 className="text-xl font-bold mb-4">Choose Colors</h2>
          <div className="grid grid-cols-6 gap-4 z-30 ">
            {tcolor.map((_c, i) => (
              <ColorPickerComponent defaultValue={_c} key={i} index={i} />
            ))}
          </div>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
            onClick={handleClose}
          >
            Close
          </button>
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
