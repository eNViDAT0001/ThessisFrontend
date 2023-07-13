import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../app/hook/LanguageHook";
import { setLanguage } from "../../app/slices/WSSlice";

export default function BarLanguage() {
  const dispatch = useDispatch();
  const language = useLanguage();

  const handleChange = (event) => {
    dispatch(setLanguage(event.target.checked));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={language}
              onChange={handleChange}
              aria-label="login switch"
              color="secondary"
            />
          }
          label={language ? "Tiếng Việt" : "English"}
        />
      </FormGroup>
    </Box>
  );
}
