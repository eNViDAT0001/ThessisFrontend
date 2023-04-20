import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { useListTreeCategory } from "../../../app/hook/CategoryHook";
import { CategoryTree } from "./CategoryTree";
import { FilterBrand } from "./FilterBrand";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FilterIcon from "@mui/icons-material/Filter";
import { FilterBasicInformation } from "./FilterBasicInformation";

export const FilterCategory = () => {
  const listTreeCategory = useListTreeCategory() || [];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-5">
        <CategoryIcon />
        <h1 className="text-xl font-bold ">Category</h1>
      </div>
      <CategoryTree data={listTreeCategory} />
      <div className="flex flex-row space-x-5">
        <LocalMallIcon />
        <h1 className="text-xl font-bold ">Brand</h1>
      </div>
      <FilterBrand />
      <div className="flex flex-row space-x-5">
        <FilterIcon />
        <h1 className="text-xl font-bold ">Basic Information</h1>
      </div>
      <FilterBasicInformation />
    </div>
  );
};
