import React from "react";
import { colors as colorPalettes } from "@/app/constants/Colors";
import { useColor } from "@/app/context/ColorsContex";
const ColorPalette = ({
  paletteName,
  colors,
}: {
  paletteName: string;
  colors: string[];
}) => {
  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;
  const { updateTheme, theme } = useColor();

  return (
    <div
      style={{ marginBottom: "20px" }}
      className={`flex justify-center flex-col items-center cursor-pointer ease-in-out transition-all ${
        theme === paletteName && "border border-black rounded-xl  p-2"
      }`}
      onClick={() => updateTheme(paletteName)}
    >
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
    <div>
      <h1 className="font-sans font-bold text-lg mb-8">Select a Theme.</h1>
      <div className="flex items-center gap-6 flex-wrap w-96">
        {Object.entries(colorPalettes).map(([paletteName, palette], index) => (
          <ColorPalette
            key={index}
            paletteName={paletteName}
            colors={palette.colors}
          />
        ))}
      </div>
    </div>
  );
};

export default Theme;
