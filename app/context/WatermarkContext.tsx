"use client";
import React, { createContext, useState, useContext } from "react";

interface WatermarkContextType {
  showWatermark: boolean;
  toggleWatermark: () => void;
}

const WatermarkContext = createContext<any | null>(null);

export const WatermarkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showWatermark, setShowWatermark] = useState(false);

  const toggleWatermark = () => setShowWatermark((prev) => !prev);

  return (
    <WatermarkContext.Provider value={{ showWatermark, toggleWatermark }}>
      {children}
    </WatermarkContext.Provider>
  );
};

export const useWatermark = () => useContext(WatermarkContext);
