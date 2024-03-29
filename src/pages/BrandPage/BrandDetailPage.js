import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GeneralBrandDetail } from "../../components/Brand/Detail/GeneralBrandDetail/GeneralBrandDetail";
import { OrderInDetailBrand } from "../../components/Brand/Detail/OrderInDetailBrand/OrderInDetailBrand";
import { ProductInDetailBrand } from "../../components/Brand/Detail/ProductInDetailBrand/ProductInDetailBrand";
import { useFetchFullInBrandDetailPage } from "../../app/hook/BrandHook";
import { useDispatch } from "react-redux";
import { useUserID } from "../../app/hook/UserHook";

export const BrandDetailPage = () => {
  const { id } = useParams();
  const userId = useUserID()
  const dispatch = useDispatch()

  useFetchFullInBrandDetailPage(id, userId)
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);
  return (
    <div className=" w-screen bg-gradient-to-r from-[#29323c] to-[#485563] p-10 ">
      <div className="flex flex-col space-y-9">
        <GeneralBrandDetail id={id} />
        <ProductInDetailBrand id={id} />
        <OrderInDetailBrand id={id} />
      </div>
    </div>
  );
};
