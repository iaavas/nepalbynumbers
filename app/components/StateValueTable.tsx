import React, { useState } from "react";
import { useValues } from "../context/ValueContext";
import * as htmlToImage from "html-to-image";

interface StateValues {
  [key: string]: number;
}

const StateValueTable = ({ data }: { data: any }) => {
  const { setEntityValue, getEntityValue } = useValues();

  function randomizeValue() {
    data.forEach((d: any, idx: number) => {
      setEntityValue(
        "province",
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
    <div className="flex  flex-col w-96 ">
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
      <table className="table border border-stone-800 w-96">
        <thead>
          <tr>
            <th className="bg-[#F5F5F5]  px-4 py-2 border ">State</th>
            <th className="bg-[#F5F5F5]  px-4 py-2 border ">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d: any, idx: number) => {
            return (
              <tr key={idx} className="border ">
                <td className="bg-[#F5F5F5] px-4 py-2 border ">
                  {d.properties.name}
                </td>
                <td className="bg-white px-4 py-2">
                  <input
                    type="number"
                    step={"any"}
                    value={getEntityValue("province", d.properties.name) || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEntityValue(
                        "province",
                        d.properties.name,
                        Number(e.target.value)
                      )
                    }
                    className="w-16 text-right"
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
