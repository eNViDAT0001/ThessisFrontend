import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchOrderInProvider } from "../../app/hook/OrderHook";
import { GeneralBrandDetail } from "../../components/Brand/Detail/GeneralBrandDetail/GeneralBrandDetail";
import { OrderInDetailBrand } from "../../components/Brand/Detail/OrderInDetailBrand/OrderInDetailBrand";
import { ProductInDetailBrand } from "../../components/Brand/Detail/ProductInDetailBrand/ProductInDetailBrand";

export const BrandDetailPage = () => {
    const {id} = useParams()

    useFetchOrderInProvider(id)
    
      useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className=" w-screen bg-gradient-to-r from-[#29323c] to-[#485563] p-10 ">
      <div className="flex flex-col space-y-9">
        <GeneralBrandDetail id={id}/>
        <ProductInDetailBrand id={id}/>
        <OrderInDetailBrand id={id} />
      </div>
    </div>
  );
}
