import React from "react";
import Dragger from "./Dragger";

const ColorBar = ({ colorScale }) => {
  const domain = colorScale.domain();

  const min = domain[0];
  const max = domain[1];
  const onethird = min + (max - min) / 3;
  const mid = min + (max - min) / 2;
  const twothird = min + ((max - min) * 2) / 3;
  let adj = 0;
  if (min >= 0 && max <= 1) {
    adj = 2;
  }

  const colorBarStyle = {
    background: `linear-gradient(to right, ${colorScale(min)}, ${colorScale(
      onethird
    )}, ${colorScale(mid)},${colorScale(twothird)}, ${colorScale(max)})`,
    height: "18.62px",
    width: "200px",
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 0 0 1px #efefef",
    position: "relative",
  };

  const labelStyle = {
    position: "absolute",
    bottom: "-20px",
    fontSize: "12px",
    textAlign: "left",
    width: "50px", // Adjust as needed
  };

  return (
    <Dragger>
      <div className="color-bar" style={colorBarStyle}>
        <div
          style={{ ...labelStyle, left: "0" }}
          className="font-sans font-bold"
        >
          {min.toFixed(adj)}
        </div>
        <div
          style={{ ...labelStyle, left: "30%" }}
          className="font-sans font-bold"
        >
          {onethird.toFixed(adj)}
        </div>
        <div
          style={{ ...labelStyle, left: "60%" }}
          className="font-sans font-bold"
        >
          {twothird.toFixed(adj)}
        </div>
        <div
          style={{ ...labelStyle, left: "90%" }}
          className="font-sans font-bold"
        >
          {max.toFixed(adj)}
        </div>
      </div>
    </Dragger>
  );
};

export default ColorBar;
