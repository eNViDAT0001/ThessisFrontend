import React from "react";
import { useFetchTreeInCategoryInUpdateProduct, useTreeCategoryInUpdateProduct } from "../../../app/hook/CategoryHook";
import { TheTreeFix } from "./TheTreeFix";

export const CategoryTreeFix = () => {
  useFetchTreeInCategoryInUpdateProduct();
  const listTreeCategory = useTreeCategoryInUpdateProduct() || []
  return <div>
    <TheTreeFix data={listTreeCategory} />
  </div>;
};
