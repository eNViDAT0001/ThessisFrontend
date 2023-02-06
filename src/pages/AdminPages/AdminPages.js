import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabContext, TabPanel } from "@mui/lab";
import { UserList } from "../../components/Admin/UserList/UserList";
import { AdminOrder } from "../../components/Admin/Order/GeneralOrder/AdminOrder";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "start",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    textAlign: "left",
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#DDE2FF",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export const AdminPages = () => {
  const [value, setValue] = React.useState("user");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return localStorage.getItem("Role") !== "ADMIN" ? (
    <div>
      <h1>Bạn không có quyền truy cập Admin</h1>
    </div>
  ) : (
    <div className="flex justify-start">
      <TabContext value={value}>
        <Box sx={{ width: 0.1, bgcolor: "#363740" }}>
          <StyledTabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="User" value="user" />
          </StyledTabs>
          <Box sx={{ p: 3 }} />
        </Box>
        <div className="w-full">
          <TabPanel value="user">
            <UserList />
          </TabPanel>

        </div>
      </TabContext>
    </div>
  );
};
