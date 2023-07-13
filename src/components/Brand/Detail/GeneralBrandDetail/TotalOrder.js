import React from "react";

import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLanguage } from "../../../../app/hook/LanguageHook";

export const TotalOrder = (props) => {
  const language = useLanguage();
  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center space-x-6">
        <ListAltIcon sx={{ width: 40, height: 40 }} />
        <div className="flex flex-col justify-between">
          <h1 className=" text-base text-[#B1B5B5]">
            {language ? "Tổng đơn hàng" : " Total order in this brand:"}
          </h1>
          <h1 className=" text-3xl font-['Josefin_Sans']">{props.order}</h1>
        </div>
      </div>
    </div>
  );
};
