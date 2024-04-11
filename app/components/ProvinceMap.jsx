"use client";
import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";

import { scaleQuantile } from "d3-scale"; // Import scaleLinear from d3-scale
import EditText from "./EditText";
import "leaflet/dist/leaflet.css";
import ColorBar from "./ColorBar";
import nepalProvinceData from "@/assets/data/nepal-provinces.json";
import { useValues } from "../context/ValueContext";

import CreatedBy from "./CreatedBy";

const ProvinceMap = () => {
  const { getEntityValue } = useValues();
  const [scale, setScale] = useState(null);
  const [title, setTitle] = useState("Title Here");

  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current, {
      attributionControl: false,
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
    }).setView([28.3949, 84.124], 7);

    const provinceValues = nepalProvinceData.features.map((feature) =>
      getEntityValue("province", feature.properties.name)
    );

    const filteredValues = provinceValues.filter(
      (value) => value !== undefined && value !== null
    );

    const minValue = Math.min(...filteredValues);
    const maxValue = Math.max(...filteredValues);

    const colorScale = scaleQuantile()
      .domain([minValue, maxValue])
      .range([
        `rgb(240, 249, 33)`,
        `rgb(248, 148, 65)`,
        `rgb(203, 71, 120)`,
        `rgb(126, 3, 168)`,
        `rgb(13, 8, 135)`,
      ]);

    setScale(() => colorScale);

    nepalProvinceData.features.forEach((feature) => {
      const provinceValue = getEntityValue("province", feature.properties.name);

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

      const hexColor = scaledValue.replace("#", "");
      const r = parseInt(hexColor.substring(0, 2), 16) || 0;
      const g = parseInt(hexColor.substring(2, 4), 16) || 0;
      const b = parseInt(hexColor.substring(4, 6), 16) || 0;

      const intensity = (r * 299 + g * 587 + b * 114) / 1000;

      const textColor = intensity < 10 ? "white" : "black";

      const center = provinceLayer.getBounds().getCenter();
      L.marker(center, {
        icon: L.divIcon({
          className: "label font-sans",
          html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: bold;font-size:16px; color: ${textColor}">
          <p>${feature.properties.name}</p><p style="font-size:14px;" >${
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
        ref={mapRef}
        style={{
          position: "relative",
          width: "800px",
          backgroundColor: "white",
          borderRight: "1px solid gray",
          height: "100vh",
        }}
      >
        <div
          className="flex flex-col justify-end items-center font-sans"
          style={{ marginBottom: "auto" }}
        >
          <EditText text={title} setText={setTitle} />
          {scale && <ColorBar colorScale={scale} />}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            padding: "10px",
          }}
          className="font-sans"
        >
          <CreatedBy />
        </div>
      </div>
    </>
  );
};

export default ProvinceMap;
