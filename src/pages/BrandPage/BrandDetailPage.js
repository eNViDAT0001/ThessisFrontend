import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchOrderInProvider } from "../../app/hook/OrderHook";
import { GeneralBrandDetail } from "../../components/Brand/Detail/GeneralBrandDetail/GeneralBrandDetail";
import { OrderInDetailBrand } from "../../components/Brand/Detail/OrderInDetailBrand/OrderInDetailBrand";
import { ProductInDetailBrand } from "../../components/Brand/Detail/ProductInDetailBrand/ProductInDetailBrand";
import { useFetchListProductInBrandDetail, useFilterInProductInBrandDetail } from "../../app/hook/BrandHook";
import { useDispatch } from "react-redux";
import { setProviderIDInProductInDetailBrand } from "../../app/slices/QuerySlice";

export const BrandDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch()

  const filter = useFilterInProductInBrandDetail()

  useFetchOrderInProvider(id);
  useFetchListProductInBrandDetail(filter);

  useEffect(() => {
    dispatch(setProviderIDInProductInDetailBrand(id))
    window.scrollTo(0, 0);
  }, [dispatch,id]);
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
