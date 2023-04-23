import React from "react";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";

import { TabPanel } from "@mui/lab";
import { TabContext } from "@mui/lab";
import { OrderTable } from "./OrderTable";

export const OrderTab = (props) => {
  const [value, setValue] = React.useState("ALL");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className="p-10 w-full space-y-5">
      <h1 className="ml-4 text-xl text-[#1D3178] font-semibold">Orders</h1>

      <TabContext value={value}>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor=" inherit"
            aria-label="wrapped label tabs example"
          >
            <Tab value="ALL" label="All order" />
            <Tab value="WAITING" label="Waiting" />
            <Tab value="CONFIRMED" label="Confirmed" />
            <Tab value="DELIVERING" label="DELIVERING" />
            <Tab value="DELIVERED" label="DELIVERED" />
            <Tab value="CANCEL" label="Cancel" />
          </Tabs>
        </Box>
        <TabPanel value="ALL" index={0}>
          <OrderTable status={null} />
        </TabPanel>
        <TabPanel value="WAITING" index={1}>
          <OrderTable status="WAITING" />
        </TabPanel>
        <TabPanel value="CONFIRMED" index={2}>
          <OrderTable status="CONFIRMED" />
        </TabPanel>
        <TabPanel value="DELIVERING" index={3}>
          <OrderTable status="DELIVERING" />
        </TabPanel>
        <TabPanel value="DELIVERED" index={4}>
          <OrderTable status="DELIVERED" />
        </TabPanel>
        <TabPanel value="CANCEL" index={5}>
          <OrderTable status="CANCEL" />
        </TabPanel>
      </TabContext>
    </div>
  );
};

