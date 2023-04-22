import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

export const FilterBrand = () => {
  const listBrand = []

  const handleInputChange = () =>{

  }
  
  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 1,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          onChange={handleInputChange}
          placeholder="Search brand"
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {listBrand.map(data=>(
        <div>
          {data.name}
        </div>
      ))}
    </div>
  );
};
