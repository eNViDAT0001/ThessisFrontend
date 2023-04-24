import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { useListTreeCategory } from "../../../app/hook/CategoryHook";
import { CategoryTree } from "./CategoryTree";
import { FilterBrand } from "./FilterBrand";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { FilterBasicInformation } from "./FilterBasicInformation";
import GradeIcon from '@mui/icons-material/Grade'

export const FilterCategory = (props) => {
  const listTreeCategory = useListTreeCategory() || [];
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-5">
        <CategoryIcon />
        <h1 className="text-xl font-bold ">Categories</h1>
      </div>
      <CategoryTree data={listTreeCategory} idHandle={props.id} />
      <div className="flex flex-row space-x-5">
        <GradeIcon />
        <h1 className="text-xl font-bold ">Rating</h1>
      </div>
      <FilterBasicInformation />
      <div className="flex flex-row space-x-5">
        <LocalMallIcon />
        <h1 className="text-xl font-bold ">Brands</h1>
      </div>
      <FilterBrand />
    </div>
  );
};
