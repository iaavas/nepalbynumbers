"use client";

import PageLayout from "@/app/components/layout/pageLayout";
import { centers } from "@/app/constants/Centers";

import useProjects from "@/app/hooks/useProjects";
import { useReference } from "@/app/context/ReferenceContext";
import { useValues } from "@/app/context/ValueContext";
import { useColor } from "@/app/context/ColorsContext";
import { useEffect } from "react";
import { usePostfix } from "@/app/context/PostfixContext";

function DynamicContent({ id }: { id: string }) {
  const { setCreatedBy, setSource, setStatsTitle, setStatsValue } =
    useReference();
  const { setAllEntityValues, setTitle, setType } = useValues();
  const { projects } = useProjects();
  const { setPostfix, setPrefix } = usePostfix();
  const project = projects.find((p) => p.id === id);

  const { setTheme } = useColor();
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
        type,
        postfix,
        prefix,
      } = project;

      setCreatedBy(createdBy);
      setStatsValue(statsValue);
      setSource(source);
      setStatsTitle(statsTitle);
      setType(type as "reg" | "class");
      setTitle(title);
      setPostfix(postfix);
      setPrefix(prefix);

      setAllEntityValues(map, data);
      setTheme(theme);
    }
  }, [
    project,
    setCreatedBy,
    setStatsValue,
    setTitle,
    setTheme,
    setSource,
    setStatsTitle,
    setAllEntityValues,
    setType,
    setPostfix,
    setPrefix,
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
