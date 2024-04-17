import React from "react";

import { useValues } from "../../context/ValueContext";
import ColorBarProps from "../../interfaces/ColorBarTypes";
import { usePostfix } from "@/app/context/PostfixContext";

const ColorBar: React.FC<ColorBarProps> = ({ colorScale, content }) => {
  const {
    type,
    getAllEntityValues,
  }: { type: string; getAllEntityValues: Function } = useValues();
  const { postfix, prefix } = usePostfix();

  if (type !== "class") {
    const domain: number[] = colorScale.domain() as number[];

    const min: number = domain[0];
    const max: number = domain[1];
    const onethird: number = min + (max - min) / 3;
    const mid: number = min + (max - min) / 2;
    const twothird: number = min + ((max - min) * 2) / 3;
    let adj: number = 0;
    if (min >= 0 && max <= 1) {
      adj = 2;
    }

    const colorBarStyle: React.CSSProperties = {
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

    const labelStyle: React.CSSProperties = {
      position: "absolute",
      bottom: "-20px",
      fontSize: "12px",
      textAlign: "left",
      width: "50px",
    };

    return (
      <div className="color-bar" style={colorBarStyle}>
        <div
          style={{ ...labelStyle, left: "0" }}
          className="font-sans font-bold"
        >
          {min != -Infinity ? prefix : ""}
          {min.toFixed(adj)}
          {min != -Infinity ? postfix : ""}
        </div>
        <div
          style={{ ...labelStyle, left: "30%" }}
          className="font-sans font-bold"
        >
          {onethird ? prefix : ""}
          {onethird.toFixed(adj)}
          {onethird ? postfix : ""}
        </div>
        <div
          style={{ ...labelStyle, left: "60%" }}
          className="font-sans font-bold"
        >
          {twothird ? prefix : ""}
          {twothird.toFixed(adj)}
          {twothird ? postfix : ""}
        </div>
        <div
          style={{ ...labelStyle, left: "90%" }}
          className="font-sans font-bold"
        >
          {max != Infinity ? prefix : ""}
          {max.toFixed(adj)}
          {max != Infinity ? postfix : ""}
        </div>
      </div>
    );
  }

  const values: any[] = getAllEntityValues(content);

  console.log(values);

  const top5Values: string[] = Object.entries(
    values.reduce((acc: any, val: any) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {})
  )

    .sort((a: [string, any], b: [string, any]) => b[1] - a[1])
    .slice(0, 5)
    .map((x) => x[0]);

  return (
    <div className="p-4 flex " style={{ columnGap: "12px", rowGap: "12px" }}>
      {top5Values.map((category: string, index: number) => (
        <div
          key={index}
          className="font-sans font-bold flex flex-col justify-center items-center"
        >
          <div
            style={{
              height: "2.5rem",
              width: "2.5rem",
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
  );
};

export default ColorBar;
