import React from "react";
import HeaderBar from "../../components/Common/HeaderBar";
import { BannerDetail } from "../../components/Home/BannerDetail";
import { useParams } from "react-router-dom";
import {
  useFetchBannerDetail,
  useFilterProductInBannerDetail,
} from "../../app/hook/BannerHook";
import { convertObjectToStringQuery } from "../../app/hook/CommonHook";

export const BannerDetailPage = () => {
  const { id } = useParams();
  const filter = useFilterProductInBannerDetail() || {};
  useFetchBannerDetail(id, convertObjectToStringQuery(filter));
  return (
    <div>
      <HeaderBar name1="Home . Banner" name2=" . Detail" />
      <div className="flex flex-col justify-center px-[15%] space-y-4 mt-4 mb-10">
        <BannerDetail />{" "}
      </div>
    </div>
  );
};
