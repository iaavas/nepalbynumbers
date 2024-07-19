"use client";

import PageLayout from "@/app/components/layout/pageLayout";
import { centers } from "@/app/constants/Centers";

import useProjects from "@/app/hooks/useProjects";
import { useReference } from "@/app/context/ReferenceContext";
import { useValues } from "@/app/context/ValueContext";
import { useColor } from "@/app/context/ColorsContext";
import { useEffect } from "react";

function DynamicContent({ id }: { id: string }) {
  const { setCreatedBy, setSource, setStatsTitle, setStatsValue } =
    useReference();
  const { setAllEntityValues, setTitle } = useValues();
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === id);

  const { updateTheme } = useColor();
  useEffect(() => {
    if (project) {
      const {
        map,
        statsTitle,
        statsValue,
        source,
        createdBy,
        title,
        data,
        theme,
      } = project;

      setCreatedBy(createdBy);
      setStatsValue(statsValue);
      setSource(source);
      setStatsTitle(statsTitle);

      setTitle(title);

      setAllEntityValues(map, data);
      updateTheme(theme);
    }
  }, [
    project,
    setCreatedBy,
    setStatsValue,
    setTitle,
    updateTheme,
    setSource,
    setStatsTitle,
    setAllEntityValues,
  ]);
  if (!project) return;
  const { map } = project;

  let center = (centers as { [key: string]: { center: number[] } })[
    map! as string
  ].center;

  return (
    <PageLayout mapType={map as string} center={center as [number, number]} />
  );
}

export default DynamicContent;
