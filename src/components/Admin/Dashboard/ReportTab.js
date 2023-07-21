import React from "react";
import { GeneralDB } from "./GeneralDB";
import { DetailDashboard } from "./DetailDashboard";
import {
  useFetchReportInAdmin,
  useFilterOrderDB,
  useFilterProductDB,
  useFilterProviderDB,
} from "../../../app/hook/ReportHook";
import { convertObjectToStringQuery } from "../../../app/hook/CommonHook";

export const ReportTab = () => {
  const filterProduct = useFilterProductDB();
  const filterProvider = useFilterProviderDB();
  const filterOrder = useFilterOrderDB();

  useFetchReportInAdmin(
    convertObjectToStringQuery(filterProduct),
    convertObjectToStringQuery(filterProvider),
    convertObjectToStringQuery(filterOrder)
  );
  return (
    <div className="space-y-1">
      <GeneralDB />
      <DetailDashboard />
    </div>
  );
};
