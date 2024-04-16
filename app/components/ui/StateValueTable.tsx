"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { LinkOutlined } from "@ant-design/icons";
import { useValues } from "../../context/ValueContext";
import { useData } from "@/app/hooks/useData";
import * as XLSX from "xlsx";

const StateValueTable = ({ content }: { content: string }) => {
  const { setEntityValue, getEntityValue, setType } = useValues();
  const { data, fetchData } = useData(content);
  const { title, setTitle } = useValues();
  const [excelData, setExcelData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function randomizeValue() {
    data.forEach((d: any, idx: number) => {
      setEntityValue(
        content,
        d.properties.name,
        Math.floor(Math.random() * 100)
      );
    });
  }

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(excelData);
    };

    reader.readAsBinaryString(file);
  };

  const importFromExcel = () => {
    // Assuming excelData follows the structure: [ [state1, value1], [state2, value2], ... ]
    excelData.forEach((row: any) => {
      let state = row[0];
      const value = row[1];
      if (content == "district") {
        state = state.toUpperCase();
      }

      setEntityValue(content, state, value);
    });
  };

  return (
    <div className="flex  flex-col w-96 py-4 ">
      <TextField
        id="outlined-basic"
        label="Infographic Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex   my-4 flex-col ">
        <div className="flex items-center  gap-8 mb-4">
          <div className="mt-4">
            <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 font-sans"
                  >
                    <span className="text-center">Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Excel files only (.xlsx, .xls)
                </p>
              </div>
            </div>
          </div>
          <button
            className="   bg-[#1677FF] text-white p-2 rounded-md font-sans flex gap-2 items-center text-md"
            onClick={importFromExcel}
          >
            <LinkOutlined />
            Import
          </button>
        </div>
        <button
          className=" text-gray-700  border border-gray-400 hover:text-blue-600 hover:border-blue-600 p-1.5 m-2 rounded-md font-sans "
          onClick={randomizeValue}
        >
          Randomize
        </button>
      </div>
      <div
        style={{
          overflow: "auto",
          height: "24rem",
          display: "inline-flex",
        }}
        className=""
      >
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
                        if (Number(e.target.value)) {
                          setEntityValue(
                            content,
                            d.properties.name,
                            Number(e.target.value) * 1
                          );
                        } else {
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
      </div>
    </div>
  );
};

export default StateValueTable;
