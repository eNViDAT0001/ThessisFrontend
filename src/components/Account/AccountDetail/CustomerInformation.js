import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { convertDate } from "../../../app/hook/CommonHook";
import { uploadFile } from "../../../app/hook/FileHook";
import { updateUser, useUserDetail } from "../../../app/hook/UserHook";

const CustomerInformation = (props) => {
  const userDetail = useUserDetail()
  
  const [birthday, setBirthday] = useState(convertDate(userDetail.birthday));
  const [avatar, setAvatar] = useState(userDetail.avatar);
  const [isChange, setIsChange] = useState(false);
  
  const handleChangeDataPicker = (e) => {
    setBirthday(e.target.value);
    setIsChange(true);
  };

  const changeGender = (gender) => {
    if (gender) return "Male";
    else return "Female";
  };

  
  const handleButtonConfirm = (e) => {
    if (isChange) {
      const body = {
        birthday: birthday,
        avatar: avatar,
      };
      updateUser(props.id, body,birthday,avatar);
    }
  };


  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then(res=>{
        setAvatar(res.data[0].url);
        setIsChange(true)
      })
    }
  }
  return (
    <div className="flex flex-col p-10">
      <ToastContainer position="top-right" newestOnTop />

      <div className="flex flex-row">
        <div className="flex flex-col pr-20 flex-wrap">
          <h1 className="text-xl text-[#1D1378] ml-6">Information</h1>
          <IconButton
            aria-label="upload picture"
            component="label"
            onChange={handleUploadFile}
          >
            <input hidden accept="image/*" type="file" />
            {(avatar)? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-[120px] h-[120px] rounded-full"
              ></img>
            ) : (
              <AccountCircleIcon sx={{ width: 120, height: 120 }} />
            )}
          </IconButton>
        </div>
        <div className="flex flex-col mt-4 ml-2 space-y-4">
          <TextField
            id="standard-read-only-input"
            label="Full name"
            defaultValue={userDetail.name}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            id="standard-read-only-input"
            label="Nick name"
            defaultValue={userDetail.username}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </div>
      </div>
      <div className="space-y-5">
        <div className="flex flex-row justify-start space-x-7  font-['Josefin_Sans']">
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue={birthday}
            onChange={handleChangeDataPicker}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-read-only-input"
            label="Phone"
            defaultValue={userDetail.phone}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            id="standard-read-only-input"
            label="Gender"
            defaultValue={changeGender(userDetail.gender)}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </div>
      </div>

      <button
        className="w-[20%] h-[35px] bg-[#0B74E5] text-white my-[5%]"
        onClick={handleButtonConfirm}
      >
        Confirm
      </button>
    </div>
  );
};

export default CustomerInformation;
