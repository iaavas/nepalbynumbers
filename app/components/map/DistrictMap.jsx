"use client";
import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";

import { scaleQuantile, scaleOrdinal } from "d3-scale";
import EditText from "./EditText";
import "leaflet/dist/leaflet.css";
import ColorBar from "./ColorBar";
import nepalProvinceData from "@/assets/data/nepal-districts.json";
import { useValues } from "../../context/ValueContext";
import CreatedBy from "./CreatedBy";
import Dragger from "../ui/Dragger";

const ProvinceMap = () => {
  const { getEntityValue, type, getAllEntityValues } = useValues();
  const [scale, setScale] = useState(null);
  const [title, setTitle] = useState("Title Here");
  const [markers, setMarkers] = useState([]);
  const [source, setSource] = useState("https://www.");
  const [common, setCommon] = useState("0");

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
      getEntityValue("districts", feature.properties.name)
    );

    const filteredValues = provinceValues.filter(
      (value) => value !== undefined && value !== null
    );

    const minValue = Math.min(...filteredValues);
    const maxValue = Math.max(...filteredValues);

    const values = getAllEntityValues("districts");
    console.log(values);

    let colorScale;
    if (type === "reg") {
      colorScale = scaleQuantile()
        .domain([minValue, maxValue])
        .range([
          `rgb(240, 249, 33)`,
          `rgb(248, 148, 65)`,
          `rgb(203, 71, 120)`,
          `rgb(126, 3, 168)`,
          `rgb(13, 8, 135)`,
        ]);
    } else {
      const top5Values = Object.entries(
        values.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {})
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map((x) => x[0]);
      colorScale = scaleOrdinal()
        .domain(top5Values)
        .range([
          `rgb(240, 249, 33)`,
          `rgb(248, 148, 65)`,
          `rgb(203, 71, 120)`,
          `rgb(126, 3, 168)`,
          `rgb(13, 8, 135)`,
        ]);
      console.log(top5Values);
    }

    setScale(() => colorScale);

    const newMarkers = [];

    nepalProvinceData.features.forEach((feature) => {
      const provinceValue = getEntityValue(
        "districts",
        feature.properties.name
      );

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

      const markerPositionKey = `markerPosition_${feature.id}`;
      let markerPosition = localStorage.getItem(markerPositionKey);
      if (markerPosition) {
        markerPosition = JSON.parse(markerPosition);
      } else {
        markerPosition = center;
      }

      const marker = L.marker(markerPosition, {
        icon: L.divIcon({
          className: "label font-sans custom-marker-icon",
          // html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:5px; color: ${textColor} " class="label-container">
          //             <p>${
          //               feature.properties.name
          //             }</p><p style="font-size:4px;" >${
          //   provinceValue || 0
          // }</p></div>`,
        }),
        draggable: true,
      }).addTo(map);

      // When marker is dragged, update its position in local storage
      marker.on("dragend", function (e) {
        const newPos = marker.getLatLng();

        localStorage.setItem(markerPositionKey, JSON.stringify(newPos));

        const hexColor = scaledValue.replace("#", "");
        const r = parseInt(hexColor.substring(0, 2), 16) || 0;
        const g = parseInt(hexColor.substring(2, 4), 16) || 0;
        const b = parseInt(hexColor.substring(4, 6), 16) || 0;
        const intensity = (r * 299 + g * 587 + b * 114) / 1000;

        // Determine text color based on intensity
        const textColor = intensity < 10 ? "white" : "black";

        // Update marker's HTML with new text color
        marker.getElement().querySelector(".label-container").style.color =
          textColor;
      });

      marker.on("dblclick", () => {
        const propertyToChange = prompt(
          "Enter property to change (font size, color, or display name):"
        );

        switch (propertyToChange.toLowerCase()) {
          case "font size":
            const newFontSize = prompt("Enter new font size:");
            marker.setIcon(
              L.divIcon({
                className: "label font-sans",
                html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:${newFontSize}px; color: ${textColor}">
                <p>${feature.properties.name}</p><p style="font-size:14px;" >${
                  provinceValue || 0
                }</p></div>`,
              })
            );
            break;
          case "color":
            const newColor = prompt("Enter new color:");
            marker.setIcon(
              L.divIcon({
                className: "label font-sans",
                html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:20px; color: ${newColor}">
                <p>${feature.properties.name}</p><p style="font-size:14px;" >${
                  provinceValue || 0
                }</p></div>`,
              })
            );
            break;
          case "display name":
            const newName = prompt("Enter new display name:");
            marker.setIcon(
              L.divIcon({
                className: "label font-sans",
                html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:20px; color: ${textColor}">
                <p>${newName}</p><p style="font-size:14px;" >${
                  provinceValue || 0
                }</p></div>`,
              })
            );
            break;
          default:
            alert("Invalid property.");
            break;
        }
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    return () => {
      map.remove();
    };
  }, [getEntityValue, getAllEntityValues, type]);

  return (
    <>
      <div
        id="map"
        ref={mapRef}
        style={{
          position: "relative",
          width: "800px",
          backgroundColor: "white",
          borderRight: "0.5px solid gray",
          height: "100vh",
        }}
      >
        <Dragger>
          <div
            className="flex flex-col justify-end items-center font-sans p-3 "
            style={{ rowGap: "10px" }}
          >
            <EditText text={title} setText={setTitle} />
            {scale && <ColorBar colorScale={scale} content={"districts"} />}
          </div>
        </Dragger>
        <Dragger>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              padding: "10px",
            }}
            className="font-sans"
          >
            <CreatedBy />
          </div>
        </Dragger>
        <Dragger>
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              right: "100px",
              padding: "10px",
              fontStyle: "italic",
              cursor: "move",
            }}
            className="font-sans text-lg cursor-move"
          >
            Created By
          </div>
        </Dragger>
        <Dragger>
          <div
            style={{
              position: "absolute",
              bottom: "100px",
              left: "100px",
              padding: "10px",
              fontStyle: "italic",
              cursor: "move",
            }}
            className="font-sans text-lg cursor-move"
          >
            <p>Source</p>
            <EditText text={source} setText={setSource} s={20} />
          </div>
        </Dragger>
        <Dragger>
          <div
            style={{
              position: "absolute",
              top: "100px",
              right: "100px",
              padding: "10px",
              fontStyle: "italic",
              cursor: "move",
              display: "flex",
              flexDirection: "column",
              rowGap: "16px",
            }}
            className="font-sans text-lg cursor-move items-center "
          >
            <EditText text={"Most Common"} setText={() => {}} s={20} />
            <EditText text={common} setText={setCommon} s={60} />
          </div>
        </Dragger>
      </div>
    </>
  );
};

export default ProvinceMap;
