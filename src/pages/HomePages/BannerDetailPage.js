import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  checkObjectEmpty,
  currencyFormat,
} from "../../stogare_function/listActions";
import {
  FetchAllProductBanner,
  FetchProductInBanner,
  resetProduct,
  setProductInBanner,
} from "../../store/slices/ProductSlice";

export const BannerDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate()
  const listBanner = useSelector((state) => state.product.Banners);
  const productInBanner = useSelector((state) => state.product.ProductInBanner);

  const [getOneBanner, setOneBanner] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();

  const loadProductInBanner = useCallback(async () => {
    dispatch(FetchProductInBanner(id));
  });

  const loadBanner = useCallback(async () => {
    dispatch(FetchAllProductBanner());
  });

  useEffect(()=>{
    dispatch(setProductInBanner({}))
  },[dispatch])
  useEffect(() => {
    if (listBanner.status != 200 && listBanner.status != 204) {
      loadBanner();
    }
    if (listBanner.status == 200) {
      if (firstRender) {
        setFirstRender(false);
        const result = listBanner.data.data.filter((data) => data.ID == id);
        setOneBanner(result[0]);
      }
      if ((productInBanner.status != 200) && (productInBanner.status != 204)) {
        loadProductInBanner();
      }
    }
  }, [
    loadProductInBanner,
    firstRender,
    listBanner,
    loadBanner,
    id,
    productInBanner,
  ]);

  useEffect(()=>()=>{
    dispatch(resetProduct)
  },[dispatch])
  const emptyArrayProductInBanner = () => {
    if (
      checkObjectEmpty(productInBanner) ||
      productInBanner.status == 204 ||
      productInBanner.status != 200
    )
      return true;
    else return false;
  };

  const goToProductDetail=(e)=>{
    const productId = e.currentTarget.id
    navigate(`/product/${productId}`)
  }
  return (
    <div className="flex flex-col bg-[#F5F5FA]">
      <div className="flex justify-center items-center px-[15%] border hover:shadow-md ">
        <div className="w-full h-[600px]">
          <img
            src={getOneBanner.Image}
            alt="Anh banner"
            className="w-full h-full skew-y-3 md:transform-none"
          ></img>
        </div>
      </div>
      <div>
        <div className="flex justify-center my-[100px]">
          <div className="min-w-[80%] w-[80%] border p-10 bg-white rounded-2xl">
            <div className="flex flex-row text-xl space-x-3 font-['Poppins_Bold'] font-extrabold text-[#000000]">
                <h1>
                    Product in
                </h1>
                <h1 className=" text-[#EC4899]">
                    {getOneBanner.Title}
                </h1>
            </div>
           

            <div>
              {!emptyArrayProductInBanner() ? (
                <div className="flex flex-row justify-start flex-wrap my-[50px] ">
                  {productInBanner.data.data.map((data) => (
                    <div
                      id={data.ID}
                      onClick={goToProductDetail}
                      className=" w-[20%] h-[300px] my-5 mx-5 mb-10 hover:scale-105 p-2 hover:border hover:shadow-2xl hover:rounded-xl hover:cursor-pointer "
                    >
                      {data.Media ? (
                        <img
                          id={data.ID}
                          src={data.Media[0].mediaPath}
                          alt="anh san pham"
                          className="h-[200px] w-full"
                        />
                      ) : (
                        <img
                          src="data:image/jpeg;base64,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"
                          alt="oh no"
                        ></img>
                      )}

                      <div className="flex flex-row mt-2">
                        <h1 className="font-['Poppins_Regular'] text-gray-400 hover:text-blue-400 text-base font-bold">
                          {data.Name}
                        </h1>
                      </div>

                      <div className="flex flex-row space-x-4">
                        <div className="flex flex-row space-x-1 font-[Helvetica] text-[#929292] items-center line-through">
                          <h1 className=" text-xs">đ</h1>
                          <h1 className=" text-sm">
                            {currencyFormat(parseInt(data.Price))}
                          </h1>
                        </div>
                        <div className="py-5 flex flex-row space-x-1 font-[Helvetica] text-[#EE4D2D]">
                          <h1 className=" text-xl">đ</h1>
                          <h1 className=" text-2xl">
                            {currencyFormat(
                              (data.Price * (100 - data.Discount)) / 100
                            )}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
