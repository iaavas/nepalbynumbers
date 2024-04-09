"use client";
import { useEffect } from "react";
import L from "leaflet";
import { scaleLinear } from "d3-scale"; // Import scaleLinear from d3-scale

import "leaflet/dist/leaflet.css";

import nepalProvinceData from "@/assets/data/nepal-provinces.json";
import { useValues } from "../context/ValueContext";

const ProvinceMap = () => {
  const { getEntityValue } = useValues();
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
      getEntityValue("province", feature.properties.name)
    );

    // Filter out undefined or null values
    const filteredValues = provinceValues.filter(
      (value) => value !== undefined && value !== null
    );

    // Find the minimum and maximum values
    const minValue = Math.min(...filteredValues);
    const maxValue = Math.max(...filteredValues);

    // Define color scale using d3-scale
    const colorScale = scaleLinear()
      .domain([minValue, maxValue]) // Define the domain based on min and max values
      .range(["#f7fcf5", "#238b45"]); // Define the range of colors

    nepalProvinceData.features.forEach((feature) => {
      const provinceValue = getEntityValue("province", feature.properties.name);

      // If province value is undefined or null, assign a default color
      const scaledValue =
        provinceValue !== undefined && provinceValue !== null
          ? colorScale(provinceValue)
          : "#cccccc";

      L.geoJSON(feature, {
        style: {
          fillColor: scaledValue,
          weight: 0.8,
          color: "black",
          fillOpacity: 0.7,
        },
      }).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [getEntityValue]);

  return (
    <div
      id="map"
      style={{ width: "800px", height: "600px", backgroundColor: "white" }}
    ></div>
  );
};

export default ProvinceMap;
