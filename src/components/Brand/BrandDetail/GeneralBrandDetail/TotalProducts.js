import React, { useCallback, useState } from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FetchProductInHomePage } from "../../../../store/slices/ProductSlice";
import { setProductInBrand } from "../../../../store/slices/ProviderSlice";

export const TotalProductInBrand = (props) => {
  
  const dispatch = useDispatch();
  const id = props.id
  const filter = {
    "fields[]": `provider_id_${id}`,
    "sorts[]":"id_DESC",
  }

  const ListProduct = useSelector(
    (state) => state.product.ProductPreviewInHomePage
  );
  const listProductInBrand = useSelector(
    (state) => state.provider.ProductInBrand
  );

  const [isFirstRender, setIsFirstRender] = useState(true);
  const loadProduct = useCallback(async () => {
    await dispatch(FetchProductInHomePage(filter));
  });

  useEffect(() => {
    if (ListProduct.status != 200 && ListProduct.status != 204) {
      loadProduct();
    }
    if (ListProduct.status == 200) {
      if (isFirstRender) {
        setIsFirstRender(false);
        dispatch(setProductInBrand(ListProduct.data.data))
      }
    }
  }, [
    loadProduct,
    dispatch,
    ListProduct,
    listProductInBrand,
    id,
    isFirstRender,
  ]);


  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center space-x-6">
        <AssessmentIcon sx={{ width: 40, height: 40 }} />
        <div className="flex flex-col justify-between">
          <h1 className=" text-base text-[#B1B5B5]">Total products in this brand</h1>
          <h1 className=" text-3xl font-[Verdana]">{listProductInBrand.length}</h1>
        </div>
      </div>
    </div>
  );
};
