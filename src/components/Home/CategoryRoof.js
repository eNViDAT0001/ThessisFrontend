import React from "react";
import { useCategoryRoof } from "../../app/hook/CategoryHook";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings={
  lazyLoad: 'ondemand',
  slidesToShow: 3,
  slidesToScroll: 1
}

export const CategoryRoof = () => {
  const categoryRoof = useCategoryRoof() || [];

  const handleClickCategory = (e) => {};

  return (
    <div>
      {categoryRoof.length === 0 ? (
        <div></div>
      ) : (
        <div className="flex justify-center mt-20 ">
          <div className="w-[80%] flex flex-col border p-10  space-y-6 bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF] rounded-2xl">
            <h1 className=" text-xl font-['Poppins_Bold'] font-extrabold uppercase text-[#000000]">
              can interest you
            </h1>
            <Slider {...settings}>
              {categoryRoof.map((data) => (
                <div
                  key={data.id}
                  onClick={handleClickCategory}
                  id={data.id}
                  className="hover:shadow-xl hover:cursor-pointer border w-[325px] flex flex-row justify-between bg-white"
                >
                  <img
                    src={data.image_path}
                    alt="anh banner nho"
                    className="w-[200px] h-[300px]"
                  />
                  <h1 className="mt-6 mr-8 font-[Cursive] font-bold text-xl">
                    {data.name}
                  </h1>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};
