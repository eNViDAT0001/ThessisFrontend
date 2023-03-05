import React, { useEffect } from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
export const TotalBrand = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center space-x-6">
        <AssessmentIcon sx={{ width: 40, height: 40 }} />
        <div className="flex flex-col justify-between">
          <h1 className=" text-base text-[#B1B5B5]">Total brand</h1>
          <h1 className=" text-3xl font-[Verdana]">
            0
          </h1>
        </div>
      </div>
    </div>  )
}
