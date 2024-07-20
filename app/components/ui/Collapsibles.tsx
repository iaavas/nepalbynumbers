import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import Summary from "./Summary";

const text = `
  Thankyou.
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

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={items} onChange={onChange} />;
};

export default Collapsibles;
