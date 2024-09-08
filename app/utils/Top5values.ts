import { EntityValue } from "@/app/context/ValueContext";

const getTop5Values = (values: EntityValue[]): string[] => {
  return Object.entries(
    values!.reduce((acc: any, val: any) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a: [string, any], b: [string, any]) => b[1] - a[1])
    .slice(0, 5)
    .map((x) => x[0]);
};

export default getTop5Values;
