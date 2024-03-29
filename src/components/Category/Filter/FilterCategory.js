import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { useListTreeCategory } from "../../../app/hook/CategoryHook";
import { CategoryTree } from "./CategoryTree";
import { FilterBrand } from "./FilterBrand";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { FilterBasicInformation } from "./FilterBasicInformation";
import GradeIcon from "@mui/icons-material/Grade";
import { useLanguage } from "../../../app/hook/LanguageHook";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { FilterPrice } from "./FilterPrice";

export const FilterCategory = (props) => {
  const language = useLanguage();
  const listTreeCategory = useListTreeCategory() || [];
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-5">
        <CategoryIcon />
        <h1 className="text-xl font-bold ">
          {language ? "Danh mục" : "Categories"}
        </h1>
      </div>
      <CategoryTree data={listTreeCategory} idHandle={0} />
      <div className="flex flex-row space-x-5">
        <GradeIcon />
        <h1 className="text-xl font-bold ">
          {language ? "Đánh giá" : "Rating"}
        </h1>
      </div>
      <FilterBasicInformation />
      <div className="flex flex-row space-x-5">
        <AttachMoneyIcon />
        <h1 className="text-xl font-bold ">{language ? "Giá cả" : "Price"}</h1>
      </div>
      <FilterPrice />
      <div className="flex flex-row space-x-5">
        <LocalMallIcon />
        <h1 className="text-xl font-bold ">
          {language ? "Thương hiệu" : "Brands"}
        </h1>
      </div>
      <FilterBrand />
    </div>
  );
};
