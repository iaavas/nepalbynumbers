import { useValues } from "@/app/context/ValueContext";
import { useData } from "@/app/hooks/useData";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { LinkOutlined } from "@ant-design/icons";
import CSVPasteComponent from "./CSVPasteComponent";
import { Dices } from "lucide-react";

function ImportData({ content }: { content: string }) {
  const { setEntityValue, setType, type } = useValues();
  const { data, fetchData } = useData(content);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

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
    setFileName(file.name);

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
    excelData.forEach((row: any, idx) => {
      let state = row[0];
      const value = row[1];
      if (typeof value != "number" && type != "class") {
        setType("class");
      }
      if (content == "district") {
        state = state.toUpperCase();
      }

      setEntityValue(content, state, value);
    });
  };

  return (
    <div className="flex   flex-col ">
      <div className="flex gap-5">
        <CSVPasteComponent content={content} />
        <button
          className=" p-1.5 rounded-lg transition-all text-sm bg-gray-50/10 text-gray-700 flex gap-x-2 items-center border-gray-300 border hover:border-blue-500 hover:text-blue-500 ease-in-out max-w-full shadow-sm my-3"
          onClick={randomizeValue}
        >
          <Dices size={16} />
          Randomize
        </button>
      </div>
      <div className="flex items-center  gap-8 mb-4">
        <div className="mt-4">
          <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 font-sans"
                >
                  <span className="text-center">
                    {!fileName ? "Upload a file" : fileName}
                  </span>
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
    </div>
  );
}

export default ImportData;
