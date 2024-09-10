"use client";
import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { scaleQuantile, scaleOrdinal } from "d3-scale";
import "leaflet/dist/leaflet.css";
import { useValues } from "../../context/ValueContext";
import CreatedBy from "./CreatedBy";
import * as turf from "@turf/turf";
import Legend from "./Legend";
import DataSource from "./DataSource";
import { useData } from "@/app/hooks/useData";
import OverallStats from "./OverallStats";
import { useHighlight } from "@/app/context/HighlightContext"; // Add this import
import { WatermarkCanvas } from "./Watermark";
import { useColor } from "@/app/context/ColorsContext";
import { usePostfix } from "@/app/context/PostfixContext";
import getContrastColor from "@/app/utils/TextColor";

const Map = ({
  mapType,
  ctr = [28.3949, 84.124],
}: {
  mapType: string;
  ctr?: [number, number];
}) => {
  const { getEntityValue, type, getAllEntityValues } = useValues();
  const [scale, setScale] = useState(null);
  const [mapScale, setMapScale] = useState(100);
  const { data, fetchData } = useData(mapType!);
  const { colors: tcolor } = useColor();

  const { highlight } = useHighlight();

  const currentPopupRef = useRef<any>(null);

  const { postfix, prefix } = usePostfix();

  const mapRef: any = useRef(null);

  const mctr = useRef<[number, number] | undefined>();

  useEffect(() => {
    mctr.current = ctr;
  }, [ctr]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!mapRef.current) return;

    let L: any;
    if (typeof window !== "undefined") {
      L = require("leaflet");
    }
    let zoom: number;

    var scaleFactor: number;
    if (mapType === "district" || mapType === "province") {
      zoom = 7;
      scaleFactor = 0.00013;
      setMapScale(100);
    } else {
      zoom = 9;
      scaleFactor = 0.0005;
      setMapScale(65);
    }

    const map = L.map(mapRef.current! as string | HTMLElement, {
      attributionControl: false,
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
    }).setView(mctr.current, zoom);

    const provinceValues = data.map((feature) =>
      getEntityValue(mapType, feature.properties.name)
    );

    const filteredValues = provinceValues.filter(
      (value) => value !== undefined && value !== null
    );

    const values = getAllEntityValues(mapType);
    // @ts-ignore
    const colorRange: any = tcolor;
    let colorScale;
    if (type === "reg") {
      const minValue = Math.min(...(filteredValues as number[]));
      const maxValue = Math.max(...(filteredValues as number[]));
      colorScale = scaleQuantile()
        .domain([minValue, maxValue])
        .range(colorRange);
    } else {
      const top5Values: string[] = Object.entries(
        values!.reduce((acc: any, val: any) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {})
      )
        .sort((a: [string, any], b: [string, any]) => b[1] - a[1])
        .slice(0, 5)
        .map((x) => x[0]);

      colorScale = scaleOrdinal().domain(top5Values).range(colorRange);
    }
    // @ts-ignore
    setScale(() => colorScale);

    map.createPane("highlightPane");
    map.getPane("highlightPane").style.zIndex = 450; // Above other layers but below popups

    data.forEach((feature) => {
      const value: any = getEntityValue(mapType, feature.properties.name);

      const scaledValue: any =
        value !== undefined && value !== null ? colorScale(value) : "#E5E4E2";

      const provinceLayer = L.geoJSON(feature, {
        style: {
          fillColor: scaledValue,
          weight: 1.5,
          color: "black",
          fillOpacity: 1,
          transition: "fill 0.5s ease", // Add transition
        },
      }).addTo(map);

      if (feature.properties.name === highlight) {
        L.geoJSON(feature, {
          style: {
            fillColor: "transparent",
            weight: 16,
            color: "#ff4d00",
            opacity: 0.5,
          },
          pane: "highlightPane",
        }).addTo(map);
      }

      const area = turf.area(feature.geometry);

      const fs = Math.sqrt(area) * scaleFactor;

      let textColor = getContrastColor(scaledValue);

      if (feature.properties.name == "Madhesh") {
        textColor = "black";
      }

      if (mapType === "district" || mapType === "world") {
        return;
      }
      const center = provinceLayer.getBounds().getCenter();

      let id = feature.properties.id || feature.id || feature.properties.name;

      const markerPositionKey = `markerPosition_${id}`;
      let markerPosition: L.LatLngExpression | string | null =
        localStorage.getItem(markerPositionKey);
      if (markerPosition) {
        markerPosition = JSON.parse(markerPosition);
      } else {
        markerPosition = center;
      }

      const markerPropsKey = `markerProps_${id}`;
      let markerProps: any = localStorage.getItem(markerPropsKey);
      if (markerProps) {
        markerProps = JSON.parse(markerProps);
      } else {
        markerProps = {
          fontSize: Math.floor(fs),
          displayName: feature.properties.name,
          valueFontSize: Math.floor(fs) * 0.95,
        };
      }
      const updatedHtml = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:${
        markerProps.fontSize
      }px; color: ${textColor};cursor:move; ;  border: 2px solid transparent; transition: border-color 0.1s;width:fit-content;border-radius:10px;padding:3px" onmouseover="this.style.borderColor='black';" onmouseout="this.style.borderColor='transparent';" class="label-container">
            <p>${markerProps.displayName}</p>
            <p style="font-size:${markerProps.valueFontSize * 0.8}px;" >
        ${value ? prefix : ""}${value ?? ""}${value ? postfix : ""}</p>
        </div>`;

      const markerIcon = L.divIcon({
        className: "label font-sans ",
        html: updatedHtml,

        iconAnchor: [50, 20],
      });

      const marker = L.marker(markerPosition, {
        icon: markerIcon,
        draggable: true,
      }).addTo(map);

      marker.on("dblclick", function () {
        if (currentPopupRef.current) {
          currentPopupRef.current.remove();
          currentPopupRef.current = null;
        }

        let markerProps: any = localStorage.getItem(markerPropsKey);
        if (markerProps) {
          markerProps = JSON.parse(markerProps);
        } else {
          markerProps = {
            fontSize: Math.floor(fs),
            displayName: feature.properties.name,
            valueFontSize: Math.floor(fs) * 0.95,
          };
        }
        const markerLatLng = marker.getLatLng();
        const markerPos = map.latLngToContainerPoint(markerLatLng);

        const popupContainer = document.createElement("div");
        popupContainer.className =
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2  shadow-2xl border-2 border-black  w-32";
        popupContainer.style.zIndex = "9999";
        popupContainer.style.left = `${markerPos.x}px`;
        popupContainer.style.top = `${markerPos.y}px`;
        currentPopupRef.current = popupContainer;

        // Create input fields for font size, display name, and font color
        const header = document.createElement("span");
        header.innerText = feature.properties.name;
        header.className =
          "font-sans text-md text-center mb-2  text-md flex items-center justify-center";

        const displayNameInput = document.createElement("input");
        displayNameInput.className =
          "w-full mb-2 px-2 py-1 rounded-lg border border-black";
        displayNameInput.type = "text";
        displayNameInput.placeholder = "Display Name";
        displayNameInput.value = markerProps.displayName;

        const sizes = document.createElement("div");

        sizes.className = "flex items-center justify-between gap-x-2";

        const fontSizeInput = document.createElement("input");
        fontSizeInput.className =
          "w-full mb-2 px-2 py-1 rounded-lg border border-black";
        fontSizeInput.type = "number";
        fontSizeInput.placeholder = "Font Size";
        fontSizeInput.value = markerProps.fontSize.toString();

        const valueSizeInput = document.createElement("input");
        valueSizeInput.className =
          "w-full mb-2 px-2 py-1 rounded-lg border border-black";
        valueSizeInput.type = "number";
        valueSizeInput.placeholder = "Value Size";
        valueSizeInput.value = markerProps.valueFontSize.toString();

        const applyButton = document.createElement("button");
        applyButton.textContent = "Apply";
        applyButton.className =
          "w-full p-1.5 border-2 border-black   text-md tracking-wider  text-black rounded-xl font-sans";
        applyButton.addEventListener("click", function () {
          const fontSize = fontSizeInput.value;
          const valueFontSize = valueSizeInput.value;
          const displayName = displayNameInput.value;

          const updatedHtml = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:${fontSize}px; color: ${textColor};cursor:move; ;  border: 2px solid transparent; transition: border-color 0.1s;width:fit-content;border-radius:10px;padding:3px" onmouseover="this.style.borderColor='black';" onmouseout="this.style.borderColor='transparent';" class="label-container">
                <p>${displayName}</p>
                <p style="font-size:${Number(valueFontSize) * 0.9}px;" >
            ${value ? prefix : ""}${value ?? ""}${value ? postfix : ""}</p>
            </div>`;
          markerIcon.options.html = updatedHtml;

          marker.setIcon(markerIcon);

          // Save marker properties to localStorage
          const mkrProps = {
            fontSize,
            displayName,
            valueFontSize,
          };
          localStorage.setItem(markerPropsKey, JSON.stringify(mkrProps));

          // Close the popup
          popupContainer.remove();
        });

        // Append input fields and button to the popup container
        popupContainer.appendChild(header);
        popupContainer.appendChild(displayNameInput);
        popupContainer.appendChild(sizes);
        sizes.appendChild(fontSizeInput);
        sizes.appendChild(valueSizeInput);

        popupContainer.appendChild(applyButton);

        // Append the popup container to the map container
        mapRef.current.appendChild(popupContainer);
      });

      marker.on("dragend", function () {
        localStorage.setItem(
          markerPositionKey,
          JSON.stringify(marker.getLatLng())
        );
      });
    });

    return () => {
      map.remove();
    };
  }, [
    getEntityValue,
    getAllEntityValues,
    type,
    data,
    mapType,
    tcolor,
    postfix,
    prefix,
    highlight,
  ]);

  return (
    <div
      id="map"
      style={{
        position: "relative",
        width: "100%",
        maxHeight: "100vh",
        backgroundColor: "white",

        height: "100vh",
      }}
    >
      <div
        ref={mapRef}
        className="z-[0]"
        style={{
          backgroundColor: "white",
          position: "absolute",
          top: `${mapScale == 65 ? 22 : 50}%`,
          left: `${mapScale == 65 ? 22 : 50}%`,
          transform: "translate(-50%, -50%)",
          scale: `${mapScale}%`,
          width: "1500px",
          height: "1100px",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WatermarkCanvas />
      </div>

      <Legend scale={scale} content={mapType} />
      <CreatedBy />
      <OverallStats />
      <DataSource />
    </div>
  );
};

export default Map;
