import React, { useEffect, useState } from "react";

import { AuthApi } from "../../api/AuthApi";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { RegisterFormReq } from "../../models/AuthForm/RegisterFormReq";
import { UserApi } from "../../api/UserApi";


const ChangeToTypeFromResponse = (status) => {
  const types = {
    200: "success",
    400: "error",
    404: "error",
    409: "error",
    500: "error",
    default: "warning",
  };
  return types[status] || types["default"];
};

export const RegisterForm = () => {
  useEffect(()=>{
    localStorage.clear()
  },[])
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("2001-01-01");
  const [gender, setGender] = useState("1");
  const type = "BUYER"
  const [email, setEmail] = useState("");

  const handleChangeDataPicker = (event) => {
    setDate(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const trueGender = (gender) => {
    if (gender === "1") return true;
    else return false;
  };
  
  const SaveUserDetail = async(id)=>{
    await UserApi.DetailUser(id)
    .then((res)=>{
      localStorage.removeItem("UserInWeb")
      localStorage.setItem("UserInWeb",JSON.stringify(res.data.data))
      toast("Đăng ký thành công", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => window.location.replace("/"), 1000),
      });
    })
    .catch((error)=>{
          toast("Lỗi lưu thông tin", {
            type: "error",
            autoClose: 1000,
          });
    })
  }
  const Register = async (body) => {
    await AuthApi.RegisterUser(body)
    .then((response) => {

      if (response.status === 200) {      
        localStorage.removeItem("AccessToken")
        localStorage.removeItem("AccessTokenExpiry")
        localStorage.removeItem("RefreshToken")
        localStorage.removeItem("RefreshTokenExpiry")


        localStorage.setItem("AccessToken", response.data.data.Token.access_token);
        localStorage.setItem("AccessTokenExpiry",response.data.data.Token.access_token_expiry);
        localStorage.setItem("RefreshToken",response.data.data.Token.refresh_token);
        localStorage.setItem("RefreshTokenExpiry",response.data.data.Token.refresh_token_expiry);
        localStorage.setItem("UserID", response.data.data.UserID);
        SaveUserDetail(localStorage.getItem("UserID"))
        
      }
    })
    .catch((err) => {
     
      if (err.response) {
        toast(err.response.data.errors[0].message, {
          type: ChangeToTypeFromResponse(err.response.status),
          autoClose: 1000,
        });
      }
    });
  };
  const signUpWithEnter = (event) =>{
    if (event.key === "Enter") {
      activeRegister()
    }
  }
  const activeRegister = () => {
    const body = new RegisterFormReq({
      username: username,
      password: password,
      phone: phone,
      gender: trueGender(gender),
      type: type,
      birthday: date,
      name: name,
      email: email,
    });

    Register(body);
  };

  return (
    <div className="w-[60%] w-max-[200px] shadow-lg border p-[50px] min-w-[300px]">
      <ToastContainer position="top-right" newestOnTop />

      <div className=" flex items-center flex-col">
        <h1 className=" font-[Josefin_Sans] text-[32px]">Sign up Form</h1>
        <h1 className="font-[Lato] mt-2 text-[#9096B2]">
          Please fill your information detail below
        </h1>
      </div>
      <div className="space-y-6">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="User name"
            id="outlined-required"
            size="small"
            variant="standard"
            onChange={handleChangeUsername}
          />
        </Box>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Password"
            type="password"
            id="outlined-required"
            size="small"
            variant="standard"
            onChange={handleChangePassword}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Email"
            id="outlined-required"
            size="small"
            variant="standard"
            onChange={handleChangeEmail}
          />
        </Box>
        <div className="flex flex-row justify-between">
          <Box
            sx={{
              width: "55%",
              maxWidth: "400px",
            }}
          >
            <TextField
              fullWidth
              label="Name"
              id="outlined-required"
              size="small"
              variant="standard"
              onChange={handleChangeName}
            />
          </Box>

          <Box
            sx={{
              width: "40%",
              maxWidth: "400px",
            }}
          >
            <TextField
              fullWidth
              label="Phone"
              id="outlined-required"
              size="small"
              variant="standard"
              onChange={handleChangePhone}
            />
          </Box>
        </div>

        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue={date}
          onChange={handleChangeDataPicker}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className="flex justify-between">
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={handleChangeGender}
            >
              <FormControlLabel value="1" control={<Radio />} label="Male" />
              <FormControlLabel value="0" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          
        </div>
      </div>
      <button
        className="w-full h-[40px] bg-[#FF1788] text-white mt-10"
        onClick={activeRegister}
        onKeyDown={signUpWithEnter}
      >
        Sign Up
      </button>
    </div>
  );
};
