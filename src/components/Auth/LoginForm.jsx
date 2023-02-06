import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { LoginFormReq } from "../../models/AuthForm/LoginFormReq";
import { useState } from "react";
import { Box, Divider, TextField } from "@mui/material";
import { AuthApi } from "../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { UserApi } from "../../api/UserApi";
import { useNavigate } from "react-router-dom";
const ChangeToTypeFromResponse = (status) => {
  const types = {
    200: "success",
    404: "error",
    500: "error",
    default: "warning",
  };
  return types[status] || types["default"];
};

export const LoginForm = () => {
  const navigate = useNavigate()
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleChangePassword = (e) => {
    setPasswordText(e.target.value);
  };
  const handleChangeUsername = (e) => {
    setUsernameText(e.target.value);
  };

  const SaveUserDetail = async (id) => {
    await UserApi.DetailUser(id)
      .then((res) => {
        toast("Login success", {
          type: "success",
          autoClose:1000,
          onClose: setTimeout(() => {
            localStorage.removeItem("UserInWeb");
            localStorage.setItem("UserInWeb", JSON.stringify(res.data.data));
            localStorage.removeItem("Role")
            localStorage.setItem("Role",res.data.data.type)
            if(localStorage.getItem("Role")==="ADMIN")
              navigate(`/admin/${localStorage.getItem("UserID")}`)
            else navigate("/")
          }, 1000),
        });
      })
      .catch((error) => {
        toast("Lỗi lưu thông tin", {
          type: "error",
          autoClose: 2000,
          onClose: window.location.reload(),
        });
      });
  };
  const Login = async (body) => {
    await AuthApi.LoginUser(body)
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("AccessTokenExpiry");
          localStorage.removeItem("RefreshToken");
          localStorage.removeItem("RefreshTokenExpiry");
          localStorage.setItem(
            "AccessToken",
            response.data.data.Token.access_token
          );
          localStorage.setItem(
            "AccessTokenExpiry",
            response.data.data.Token.access_token_expiry
          );
          localStorage.setItem(
            "RefreshToken",
            response.data.data.Token.refresh_token
          );
          localStorage.setItem(
            "RefreshTokenExpiry",
            response.data.data.Token.refresh_token_expiry
          );
          localStorage.setItem("UserID", response.data.data.UserID);
          SaveUserDetail(localStorage.getItem("UserID"));
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
  const handleLoginButton = async (event) => {
    const body = new LoginFormReq({
      username: usernameText,
      password: passwordText,
    });
    Login(body);
  };

  const loginWithEnter = async (event) => {
    if (event.key === "Enter") {
      handleLoginButton();
    }
  };
  return (
    <div className="w-[60%] w-max-[200px] shadow-lg border p-[50px] mb-20 min-w-[300px]">
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
          {/*<h1 className="font-[Lato] mt-3 text-[#9096B2] hover:underline">
            Forgot your password?
            </h1>*/}
          <button
            className="w-full h-[40px] h-max-[70px] bg-[#FF1788] text-white  mt-5 mb-5"
            onClick={handleLoginButton}
            onKeyDown={loginWithEnter}
          >
            Sign in
          </button>
        </div>
        <Divider>Or</Divider>
        {/*<div className="w-full h-[100%] mt-4">
          <div className="flex flex-row">
            <FacebookLoginButton text="Facebook" iconSize="20px" size="40px" />
            <GoogleLoginButton text="Google" iconSize="20px" size="40px" />
          </div>
            </div>*/}
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
