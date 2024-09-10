import React from "react";
import * as htmlToImage from "html-to-image";
import { DownloadOutlined } from "@ant-design/icons";
import SaveProjectButton from "../SaveProjectButton";
import { useValues } from "@/app/context/ValueContext";
import { useWatermark } from "@/app/context/WatermarkContext";

function Export({ map }: { map: string }) {
  const { title } = useValues();
  //   @ts-ignore
  const { toggleWatermark } = useWatermark();

  const captureMapImage = () => {
    const element = document.getElementById("map");
    if (!element) {
      console.error("Map element not found");
      return;
    }

    toggleWatermark(); // Show watermark

    setTimeout(() => {
      htmlToImage
        .toPng(element, {
          quality: 1.0,
          pixelRatio: 10,
        })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${title}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error capturing image:", error);
        })
        .finally(() => {
          toggleWatermark(); // Hide watermark
        });
    }, 0);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-sans text-lg">Download Map</h2>
      <button
        className={`p-1.5 rounded-lg transition-all text-sm bg-gray-50/10 text-gray-700 flex gap-x-2 items-center border-gray-300 border hover:border-blue-500 hover:text-blue-500 ease-in-out max-w-fit shadow-sm`}
        onClick={captureMapImage}
      >
        <DownloadOutlined />
        <p>Download as PNG</p>
      </button>
      <SaveProjectButton map={map} />
    </div>
  );
}

export default Export;
