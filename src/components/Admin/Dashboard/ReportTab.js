import React from "react";
import { GeneralDB } from "./GeneralDB";
import { DetailDashboard } from "./DetailDashboard";
import { useFetchReportInAdmin } from "../../../app/hook/ReportHook";

export const ReportTab = () => {
  useFetchReportInAdmin();
  return (
    <div className="space-y-1">
      <GeneralDB />
      <DetailDashboard />
    </div>
  );
};
