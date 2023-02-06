import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { FetchDescriptionFromOneProduct } from "../../../../../store/slices/ProductSlice";
import { checkObjectEmpty } from "../../../../../stogare_function/listActions";
import { Description } from "./Description";

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
export const TabDescription = (props) => {
  const dispatch = useDispatch();

  const getDescription = useSelector((state) => state.product.Description);
  const productDetail = useSelector((state) => state.product.ProductDetail);

  const [value, setValue] = useState();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [listDescription, setListDescription] = useState([]);

  const loadDescription = useCallback(async () => {
    await dispatch(FetchDescriptionFromOneProduct(props.id));
  });
  useEffect(() => {
    if (productDetail.status == 200) {
      if (getDescription.status != 200 && getDescription.status != 204) {
        loadDescription();
      }
      if (getDescription.status == 200) {
        setListDescription(getDescription.data.data);
        if (isFirstRender) {
          setValue(getDescription.data.data[0].Name);
          setIsFirstRender(false);
        }
      }
    }
  }, [
    productDetail,
    getDescription,
    dispatch,
    props.id,
    listDescription,
    isFirstRender,
    loadDescription,
  ]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      {listDescription.length === 0 ? (
        <div></div>
      ) : (
        <div className="px-[170px] bg-[#F5F8FE] py-[50px] my-6 ">
          <div className="border p-10 bg-white">
            <TabContext value={value}>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ bgcolor: "#FFFFFF" }}>
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                  >
                    {listDescription.map((data) => (
                      <StyledTab label={data.Name} value={data.Name} />
                    ))}
                  </StyledTabs>
                  <Box sx={{ p: 3 }} />
                </Box>
              </Box>
              {listDescription.map((data) => (
                <TabPanel value={data.Name}>
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
