"use client";
import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { scaleQuantile, scaleOrdinal } from "d3-scale";
import "leaflet/dist/leaflet.css";
import { useValues } from "../../context/ValueContext";
import CreatedBy from "./CreatedBy";
import { colors } from "@/app/constants/Colors";
import Legend from "./Legend";
import DataSource from "./DataSource";
import { useData } from "@/app/hooks/useData";
import OverallStats from "./OverallStats";
import { useColor } from "@/app/context/ColorsContex";
import { usePostfix } from "@/app/context/PostfixContext";

const Map = ({
  mapType,
  ctr = [28.3949, 84.124],
}: {
  mapType: string;
  ctr?: [number, number];
}) => {
  const { getEntityValue, type, getAllEntityValues } = useValues();
  const [scale, setScale] = useState(null);
  const { data, fetchData } = useData(mapType!);
  const { colors: tcolor } = useColor();
  const currentPopupRef = useRef<any>(null);

  const { postfix, prefix } = usePostfix();

  const mapRef: any = useRef(null);

  const mctr = useRef<[number, number] | undefined>();

  useEffect(() => {
    localStorage.clear();
  }, []);

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
    let fs: number;

    if (mapType === "district" || mapType === "province") {
      zoom = 7;
      fs = 20;
    } else {
      zoom = 8;
      fs = 12;
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
        .range(colorRange.slice(1));
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

    data.forEach((feature) => {
      const value: any = getEntityValue(mapType, feature.properties.name);
      let a: string;

      const scaledValue: any =
        value !== undefined && value !== null
          ? colorScale(value)
          : colorRange[0];

      const provinceLayer = L.geoJSON(feature, {
        style: {
          fillColor: scaledValue,
          weight: 1.4,
          color: "black",
          fillOpacity: 1,
          transition: "fill 0.5s ease", // Add transition
        },
      }).addTo(map);

      const hexColor = scaledValue.replace("#", "");
      const r = parseInt(hexColor.substring(0, 2), 16) || 0;
      const g = parseInt(hexColor.substring(2, 4), 16) || 0;
      const b = parseInt(hexColor.substring(4, 6), 16) || 0;

      const intensity = (r * 299 + g * 587 + b * 114) / 1000;

      const textColor = intensity < 10 ? "white" : "black";

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
          fontSize: fs,
          displayName: feature.properties.name,
          fontColor: textColor,
        };
      }
      const updatedHtml = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:${
        markerProps.fontSize
      }px; color: ${markerProps.fontColor} " class="label-container">
            <p>${markerProps.displayName}</p>
            <p style="font-size:${markerProps.fontSize * 0.9}px;" >
        ${value ? prefix : ""}${value ?? ""}${value ? postfix : ""}</p>
        </div>`;

      const markerIcon = L.divIcon({
        className: "label font-sans custom-marker-icon",
        html: updatedHtml,
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
            fontSize: fs,
            displayName: feature.properties.name,
            fontColor: textColor,
          };
        }
        const markerLatLng = marker.getLatLng();
        const markerPos = map.latLngToContainerPoint(markerLatLng);

        // Create a custom popup container
        const popupContainer = document.createElement("div");
        popupContainer.className =
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1.5  shadow-md border border-blue-600 rounded-sm w-32";
        popupContainer.style.zIndex = "9999";
        popupContainer.style.left = `${markerPos.x}px`;
        popupContainer.style.top = `${markerPos.y}px`;
        currentPopupRef.current = popupContainer;

        // Create input fields for font size, display name, and font color
        const header = document.createElement("span");
        header.innerText = feature.properties.name;
        header.className = "font-sans text-md text-left";
        const fontSizeInput = document.createElement("input");
        fontSizeInput.className = "w-full mb-2 px-2 py-1 rounded border";
        fontSizeInput.type = "number";
        fontSizeInput.placeholder = "Font Size";
        fontSizeInput.value = markerProps.fontSize.toString();

        const displayNameInput = document.createElement("input");
        displayNameInput.className = "w-full mb-2 px-2 py-1 rounded border";
        displayNameInput.type = "text";
        displayNameInput.placeholder = "Display Name";
        displayNameInput.value = markerProps.displayName;

        const fontColorInput = document.createElement("input");
        fontColorInput.className =
          "w-full mb-2 p-1.5 rounded-md border border-blue-200";
        fontColorInput.type = "color";
        fontColorInput.value = markerProps.fontColor;

        // Create a button to apply changes
        const applyButton = document.createElement("button");
        applyButton.textContent = "Apply";
        applyButton.className =
          "w-full p-1.5 border border-blue-700  text-black rounded-lg font-sans";
        applyButton.addEventListener("click", function () {
          // Retrieve values from input fields
          const fontSize = fontSizeInput.value;
          const displayName = displayNameInput.value;
          const fontColor = fontColorInput.value;

          // Update marker HTML
          const updatedHtml = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:${fontSize}px; color: ${fontColor} " class="label-container">
          <p>${displayName}</p>
          <p style="font-size:${fontSize}px;" >
      ${value ? prefix : ""}${value ?? ""}${value ? postfix : ""}</p>
      </div>`;
          markerIcon.options.html = updatedHtml;

          marker.setIcon(markerIcon);

          // Save marker properties to localStorage
          const mkrProps = {
            fontSize,
            displayName,
            fontColor,
          };
          localStorage.setItem(markerPropsKey, JSON.stringify(mkrProps));

          // Close the popup
          popupContainer.remove();
        });

        // Append input fields and button to the popup container
        popupContainer.appendChild(header);
        popupContainer.appendChild(fontSizeInput);
        popupContainer.appendChild(displayNameInput);
        popupContainer.appendChild(fontColorInput);
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
  ]);

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
        className="z-0"
      >
        <Legend scale={scale} content={mapType} />
        <CreatedBy />
        <OverallStats />
        <DataSource />
      </div>
    </>
  );
};

export default Map;
