import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Space, Switch, Button } from "antd";
import { useSettings } from "@/app/context/SettingsContext";

const Settings = () => {
  const { setDisplayLabel, setDisplayLegend, revertToRegression } =
    useSettings();

  return (
    <div className=" grid grid-cols-2">
      <div className="flex gap-8 items-center">
        <span className="text-gray-700">Display Label</span>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={(checked) => setDisplayLabel(checked)}
          defaultChecked
          className="bg-blue-500"
        />
      </div>
      <div className="flex gap-8 items-center">
        <span className="text-black-700">Display Legend</span>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={(checked) => setDisplayLegend(checked)}
          defaultChecked
          className="bg-blue-500"
        />
      </div>
      <Button
        onClick={revertToRegression}
        className=" bg-white-500 text-black hover:bg-red-600 mt-4"
      >
        Revert to Regression
      </Button>
    </div>
  );
};

export default Settings;
