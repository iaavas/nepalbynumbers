"use client";

import { createContext, useContext, FC, useState } from "react";

const ReferenceContext = createContext<ValueContextType | null>(null);

interface ValueContextType {
  createdBy: string;
  setCreatedBy: (arg0: string) => void;
  source: string;
  setSource: (arg1: string) => void;
  statsTitle: string;
  setStatsTitle: (arg1: string) => void;
  statsValue: string;
  setStatsValue: (arg1: string) => void;
}

export const ReferenceProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [createdBy, setCreatedBy] = useState<string>("@nepal.by.numbers");
  const [source, setSource] = useState<string>("https://www.");
  const [statsTitle, setStatsTitle] = useState<string>("Most Common");
  const [statsValue, setStatsValue] = useState<string>("0");

  const contextValue: ValueContextType = {
    createdBy,
    setCreatedBy,
    source,
    setSource,
    statsTitle,
    setStatsTitle,
    statsValue,
    setStatsValue,
  };

  return (
    <ReferenceContext.Provider value={contextValue}>
      {children}
    </ReferenceContext.Provider>
  );
};

export const useReference = () => {
  const context = useContext(ReferenceContext);
  if (!context) {
    throw new Error("useReference must be used within a ReferenceProvider");
  }
  return context;
};
