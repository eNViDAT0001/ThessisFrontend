import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReportApi } from "../../api/ReportApi";
import {
  setAdminReport,
  setOrderReport,
  setProductReport,
  setProviderReport,
} from "../slices/ReportSlice";
import { AdminApi } from "../../api/AdminApi";

export const useProductReport = () =>
  useSelector((state) => state.report.productReport);
export const useProviderReport = () =>
  useSelector((state) => state.report.providerReport);
export const useOrderReport = () =>
  useSelector((state) => state.report.orderReport);
export const useFilterProductDB = () =>
  useSelector((state) => state.query.filterProductDB);
export const useFilterProviderDB = () =>
  useSelector((state) => state.query.filterProviderDB);
export const useFilterOrderDB = () =>
  useSelector((state) => state.query.filterOrderDB);

export const useFetchReportInAdmin = async (
  filterProduct,
  filterProvider,
  filterOrder
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProductReportInAdmin(filterProduct));
        await dispatch(fetchProviderReportInAdmin(filterProvider));
        await dispatch(fetchOrderReportInAdmin(filterOrder));
        await dispatch(fetchReportAdmin());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch, filterOrder, filterProduct, filterProvider]);
};

const fetchProductReportInAdmin = (filter) => async (dispatch) => {
  try {
    const res = await ReportApi.GetReportProducts(filter);
    dispatch(setProductReport(res.data.data));
  } catch (err) {
    console.log(err);
  }
};

const fetchProviderReportInAdmin = (filter) => async (dispatch) => {
  try {
    const res = await ReportApi.GetReportProviders(filter);
    dispatch(setProviderReport(res.data.data));
  } catch (err) {
    console.log(err);
  }
};

const fetchOrderReportInAdmin = (filter) => async (dispatch) => {
  try {
    const res = await ReportApi.GetReportOrders(filter);
    dispatch(setOrderReport(res.data.data));
  } catch (err) {
    console.log(err);
  }
};

const fetchReportAdmin = (filter) => async (dispatch) => {
  try {
    const response = await AdminApi.GetReport(filter);
    dispatch(setAdminReport(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
