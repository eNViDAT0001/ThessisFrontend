import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { UserApi } from "../../../api/UserApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { resetPassword } from "../../../app/hook/UserHook";
import { checkTextPassword } from "../../../app/hook/CommonHook";

export const FormResetPassword = (props) => {
  const userID = props.id;
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const [isValidPassword, setIsValidPassword] = useState(false);

  const changePasswordOld = (e) => {
    const password = e.target.value;
    setPasswordOld(password);
  };
  const changePasswordNew = (e) => {
    const password = e.target.value;
    setIsValidPassword(checkTextPassword(password));
    setPasswordNew(password);
  };
  const UpdateNewPassword = (e) => {
    const body = {
      password: passwordOld,
      new_password: passwordNew,
    };
    resetPassword(userID, body);
  };

  return (
    <div className="w-[520px] h-[250px] bg-[#F8F8FD] flex justify-center flex-col space-y-6 border-2 rounded-md p-10">
      <ToastContainer position="top-right" newestOnTop />
      <h1 className="text-xl text-[#1D1378] text-center">Reset password</h1>
      <div className="flex flex-row-reserve space-x-7 items-center">
        <h1>Password Old: </h1>
        <TextField
          size="small"
          sx={{ width: 240 }}
          defaultValue={passwordOld}
          onChange={changePasswordOld}
        />
      </div>
      <div className="flex flex-row-reserve space-x-6">
        <h1>Password New: </h1>
        <div>
          <TextField
            size="small"
            sx={{ width: 240 }}
            helperText="Least 8 characters and contains at least one uppercase"
            defaultValue={passwordNew}
            error={!isValidPassword && passwordNew}
            onChange={changePasswordNew}
          />
        </div>
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
