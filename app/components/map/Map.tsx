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
  const { theme } = useColor();
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
    const colorRange: any = colors[theme].colors;
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
          weight: 1,
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

      if (mapType === "district") {
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

      const markerIcon = L.divIcon({
        className: "label font-sans custom-marker-icon",
        html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:${fs}px; color: ${textColor} " class="label-container">
            <p>${feature.properties.name}</p>
            <p style="font-size:${fs * 0.9}px;" >
        ${value ? prefix : ""}${value ?? ""}${value ? postfix : ""}</p>
        </div>`,
      });

      const marker = L.marker(markerPosition, {
        icon: markerIcon,
        draggable: true,
      }).addTo(map);

      marker.on("dblclick", function () {
        const popupContent = `
          <div>
            <label for="fontSize">Font Size:</label>
            <input type="number" id="fontSize" name="fontSize" value="12" min="1">
            <br>
            <label for="fontColor">Font Color:</label>
            <input type="color" id="fontColor" name="fontColor" value="#000000">
            <br>
            <button id="applyChanges">Apply Changes</button>
          </div>
        `;

        const popup = L.popup()

          .setLatLng(center)
          .setContent(popupContent)
          .openOn(map);

        document
          .getElementById("applyChanges")
          ?.addEventListener("click", () => {
            const fontSize = (
              document.getElementById("fontSize") as HTMLInputElement
            ).value;
            const fontColor = (
              document.getElementById("fontColor") as HTMLInputElement
            ).value;

            marker.setIcon(
              L.divIcon({
                className: "label font-sans custom-marker-icon",
                html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:${fontSize}px; color: ${fontColor} " class="label-container">
              <p>${
                feature.properties.name
              }</p><p style="font-size:${fontSize}px;" >${value ? prefix : ""}${
                  value ?? ""
                }${value ? postfix : ""}</p></div>`,
              })
            );
          });
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
    theme,
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
