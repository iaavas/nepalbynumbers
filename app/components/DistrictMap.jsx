"use client";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { scaleQuantile } from "d3-scale"; // Import scaleLinear from d3-scale
import EditText from "./EditText";
import "leaflet/dist/leaflet.css";
import ColorBar from "./ColorBar";

import nepalProvinceData from "@/assets/data/nepal-districts.json";
import { useValues } from "../context/ValueContext";

const ProvinceMap = () => {
  const { getEntityValue } = useValues();
  const [scale, setScale] = useState(null);
  const [title, setTitle] = useState("Title Here");

  useEffect(() => {
    const map = new L.map("map", {
      attributionControl: false,
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
    }).setView([28.3949, 84.124], 7);

    // Collect all province values
    const provinceValues = nepalProvinceData.features.map((feature) =>
      getEntityValue("district", feature.properties.name)
    );

    // Filter out undefined or null values
    const filteredValues = provinceValues.filter(
      (value) => value !== undefined && value !== null
    );

    // Find the minimum and maximum values
    const minValue = Math.min(...filteredValues);
    const maxValue = Math.max(...filteredValues);

    // Define color scale using d3-scale
    const colorScale = scaleQuantile()
      .domain([minValue, maxValue])
      .range([
        `rgb(240, 249, 33)`,
        `rgb(248, 148, 65)`,
        `rgb(203, 71, 120)`,
        `rgb(126, 3, 168)`,
        `rgb(13, 8, 135)`,
      ]);

    setScale((prev) => colorScale);
    console.log();

    nepalProvinceData.features.forEach((feature) => {
      const provinceValue = getEntityValue("province", feature.properties.name);

      // If province value is undefined or null, assign a default color
      const scaledValue =
        provinceValue !== undefined && provinceValue !== null
          ? colorScale(provinceValue)
          : "#cccccc";

      const provinceLayer = L.geoJSON(feature, {
        style: {
          fillColor: scaledValue,
          weight: 1.2,
          color: "black",
          fillOpacity: 1,
          className: "ease-in duration-1000 transition-all",
        },
      }).addTo(map);

      // Calculate intensity of background color
      const hexColor = scaledValue.replace("#", "");
      const r = parseInt(hexColor.substring(0, 2), 16) || 0;
      const g = parseInt(hexColor.substring(2, 4), 16) || 0;
      const b = parseInt(hexColor.substring(4, 6), 16) || 0;

      const intensity = (r * 299 + g * 587 + b * 114) / 1000;

      const textColor = intensity < 10 ? "white" : "black";

      // Set text color state

      // Add province name as a label within the polygon
      const center = provinceLayer.getBounds().getCenter();
      L.marker(center, {
        icon: L.divIcon({
          className: "label font-sans",
          html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.01rem; font-weight: bold;font-size:5px; color: ${textColor}">
          <p>${feature.properties.DISTRICT}</p><p style="font-size:4px;" >${
            provinceValue || 0
          }</p></div>`,
        }),

        draggable: true,
      }).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [getEntityValue]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "800px",
          height: "600px",
          backgroundColor: "white",
        }}
        className="p-8 font-sans"
      >
        <div className="flex flex-col justify-end items-center font-sans">
          <EditText text={title} setText={setTitle} />

          {scale && <ColorBar colorScale={scale} />}
        </div>
      </div>
    </>
  );
};

export default ProvinceMap;
