import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { reset } from "../../app/slices/ProductSlice";
import { Comment } from "../../components/ProductDetail/Comment/Comment";
import { TabDescription } from "../../components/ProductDetail/Description/TabDescription";
import { ProductDetail } from "../../components/ProductDetail/ProductDetail";
import {

  useFetchFullFromProductDetail,

} from "../../app/hook/ProductHook";
import { useFilterInCommentInProductDetail } from "../../app/hook/CommentHook";
import { convertObjectToStringQuery } from "../../app/hook/CommonHook";

export const ProductDetailPage = () => {
  const { id } = useParams();

  const filter = useFilterInCommentInProductDetail()
  
  useFetchFullFromProductDetail(id,convertObjectToStringQuery(filter));
  useEffect(() => {
    window.scroll(0,0)
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
          <div className="px-[170px] bg-[#F5F8FE] py-[50px] my-6 ">
            <TabDescription id={id} />
            <Comment id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
