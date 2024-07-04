import React, { Suspense } from "react";

import Loader from "../../components/ui/Loader";

import DynamicContent from "@/app/components/layout/DynamicContent";

type ProjectParams = {
  prjId: string;
};

function ProjectPage({ params }: { params: ProjectParams }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicContent id={params.prjId as string} />
    </Suspense>
  );
}

export default ProjectPage;
