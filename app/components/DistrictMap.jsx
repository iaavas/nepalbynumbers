"use client";
import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { scaleLinear } from "d3-scale";
import { schemePurple } from "d3-scale-chromatic";
import "leaflet/dist/leaflet.css";
import nepalProvinceData from "@/assets/data/nepal-districts.json";
import { useValues } from "../context/ValueContext";
import Draggable from "react-draggable";

const DistrictMap = () => {
  const { getEntityValue } = useValues();
  const [provincePositions, setProvincePositions] = useState({});
  const [editingProvince, setEditingProvince] = useState(null);
  const [newProvinceName, setNewProvinceName] = useState("");
  const provinceRefs = useRef({});

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
      minValue = Math.min(minValue, provinceValue);
      maxValue = Math.max(maxValue, provinceValue);

      const colorScale = scaleLinear(
        [minValue, maxValue],
        ["lightgreen", "green"]
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

      // Get centroid of province geometry
      const centroid = L.geoJSON(feature).getBounds().getCenter();

      // Add province name and value as draggable text at centroid
      const provinceText = L.marker(centroid, {
        icon: L.divIcon({
          className: "province-text font-bold text-md cursor-move text-white",
          html: `<div>${
            feature.properties.name
          }<br/><p className="text-center">${provinceValue || 0}</p></div>`,
          iconAnchor: [0, 0],
        }),
        draggable: true,
      }).addTo(map);

      // Store initial position of province text
      setProvincePositions((prevPositions) => ({
        ...prevPositions,
        [feature.properties.name]: centroid,
      }));

      // Handle double-click event on province text
      provinceText.on("dblclick", () => {
        setEditingProvince(feature.properties.name);
        setNewProvinceName(feature.properties.name);
      });

      // Store reference to province element
      provinceRefs.current[feature.properties.name] = provinceText;
    });

    return () => {
      map.remove();
    };
  }, [getEntityValue]);

  const handleCaptureClick = async () => {
    const mapElement = document.getElementById("map");
    const { width, height } = mapElement.getBoundingClientRect();
    html2canvas(mapElement, {
      width: width,
      height: height,
      scrollX: 0,
      scrollY: 0,
    }).then((canvas) => {
      const imageURL = canvas.toDataURL("image/png");
      downloadjs(imageURL, "map.png", "image/png");
    });
  };

  const handleProvinceNameChange = (e) => {
    setNewProvinceName(e.target.value);
  };

  const handleProvinceNameSubmit = () => {
    // Update the province name here
    console.log(`Updating province name to: ${newProvinceName}`);
    setEditingProvince(null);
  };

  return (
    <div className="flex flex-col items-center bg-white">
      <div id="map" className="w-[800px] h-[600px] relative bg-white">
        {Object.entries(provincePositions).map(([provinceName, position]) => (
          <Draggable
            key={provinceName}
            position={position}
            scale={1}
            grid={[position.x, position.y]}
            onStop={(e, data) => {
              setProvincePositions((prevPositions) => ({
                ...prevPositions,
                [provinceName]: { x: data.x, y: data.y },
              }));
            }}
          >
            <div
              className="absolute text-center cursor-move"
              ref={(el) => (provinceRefs.current[provinceName] = el)}
            >
              {editingProvince === provinceName && (
                <div>
                  <input
                    type="text"
                    value={newProvinceName}
                    onChange={handleProvinceNameChange}
                  />
                  <button onClick={handleProvinceNameSubmit}>Save</button>
                </div>
              )}
            </div>
          </Draggable>
        ))}
      </div>
      <button
        onClick={handleCaptureClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download
      </button>
    </div>
  );
};

export default DistrictMap;
