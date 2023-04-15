import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { ProductApi } from "../../api/ProductApi";
import { setProductInCategory } from "../slices/ProductSlice";
import { setListTreeCategory, setMetaProductInCategory } from "../slices/CategorySlice";
import { buildCategoryTree } from "./CommonHook";

export const useCategoryRoof = () =>
  useSelector((state) => state.category.categoryRoot);
export const useMetaProductInCategory = () =>
  useSelector((state) => state.category.metaProductInCategory);
export const useListProductInCategory = () =>
  useSelector((state) => state.category.listProductInCategory);
export const useListTreeCategory = () => 
  useSelector((state) => state.category.listTreeCategory);
export const useCategoryHandle = () => 
  useSelector((state) => state.category.categoryHandle);

export const useFetchListTreeCategory = async () => {
    const dispatch = useDispatch();
  
    const loadListTreeCategory = useCallback(async () => {
      dispatch(fetchListTreeCategory());
    }, [dispatch]);
  
    useEffect(() => {
      loadListTreeCategory();
    }, [loadListTreeCategory]);
  }; 

export const useFetchProductInCategory = async (filter) => {
  const dispatch = useDispatch();

  const loadDataHome = useCallback(async () => {
    dispatch(fetchProductInCategory(filter));
  }, [filter, dispatch]);

  useEffect(() => {
    loadDataHome();
  }, [loadDataHome]);
};

const fetchProductInCategory = (filter) => async (dispatch) => {
  try {
    await ProductApi.GetProductPreview(filter)
    .then((res) => {
      dispatch(setProductInCategory(res.data.data));
      dispatch(setMetaProductInCategory(res.data.meta));
    });
  } catch (err) {}
};

const fetchListTreeCategory = () => async (dispatch) => {
  try {
    await ProductApi.GetListCategoriesTree()
    .then((res) => {
      const newTree = buildCategoryTree(res.data.data)
      dispatch(setListTreeCategory(newTree));
    });
  } catch (err) {}
};
