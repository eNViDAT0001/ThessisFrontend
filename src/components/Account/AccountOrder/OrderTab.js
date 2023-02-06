import React from "react";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { TabPanel } from "@mui/lab";
import { TabContext } from "@mui/lab";
import { OrderTable } from "./OrderTable";
import { useDispatch } from "react-redux";
import { setNameSearch } from "../../../store/slices/OrderSlice";

const OrderTab = (props) => {
  const [value, setValue] = React.useState("ALL");
  const dispatch = useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeText=(e)=>{
    dispatch(setNameSearch(e.target.value))
  }


  return (
    <div className="p-10 w-full space-y-5">
      <h1 className="ml-4 text-xl text-[#1D3178] font-semibold">Orders</h1>
      <div className="bg-[#F5F5FA] ">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton 
          type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            onChange={handleChangeText}

            inputProps={{ "aria-label": "search" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
      </div>

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
          <OrderTable status="ALL" />
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

export default OrderTab;
