import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ItemTab } from "./ItemTab";
import { InformationTab } from "./InformationTab";
export const OrderTabPage = () => {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className= "w-[65%]">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Item" value="1" />
                <Tab label="Information" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ItemTab />
            </TabPanel>
            <TabPanel value="2">
              <InformationTab />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    );
}
