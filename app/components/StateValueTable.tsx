import React, { useState } from "react";
import { useValues } from "../context/ValueContext";

interface StateValues {
  [key: string]: number;
}

const StateValueTable = ({ data }: { data: any }) => {
  const initialState: StateValues = {
    California: 100,
    "New York": 150,
    Texas: 120,
    Florida: 110,
    Ohio: 90,
  };

  const { setEntityValue, getEntityValue } = useValues();

  const [stateValues, setStateValues] = useState<StateValues>(initialState);

  const handleChange = (state: string, value: number) => {
    setStateValues((prevState) => ({
      ...prevState,
      [state]: value,
    }));
  };

  return (
    <div className="flex justify-center mt-4 ">
      <table className="table-auto border border-stone-800">
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
