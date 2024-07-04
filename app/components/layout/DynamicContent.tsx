"use client";
import React, { Suspense } from "react";

import PageLayout from "@/app/components/layout/pageLayout";
import { centers } from "@/app/constants/Centers";

import useProjects from "@/app/hooks/useProjects";
import { useReference } from "@/app/context/ReferenceContext";

function DynamicContent({ id }: { id: string }) {
  const { setCreatedBy, setSource, setStatsTitle, setStatsValue } =
    useReference();
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === id);
  console.log(projects);
  if (!project) return;
  const { map, statsTitle, statsValue, source, createdBy } = project;

  setCreatedBy(createdBy);
  setStatsValue(statsValue);
  setSource(source);
  setStatsTitle(statsTitle);

  let center = (centers as { [key: string]: { center: number[] } })[
    map! as string
  ].center;

  return (
    <PageLayout mapType={map as string} center={center as [number, number]} />
  );
}

export default DynamicContent;
