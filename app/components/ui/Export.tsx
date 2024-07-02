import React from "react";
import * as htmlToImage from "html-to-image";
import { DownloadOutlined } from "@ant-design/icons";
import SaveProjectButton from "../SaveProjectButton";

function Export({ map }: { map: string }) {
  const captureMapImage = () => {
    htmlToImage.toPng(document.getElementById("map")!).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      link.click();
    });
  };
  return (
    <div className="flex flex-col  gap-y-2">
      <h2 className="font-sans font-bold text-xl">Download Map.</h2>
      <button
        className=" text-gray-700    hover:text-blue-600  p-2  rounded-lg font-sans text-bold text-lg flex items-center justify-center gap-4 border"
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
