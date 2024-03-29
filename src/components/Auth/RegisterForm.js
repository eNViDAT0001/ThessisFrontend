import React, { useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { registerHook } from "../../app/hook/AuthHook";
import RegisterBody from "../../app/models/Create/Auth/RegisterBody";
import { checkEmailFormat, checkTextPassword, checkTextPhone } from "../../app/hook/CommonHook";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("2001-01-01");
  const [gender, setGender] = useState("1");
  const type = "BUYER";
  const [email, setEmail] = useState("");

  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleChangeDataPicker = (event) => {
    setDate(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangePassword = (event) => {
    const password = event.target.value;
    setIsValidPassword(checkTextPassword(password));
    setPassword(password);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePhone = (event) => {
    const phone = event.target.value;
    setIsValidPhone(checkTextPhone(phone));
    setPhone(phone);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    const email = event.target.value;
    setIsValidEmail(checkEmailFormat(email));
    setEmail(email);
  };

  const checkIsValidForm = () => {
    return isValidPassword && isValidPhone;
  };

  const handleButtonRegister = (event) => {
    if (checkIsValidForm()) {
      const body = new RegisterBody(
        username,
        password,
        name,
        date,
        trueGender(gender),
        email,
        phone,
        type
      );
      registerHook(body);
    }
  };

  const signUpWithEnter = (event) => {
    if (event.key === "Enter") {
      handleButtonRegister();
    }
  };
  const trueGender = (gender) => {
    if (gender === "1") return true;
    else return false;
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
            error={!isValidPassword && password}
            helperText="Least 8 characters and contains at least one uppercase"
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
            error={!isValidEmail && email}
            helperText="Follow email format"
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
              error={!isValidPhone && phone}
              helperText="Contains only numbers with length 10"
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
        onClick={handleButtonRegister}
        onKeyDown={signUpWithEnter}
      >
        Sign Up
      </button>
    </div>
  );
};
