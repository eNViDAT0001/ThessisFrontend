import React, { useState } from "react";

import Lock from "../../../asset/Lock.png";
import Popup from "reactjs-popup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { FormResetPassword } from "./FormResetPassword";
import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { updateEmailUser, updatePhoneUser } from "../../../app/hook/UserHook";

const PhoneAndEmail = (props) => {
  const [isUpdatePhone, setIsUpdatePhone] = useState(false);
  const [isUpdateEmail, setIsUpdateEmail] = useState(false);
  const UserDetail = JSON.parse(localStorage.getItem("UserInWeb"));
  const [phoneInformation, setPhoneInformation] = useState(UserDetail.phone);
  const [email, setEmail] = useState(UserDetail.email);

  const handleChangePhone = (e) => {
    setPhoneInformation(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleButtonUpdatePhone = (e) => {
    if (!isUpdatePhone) {
      setIsUpdatePhone(true);
    } else {
      const body = {
        Phone: phoneInformation,
      };
      updatePhoneUser(props.id,body,phoneInformation)
    }
  };

  const handleButtonUpdateEmail = (e) => {
    if (!isUpdateEmail) {
      setIsUpdateEmail(true);
    } else {
      const body = {
        email: email,
      };
      updateEmailUser(props.id,body,email)
    }
  };
  return (
    <div className="w-[30%]">
      <ToastContainer position="top-right" newestOnTop />

      <div className="ml-2 w-full bg-[#F8F8FD] h-full border-l py-10 px-7">
        <h1 className="text-xl text-[#1D1378]">Phone number and email</h1>
        <div>
          <div className="flex flex-row justify-between mt-3">
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Phone</InputLabel>
              <Input
                id="input-with-icon-adornment"
                disabled={!isUpdatePhone}
                onChange={handleChangePhone}
                defaultValue={phoneInformation}
                startAdornment={
                  <InputAdornment position="start">
                    <LocalPhoneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>

            <button
              className="w-[76px] h-[34px] border-[#151875] text-[#1D3178] border rounded-xl mt-2"
              onClick={handleButtonUpdatePhone}
            >
              Update
            </button>
          </div>

          <div className="flex flex-row justify-between mt-3">
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
              <Input
                id="input-with-icon-adornment"
                disabled={!isUpdateEmail}
                onChange={handleChangeEmail}
                defaultValue={email}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>

            <button
              className="w-[76px] h-[34px] border-[#151875] text-[#1D3178] border rounded-xl mt-2"
              onClick={handleButtonUpdateEmail}
            >
              Update
            </button>
          </div>
        </div>
        <h1 className="mt-6 text-xl text-[#1D1378]">Password</h1>
        <div>
          <div className="mt-4 flex flex-row justify-between">
            <img src={Lock} className="w-[32px] h-[32px] " alt="password"></img>
            <div className="flex flex-col ml-2">
              <h1>Password</h1>
              <h1>*********</h1>
            </div>
            <Popup
              trigger={
                <button className="w-[76px] h-[34px] border-[#151875] text-[#1D3178] border rounded-xl mt-2">
                  Update
                </button>
              }
              position="left bottom"
              nested
            >
              <FormResetPassword id={props.id} />
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneAndEmail;