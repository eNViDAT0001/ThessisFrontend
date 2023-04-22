import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { ProductApi } from "../../api/ProductApi";
import {
  setCategoryHandle,
  setListBrandInFilterCategory,
  setListTreeCategory,
  setMetaProductInCategory,
} from "../slices/CategorySlice";
import { buildCategoryTree } from "./CommonHook";
import { ProviderApi } from "../../api/ProviderApi";
import { setListProductInCategory } from "../slices/CategorySlice";
import { useLayoutEffect } from "react";

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
export const useListBrandInFilterCategory = () =>
  useSelector((state) => state.category.listBrandInFilterCategory);
export const useFilterCategory = () =>
  useSelector((state) => state.query.filterInCategoryPage);

export const useFetchAllInCategory = async (categoryID, filter) => {
  const dispatch = useDispatch();
  const prevFilterRef = useRef(filter);
  const prevIDRef = useRef(categoryID);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if ((filter !== prevFilterRef.current) || (categoryID !== prevIDRef.current)) {
          await dispatch(fetchProductInCategory(categoryID, filter));
        } else {
          await dispatch(fetchListTreeCategory())
            .then(() => {
              return dispatch(fetchBrandFilterCategory());
            })
            .then(() => {
              return dispatch(fetchProductInCategory(categoryID, filter));
            })
            .then(() => {
              return dispatch(fetchCategoryChildren(categoryID));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (err) {}
    };
    fetchData();
  }, [dispatch, filter, categoryID]);
};

const fetchCategoryChildren = (categoryID) => async (dispatch) => {
  try {
    await ProductApi.GetCategoryChildren(categoryID).then((res) => {
      dispatch(setCategoryHandle(res.data.data));
    });
  } catch (err) {}
};

const fetchBrandFilterCategory = () => async (dispatch) => {
  try {
    await ProviderApi.GetAllBrand().then((res) => {
      dispatch(setListBrandInFilterCategory(res.data.data));
    });
  } catch (err) {}
};

const fetchProductInCategory = (categoryID, filter) => async (dispatch) => {
  try {
    await ProductApi.GetProductPreviewFromCategory(categoryID, filter).then(
      (res) => {
        dispatch(setListProductInCategory(res.data.data));
      }
    );
  } catch (err) {}
};

const fetchListTreeCategory = () => async (dispatch) => {
  try {
    await ProductApi.GetListCategoriesTree().then((res) => {
      const treeBuild = buildCategoryTree(res.data.data);
      const result = [];
      const newTree = {
        id: 0,
        name: "All",
        children: treeBuild,
      };
      result.push(newTree);
      dispatch(setListTreeCategory(treeBuild));
    });
  } catch (err) {}
};
