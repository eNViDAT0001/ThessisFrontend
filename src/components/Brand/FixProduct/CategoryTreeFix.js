import React from "react";
import { useTreeCategoryInUpdateProduct } from "../../../app/hook/CategoryHook";
import { TheTreeFix } from "./TheTreeFix";

export const CategoryTreeFix = () => {
  const listTreeCategory = useTreeCategoryInUpdateProduct() || [];
  return (
    <div>
      <TheTreeFix data={listTreeCategory} idHandle={0} />
    </div>
  );
};
