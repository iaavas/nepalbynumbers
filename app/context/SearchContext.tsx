"use client";
import React, {
  createContext,
  useContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

interface contextValueType {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<contextValueType | null>(null);

export const SearchProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");

  const contextValue: contextValueType = {
    query,
    setQuery,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearch must be used within a Search Provider");
  return context;
};
