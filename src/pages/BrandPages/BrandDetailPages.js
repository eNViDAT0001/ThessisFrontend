import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GeneralBrandDetail } from "../../components/Brand/BrandDetail/GeneralBrandDetail/GeneralBrandDetail";
import { ProductInDetailBrand } from "../../components/Brand/BrandDetail/ListProducts/ProductInDetailBrand";
import { OrderInDetailBrand } from "../../components/Brand/BrandDetail/OrderInBrand/OrderInDetailBrand";
import { setProductInBrand } from "../../store/slices/ProviderSlice";

export const BrandDetailPages = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(()=>()=>{
    dispatch(setProductInBrand([]))
  })
  return (
    <div className=" w-screen bg-gradient-to-r from-[#29323c] to-[#485563] p-10 ">
      <div className="flex flex-col space-y-9">
        <GeneralBrandDetail id={id}/>/>
        <ProductInDetailBrand id={id}/>
        <OrderInDetailBrand id={id} />
      </div>
    </div>
  );
};
