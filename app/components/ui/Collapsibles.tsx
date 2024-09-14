import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import Summary from "./Summary";

const text = `
  Available soon.
`;

const Collapsibles = ({ map }: { map: string }) => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Summary",
      children: <Summary entityType={map} />,
    },
    {
      key: "2",
      label: "Settings",
      children: <p>{text}</p>,
    },
  ];

  const onChange = (key: string | string[]) => {};

  return <Collapse items={items} onChange={onChange} />;
};

export default Collapsibles;
