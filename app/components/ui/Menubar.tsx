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
import Sidebar from "./Sidebar";

function Menubar({ content }: { content: string }) {
  const [selectedTab, setSelectedTab] = useState<string>("1");

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 border-l">
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
            {selectedTab === "3" && <Export map={content} />}
          </Tabs.TabPane>
          {/* <Tabs.TabPane
            tab={
              <div className="w-12 h-12">
                <Sidebar />
              </div>
            }
            key="4"
          /> */}
        </Tabs>
      </div>
    </>
  );
}

export default Menubar;
