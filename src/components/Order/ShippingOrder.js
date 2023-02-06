import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  AddSaveAddress,
  fetchAllProvince,
  fetchDistrictFromProvince,
  fetchWardFromDistrict,
  GetListAddress,
  resetAddressSelected,
  resetForm,
  setDistrictInFormCreate,
  setFormAddressSelected,
  setNameInFormCreate,
  setPhoneInFormCreate,
  setProvinceInFormCreate,
  setStreetInFormCreate,
  setWardInFormCreate,
} from "../../store/slices/AddressSlice";
import { SaveAddressForm } from "../../models/SaveAddressForm/SaveAddressForm";
import { checkObjectEmpty } from "../../stogare_function/listActions";

const ShippingOrder = () => {
  const dispatch = useDispatch();

  const DataAddressSave = useSelector((state) => state.address.UserAddress);
  const DataProvince = useSelector((state) => state.address.Province);
  const DataDistrict = useSelector((state) => state.address.District);
  const DataWard = useSelector((state) => state.address.Ward);
  const formAddressSelected = useSelector((state)=>state.address.FormAddressSelected)
  const nameInForm = useSelector((state) => state.address.NameInFormCreate);
  const phoneInForm = useSelector((state) => state.address.PhoneInFormCreate);
  const streetInForm = useSelector((state) => state.address.StreetInFormCreate);
  const provinceInForm = useSelector(
    (state) => state.address.ProvinceInFormCreate
  );
  const districtInForm = useSelector(
    (state) => state.address.DistrictInFormCreate
  );

  const wardInForm = useSelector((state) => state.address.WardInFormCreate);
  
  const UserDetail = JSON.parse(localStorage.getItem("UserInWeb"));

  const ID = localStorage.getItem("UserID");

  const [ProvinceID, setProvinceID] = useState("");
  const [DistrictID, setDistrictID] = useState("");
  const [WardID, setWardID] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const ChangeUIWhenClickButton = () => {
    if(isClicked){
      dispatch(resetAddressSelected())
    }else 
    {
      dispatch(resetForm())
    }
    setIsClicked(!isClicked);
  };
  const handlePhone = (e) => {
    dispatch(setPhoneInFormCreate(e.target.value));
  };
  const handleName = (e) => {
    dispatch(setNameInFormCreate(e.target.value))
  };
  const ChangeStreetTextBox = (e) => {
    dispatch(setStreetInFormCreate(e.target.value))
  };
  const onChangeProvince = (e, value) => {
    dispatch(setProvinceInFormCreate(value.label))
    setProvinceID(value.id);
  };

  const onChangeDistrict = (e, value) => {
    dispatch(setDistrictInFormCreate(value.label))
    setDistrictID(value.id);
  };
  const onChangeWard = (e, value) => {
    dispatch(setWardInFormCreate(value.label))
    setWardID(value.id);
  };

  useEffect(() => {
    dispatch(fetchAllProvince());
    dispatch(GetListAddress(ID));
    dispatch(fetchDistrictFromProvince(ProvinceID));
    dispatch(fetchWardFromDistrict(DistrictID));
  }, [dispatch, ID,ProvinceID,DistrictID]);



 

  const newAddressSave = DataAddressSave
    ? DataAddressSave.map((data) => ({
        ...data,
        label:
          data.Street +
          "," +
          data.Ward +
          "," +
          data.District +
          "," +
          data.Province,
      }))
    : [];
  const newDataProvince = DataProvince.map(
    ({ Name: label, Code: id, ...rest }) => ({ label, id, ...rest })
  );

  const newDataDistrict = DataDistrict.map(
    ({ Name: label, Code: id, ...rest }) => ({ label, id, ...rest })
  );
  const newDataWard = DataWard.map(({ Name: label, Code: id, ...rest }) => ({
    label,
    id,
    ...rest,
  }));
  const selectTheAddress = (e,value)=>{
    dispatch(setFormAddressSelected(value))
  }

  return (
    <div className="w-full space-y-8 bg-[#F7FAFC] p-8">
      <h1 className=" text-xl font-sans font-semibold"> Shipping Detail</h1>
      <div className="flex flex-row justify-between items-center mt">
        <FormControlLabel
          className="text-[#2D3748]"
          control={<Checkbox size="small" color="default" />}
          isOptionEqualToValue={(option, value) => option===  value}
          label="Choose address save"
          onChange={ChangeUIWhenClickButton}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disabled={!isClicked}
          options={newAddressSave}
          onChange={selectTheAddress}
          isOptionEqualToValue={(option, value) => option === value}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Address" />}
        />
      </div>
      <div className="flex flex-row ">
        <div className="flex flex-col space-y-3">
          <h1 className=" text-[#ABB1B9]">Full Name</h1>
          <TextField
            id="outlined-basic"
            InputProps={{
              readOnly: isClicked,
            }}
            label="Name"
            sx={{ width: 300 }}
            value={(checkObjectEmpty(formAddressSelected) ? nameInForm : formAddressSelected.Name)}
            variant="outlined"
            disabled={isClicked}

            onChange={handleName}
            className="h-max-[5px] "
          />
        </div>
        <div className="flex flex-col  ml-10  space-y-3">
          <h1 className=" text-[#ABB1B9]">Phone</h1>
          <TextField
            id="outlined-basic"
            label="Phone"
            value={(checkObjectEmpty(formAddressSelected) ? phoneInForm : formAddressSelected.Phone)}
            InputProps={{
              readOnly: isClicked,
            }}
            disabled={isClicked}

            sx={{ width: 175 }}
            onChange={handlePhone}
            variant="outlined"
            className="h-max-[5px] "
          />
        </div>
      </div>

      <div className="space-y-8">
        <h1 className="text-[#ABB1B9]">Select Address: </h1>
        <div className="flex flex-row space-x-6">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={(checkObjectEmpty(formAddressSelected) ? provinceInForm : formAddressSelected.Province)}
            options={newDataProvince}
            disabled={isClicked}
            sx={{ width: 300 }}
            onChange={onChangeProvince}
            renderInput={(params) => <TextField {...params} label="Province" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={newDataDistrict}
            value={(checkObjectEmpty(formAddressSelected) ? districtInForm : formAddressSelected.District)}
            disabled={isClicked}
            onChange={onChangeDistrict}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="District" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={(checkObjectEmpty(formAddressSelected) ? wardInForm : formAddressSelected.Ward)}
            options={newDataWard}
            disabled={isClicked}
            onChange={onChangeWard}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Ward" />}
          />
        </div>
        <h1 className=" text-[#ABB1B9]">Street Name: </h1>
        <TextField
          id="outlined-basic"
          label="Street"
          variant="outlined"
          disabled={isClicked}
          value={(checkObjectEmpty(formAddressSelected) ? streetInForm : formAddressSelected.Street)}
          onChange={ChangeStreetTextBox}
          className="h-max-[5px] w-full"
        />
      </div>
    </div>
  );
};

export default ShippingOrder;
