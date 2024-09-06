"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface HighlightContextType {
  highlight: string | null;
  setHighlight: (value: string | null) => void;
}

const HighlightContext = createContext<HighlightContextType | undefined>(
  undefined
);

export const HighlightProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [highlight, setHighlight] = useState<string | null>(null);

  return (
    <HighlightContext.Provider value={{ highlight, setHighlight }}>
      {children}
    </HighlightContext.Provider>
  );
};

export const useHighlight = () => {
  const context = useContext(HighlightContext);
  if (context === undefined) {
    throw new Error("useHighlight must be used within a HighlightProvider");
  }
  return context;
};
