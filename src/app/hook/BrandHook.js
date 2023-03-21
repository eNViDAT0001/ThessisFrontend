import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProviderApi } from "../../api/ProviderApi";
import { setListBrand } from "../slice/BrandSlice";
import { transformFilters } from "./CommonHook";
import { toast } from "react-toastify";
import BrandModel from "../models/Read/Brand/BrandModel";

export const useListBrand = () => useSelector((state) => state.brand.listBrand);
export const useFilterBrand = () =>
  useSelector((state) => state.brand.filterBrand);
export const useAddFormBrand = () =>
  useSelector((state) => state.brand.addFormBrand);

export const useFetchListBrand = async (id) => {
  const dispatch = useDispatch();
  const filter = transformFilters(useFilterBrand());
  await useEffect(() => {
    dispatch(fetchListBrand(id, filter));
  }, []);
};

export const fetchListBrand = (id, filter) => async (dispatch) => {
  try {
    const response = await ProviderApi.GetListBrand(id, filter);
    dispatch(setListBrand(response.data.data));
  } catch (err) {
    console.log(err);
  }
};

export const addNewBrand = (userId, body) => {
  console.log(body)
  return ProviderApi.AddNewBrand(userId, body).then((res) => {
    console.log("Status add new brand");
    toast("Add new Brand Success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.reload();
      }, 2000)
    });
  });
};
