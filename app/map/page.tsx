"use client";
import React, { Suspense } from "react";
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
    <Suspense fallback={<div>I am sorry babu...........</div>}>
      <PageLayout mapType={map as string} center={center as [number, number]} />
    </Suspense>
  );
}

export default DynamicContentPage;
