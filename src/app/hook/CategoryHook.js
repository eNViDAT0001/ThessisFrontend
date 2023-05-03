import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { ProductApi } from "../../api/ProductApi";
import {
  setCategoryHandle,
  setCategoryHandleInAdmin,
  setCategoryIDHandleInUpdateTree,
  setListBrandInFilterCategory,
  setListCategoryInAdmin,
  setListTreeCategory,
  setListTreeCategoryInUpdateProduct,
  setListTreeCategoryLogic,
} from "../slices/CategorySlice";
import { toast } from "react-toastify";

import { buildCategoryTree } from "./CommonHook";
import { ProviderApi } from "../../api/ProviderApi";
import { setListProductInCategory } from "../slices/CategorySlice";
import { useLayoutEffect } from "react";
import { CategoryApi } from "../../api/CategoryApi";

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
export const useSortCategory = () =>
  useSelector((state) => state.query.sortInCategoryPage);
export const useFilterBrand = () =>
  useSelector((state) => state.query.filterBrandInCategoryPage);
export const useCategoryHandleInAdmin = () =>
  useSelector((state) => state.category.categoryHandleInAdmin);

export const useFetchAllInCategory = async (categoryID, filter) => {
  const dispatch = useDispatch();
  const prevFilterRef = useRef(filter);
  const prevIDRef = useRef(categoryID);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if (
          filter !== prevFilterRef.current ||
          categoryID !== prevIDRef.current
        ) {
          await dispatch(fetchCategoryChildren(categoryID)).then(() => {
            return dispatch(fetchProductInCategory(categoryID, filter));
          });
        } else {
          await dispatch(fetchListTreeCategory())
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
        prevFilterRef.current = filter;
        prevIDRef.current = categoryID;
      } catch (err) {}
    };
    fetchData();
  }, [dispatch, categoryID, filter]);
};

const fetchCategoryChildren = (categoryID) => async (dispatch) => {
  try {
    await ProductApi.GetCategoryChildren(categoryID).then((res) => {
      dispatch(setCategoryHandle(res.data.data));
    });
  } catch (err) {}
};

export const fetchBrandFilterCategory = (filter) => async (dispatch) => {
  try {
    await ProviderApi.GetAllBrand(filter).then((res) => {
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
      dispatch(setListTreeCategory(result));
    });
  } catch (err) {}
};

//update Product
export const useTreeCategoryInUpdateProduct = () =>
  useSelector((state) => state.category.listTreeCategoryInUpdateProduct);

export const fetchListTreeCategoryInUpdateProduct = () => async (dispatch) => {
  try {
    await ProductApi.GetListCategoriesTree().then((res) => {
      const treeBuild = buildCategoryTree(res.data.data);
      dispatch(setListTreeCategoryInUpdateProduct(treeBuild));
    });
  } catch (err) {}
};

//Admin
export const useTreeCategoryInAdmin = () =>
  useSelector((state) => state.category.listCategoryInAdmin);
export const useCategoryIDHandleInUpdateTree = () =>
  useSelector((state) => state.category.categoryIDHandleInUpdateTree);
export const useCategoryIDHandleInAddTree = () =>
  useSelector((state) => state.category.categoryIDHandleInAddTree);
export const useListTreeCategoryLogic = () =>
  useSelector((state) => state.category.listTreeCategoryLogic);

export const useFetchCategoryInAdmin = async (categoryID, filter) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchListTreeCategoryInAdmin());
      } catch (err) {}
    };
    fetchData();
  }, [dispatch, categoryID, filter]);
};

const fetchListTreeCategoryInAdmin = () => async (dispatch) => {
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
      dispatch(setListCategoryInAdmin(treeBuild));
      dispatch(setListTreeCategoryLogic(result))
    });
  } catch (err) {}
};

export const useFetchCategoryDetailInAdmin = async (categoryID) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (categoryID) {
        try {
          await dispatch(fetchCategoryDetailInAdmin(categoryID));
        } catch (err) {}
      } else {
        dispatch(setCategoryHandleInAdmin({}));
      }
    };

    fetchData();
  }, [dispatch, categoryID]);
};

export const fetchCategoryDetailInAdmin = (categoryID) => async (dispatch) => {
  try {
    await ProductApi.GetCategoryChildren(categoryID).then((res) => {
      dispatch(setCategoryHandleInAdmin(res.data.data));
      dispatch(setCategoryIDHandleInUpdateTree(res.data.data.category_parent_id))
    });
  } catch (err) {}
};

export const updateCategory = (categoryID, body) => {
  return CategoryApi.UpdateCategory(categoryID, body).then(() => {
    toast("Update category success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.reload();
      }, 2000),
    });
  });
};

export const addCategory = (body) => {
  return CategoryApi.AddNewCategory(body).then(() => {
    toast("Add category success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.reload();
      }, 2000),
    });
  });
};
