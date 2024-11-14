"use client";
import React, {
  createContext,
  useContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

type EntityType = string;
type EntityValues = Record<string, (number | string) | null>;

export interface EntityValue {
  entityType: EntityType;
  entityId: string;
  value: number | null | string;
}

interface ValueContextType {
  setEntityValue: (
    entityType: EntityType,
    entityId: string,
    value: number | null | string
  ) => void;
  setAllEntityValues: (entityType: EntityType, values: EntityValue[]) => void;
  getEntityValue: (
    entityType: EntityType,
    entityId: string
  ) => number | null | string;
  getAllEntityValues: (entityType: EntityType) => EntityValue[] | undefined;
  type: "reg" | "class";
  setType: Dispatch<SetStateAction<"reg" | "class">>;
  setTitle: Dispatch<SetStateAction<string>>;
  title: string;
  clearAllValues: () => void;
}

type ValuesState = Record<EntityType, EntityValues>;

const ValueContext = createContext<ValueContextType | null>(null);

export const ValueProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState<ValuesState>({});
  const [type, setType] = useState<"reg" | "class">("reg");
  const [title, setTitle] = useState<string>("Infographic Title");

  const setEntityValue = useCallback(
    (
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
    },
    []
  );

  const setAllEntityValues = useCallback(
    (entityType: EntityType, newValues: EntityValue[]) => {
      newValues.forEach((n) => {
        setEntityValue(entityType, n.entityId, n.value);
      });
    },
    [setEntityValue] // Assuming setEntityValue is stable or memoized
  );

  const getEntityValue = (entityType: EntityType, entityId: string) => {
    return values[entityType] ? values[entityType][entityId] : null;
  };

  const getAllEntityValues = (
    entityType: EntityType
  ): EntityValue[] | undefined => {
    if (values[entityType]) {
      return Object.entries(values[entityType]).map(([entityId, value]) => ({
        entityType,
        entityId,
        value,
      }));
    }
  };

  const clearAllValues = () => {
    setValues({});
  };

  const contextValue: ValueContextType = {
    setEntityValue,
    setAllEntityValues,
    getEntityValue,
    getAllEntityValues,
    type,
    setType,
    title,
    setTitle,
    clearAllValues,
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
