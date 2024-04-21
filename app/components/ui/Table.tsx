import { useSearch } from "@/app/context/SearchContext";
import { useValues } from "@/app/context/ValueContext";
import { useData } from "@/app/hooks/useData";
import React, { useEffect } from "react";

function Table({ content }: { content: string }) {
  let { data, fetchData } = useData(content);
  const { setEntityValue, getEntityValue, setType, type } = useValues();
  const { query } = useSearch();

  if (query.length > 0) {
    data = data.filter((d, idx) =>
      d.properties.name.toUpperCase().includes(query.toUpperCase())
    );
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <table className="table border border-collapse border-gray-300 w-full ">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-center font-normal border">State</th>
          <th className="px-4 py-2 text-center font-normal border">Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d: any, idx: number) => {
          return (
            <tr key={idx} className="border cursor-cell">
              <td className="px-4 py-2 border">{d.properties.name}</td>
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  step="any"
                  value={getEntityValue(content, d.properties.name) || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (inputValue === "") {
                      setEntityValue(content, d.properties.name, null);
                    } else if (Number(inputValue) || inputValue === "0") {
                      setEntityValue(
                        content,
                        d.properties.name,
                        Number(inputValue)
                      );
                    } else {
                      if (type != "class") {
                        const choice = window.confirm(
                          "Do you want to change the type to category (e.g., Rivers, Lakes, etc.)?"
                        );

                        if (!choice) return;
                      }
                      setType("class");
                      setEntityValue(content, d.properties.name, inputValue);
                    }
                  }}
                  className="w-full px-2 py-1 text-right border border-gray-300 rounded cursor-cell"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
