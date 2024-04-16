"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import PageLayout from "@/app/components/layout/pageLayout";
import { centers } from "@/app/constants/Centers";

function DynamicContentPage() {
  const params = useSearchParams();
  const map = params.get("m");
  console.log(map);
  let center = (centers as { [key: string]: { center: number[] } })[
    map! as string
  ].center;

  return (
    <PageLayout mapType={map as string} center={center as [number, number]} />
  );
}

export default DynamicContentPage;
