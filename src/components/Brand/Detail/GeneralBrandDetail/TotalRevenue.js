import React from "react";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { currencyFormat } from "../../../../app/hook/CommonHook";
import { useLanguage } from "../../../../app/hook/LanguageHook";

export const TotalRevenue = (props) => {
  const language = useLanguage();

  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center space-x-6">
        <CreditScoreIcon sx={{ width: 40, height: 40 }} />
        <div className="flex flex-col justify-between">
          <h1 className=" text-base text-[#B1B5B5]">
            {language ? "Lợi nhuận" : "Revenue"}
          </h1>
          <h1 className=" text-3xl font-['Josefin_Sans']">
            {currencyFormat(parseInt(props.revenue)) + "đ"}
          </h1>
        </div>
      </div>
    </div>
  );
};
