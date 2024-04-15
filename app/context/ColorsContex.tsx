"use client";

import { createContext, useContext, FC, useState } from "react";

const ColorContext = createContext<ValueContextType | null>(null);

interface ValueContextType {
  theme: string;
  updateTheme: (arg0: string) => void;
}

export const ColorProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("Danfe");

  function updateTheme(t: string) {
    setTheme(() => t);
  }

  const contextValue: ValueContextType = {
    theme,
    updateTheme,
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
