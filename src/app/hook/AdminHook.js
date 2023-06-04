import { useDispatch, useSelector } from "react-redux";
import { AdminApi } from "../../api/AdminApi";
import { setAdminReport } from "../slices/ReportSlice";
import { useEffect } from "react";
import {
  setListRequestInAdmin,
  setMetaRequestInAdmin,
} from "../slices/RequestSlice";

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

export const useFetchReportAdmin = async () => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchReportAdmin());
  }, [dispatch]);
};

const fetchReportAdmin = () => async (dispatch) => {
  try {
    const response = await AdminApi.GetReport();
    dispatch(setAdminReport(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
