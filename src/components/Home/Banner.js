import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useListBanner } from "../../app/hook/BannerHook";
import { AiOutlineVerticalLeft, AiOutlineVerticalRight } from "react-icons/ai";

export const Banner = () => {
  const [indexBanner, setIndexBanner] = useState(0);

  const listBanner = useListBanner() || [];

  const onPrevClickHandler = (e) => {
    if (indexBanner > 0) setIndexBanner(indexBanner - 1);
  };
  const onNextClickHandler = (e) => {
    if (indexBanner < listBanner.length - 1) setIndexBanner(indexBanner + 1);
  };
  return (
    <div>
      {listBanner.length !== 0 ? (
        <div className="flex justify-center items-center px-[15%] hover:shadow-md ">
          <Link
            className="w-full h-[600px] hover:cursor-pointer"
            to={`/banner/${listBanner[indexBanner].id}`}
          >
            <img
              src={listBanner[indexBanner].image}
              alt="Anh banner"
              className="w-full h-full skew-y-3 md:transform-none"
            ></img>
          </Link>
          <div className="w-full h-auto flex items-center justify-between absolute  px-5 ">
            <button onClick={onPrevClickHandler}>
              <AiOutlineVerticalRight
                size={30}
                className="bg-black text-white rounded-full bg-opacity-50 hover:bg-opacity-100 transition"
              />
            </button>
            <button onClick={onNextClickHandler}>
              <AiOutlineVerticalLeft
                size={30}
                className="bg-black text-white rounded-full bg-opacity-50 hover:bg-opacity-100 transition"
              />
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
