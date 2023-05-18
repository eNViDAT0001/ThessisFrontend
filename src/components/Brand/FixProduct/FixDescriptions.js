import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDescriptionOld,
  useDescriptionsFix,
} from "../../../app/hook/ProductHook";
import { useDispatch } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import { cloneDeep } from "lodash";
import { setDescriptionsFix } from "../../../app/slices/FixProductSlice";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Description } from "../../ProductDetail/Description/Description";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

const DescriptionToFix = React.memo(
  ({ data, onChangeName, onChangeMarkdown }) => {
    const handleChangeName = useCallback(
      (e) => {
        onChangeName(data.id, e.target.value);
      },
      [data.id, onChangeName]
    );

    const handleChangeMarkdown = useCallback(
      (value) => {
        onChangeMarkdown(data.id, value);
      },
      [data.id, onChangeMarkdown]
    );

    return (
      <div className="my-6 space-y-6">
        <h1 className="font-semibold">Description {data.id + 1} :</h1>
        <div className="p-10 space-y-6 border shadow-md">
          <div className="flex flex-row space-x-4 items-center">
            <h1 className="font-semibold"> Name :</h1>
            <TextField
              required
              size="small"
              onChange={handleChangeName}
              value={data.description_name}
              label="Name Description"
            />
          </div>
          <div className="space-y-4">
            <h1 className="font-semibold"> Description :</h1>
            <MDEditor
              value={data.description_md}
              onChange={handleChangeMarkdown}
            />
          </div>
        </div>
      </div>
    );
  }
);

export const FixDescriptions = () => {
  const dispatch = useDispatch();
  const descriptions = useDescriptionsFix();
  const listDescriptionOld = useDescriptionOld() || [];

  const addDescription = useCallback(() => {
    const newOption = {
      id: descriptions[descriptions.length - 1].id + 1,
      description_name: "",
      description_md: "",
    };
    dispatch(setDescriptionsFix([...descriptions, newOption]));
  }, [descriptions, dispatch]);

  const removeDescription = useCallback(() => {
    if (descriptions.length > 1) {
      const temp = descriptions.slice(0, -1);
      dispatch(setDescriptionsFix([...temp]));
    }
  }, [descriptions, dispatch]);

  const handleChangeDescriptionName = useCallback(
    (id, value) => {
      const temp = cloneDeep(descriptions);
      temp[id].description_name = value;
      dispatch(setDescriptionsFix(temp));
    },
    [descriptions, dispatch]
  );

  const handleChangeDescriptionMarkdown = useCallback(
    (id, value) => {
      const temp = cloneDeep(descriptions);
      temp[id].description_md = value;
      dispatch(setDescriptionsFix(temp));
    },
    [descriptions, dispatch]
  );
  const [title, setTitle] = useState();

  const handleChange = (e, newValue) => {
    setTitle(newValue);
  };
  return (
    <div className="space-y-6">
      <div className="p-10 border rounded-2xl space-y-6">
        <div className="space-x-5">
          <h1 className="font-semibold my-5">Custom your descriptions :</h1>
          <Button variant="contained" onClick={addDescription}>
            + Add
          </Button>
          <Button
            onClick={removeDescription}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <div className="space-y-8">
            {descriptions.map((data) => (
              <DescriptionToFix
                key={data.id}
                data={data}
                onChangeName={handleChangeDescriptionName}
                onChangeMarkdown={handleChangeDescriptionMarkdown}
              />
            ))}
          </div>
        </div>
      </div>
      <div className=" space-x-5 border rounded-lg">
        <h1 className="font-semibold my-5">Description in product :</h1>

        <div>
          {listDescriptionOld.length !== 0 && (
            <div className="p-10 border rounded-2xl space-y-6">
              <TabContext value={title || listDescriptionOld[0].name}>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ bgcolor: "#FFFFFF" }}>
                    <StyledTabs
                      value={title || listDescriptionOld[0].name}
                      onChange={handleChange}
                      aria-label="styled tabs example"
                    >
                      {listDescriptionOld.map((data) => (
                        <StyledTab
                          key={data.id}
                          label={data.name}
                          value={data.name}
                        />
                      ))}
                    </StyledTabs>
                    <Box sx={{ p: 3 }} />
                  </Box>
                </Box>
                {listDescriptionOld.map((data) => (
                  <TabPanel key={data.id} value={data.name}>
                    <Description description={data} />
                  </TabPanel>
                ))}
              </TabContext>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
