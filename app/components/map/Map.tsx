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

const Map = ({ mapType }: { mapType: string }) => {
  const { getEntityValue, type, getAllEntityValues } = useValues();
  const [scale, setScale] = useState(null);
  const { data, fetchData } = useData(mapType!);

  const mapRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!mapRef) return;
    const map = L.map(mapRef.current! as string | HTMLElement, {
      attributionControl: false,
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
    }).setView([28.3949, 84.124], 7);

    const provinceValues = data.map((feature) =>
      getEntityValue(mapType, feature.properties.name)
    );

    const filteredValues = provinceValues.filter(
      (value) => value !== undefined && value !== null
    );

    const values = getAllEntityValues(mapType);
    const colorRange: any = colors["Gurkha"];
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

    data.forEach((feature) => {
      const value: any = getEntityValue(mapType, feature.properties.name);

      const scaledValue: any =
        value !== undefined && value !== null ? colorScale(value) : "#cccccc";

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
      let id;
      if (feature.properties.id) {
        id = feature.properties.id;
      } else {
        id = feature.id;
      }

      const markerPositionKey = `markerPosition_${id}`;
      let markerPosition: L.LatLngExpression | string | null =
        localStorage.getItem(markerPositionKey);
      if (markerPosition) {
        markerPosition = JSON.parse(markerPosition);
      } else {
        markerPosition = center;
      }

      if (mapType === "district") {
        return;
      }

      const marker = L.marker(markerPosition! as L.LatLngExpression, {
        icon: L.divIcon({
          className: "label font-sans custom-marker-icon",
          html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:20px; color: ${textColor} " class="label-container">
                      <p>${
                        feature.properties.name
                      }</p><p style="font-size:14px;" >${value || 0}</p></div>`,
        }),
        draggable: true,
      }).addTo(map);

      marker.on("dragend", function (e) {
        const newPos = marker.getLatLng();

        localStorage.setItem(markerPositionKey, JSON.stringify(newPos));
      });

      marker.on("dblclick", () => {
        const propertyToChange = prompt(
          "Enter property to change (font size, color, or display name):"
        );
        if (!propertyToChange) return;

        switch (propertyToChange.toLowerCase()) {
          case "font size":
            const newFontSize = prompt("Enter new font size:");
            marker.setIcon(
              L.divIcon({
                className: "label font-sans",
                html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.1rem; font-weight: normal;font-size:${newFontSize}px; color: ${textColor}">
                <p>${feature.properties.name}</p><p style="font-size:14px;" >${
                  value || 0
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
                  value || 0
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
                  value || 0
                }</p></div>`,
              })
            );
            break;
          default:
            alert("Invalid property.");
            break;
        }
      });
    });

    return () => {
      map.remove();
    };
  }, [getEntityValue, getAllEntityValues, type, data, mapType]);

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
        <Legend scale={scale} />
        <CreatedBy />
        <DataSource />
      </div>
    </>
  );
};

export default Map;
