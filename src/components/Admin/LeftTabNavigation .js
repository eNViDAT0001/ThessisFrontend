import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "react-tabs/style/react-tabs.css";

export const LeftTabNavigation = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabClick = (index) => {
    setTabIndex(index);
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-64 bg-white border-r">
        <div className="flex items-center justify-center h-14 border-b">
          <span className="text-lg font-bold">Tabs</span>
        </div>
        <div className="flex-grow">
          <Tabs selectedIndex={tabIndex} onSelect={handleTabClick}>
            <TabList className="p-4">
              <Tab
                className={`${
                  tabIndex === 0
                    ? "border-l-4 border-blue-500"
                    : "border-l-4 border-white"
                } text-gray-600 hover:text-gray-700 hover:bg-gray-100 p-2 cursor-pointer`}
              >
                Tab 1
              </Tab>
              <Tab
                className={`${
                  tabIndex === 1
                    ? "border-l-4 border-blue-500"
                    : "border-l-4 border-white"
                } text-gray-600 hover:text-gray-700 hover:bg-gray-100 p-2 cursor-pointer`}
              >
                Tab 2
              </Tab>
              <Tab
                className={`${
                  tabIndex === 2
                    ? "border-l-4 border-blue-500"
                    : "border-l-4 border-white"
                } text-gray-600 hover:text-gray-700 hover:bg-gray-100 p-2 cursor-pointer`}
              >
                Tab 3
              </Tab>
            </TabList>
            <div className="p-4">
              <TabPanel>
                <p>Content for Tab 1 goes here.</p>
              </TabPanel>
              <TabPanel>
                <p>Content for Tab 2 goes here.</p>
              </TabPanel>
              <TabPanel>
                <p>Content for Tab 3 goes here.</p>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
      <div className="flex-grow bg-gray-100"></div>
    </div>
  );
};