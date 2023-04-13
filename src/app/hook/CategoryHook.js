import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { ProductApi } from "../../api/ProductApi";
import { setProductInCategory } from "../slices/ProductSlice";
import { setMetaProductInCategory } from "../slices/CategorySlice";

export const useCategoryRoof = () =>
  useSelector((state) => state.category.categoryRoot);
export const useMetaProductInCategory = () =>
  useSelector((state) => state.category.metaProductInCategory);
export const useListProductInCategory = () =>
  useSelector((state) => state.category.listProductInCategory);

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
