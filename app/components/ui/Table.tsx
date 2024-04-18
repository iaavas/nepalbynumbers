"use client";
import { useValues } from "@/app/context/ValueContext";
import { useData } from "@/app/hooks/useData";
import React, { useEffect } from "react";

function Table({ content }: { content: string }) {
  const { data, fetchData } = useData(content);
  const { setEntityValue, getEntityValue, setType, type } = useValues();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <table className="table  border-stone-800  font-normal border-l border-t ">
      <thead>
        <tr>
          <th className="bg-[#F5F5F5]  px-4 py-2 border text-center font-normal ">
            State
          </th>
          <th className="bg-[#F5F5F5]  px-4 py-2 border text-center font-normal ">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((d: any, idx: number) => {
          return (
            <tr key={idx} className="border ">
              <td className="bg-[#F5F5F5] px-4 py-2 border text-center">
                {d.properties.name}
              </td>
              <td className="bg-white  cursor-cell w-32 ">
                <input
                  type="text"
                  step={"any"}
                  value={
                    getEntityValue(content, d.properties.name) || undefined
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value === "") {
                      setEntityValue(content, d.properties.name, null);
                    } else if (
                      Number(e.target.value) ||
                      e.target.value == "" ||
                      Number(e.target.value) == 0
                    ) {
                      setEntityValue(
                        content,
                        d.properties.name,
                        Number(e.target.value) * 1
                      );
                    } else {
                      if (type != "class") {
                        let choice = window.confirm(
                          "Do you want to change the type to category for eg. Rivers, Lakes etc. ?"
                        );
                        if (!choice) return;
                      }
                      setType("class");
                      console.log(d.properties.name);
                      setEntityValue(
                        content,
                        d.properties.name,
                        e.target.value
                      );
                    }
                  }}
                  className=" w-full  cursor-cell px-4 py-2 text-right"
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
