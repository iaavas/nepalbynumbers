import { useState } from "react";
import nepalProvinceData from "@/assets/data/nepal-provinces.json";
import nepalDistrictData from "@/assets/data/nepal-districts.json";

const dataSources: { [key: string]: any } = {
  province: nepalProvinceData,
  district: nepalDistrictData,
};

export const useData = (dataType: string) => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = () => {
    const newData = dataSources[dataType].features || [];
    setData(newData);
  };

  return { data, fetchData };
};
