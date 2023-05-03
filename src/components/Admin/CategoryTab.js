import React from "react";
import {
  useCategoryHandleInAdmin,
  useFetchCategoryInAdmin,
  useTreeCategoryInAdmin,
} from "../../app/hook/CategoryHook";
import { TreeCategoryInAdmin } from "./CategoryComponentInAdmin/TreeCategoryInAdmin";
import { checkObjectEmpty } from "../../app/hook/CommonHook";
import { UpdateCategory } from "./CategoryComponentInAdmin/UpdateCategory";
import { useState } from "react";
import { useEffect } from "react";
import { AddCategory } from "./CategoryComponentInAdmin/AddCategory";
import { Button, Divider } from "@mui/material";

export const CategoryTab = () => {
  useFetchCategoryInAdmin();

  const listCategories = useTreeCategoryInAdmin();
  const categoryHandleInAdmin = useCategoryHandleInAdmin();
  const [openAddCategory, setOpenAddCategory] = useState(false);
  // State variable to force UpdateCategory to rerender
  const [updateCategoryKey, setUpdateCategoryKey] = useState(0);

  const handleButtonAdd = (e) => {
    setOpenAddCategory(!openAddCategory);
  };

  useEffect(() => {
    // Whenever categoryHandleInAdmin changes, update the state variable to force UpdateCategory to rerender
    setUpdateCategoryKey((prevKey) => prevKey + 1);
  }, [categoryHandleInAdmin]);
  return (
    <div className="p-4 space-y-5">
      {!openAddCategory ? (
        <Button variant="contained" onClick={handleButtonAdd}>
          + Add new category
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleButtonAdd}>
          Hide Form
        </Button>
      )}
      {openAddCategory && <AddCategory />}
      <Divider />
      {!checkObjectEmpty(categoryHandleInAdmin) && (
        <div className="w-full">
          <UpdateCategory key={updateCategoryKey} />
        </div>
      )}
      <TreeCategoryInAdmin data={listCategories} idHandle={0} />
    </div>
  );
};
