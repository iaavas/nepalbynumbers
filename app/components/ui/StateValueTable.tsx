"use client";
import React, { useState } from "react";

import * as htmlToImage from "html-to-image";
import { useValues } from "../../context/ValueContext";

interface StateValues {
  [key: string]: number;
}

const StateValueTable = ({ data, content }: { data: any; content: string }) => {
  const { setEntityValue, getEntityValue, setType } = useValues();
  function randomizeValue() {
    data.forEach((d: any, idx: number) => {
      setEntityValue(
        content,
        d.properties.name,
        Math.floor(Math.random() * 100)
      );
    });
  }

  const captureMapImage = () => {
    // @ts-ignore
    htmlToImage.toPng(document.getElementById("map")).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="flex  flex-col w-96  ">
      <div className="flex items-center justify-center mb-8 border-b p-2">
        <button
          className=" text-black font-thin border border-black hover:text-blue-600 hover:border-blue-600 p-2 m-2 rounded-lg font-sans "
          onClick={randomizeValue}
        >
          Randomize
        </button>
        <button
          className=" text-black font-thin border border-black hover:text-blue-600 hover:border-blue-600 p-2 m-2 rounded-lg font-sans "
          onClick={captureMapImage}
        >
          Export Image as PNG
        </button>
      </div>
      <table
        className="table border border-stone-800  font-normal overflow-scroll "
        style={{ height: "10px" }}
      >
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
                      if (Number(e.target.value)) {
                        setEntityValue(
                          content,
                          d.properties.name,
                          Number(e.target.value) * 1
                        );
                      } else {
                        setType("class");
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
    </div>
  );
};

export default StateValueTable;
