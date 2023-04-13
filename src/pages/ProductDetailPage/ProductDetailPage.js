import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { reset } from "../../app/slices/ProductSlice";
import { Comment } from "../../components/ProductDetail/Comment/Comment";
import { TabDescription } from "../../components/ProductDetail/Description/TabDescription";
import { ProductDetail } from "../../components/ProductDetail/ProductDetail";
import { useFetchBasicInformationInProductDetail, useFetchDescriptionInProductDetail, useFetchMediaInProductDetail, useFetchSpecificationInProductDetail } from "../../app/hook/ProductHook";

export const ProductDetailPage = () => {
  const { id } = useParams();
  
  useFetchBasicInformationInProductDetail(id)
  useFetchMediaInProductDetail(id)
  useFetchSpecificationInProductDetail(id)
  useFetchDescriptionInProductDetail(id)

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div>
      <div>
        <div className="bg-[#F5F8FE] border">
          <div className="flex justify-center font-['Josefin_Sans'] ">
            <ProductDetail id={id} />
          </div>
          <TabDescription id={id} />
          <Comment id={id} />
        </div>
      </div>
    </div>
  );
};
