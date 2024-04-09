"use client";
import React, { createContext, useContext, useState, FC } from "react";

type EntityType = string;
type EntityValues = Record<string, number | null>;

interface ValueContextType {
  setEntityValue: (
    entityType: EntityType,
    entityId: string,
    value: number | null
  ) => void;
  getEntityValue: (entityType: EntityType, entityId: string) => number | null;
  getAllEntityValues: (entityType: EntityType) => EntityValues | null;
}

const ValueContext = createContext<ValueContextType | null>(null);

export const ValueProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<Record<EntityType, EntityValues>>({});

  const setEntityValue = (
    entityType: EntityType,
    entityId: string,
    value: number | null
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [entityType]: {
        ...prevValues[entityType],
        [entityId]: value,
      },
    }));
  };

  const getEntityValue = (entityType: EntityType, entityId: string) => {
    return values[entityType] ? values[entityType][entityId] : null;
  };

  const getAllEntityValues = (entityType: EntityType) => {
    return values[entityType] || null;
  };

  const contextValue: ValueContextType = {
    setEntityValue,
    getEntityValue,
    getAllEntityValues,
  };

  return (
    <ValueContext.Provider value={contextValue}>
      {children}
    </ValueContext.Provider>
  );
};

export const useValues = (): ValueContextType => {
  const context = useContext(ValueContext);
  if (!context) {
    throw new Error("useValues must be used within a ValueProvider");
  }
  return context;
};
