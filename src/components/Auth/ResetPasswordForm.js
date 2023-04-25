import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Divider, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import { checkTextPassword } from "../../app/hook/CommonHook";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: pink[400],
  "&:hover": {
    backgroundColor: pink[600],
  },
}));
export const ResetPasswordForm = () => {
  const [emailInput, setEmailInput] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const handleChangeEmail = (e) => {
    setEmailInput(e.target.value);
  };

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setIsValidPassword(checkTextPassword(password));
    setNewPassword(password);
  };

  const handleButtonSend = async (e) => {
    await AuthApi.ResetPasswordUseSMTP(emailInput)
      .then((res) => {
        toast("Send code success, now check your email", {
          type: "success",
          autoClose: 1000,
        });
        setToken(res.data.data.token);
      })
      .catch((err) => {
        toast(err.response.data.errors[0].message, {
          autoClose: 1000,
          type: "error",
        });
      });
  };

  const handleButtonReset = async (e) => {
    const body = {
      code: code,
      token: token,
      new_password: newPassword,
    };
    await AuthApi.ResetPassword(emailInput, body)
      .then(() => {
        toast("Update User Success", {
          type: "success",
          autoClose: 1000,
          Close: setTimeout(() => window.location.replace("/login"), 1000),
        });
      })
      .catch((err) => {
        toast(err.response.data.errors[0].message, {
          autoClose: 1000,
          type: "error",
        });
      });
  };
  return (
    <div className="w-[60%] w-max-[200px] shadow-lg border p-[50px] mb-20 min-w-[300px] ">
      <ToastContainer position="top-right" newestOnTop />
      <div className="flex justify-center items-center flex-col">
        <h1 className=" font-[Josefin_Sans] text-[32px]">Forget Password</h1>
        <h1 className="font-[Lato] mt-2 text-[#9096B2]">
          Please fill information detail below
        </h1>
      </div>

      <div className="flex flex-col mt-8">
        <div className="w-full mr-5">
          <div className=" flex items-center flex-col space-y-8">
            <div className="flex flex-row justify-start items-center">
              <div>
                <Box
                  sx={{
                    width: 350,
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
              </div>

              <div>
                <ColorButton
                  size="small"
                  variant="contained"
                  onClick={handleButtonSend}
                  endIcon={<SendIcon />}
                >
                  Send Code
                </ColorButton>
              </div>
            </div>

            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="Code"
                id="outlined-required"
                size="small"
                variant="standard"
                onChange={handleChangeCode}
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
                error={!isValidPassword && newPassword}
                helperText="Least 8 characters and contains at least one uppercase"
                variant="standard"
                onChange={handleChangePassword}
              />
            </Box>
          </div>

          <div className="flex flex-row">
            <button
              className="w-full  bg-[#FF1788] text-white px-5 py-1  mt-5 mb-5"
              onClick={handleButtonReset}
            >
              Reset your password
            </button>
            <Divider orientation="vertical" flexItem />
            {/* <GoogleLoginButton onClick={handleGmailLoginButton} /> */}
          </div>
        </div>
        <Divider>Or</Divider>
      </div>
      <Link
        to="/login"
        className="flex justify-center font-[Lato] mt-3 text-[#9096B2] hover:underline"
      >
        If you have an Account?
      </Link>
    </div>
  );
};
