import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  checkObjectEmpty,
  currencyFormat,
} from "../../../../stogare_function/listActions";
import {
  FetchDetailProduct,
  FetchSpecificationFromOneProduct,
  setOptionIdSelected,
} from "../../../../store/slices/ProductSlice";
import { fetchAllComment } from "../../../../store/slices/CommentSlice";
import { Divider } from "@mui/material";

const initialOpion = { id: -1, price: 0, quantity: 0, name: "" };

const TitleAndType = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.ProductDetail);
  const specifications = useSelector((state) => state.product.Specification);
  const comment = useSelector((state) => state.comment.comment);

  const [optionHandle, setOptionHandle] = useState(initialOpion);
  const [quantity, setQuantity] = useState();
  const [isClickOption, setIsClickOption] = useState(false);
  const [price, setPrice] = useState();

  const loadProducts = useCallback(async () => {
    try {
      await dispatch(FetchDetailProduct(props.id));
    } catch (err) {
      console.log(err);
    }
  });
  const loadComments = useCallback(async () => {
    try {
      await dispatch(fetchAllComment(props.id));
    } catch (err) {
      console.log(err);
    }
  });
  const loadSpecification = useCallback(async () => {
    try {
      await dispatch(FetchSpecificationFromOneProduct(props.id));
    } catch (err) {
      console.log(err);
    }
  });

  useLayoutEffect(() => {
    if (product.status != 200 || !product.data.data) {
      loadProducts();
    }
    //load xong product =>load comment va specification
    if (product.status == 200) {
      if (comment.status != 200 && comment.status != 204) {
        loadComments();
      }
      if (specifications.length === 0) {
        loadSpecification();
      }
    }
    //load thanh cong => dat setState price
    if (product.status == 200) {
      if (!isClickOption) setPrice(product.data.data.Price);
    }
  }, [
    loadComments,
    loadProducts,
    loadSpecification,
    dispatch,
    props.id,
    product,
    comment,
    specifications,
    isClickOption,
  ]);

  return (
    <div>
      {checkObjectEmpty(product) ? (
        <div></div>
      ) : (
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl text-[#0D134E] font-bold ">
            {product.data.data.Name}
          </h1>
          <div className="flex flex-row space-x-3">
            <div className=" flex flex-row space-x-2 items-center">
              <h1 className=" underline">
                {!checkObjectEmpty(comment)
                  ? comment.status !== 204
                    ? comment.data.data.length
                    : 0
                  : 0}
              </h1>
              <h1 className=" text-[#767676] hover:underline hover:cursor-pointer">
                Reviewed
              </h1>
            </div>
            <Divider orientation="vertical" flexItem />
            <div>
              {optionHandle.id === -1 ? (
                <div></div>
              ) : (
                <div className="px-3 py-1 border text-[#EE4D2D] border-[#EE4D2D]">
                  {optionHandle.name}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center space-x-3">
            <div className="py-5 pl-5 flex flex-row space-x-1 font-[Helvetica] text-[#929292] items-center line-through">
              <h1 className=" text-xs">đ</h1>
              <h1 className=" text-base ">{currencyFormat(parseInt(price))}</h1>
            </div>
            <div className="py-5 flex flex-row space-x-1 font-[Helvetica] text-[#EE4D2D]">
              <h1 className=" text-xl">đ</h1>
              <h1 className=" text-2xl">
                {currencyFormat(
                  (price * (100 - product.data.data.Discount)) / 100
                )}
              </h1>
            </div>
            <div className=" px-2 bg-[#EE4D2D] flex flex-row space-x-1 font-[Helvetica] text-[#FFFFFF] items-center ">
              <h1 className=" text-sm ">- {product.data.data.Discount}%</h1>
            </div>
          </div>
          <div>
            {specifications.length === 0 ? (
              <div></div>
            ) : (
              <div className="space-y-4 font-[Helvetica]">
                {specifications.map((data) => (
                  <div className="space-y-4">
                    <div className="flex flex-row space-x-4 whitespace-nowrap items-start">
                      <h1 className="text-[#929292] text-lg ">
                        {data.Properties}:{" "}
                      </h1>
                      {data.Options.length === 0 ? (
                        <div></div>
                      ) : (
                        <div className="flex flex-row flex-wrap items-center">
                          {data.Options.map((option) => (
                            <div
                              {...option}
                              key={option.id}
                              onClick={() => {
                                if (!isClickOption) {
                                  if (optionHandle.id === initialOpion.id) {
                                    setOptionHandle(option);
                                    setPrice(
                                      parseInt(price) + parseInt(option.price)
                                    );
                                    dispatch(setOptionIdSelected(option.id));
                                    setIsClickOption(true);
                                  }
                                } else {
                                  if (optionHandle.id === option.id) {
                                    setIsClickOption(false);
                                    dispatch(setOptionIdSelected(-1));
                                    setOptionHandle(initialOpion);
                                    setPrice(product.Price);
                                  } else {
                                    setPrice(
                                      parseInt(price) +
                                        parseInt(option.price) -
                                        parseInt(optionHandle.price)
                                    );
                                    setOptionHandle(option);
                                  }
                                }
                                setQuantity(option.quantity);
                              }}
                              className=" border py-1 px-6 m-1 hover:text-[#EE4D2D] hover:border-[#EE4D2D] hover:cursor-pointer "
                            >
                              <h1>{option.name}</h1>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Divider />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TitleAndType;
