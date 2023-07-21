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

export const useFetchReportInAdmin = async () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProductReportInAdmin());
        await dispatch(fetchProviderReportInAdmin());
        await dispatch(fetchOrderReportInAdmin());
        await dispatch(fetchReportAdmin());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);
};

const fetchProductReportInAdmin = () => async (dispatch) => {
  try {
    const res = await ReportApi.GetReportProducts();
    dispatch(setProductReport(res.data.data));
  } catch (err) {
    console.log(err);
  }
};

const fetchProviderReportInAdmin = () => async (dispatch) => {
  try {
    const res = await ReportApi.GetReportProviders();
    dispatch(setProviderReport(res.data.data));
  } catch (err) {
    console.log(err);
  }
};

const fetchOrderReportInAdmin = () => async (dispatch) => {
  try {
    const res = await ReportApi.GetReportOrders();
    dispatch(setOrderReport(res.data.data));
  } catch (err) {
    console.log(err);
  }
};

const fetchReportAdmin = () => async (dispatch) => {
  try {
    const response = await AdminApi.GetReport();
    dispatch(setAdminReport(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
