import { useDispatch, useSelector } from "react-redux";
import { AdminApi } from "../../api/AdminApi";
import { setAdminReport } from "../slices/ReportSlice";
import { useEffect } from "react";

export const useReportAdmin = () =>
  useSelector((state) => state.report.adminReport);

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
