"use client";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import L from "leaflet";
import { scaleQuantile, scaleOrdinal, scaleLinear } from "d3-scale";
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
import { interpolateRgb } from "d3-interpolate";

import { interpolateHsl } from "d3-interpolate";

import { rgbStringToHex } from "@/app/utils/rgb2hex";
import withAuth from "../withAuth";
import SETTINGS from "./settings";
function createInterpolatedColorScale(
  categories: string[],
  initialColorRange: string[]
) {
  const numCategories = categories.length;
  const numInitialColors = initialColorRange.length;

  function interpolateColors(
    baseColors: string[],
    targetCount: number
  ): string[] {
    if (targetCount <= baseColors.length) {
      return baseColors.slice(0, targetCount);
    }

    const result: string[] = [];
    const step = (baseColors.length - 1) / (targetCount - 1);

    for (let i = 0; i < targetCount; i++) {
      const index = i * step;
      const lowIndex = Math.floor(index);
      const highIndex = Math.ceil(index);

      if (lowIndex === highIndex) {
        result.push(baseColors[lowIndex]);
      } else {
        const t = index - lowIndex;
        const interpolated = interpolateHsl(
          baseColors[lowIndex],
          baseColors[highIndex]
        )(t);
        result.push(interpolated);
      }
    }

    return result;
  }

  const extendedColorRange = interpolateColors(
    initialColorRange,
    numCategories
  );

  return scaleOrdinal<string, string>()
    .domain(categories)
    .range(extendedColorRange);
}

const Map = ({
  mapType,
  ctr = [28.3949, 84.124],
}: {
  mapType: string;
  ctr?: [number, number];
}) => {
  const { getEntityValue, type, setType, getAllEntityValues } = useValues();

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
    setMapScale(SETTINGS[mapType as keyof typeof SETTINGS].scale);
  }, [mapType]);

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

    const settings = SETTINGS[mapType as keyof typeof SETTINGS];

    const map = L.map(mapRef.current! as string | HTMLElement, {
      attributionControl: false,
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
    }).setView(mctr.current, settings.zoom);

    const provinceValues = data.map((feature) =>
      getEntityValue(mapType, feature.properties.name)
    );

    const filteredValues = provinceValues.filter(
      (value) => value !== undefined && value !== null
    );

    const values = getAllEntityValues(mapType);
    // @ts-ignore
    function linspace(start: number, end: number, n: number): number[] {
      const result = [];
      const step = (end - start) / (n - 1);
      for (let i = 0; i < n; i++) {
        result.push(start + i * step);
      }
      return result;
    }

    const colorRange: any = tcolor;
    let colorScale: any;
    if (type === "reg") {
      const minValue = Math.min(...(filteredValues as number[]));
      const maxValue = Math.max(...(filteredValues as number[]));
      colorScale = scaleLinear<string>()
        .domain(linspace(minValue, maxValue, colorRange.length))
        .range(colorRange)
        .interpolate(interpolateRgb);
    } else {
      const extractedValues = values!
        .map((item) => item.value)
        .filter((value) => value !== undefined && value !== null);

      const uniqueCategories = Array.from(new Set(extractedValues as string[]));

      colorScale = createInterpolatedColorScale(uniqueCategories, colorRange);
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
          weight: 1.4,
          color: "black",
          fillOpacity: 2,
          opacity: 5,
        },
      }).addTo(map);

      if (feature.properties.name === highlight) {
        // @ts-ignore
        const buffered = turf.buffer(feature, 0.05, { units: "kilometers" });
        L.geoJSON(buffered, {
          style: {
            fillColor: "transparent",
            weight: 20,
            color: "#E5E4E2",
            opacity: 0.7,
          },
          pane: "highlightPane",
        }).addTo(map);
      }

      const area = turf.area(feature.geometry);

      const fs = Math.sqrt(area) * settings.scaleFactor;

      let textColor = getContrastColor(
        type == "class" ? scaledValue : rgbStringToHex(scaledValue.toString())
      );

      if (feature.properties.name == "MADHESH") {
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
            <p style="font-size:${markerProps.valueFontSize * 1}px;">${
        markerProps.displayName
      }</p>
            <p style="font-size:${markerProps.valueFontSize}px;" >
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
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2.5  shadow-2xl border-2 border-black  w-40 font-sans text-lg";
        popupContainer.style.zIndex = "9999";
        popupContainer.style.left = `${markerPos.x}px`;
        popupContainer.style.top = `${markerPos.y}px`;
        currentPopupRef.current = popupContainer;

        // Create input fields for font size, display name, and font color
        const header = document.createElement("span");
        header.innerText = feature.properties.name;
        header.className =
          "font-sans text-sm text-center mb-2   flex items-center justify-center";

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
                <p style="font-size:${
                  Number(valueFontSize) * 1
                }px;">${displayName}</p>
                <p  >
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
          top: `${SETTINGS[mapType as keyof typeof SETTINGS].y}%`,
          left: `${SETTINGS[mapType as keyof typeof SETTINGS].x}%`,
          transform: "translate(-50%, -50%)",
          scale: `${mapScale}%`,
          width: "1500px",
          height: "200vh",
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

export default withAuth(Map);
