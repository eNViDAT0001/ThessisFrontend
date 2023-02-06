import React, { useEffect, useState } from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const HeaderMain = () => {
  console.log(localStorage.getItem("UserInWeb"));

  const UserDetail = JSON.parse(localStorage.getItem("UserInWeb"));

  const Name = UserDetail ? UserDetail.name : "";
  const Avatar = UserDetail ? UserDetail.avatar : "";

  const Phone = UserDetail ? UserDetail.phone : "";
  const Email = UserDetail ? UserDetail.email : "";

  return (
    <div className="bg-gray-900 text-white">
      <div className="md:flex md:justify-around md:items-center sm:px-12 px-4 bg-[#ffffff19] py-2">
        <div className="md:flex md:items-center">
          <div className="md:flex md:items-center mr-5">
            {Email ? (
              <div className="md:flex md:items-center mr-5">
                <AiOutlineMail className="mx-2" />
                <h1>{Email}</h1>
              </div>
            ) : (
              <Link to="/" className="mx-5 hover:text-teal-400 duration-300">
                Home Page
              </Link>
            )}
          </div>
          {Phone ? (
            <div className="md:flex md:items-center">
              <AiOutlinePhone className="mx-2" />
              <h1> {Phone} </h1>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="md:flex md:items-center ">
          {!Name ? (
            <Link to="/login" className="mx-5 hover:text-teal-400 duration-300">
              Login
            </Link>
          ) : (
            <div className="md:flex md:items-center ">
              <Link to={`/detail/${localStorage.getItem("UserID")}`}>
                {(Avatar)?(<img
                  src={Avatar}
                  alt="avatar"
                  className="w-[40px] h-[40px] rounded-full mx-2"
                ></img>) : (<AccountCircleIcon sx={{width:40, height:40}}/>)}
              </Link>

              {localStorage.getItem("Role") === "ADMIN" ? (
                <Link
                  to={`/admin/${localStorage.getItem("UserID")}`}
                  className="hover:text-teal-400 duration-300"
                >
                  <AdminPanelSettingsIcon />
                </Link>
              ) : (
                <Link
                  to="/shopping-cart"
                  className="hover:text-teal-400 duration-300"
                >
                  <AiOutlineShoppingCart />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
