"use client";

import React from "react";
import { useCanvasImages } from "@/app/context/CanvasImagesContext";

const CanvasImageControls = () => {
  const { images, addImages, removeImage } = useCanvasImages();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-sans text-md">Canvas Images</h2>

      <label className="w-fit rounded-lg border border-gray-300 px-3 py-2 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer">
        Upload image
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={async (event) => {
            const files = event.target.files;
            if (!files || files.length === 0) return;
            await addImages(files);
            event.target.value = "";
          }}
        />
      </label>

      {images.length === 0 ? (
        <p className="text-sm text-gray-500">
          Use top-left rotate control and bottom-right corner to resize on map.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {images.map((image) => (
            <div
              key={image.id}
              className="rounded-lg border border-gray-200 px-3 py-2 flex items-center justify-between gap-2"
            >
              <p
                className="text-sm font-medium truncate"
                title={image.name}
              >
                {image.name}
              </p>
              <button
                className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 shrink-0"
                onClick={() => removeImage(image.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CanvasImageControls;
