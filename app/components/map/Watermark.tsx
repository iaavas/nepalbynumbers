"use client";

import { useEffect } from "react";

export const WatermarkCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById("watermark-canvas");
    if (!canvas) return;
    // @ts-ignore
    const ctx = canvas.getContext("2d");
    // @ts-ignore
    canvas.width = window.innerWidth;
    // @ts-ignore
    canvas.height = window.innerHeight;

    ctx.font = " bold 12pt 'Segoe', sans-serif";

    ctx.fillStyle = "rgba(128, 128, 128, 0.1)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // @ts-ignore
    for (let x = -100; x < canvas.width + 500; x += 200) {
      // @ts-ignore
      for (let y = -500; y < canvas.height + 500; y += 50) {
        ctx.save();
        ctx.translate(x, y);

        ctx.fillText("NEPAL BY NUMBERS", 0, 0);
        ctx.restore();
      }
    }
  }, []);

  return (
    <canvas
      id="watermark-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
