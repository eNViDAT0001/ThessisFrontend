import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { useListTreeCategory } from "../../../app/hook/CategoryHook";
import { CategoryTree } from "./CategoryTree";

export const FilterCategory = () => {
  const listTreeCategory = useListTreeCategory() || [];

  console.log(listTreeCategory)
  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-5">
        <CategoryIcon />
        <h1 className="text-xl font-bold ">Category</h1>
      </div>
      <CategoryTree data={listTreeCategory}/>
    </div>
  );
};
