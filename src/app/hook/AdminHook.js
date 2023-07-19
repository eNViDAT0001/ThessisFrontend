import { useDispatch, useSelector } from "react-redux";
import { AdminApi } from "../../api/AdminApi";
import { useEffect } from "react";
import {
  setListRequestInAdmin,
  setMetaRequestInAdmin,
} from "../slices/RequestSlice";
import { toast } from "react-toastify";

export const useReportAdmin = () =>
  useSelector((state) => state.report.adminReport);
export const useTabInAdmin = () =>
  useSelector((state) => state.user.tabInLayout);
export const useSearchInAdmin = () =>
  useSelector((state) => state.user.searchInAdmin);

export const useFilterInRequestInAdmin = () =>
  useSelector((state) => state.query.filterRequestTabAdmin);
export const useMetaInRequestInAdmin = () =>
  useSelector((state) => state.request.metaRequestInAdmin);
export const useListRequestInAdmin = () =>
  useSelector((state) => state.request.listRequestInAdmin);

export const useFetchRequest = async (filter) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchRequestAdmin(filter));
  }, [dispatch, filter]);
};

const fetchRequestAdmin = (filter) => async (dispatch) => {
  try {
    const response = await AdminApi.GetRequest(filter);
    dispatch(setListRequestInAdmin(response.data.data));
    dispatch(setMetaRequestInAdmin(response.data.meta));
  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = async (requestId, body) => {
  try {
    await AdminApi.SeenRequest(requestId, body).then(() =>
      toast("Update request success", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => {
          window.location.reload();
        }, 2000),
      })
    );
  } catch (error) {
    console.log(error);
  }
};
