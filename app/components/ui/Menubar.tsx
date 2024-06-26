"use client";
import React, { useState } from "react";
import {
  DatabaseOutlined,
  HighlightOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import StateValueTable from "./StateValueTable";
import Theme from "./Theme";
import Export from "./Export";

function Menubar({ content }: { content: string }) {
  const [selectedTab, setSelectedTab] = useState<string>("1");

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
  };

  return (
    <div className="">
      <Tabs
        defaultActiveKey="1"
        activeKey={selectedTab}
        onChange={handleTabChange}
      >
        <Tabs.TabPane
          tab={
            <span className="flex">
              <DatabaseOutlined />
              <p>Data</p>
            </span>
          }
          key="1"
        >
          {selectedTab === "1" && <StateValueTable content={content} />}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="flex">
              <HighlightOutlined />
              <p>Theme</p>
            </span>
          }
          key="2"
        >
          {selectedTab === "2" && <Theme />}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="flex">
              <ExportOutlined />
              <p>Export</p>
            </span>
          }
          key="3"
        >
          {selectedTab === "3" && <Export />}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Menubar;
