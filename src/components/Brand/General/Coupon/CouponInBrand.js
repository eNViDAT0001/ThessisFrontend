import React from "react";
import { useLanguage } from "../../../../app/hook/LanguageHook";
import DiscountIcon from "@mui/icons-material/Discount";
import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { FormAddCoupon } from "./FormAddCoupon";
import { ListCouponInBrand } from "./ListCouponInBrand";

export const CouponInBrand = () => {
  const language = useLanguage();

  const [openCoupon, setOpenAddCoupon] = useState(false);
  const handleButtonAdd = (e) => {
    if (!openCoupon) setOpenAddCoupon(true);
    else setOpenAddCoupon(false);
  };
  return (
    <div className="flex justify-center">
      <div className="w-[80%] min-h-[200px] bg-white shadow-lg rounded-2xl p-5 font-['Josefin_Sans']">
        <div className="flex flex-row justify-between  pr-4">
          <div className="flex flex-row items-center space-x-2">
            {" "}
            <DiscountIcon sx={{ width: 20, height: 20 }} />
            <h1 className=" text-2xl font-bold">
              {language ? "Khuyến mãi" : "Coupon"}
            </h1>
          </div>
          {!openCoupon ? (
            <Button variant="contained" onClick={handleButtonAdd}>
              {language ? "Thêm khuyến mãi" : "+ Add new Coupon"}
            </Button>
          ) : (
            <Button variant="outlined" onClick={handleButtonAdd}>
              {language ? "Ẩn" : "Hide form"}
            </Button>
          )}
        </div>
        {openCoupon && <FormAddCoupon />}
        <div className="my-2">
          <Divider />
        </div>
        <ListCouponInBrand />
      </div>
    </div>
  );
};
