import { useState } from "react";
import nepalProvinceData from "@/assets/data/nepal-provinces.json";
import nepalDistrictData from "@/assets/data/nepal-districts.json";
import bagmati from "@/assets/data/karnali.json";

const dataSources: { [key: string]: any } = {
  province: nepalProvinceData,
  district: nepalDistrictData,
  bagmati,
};

export const useData = (dataType: string) => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = () => {
    const newData = dataSources[dataType].features || [];
    setData(newData);
  };

  return { data, fetchData };
};
