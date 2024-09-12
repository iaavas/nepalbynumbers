import React from "react";
import { EntityValue, useValues } from "../../context/ValueContext";
import ColorBarProps from "../../interfaces/ColorBarTypes";
import { usePostfix } from "@/app/context/PostfixContext";
import { scaleQuantile } from "d3-scale";

const ColorBar: React.FC<ColorBarProps> = ({ colorScale, content }) => {
  const { type, getAllEntityValues } = useValues();
  const { postfix, prefix } = usePostfix();

  // Helper function to create label content
  const formatLabel = (value: number, adj: number) => {
    if (Number.isFinite(value)) {
      return `${prefix}${value.toFixed(adj)}${postfix}`;
    }
    return "";
  };

  if (type !== "class") {
    const domain: number[] = colorScale.domain() as number[];
    const quantileScale = scaleQuantile()
      .domain(domain)
      .range(colorScale.range());

    const [min, max] = domain;
    const onethird = min + (max - min) / 3;
    const mid = min + (max - min) / 2;
    const twothird = min + ((max - min) * 2) / 3;
    const isAllInteger = domain.every((value) => Number.isInteger(value));
    const adj = isAllInteger ? 0 : 2;

    const colorBarStyle: React.CSSProperties = {
      background: `linear-gradient(to right, ${quantileScale(
        min
      )}, ${quantileScale(min + (max - min) * 0.25)}, ${quantileScale(
        min + (max - min) * 0.5
      )}, ${quantileScale(min + (max - min) * 0.75)}, ${quantileScale(max)})`,
      height: "18.62px",
      width: "250px",
      borderRadius: "10px",
      border: "none",
      boxShadow: "0 0 0 1px #efefef",
      position: "relative",
    };

    const labelStyle: React.CSSProperties = {
      position: "absolute",
      bottom: "-24px",
      fontSize: "0.9rem",
      textAlign: "left",
    };

    return (
      <div className="color-bar" style={colorBarStyle}>
        <div style={{ ...labelStyle, left: "0" }} className="font-sans">
          {formatLabel(min, adj)}
        </div>
        <div style={{ ...labelStyle, left: "30%" }} className="font-sans">
          {formatLabel(onethird, adj)}
        </div>
        <div style={{ ...labelStyle, left: "60%" }} className="font-sans">
          {formatLabel(twothird, adj)}
        </div>
        <div style={{ ...labelStyle, left: "90%" }} className="font-sans">
          {formatLabel(max, adj)}
        </div>
      </div>
    );
  }

  const values: EntityValue[] | undefined = getAllEntityValues(content);

  if (!values) return;
  const top5Values: string[] = Object.entries(
    values.reduce((acc: Record<string, number>, val: any) => {
      acc[val.value] = (acc[val.value] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((x) => x[0]);

  return (
    <div className="p-4 flex" style={{ columnGap: "12px", rowGap: "12px" }}>
      {top5Values
        .filter((category) => category !== "null")
        .map((category, index) => (
          <div
            key={index}
            className="font-sans flex flex-col justify-center items-center"
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
            />
            <p className="text-[1.1rem] font-normal">{category}</p>
          </div>
        ))}
    </div>
  );
};

export default ColorBar;
