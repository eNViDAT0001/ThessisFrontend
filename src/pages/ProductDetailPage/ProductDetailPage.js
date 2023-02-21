import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchInProductDetail } from "../../app/hook/ProductHook";
import { Comment } from "../../app/models/Read/Product/ProductDetail/Comment";
import { Description } from "../../app/models/Read/Product/ProductDetail/Description";
import { ProductDetail } from "../../app/models/Read/Product/ProductDetail/ProductDetail";
import { reset } from "../../app/slice/ProductSlice";

export const ProductDetailPage = () => {
  const { id } = useParams();
  useFetchInProductDetail(id);


  useEffect(()=>()=>{
    reset()
  },[])
  return (
    <div>
      <div>
        <div className="bg-[#F5F8FE] border">
          <div className="flex justify-center font-['Josefin_Sans'] ">
            <ProductDetail id={id} />
          </div>
          <Description id={id} />
          <Comment id={id} />
        </div>
      </div>
    </div>
  );
};
