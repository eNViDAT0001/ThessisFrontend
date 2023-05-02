import { Button, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataOption, setSpecificationName } from "../../../app/slices/AddProductSlice";
import DeleteIcon from "@mui/icons-material/Delete";

export const FixSpecification = () => {
  const dispatch = useDispatch();
  const options = useSelector(state=>state.addProduct.options)

  const handleInputName = (e) => {
    dispatch(setSpecificationName(e.target.value));
  };
  const addOption = (e) => {
    const newOption={
        id: options[options.length-1].id+1,
        name:"",
        price:"",
        quantity:"",
    }
    const temp = [...options] 
    temp.push(newOption)
    dispatch(setDataOption([...temp]))
  };
  const removeOption = (e) => {
    if(options[options.length-1].id>0){
        const temp = [...options] 
        temp.pop()
        dispatch(setDataOption([...temp]))
    }
  };

  const handleChangeNameOption = async(e) =>{
    const id = e.target.id
    const nameValue = e.target.value
    const temp = JSON.parse(JSON.stringify(options))
    temp[id].name=nameValue
    dispatch(setDataOption([...temp]))
  }

  const handleChangePriceOption = async(e)=>{
    const id = e.target.id
    const priceValue = e.target.value
    const temp = JSON.parse(JSON.stringify(options))
    temp[id].price=parseInt(priceValue)
    dispatch(setDataOption([...temp]))

  }

  const handleChangeQuantityOption = (e)=>{
    const id = e.target.id
    const quantityValue = e.target.value

    const temp = JSON.parse(JSON.stringify(options))
    temp[id].quantity=parseInt(quantityValue)
    dispatch(setDataOption([...temp]))
  }
  
  return (
    <div className="p-10 border rounded-2xl space-y-6">
      <div className="flex flex-row justify-start space-x-4 items-center">
        <h1 className="font-semibold">Name specification:</h1>
        <TextField
          required
          sx={{ width: 0.75 }}
          size="small"
          onChange={handleInputName}
          id="outlined-required"
          label="Name"
        />
      </div>
      <div>
        <div className="space-x-5">
          <h1 className="font-semibold my-5">Option :</h1>

          <Button variant="contained" onClick={addOption}>
            + Add
          </Button>
          <Button
          onClick={removeOption}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="space-y-3">
      {options.map(data=>(
        <div id={data.id} className="flex flex-row items-center p-4 border space-x-6">
            <h1 className="font-semibold">Option {data.id+1} :</h1>
             <TextField
          required
          size="small"
          onChange={handleChangeNameOption}
          id={data.id}
          label="Name Option"
        />
        <TextField
          required
          size="small"
          onChange={handleChangePriceOption}
          id={data.id}
          label="Price"
        />
        <TextField
          required
          size="small"
          onChange={handleChangeQuantityOption}
          id={data.id}
          label="Quantity"
        />
        </div>
      ))}

      </div>
    </div>
  );
};
