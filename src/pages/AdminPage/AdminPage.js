import React from "react";
import { Layout } from "../../components/Admin/Layout";
import { useUserDetail } from "../../app/hook/UserHook";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchInAdmin, useTabInAdmin } from "../../app/hook/AdminHook";
import { useDispatch } from "react-redux";
import { setSearchInAdmin } from "../../app/slices/UserSlice";
import { useEffect } from "react";
import { useRef } from "react";
import {
  setNameInFilterOrderTabAdmin,
  setNameInFilterProductTabAdmin,
  setNameInFilterRequestTabAdmin,
  setNameInFilterShopTabAdmin,
  setNameInFilterUserTabAdmin,
} from "../../app/slices/QuerySlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const AdminPage = () => {
  const dispatch = useDispatch();

  const userDetail = useUserDetail();
  const searchText = useSearchInAdmin();
  const tabLayout = useTabInAdmin();

  const prevTabLayout = useRef(tabLayout);
  const prevSearchText = useRef(searchText);

  const handleChangeSearchText = (e) => {
    dispatch(setSearchInAdmin(e.target.value));
  };

  useEffect(() => {
    if (prevTabLayout.current !== tabLayout) {
      dispatch(setSearchInAdmin(""));
    }
    if (prevSearchText.current !== searchText) {
      switch (tabLayout) {
        case "User":
          dispatch(setNameInFilterUserTabAdmin(searchText));
          break;
        case "Order":
          dispatch(setNameInFilterOrderTabAdmin(searchText));
          break;
        case "Product":
          dispatch(setNameInFilterProductTabAdmin(searchText));
          break;
        case "Shop":
          dispatch(setNameInFilterShopTabAdmin(searchText));
          break;
        case "Request":
          dispatch(setNameInFilterRequestTabAdmin(searchText));
          break;
        default:
          break;
      }
    }
    prevSearchText.current = searchText;
    prevTabLayout.current = tabLayout;
  }, [tabLayout, searchText, dispatch]);
  return (
    <div className="flex flex-col font-['Josefin_Sans'] font-medium	 space-y-6">
      <div className=" flex flex-row px-6 py-2 space-x-6 items-end">
        <div className="flex flex-row justify-between items-center px-5 w-full">
          <div className="flex flex-row items-center">
            {userDetail.avatar ? (
              <img
                src={userDetail.avatar}
                alt="avatar"
                className="w-[55px] h-[55px] rounded-full"
              ></img>
            ) : (
              <AccountCircleIcon sx={{ width: 55, height: 55 }} />
            )}
            <div className="flex flex-col">
              <h1 className="font-bold text-lg leading-30 tracking-wider text-black">
                {userDetail.name}
              </h1>
              <h1 className="text-[#8E8E93]">{userDetail.email}</h1>
            </div>
          </div>
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
        </div>
      </div>

      <div className="bg-[#F7F7F7] p-6">
        <Layout />
      </div>
    </div>
  );
};
