import React, { useState } from "react";

import Lock from "../../../asset/Lock.png";
import Popup from "reactjs-popup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { FormResetPassword } from "./FormResetPassword";
import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import {
  updateEmailUser,
  updatePhoneUser,
  useUserDetail,
} from "../../../app/hook/UserHook";
import { checkEmailFormat, checkTextPhone } from "../../../app/hook/CommonHook";
import { useLanguage } from "../../../app/hook/LanguageHook";

const PhoneAndEmail = (props) => {
  const language = useLanguage();

  const [isUpdatePhone, setIsUpdatePhone] = useState(false);
  const [isUpdateEmail, setIsUpdateEmail] = useState(false);
  const userDetail = useUserDetail();
  const [phoneInformation, setPhoneInformation] = useState(userDetail.phone);
  const [email, setEmail] = useState(userDetail.email);

  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleChangePhone = (e) => {
    const phone = e.target.value;
    setIsValidPhone(checkTextPhone(phone));
    setPhoneInformation(phone);
  };
  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setIsValidEmail(checkEmailFormat(email));
    setEmail(email);
  };
  const handleButtonUpdatePhone = (e) => {
    if (!isUpdatePhone) {
      setIsValidPhone(true);
      setIsUpdatePhone(true);
    } else {
      if (isValidPhone) {
        const body = {
          Phone: phoneInformation,
        };
        updatePhoneUser(props.id, body, phoneInformation);
      }
    }
  };

  const handleButtonUpdateEmail = (e) => {
    if (!isUpdateEmail) {
      setIsValidEmail(true);
      setIsUpdateEmail(true);
    } else {
      if (isValidEmail) {
        const body = {
          email: email,
        };
        updateEmailUser(props.id, body, email);
      }
    }
  };
  return (
    <div className="w-[30%]">
      <ToastContainer position="top-right" newestOnTop />

      <div className="ml-2 w-full bg-[#F8F8FD] h-full border-l py-10 px-7">
        <h1 className="text-xl text-[#1D1378]">
          {language ? "Số điện thoại và email" : "Phone number and email"}
        </h1>
        <div>
          <div className="flex flex-row justify-between mt-3">
            <FormControl
              helperText="Contains only numbers with length 10"
              variant="standard"
            >
              <InputLabel htmlFor="input-with-icon-adornment">
                {language ? "Điện thoại" : "Phone"}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                disabled={!isUpdatePhone}
                error={isUpdatePhone && !isValidPhone}
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
              {language ? "Cập nhật" : "Update"}
            </button>
          </div>

          <div className="flex flex-row justify-between mt-3">
            <FormControl helperText="Follow email format" variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                {language ? "Email" : "Email"}
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                disabled={!isUpdateEmail}
                error={isUpdateEmail && !isValidEmail}
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
              {language ? "Cập nhật" : "Update"}
            </button>
          </div>
        </div>
        <h1 className="mt-6 text-xl text-[#1D1378]">
          {language ? "Mật khẩu" : "Password"}
        </h1>
        <div>
          <div className="mt-4 flex flex-row justify-between">
            <img src={Lock} className="w-[32px] h-[32px] " alt="password"></img>
            <div className="flex flex-col ml-2">
              <h1>{language ? "Mật khẩu" : "Password"}</h1>
              <h1>*********</h1>
            </div>
            <Popup
              trigger={
                <button className="w-[76px] h-[34px] border-[#151875] text-[#1D3178] border rounded-xl mt-2">
                  {language ? "Cập nhật" : "Update"}
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
