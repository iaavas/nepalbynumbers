"use client";

import { createContext, useContext, FC, useState, useEffect } from "react";
import { colors as clrs } from "@/app/constants/Colors";
const ColorContext = createContext<ValueContextType | null>(null);

interface ValueContextType {
  theme: string;
  updateTheme: (arg0: string) => void;
  colors: string[];
  updateColor: (arg0: number, arg1: string) => void;
}

export const ColorProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("Danfe");

  function updateTheme(t: string) {
    setTheme(() => t);
  }

  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    setColors(clrs[theme as keyof typeof clrs].colors);
  }, [theme]);

  function updateColor(index: number, color: string) {
    setColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  }

  const contextValue: ValueContextType = {
    theme,
    updateTheme,
    colors,
    updateColor,
  };

  return (
    <ColorContext.Provider value={contextValue}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
};
