import React from "react";
import Dragger from "./Dragger";
import { useValues } from "../context/ValueContext";

const ColorBar = ({ colorScale, content }) => {
  const { type, getAllEntityValues } = useValues();

  if (type !== "class") {
    // Previous code for non-"class" type
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
  }

  // Code for "class" type
  const values = getAllEntityValues(content);

  const top5Values = Object.entries(
    values.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((x) => x[0]);

  const labelStyle = {
    position: "absolute",
    bottom: "-20px",
    fontSize: "12px",
    textAlign: "left",
    width: "50px", // Adjust as needed
  };

  return (
    <Dragger>
      <div className="p-4 flex " style={{ columnGap: "16px" }}>
        {top5Values.map((category, index) => (
          <div
            key={index}
            className="font-sans font-bold flex flex-col justify-center items-center"
          >
            <div
              style={{
                height: "50px",
                width: "50px",
                border: "none",
                borderRadius: "999px",
                backgroundColor: `${colorScale(category)}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>

            <p>{category}</p>
          </div>
        ))}
      </div>
    </Dragger>
  );
};

export default ColorBar;
