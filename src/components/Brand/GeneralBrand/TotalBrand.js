import React, { useEffect } from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useDispatch, useSelector } from "react-redux";
import { FetchGetListBrand } from "../../../store/slices/ProviderSlice";
import ListAltIcon from '@mui/icons-material/ListAlt';

export const TotalBrand = () => {
  const dispatch = useDispatch()
  const userID = localStorage.getItem("UserID")
  const listBrand = useSelector(state=>state.provider.ListBrand)


  useEffect(() => {
    if ((listBrand.status!=204) && (listBrand.status!=200)) {
      dispatch(FetchGetListBrand(userID));
    }
  }, [dispatch, listBrand, userID]);

  const emptyBrand = () =>{
    return ((listBrand.status==204) || (listBrand.status!=200))
  }
  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center space-x-6">
        <AssessmentIcon sx={{ width: 40, height: 40 }} />
        <div className="flex flex-col justify-between">
          <h1 className=" text-base text-[#B1B5B5]">Total brand</h1>
          <h1 className=" text-3xl font-[Verdana]">
            {emptyBrand() ? 0 : listBrand.data.data.length}
          </h1>
        </div>
      </div>
    </div>
  );
};
