import { useState } from "react";
import province from "@/assets/data/nepal-provinces.json";
import district from "@/assets/data/nepal-districts.json";
import bagmati from "@/assets/data/bagmati.json";
import karnali from "@/assets/data/karnali.json";
import sudurpaschim from "@/assets/data/sudurpaschim.json";
import lumbini from "@/assets/data/lumbini.json";
import koshi from "@/assets/data/koshi.json";
import gandaki from "@/assets/data/gandaki.json";
import madhesh from "@/assets/data/madhesh.json";
import world from "@/assets/data/world.json";

const dataSources: { [key: string]: any } = {
  province,
  district,
  bagmati,
  sudurpaschim,
  lumbini,
  karnali,
  koshi,
  madhesh,
  gandaki,
  world,
};

export const useData = (dataType: string) => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = () => {
    const newData = dataSources[dataType].features || [];
    setData(newData);
  };

  return { data, fetchData };
};
