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

export const CategoryTab = () => {
  useFetchCategoryInAdmin();

  const listCategories = useTreeCategoryInAdmin();
  const categoryHandleInAdmin = useCategoryHandleInAdmin();

  // State variable to force UpdateCategory to rerender
  const [updateCategoryKey, setUpdateCategoryKey] = useState(0);

  useEffect(() => {
    // Whenever categoryHandleInAdmin changes, update the state variable to force UpdateCategory to rerender
    setUpdateCategoryKey(prevKey => prevKey + 1);
  }, [categoryHandleInAdmin]);
  return (
    <div className="p-4 space-y-5">
      {!checkObjectEmpty(categoryHandleInAdmin) && (
        <UpdateCategory key={updateCategoryKey}/>
      )}
      <TreeCategoryInAdmin data={listCategories} idHandle={0} />
    </div>
  );
};
