import React, { useEffect } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link, useNavigate } from "react-router-dom";
import { useUserDetail, useUserID } from "../../app/hook/UserHook";
import { useDispatch } from "react-redux";
import {
  resetFilterInCategory,
  setNameInFilterCategory,
} from "../../app/slices/QuerySlice";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { setWSEvent } from "../../app/slices/WSSlice";
import { checkNotLogin } from "../../app/hook/CommonHook";
import { webSocket } from "../../config";
import BarLanguage from "./BarLanguage";
import { useLanguage } from "../../app/hook/LanguageHook";

export const HeaderUser = () => {
  const language = useLanguage();
  const userID = useUserID();
  const userDetail = useUserDetail();
  const dispatch = useDispatch();
  let timeoutId;
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const handleClickHeader = (e) => {
    setTimeout(() => {
      const path = window.location.pathname.split("/")[1];
      setSearchText("");
      switch (path) {
        case "category":
          dispatch(resetFilterInCategory());
          break;
        default:
          return;
      }
    }, 50);
  };

  const handleChangeSearchText = (event) => {
    clearTimeout(timeoutId);
    const textEvent = event.target.value;
    setTimeout(() => {
      const path = window.location.pathname.split("/")[1];

      switch (path) {
        case "category":
          dispatch(setNameInFilterCategory(textEvent));
          break;
        default:
          navigate("/category/0"); // Change the URL to "/category/0"
          return;
      }
    }, 200);
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (userID) {
      const accessToken = localStorage.getItem("AccessToken");
      const WS_URL = `${webSocket()}/ws/user/${userID}/token/${accessToken}`;
      const ws = new WebSocket(WS_URL);
      ws.onopen = () => {};
      ws.onmessage = (event) => {
        dispatch(setWSEvent(event.data));
      };
      ws.onerror = (error) => {};
      ws.onclose = () => {};
    }
  }, [userID, dispatch]);

  const LinkInHeader = [
    {
      name: language ? "Trang chủ" : "Home",
      link: "/",
    },
    {
      name: language ? "Danh mục" : "Category",
      link: "/category/0",
    },
    {
      name: language ? "Liên hệ" : "Contact",
      link: "/contact",
    },
  ];
  return (
    <div className="w-full bg-[#FFFFFF] flex justify-center border-b">
      <div className="w-[80%] py-2">
        <div className="flex justify-between items-center">
          <div className="font-['Inter'] font-bold text-[#131313] text-lg uppercase ">
            <div className="flex flex-row space-x-[30px]">
              {LinkInHeader.map((data) => (
                <Link
                  key={data.name}
                  to={data.link}
                  onClick={handleClickHeader}
                >
                  <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                    {data.name}
                  </h1>{" "}
                </Link>
              ))}
              {(userDetail && userDetail.type === "BUYER") ||
              checkNotLogin() ? (
                <div></div>
              ) : (
                <Link to="/shop">
                  <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                    {language ? "Cửa hàng" : "Shop"}
                  </h1>{" "}
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center space-x-5">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                value={searchText}
                onChange={handleChangeSearchText}
                placeholder="Search"
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Link to={`/cart/${userID}`} className="hover:cursor-pointer ">
              <StorefrontIcon />
            </Link>
            <BarLanguage />
          </div>
        </div>
      </div>
    </div>
  );
};
