"use client";
import React, {
  createContext,
  useContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

type EntityType = string;
type EntityValues = Record<string, (number | string) | null>;

interface ValueContextType {
  setEntityValue: (
    entityType: EntityType,
    entityId: string,
    value: number | null | string
  ) => void;
  getEntityValue: (
    entityType: EntityType,
    entityId: string
  ) => number | null | string;
  getAllEntityValues: (
    entityType: EntityType
  ) => (string | number | null)[] | undefined;
  type: "reg" | "class";
  setType: Dispatch<SetStateAction<"reg" | "class">>;
  setTitle: Dispatch<SetStateAction<string>>;
  title: string;
}

type ValuesState = Record<EntityType, EntityValues>;

const ValueContext = createContext<ValueContextType | null>(null);

export const ValueProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState<ValuesState>({});
  const [type, setType] = useState<"reg" | "class">("reg");
  const [title, setTitle] = useState<string>("Inforgraphic Title");
  const setEntityValue = (
    entityType: EntityType,
    entityId: string,
    value: number | null | string
  ) => {
    setValues((prevValues: ValuesState) => ({
      ...prevValues,
      [entityType]: {
        ...(prevValues[entityType] || {}),
        [entityId]: value,
      },
    }));
  };

  const getEntityValue = (entityType: EntityType, entityId: string) => {
    return values[entityType] ? values[entityType][entityId] : null;
  };

  const getAllEntityValues = (entityType: EntityType) => {
    console.log(values[entityType]);
    if (values[entityType]) {
      return Object.values(values[entityType]) || null;
    }
  };

  const contextValue: ValueContextType = {
    setEntityValue,
    getEntityValue,
    getAllEntityValues,
    type,
    setType,
    title,
    setTitle,
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
