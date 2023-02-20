import { useSelector } from "react-redux";

export const useCategoryRoof = () => useSelector(state=> state.category.categoryRoot)