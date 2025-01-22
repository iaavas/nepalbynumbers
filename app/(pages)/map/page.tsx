"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageLayout from "@/app/components/layout/pageLayout";
import { centers } from "@/app/constants/Centers";
import Loader from "../../components/ui/Loader";

function page() {
  return <DynamicContent />;
}

function DynamicContent() {
  const params = useSearchParams();
  const map = params.get("m");

  const [center, setCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (map) {
      // @ts-ignore
      setCenter(centers[map].center);
    }
  }, [map]);

  if (!center) {
    return <Loader />;
  }

  return (
    <PageLayout mapType={map as string} center={center as [number, number]} />
  );
}

export default page;
