import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useListBrandInFilterCategory } from "../../../app/hook/CategoryHook";

export const FilterBrand = () => {
  const listBrand = useListBrandInFilterCategory();
  return (
    <FormControl size="small">
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        
      >
        {listBrand.map((data) => (
          <FormControlLabel
            key={data.id}
            id={data.id}
            value={data.name}
            control={<Radio />}
            label={data.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
