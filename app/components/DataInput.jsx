import { useState, useEffect } from "react";
import Papa from "papaparse";
import nepalProvinceData from "@/assets/data/nepal-provinces.json";
import StateValueTable from "./StateValueTable";
// eslint-disable-next-line react/prop-types
function DataInput({ onDataChange }) {
  const [hdiValue, setHdiValue] = useState("");
  const [excelFile, setExcelFile] = useState(null);

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    setProvinces(nepalProvinceData.features);
  }, []);

  const handleHdiValueChange = (e) => {
    setHdiValue(e.target.value);
  };

  const handleExcelFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    // const data = {
    //   provinceNumber: parseInt(provinceNumber),
    //   hdiValue: parseFloat(hdiValue),
    // };
    // onDataChange(data);
  };

  const handleExcelImport = () => {
    if (excelFile) {
      Papa.parse(excelFile, {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data[0];
          onDataChange(data);
        },
      });
    }
  };

  return (
    <div className="data-input">
      <form onSubmit={handleSubmit}>
        <StateValueTable data={provinces} />
      </form>
      {/* <div>
        <h4>Import from Excel</h4>
        <input type="file" onChange={handleExcelFileChange} />
        <button onClick={handleExcelImport}>Import</button>
      </div> */}
    </div>
  );
}

export default DataInput;
