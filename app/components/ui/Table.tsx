import React, { useEffect, useCallback } from "react";
import { useSearch } from "@/app/context/SearchContext";
import { useValues } from "@/app/context/ValueContext";
import { useData } from "@/app/hooks/useData";
import { useHighlight } from "@/app/context/HighlightContext";
import CSVPasteComponent from "./CSVPasteComponent";

interface TableProps {
  content: string;
}

interface DataType {
  properties: {
    name: string;
  };
}

function Table({ content }: TableProps) {
  const { setHighlight } = useHighlight();
  const { data, fetchData } = useData(content);
  const { setEntityValue, getEntityValue, setType, type } = useValues();
  const { query } = useSearch();

  const filteredData =
    query.length > 0
      ? data.filter((d: DataType) =>
          d.properties.name.toUpperCase().includes(query.toUpperCase())
        )
      : data;

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      if (value === "") {
        setEntityValue(content, name, null);
      } else if (Number(value) || Number(value) === 0) {
        setEntityValue(content, name, value);
      } else {
        if (type !== "class") {
          const confirmChange = window.confirm(
            "Do you want to change the type to category (e.g., Rivers, Lakes, etc.)?"
          );
          if (!confirmChange) return;
          setType("class");
        }
        setEntityValue(content, name, value);
      }
    },
    [content, setEntityValue, setType, type]
  );

  const handleFocus = (name: string) => {
    setHighlight(name);
  };

  const handleBlur = () => {
    setHighlight(null);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <table className="table border border-collapse border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-center font-normal border">State</th>
            <th className="px-4 py-2 text-center font-normal border">Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((d: DataType, idx: number) => (
            <tr key={idx} className="border cursor-cell">
              <td className="px-4 py-2 border">{d.properties.name}</td>
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  step="any"
                  value={getEntityValue(content, d.properties.name) || ""}
                  onFocus={() => handleFocus(d.properties.name)}
                  onBlur={handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(d.properties.name, e.target.value);
                  }}
                  className="w-full px-2 py-1 text-right border border-gray-300 rounded cursor-cell"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
