import React from "react";
import Projects from "../../components/project/Projects";
import withAuth from "../../components/withAuth";

function page() {
  return <Projects />;
}

export default withAuth(page);
