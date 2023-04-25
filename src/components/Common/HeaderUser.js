import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link } from "react-router-dom";
import { useUserID } from "../../app/hook/UserHook";
import { useDispatch } from "react-redux";
import {
  resetFilterInCategory,
  setNameInFilterCategory,
  setNameSearchInBrand,
  setNameSearchInProductInHome,
} from "../../app/slices/QuerySlice";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

const LinkInHeader = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Category",
    link: "/category/0",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Shop",
    link: "/shop",
  },
];
export const HeaderUser = () => {
  const userID = useUserID();
  const dispatch = useDispatch();
  let timeoutId;
  const [searchText, setSearchText] = useState("");

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
    const textEvent = event.target.value
    setTimeout(() => {
      const path = window.location.pathname.split("/")[1];
    
      switch (path) {
        case "":
          dispatch(setNameSearchInProductInHome(textEvent));
          break;
        case "category":
          dispatch(setNameInFilterCategory(textEvent))
          break;
        case "contact":
          break;
        case "shop":
          dispatch(setNameSearchInBrand(textEvent))
          return;
        default:
          return;
      }
    }, 200);
    setSearchText(event.target.value);
  };

  return (
    <div className="w-full bg-[#FFFFFF] flex justify-center border-b">
      <div className="w-[80%] py-2">
        <div className="flex justify-between items-center">
          <div className="font-['Inter'] font-bold text-[#131313] text-lg uppercase ">
            <div className="flex flex-row space-x-[30px]">
              {LinkInHeader.map((data) => (
                <Link to={data.link} onClick={handleClickHeader}>
                  <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                    {data.name}
                  </h1>{" "}
                </Link>
              ))}
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
                placeholder="Search product"
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Link to={`/cart/${userID}`} className="hover:cursor-pointer ">
              <StorefrontIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
