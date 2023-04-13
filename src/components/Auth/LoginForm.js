import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Divider, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import LoginBody from "../../app/models/Create/Auth/LoginBody";
import { loginHook } from "../../app/hook/AuthHook";
import { GoogleLoginButton } from "react-social-login-buttons";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  localStorage.setItem("a", 2);
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  console.log(localStorage.getItem("a"));
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleLoginButton = async (event) => {
    const body = new LoginBody(username, password);
    loginHook(body);
  };

  const loginWithEnter = async (event) => {
    if (event.key === "Enter") {
      handleLoginButton();
    }
  };

  const handleGmailLoginButton = async(e) =>{


  }
  return (
    <div className="w-[60%] w-max-[200px] shadow-lg border p-[50px] mb-20 min-w-[300px] ">
      <ToastContainer position="top-right" newestOnTop />
      <div className="flex justify-center items-center flex-col">
        <h1 className=" font-[Josefin_Sans] text-[32px]">Login</h1>
        <h1 className="font-[Lato] mt-2 text-[#9096B2]">
          Please login using account detail below
        </h1>
      </div>

      <div className="flex flex-col mt-8">
        <div className="w-full mr-5">
          <div className=" flex items-center flex-col space-y-8">
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="Name Account"
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
          </div>
          <div className="flex flex-row">
            <button
              className="w-full h-[40px] h-max-[70px] bg-[#FF1788] text-white  mt-5 mb-5"
              onClick={handleLoginButton}
              onKeyDown={loginWithEnter}
            >
              Sign in
            </button>
            <Divider orientation="vertical" flexItem />
            <GoogleLoginButton onClick={handleGmailLoginButton} />

          </div>
        </div>
        <Divider>Or</Divider>
      </div>
      <Link
        to="/register"
        className="flex justify-center font-[Lato] mt-3 text-[#9096B2] hover:underline"
      >
        Don't have an Account? Create Account
      </Link>
    </div>
  );
};
