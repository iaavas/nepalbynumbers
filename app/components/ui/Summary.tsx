"use client";
import { EntityValue, useValues } from "@/app/context/ValueContext";
import React, { useEffect, useMemo, useState } from "react";

type CalculateStatisticsProps = {
  entityType: string;
  entityValues: EntityValue[] | undefined;
  type: string;
};

type Statistics = {
  mean: number;
  median: number;
  lowest: number;
  highest: number;
};

const CalculateStatistics = ({
  entityValues,
  type,
}: CalculateStatisticsProps): Statistics => {
  if (!entityValues)
    return {
      mean: 0,
      median: 0,
      lowest: 0,
      highest: 0,
    };
  const valuesArray = entityValues!.map((e) => Number(e.value));
  console.log(valuesArray);

  if (type === "reg") {
    const sortedValues = [...valuesArray].sort((a, b) => a - b);
    const sum = valuesArray.reduce((acc, val) => acc + val, 0);
    const mean = sum / valuesArray.length;
    const median =
      valuesArray.length % 2 === 0
        ? (sortedValues[valuesArray.length / 2 - 1] +
            sortedValues[valuesArray.length / 2]) /
          2
        : sortedValues[Math.floor(valuesArray.length / 2)];
    const lowest = Math.min(...valuesArray);
    const highest = Math.max(...valuesArray);

    console.log(sortedValues, sum, mean);

    return {
      mean,
      median,
      lowest,
      highest,
    };
  }
  return {
    mean: 0,
    median: 0,
    lowest: 0,
    highest: 0,
  };
};

// Summary component
const Summary = ({ entityType }: { entityType: string }) => {
  const { getAllEntityValues, type } = useValues();
  const [stats, setStats] = useState<Statistics>({
    mean: 0,
    median: 0,
    lowest: 0,
    highest: 0,
  });

  useEffect(() => {
    const entityValues = getAllEntityValues(entityType);
    console.log(entityValues);
    const v = CalculateStatistics({ entityType, entityValues, type });
    if (!v) return;

    setStats(v);
  }, [entityType, getAllEntityValues, type]);

  if (!stats) {
    return <div>No data available</div>;
  }

  return (
    <div className="grid grid-cols-3 ">
      <p>
        Mean:<strong> {stats.mean.toFixed(2)}</strong>
      </p>
      <p>
        Median:<strong> {stats.median}</strong>
      </p>
      <p>
        Lowest:<strong> {stats.lowest}</strong>
      </p>
      <p>
        Highest:<strong> {stats.highest}</strong>
      </p>
    </div>
  );
};

export default Summary;
