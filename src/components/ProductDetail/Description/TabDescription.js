import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { useDescriptionProduct } from "../../../app/hook/ProductHook";
import { Description } from "./Description";
import { useState } from "react";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 100,
    width: "100%",
    backgroundColor: "#151875",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(20),
    marginRight: theme.spacing(1),
    color: "#151875",
    "&.Mui-selected": {
      color: "#151875",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);
export const TabDescription = () => {
  const listDescription = useDescriptionProduct() || [];

  const [title, setTitle] = useState();

  const handleChange = (e, newValue) => {
    setTitle(newValue);
  };
  return (
    <div>
      {listDescription.length === 0 ? (
        <div></div>
      ) : (
        <div className="px-[170px] bg-[#F5F8FE] py-[50px] my-6 ">
          <div className="border p-10 bg-white">
            {/*
            //First, must render listDescription[0].name
            second, render title
            */}
            <TabContext value={title || listDescription[0].name}>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ bgcolor: "#FFFFFF" }}>
                  <StyledTabs
                    value={title || listDescription[0].name}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                  >
                    {listDescription.map((data) => (
                      <StyledTab label={data.name} value={data.name} />
                    ))}
                  </StyledTabs>
                  <Box sx={{ p: 3 }} />
                </Box>
              </Box>
              {listDescription.map((data) => (
                <TabPanel value={data.name}>
                  <Description description={data} />
                </TabPanel>
              ))}
            </TabContext>
          </div>
        </div>
      )}
    </div>
  );
};
