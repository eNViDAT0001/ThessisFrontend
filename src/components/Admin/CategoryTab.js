import React from "react";
import { useFetchCategoryInAdmin, useTreeCategoryInAdmin } from "../../app/hook/CategoryHook";
import { TreeCategoryInAdmin } from "./TreeCategoryInAdmin";




export const CategoryTab = () => {
  useFetchCategoryInAdmin();

  const listCategories = useTreeCategoryInAdmin();
  return (
    <div className="p-4 space-y-5">
      <h1 class=" text-lg font-bold">Update category: </h1>
      <h1 class=" text-lg font-bold">List categories: </h1>
      <TreeCategoryInAdmin data={listCategories} idHandle={0} />
    </div>
  );
};
