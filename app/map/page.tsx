"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageLayout from "@/app/components/layout/pageLayout";
import { centers } from "@/app/constants/Centers";
import Loader from "../components/ui/Loader";

function page() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicContent />
    </Suspense>
  );
}

export function DynamicContent() {
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

export default page;
