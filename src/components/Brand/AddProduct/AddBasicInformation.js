import React, { useCallback, useLayoutEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from "react-redux";
import { setCategoryID, setDiscount, setName, setPrice } from "../../../app/slice/AddProductSlice";
const categoryArray = [
    {
        "id": 1,
        "label": "Men's Fashion"
    },
    {
        "id": 15,
        "label": "Hat in Men's Fashion"
    },
    {
        "id": 16,
        "label": "Jean in Men's Fashion"
    },
    {
        "id": 2,
        "label": "WoMen's Fashion"
    },
    {
        "id": 17,
        "label": "T-Shirt in WoMen's Fashion"
    },
    {
        "id": 18,
        "label": "Hat in WoMen's Fashion"
    },
    {
        "id": 19,
        "label": "Jean in WoMen's Fashion"
    },
    {
        "id": 3,
        "label": "Accessories"
    },
    
]
export const AddBasicInformation = () => {
    const dispatch=useDispatch()
    
    const handleInputName = (e)=>{
        dispatch(setName(e.target.value))
    }
    const handleInputPrice =(e)=>{
        dispatch(setPrice(parseInt(e.target.value)))
    }
    const handleInputDiscount = (e)=>{
        dispatch(setDiscount(parseInt(e.target.value)))
    }
    const handleSelectCategory = (e,value) =>{
        dispatch(setCategoryID(value.id))
    }
  return (
    <div className="p-10 border rounded-2xl space-y-6">
      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Name Product:</h1>
        <TextField
          required
          sx={{width: 0.75}}
          size="small"
          onChange={handleInputName}
          id="outlined-required"
          label="Name"
        />
      </div>
      <div className="flex flex-row space-x-8 items-center">
        <h1 className="font-semibold">Select your Category:</h1>
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      size="small"
      onChange={handleSelectCategory}
      options={categoryArray}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select product's Categoy" />}
    />
      </div>
      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Price:</h1>
        <TextField
          required
          sx={{width: 0.75}}
          size="small"
          id="outlined-required"
          onChange={handleInputPrice}
          label="Price"
        />
      </div>
      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Discount:</h1>
        <TextField
          sx={{width: 0.75}}
          size="small"
          id="outlined-required"
          defaultValue="0"
          onChange={handleInputDiscount}
          label="Discount"
        />
      </div>
    </div>
  );
};
