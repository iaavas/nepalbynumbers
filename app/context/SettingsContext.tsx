"use client";
import React, {
  createContext,
  useContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { useValues } from "./ValueContext";

interface SettingsValueType {
  displayLabel: boolean;
  setDisplayLabel: Dispatch<SetStateAction<boolean>>;
  displayLegend: boolean;
  setDisplayLegend: Dispatch<SetStateAction<boolean>>;
  revertToRegression: () => void;
}

const SettingsContext = createContext<SettingsValueType | null>(null);

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [displayLabel, setDisplayLabel] = useState<boolean>(true);
  const [displayLegend, setDisplayLegend] = useState<boolean>(true);
  const { clearAllValues, setType } = useValues();

  const revertToRegression = () => {
    clearAllValues();
    setType(() => "reg");
  };

  const contextValue: SettingsValueType = {
    displayLabel,
    setDisplayLabel,
    displayLegend,
    setDisplayLegend,
    revertToRegression,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within a Settings Provider");
  return context;
};
