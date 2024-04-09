"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";
import { scaleLinear } from "d3-scale";
import nepalProvinceData from "@/assets/data/nepal-provinces.json";
import { useValues } from "../context/ValueContext";

const ProvinceMap = () => {
  const { getEntityValue } = useValues();

  useEffect(() => {
    const map = L.map("map", {
      attributionControl: false,
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
    }).setView([28.3949, 84.124], 7);

    let minValue = Infinity;
    let maxValue = 0;

    nepalProvinceData.features.forEach((feature) => {
      const provinceValue = getEntityValue("province", feature.properties.name);

      minValue = Math.min(minValue, provinceValue) || 0;
      maxValue = Math.max(maxValue, provinceValue) || 0;

      const colorScale = scaleLinear(
        [minValue, maxValue],
        ["#FFCCFF", "#7F007F"]
      );
      const fillColor = provinceValue ? colorScale(provinceValue) : "#460698";

      const provinceLayer = L.geoJSON(feature, {
        style: {
          fillColor,
          weight: 1,
          color: "black",
          fillOpacity: 1,
        },
      }).addTo(map);

      // Calculate the center coordinates of the province area
      const bounds = provinceLayer.getBounds();
      const center = bounds.getCenter();
    });

    return () => {
      map.remove();
    };
  }, [getEntityValue]);

  const handleCaptureClick = async () => {
    const mapElement = document.getElementById("map");
    const { width, height } = mapElement.getBoundingClientRect();
    html2canvas(mapElement, {
      width: width / 1.5,
      height: height / 1.2,
    }).then((canvas) => {
      const imageURL = canvas.toDataURL("image/png");
      downloadjs(imageURL, "map.png", "image/png");
    });
  };

  return (
    <div className="flex flex-col items-center bg-white">
      <div
        id="map"
        className="w-screen h-screen relative bg-white m-20 p-10"
      ></div>
      <button
        onClick={handleCaptureClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 z-10"
      >
        Download
      </button>
    </div>
  );
};

export default ProvinceMap;
