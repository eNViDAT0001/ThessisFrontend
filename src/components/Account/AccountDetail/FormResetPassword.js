import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { UserApi } from "../../../api/UserApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export const FormResetPassword = (props) => {
  const userID = props.id;
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const changePasswordOld = (e) => {
    setPasswordOld(e.target.value);
  };
  const changePasswordNew = (e) => {
    setPasswordNew(e.target.value);
  };
  const UpdateNewPassword = (e) => {
    const body = {
      password: passwordOld,
      new_password: passwordNew,
    };
    Reset(userID, body);
  };

  const Reset = async (userID, body) => {
    await UserApi.UpdateNewPassword(userID, body).then((res) => {
      switch (res.status) {
        case 200:
          toast("Change password successfully", {
            type: "success",
            autoClose: 1000,
            Close: setTimeout(() => window.location.reload(), 1000),
          });
          break;
        case 204:
          toast("Change password failed ", {
            type: "error",
            autoClose: 1000,
            Close: setTimeout(() => window.location.reload(), 1000),
          });
          break;
        default:
          toast("An unknown error", {
            type: "error",
            autoClose: 1000,
            Close: setTimeout(() => window.location.reload(), 1000),
          });
        }
    });
  };
  return (
    <div className="w-[420px] h-[250px] bg-[#F8F8FD] flex justify-center flex-col space-y-6 border-2 rounded-md p-10">
      <ToastContainer position="top-right" newestOnTop />
      <h1 className="text-xl text-[#1D1378] text-center">Reset password</h1>
      <div className="flex flex-row space-x-3 items-center">
        <h1>Password Old: </h1>
        <TextField
          size="small"
          defaultValue={passwordOld}
          onChange={changePasswordOld}
        />
      </div>
      <div className="flex flex-row space-x-3 items-center">
        <h1>Password New: </h1>
        <TextField
          size="small"
          defaultValue={passwordNew}
          onChange={changePasswordNew}
        />
      </div>
      <Button
        variant="contained"
        endIcon={<ChangeCircleIcon />}
        onClick={UpdateNewPassword}
      >
        Send
      </Button>{" "}
    </div>
  );
};